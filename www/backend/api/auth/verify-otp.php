<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/database.php';
require_once '../../config/jwt_config.php';
require_once '../../includes/functions.php';
require_once '../../includes/jwt.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$data = json_decode(file_get_contents("php://input"), true);
$phone = validateIraqiPhone($data['phone_number'] ?? '');
$otp = preg_replace('/\D/', '', $data['otp_code'] ?? '');

if (!$phone || strlen($otp) !== 6) {
    sendResponse(false, 'اطلاعات ورودی نامعتبر است', null, 400);
}

$db = new Database();
$conn = $db->getConnection();
$ip = getUserIP();

$rate_check = checkRateLimit($conn, $phone, 'verify_otp', 5, 10);
if (!$rate_check['allowed']) {
    sendResponse(false, $rate_check['message'], null, 429);
}

try {
    $conn->beginTransaction();

    // بررسی OTP
    $stmt = $conn->prepare("
        SELECT otp_id, attempts, max_attempts, expires_at
        FROM otp_codes
        WHERE phone_number = ? AND otp_code = ? AND is_used = 0 AND purpose = 'registration'
        ORDER BY created_at DESC
        LIMIT 1
    ");
    $stmt->execute([$phone, $otp]);
    $otp_record = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$otp_record) {
        // افزایش تلاش ناموفق
        $conn->prepare("UPDATE otp_codes SET attempts = attempts + 1 WHERE phone_number = ? AND otp_code = ? AND is_used = 0")
             ->execute([$phone, $otp]);
        $conn->commit();
        sendResponse(false, 'کد تأیید نامعتبر است', null, 400);
    }

    if (strtotime($otp_record['expires_at']) < time()) {
        $conn->commit();
        sendResponse(false, 'کد تأیید منقضی شده است', null, 400);
    }

    if ($otp_record['attempts'] >= $otp_record['max_attempts']) {
        $conn->commit();
        sendResponse(false, 'تعداد تلاش مجاز تمام شده. OTP جدید درخواست کنید', null, 429);
    }

    // علامت‌گذاری OTP
    $stmt = $conn->prepare("UPDATE otp_codes SET is_used = 1, verified_at = NOW() WHERE otp_id = ?");
    $stmt->execute([$otp_record['otp_id']]);

    // بررسی یا ایجاد کاربر
    $stmt = $conn->prepare("SELECT user_id, is_verified, profile_completed FROM users WHERE phone_number = ?");
    $stmt->execute([$phone]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $is_new_user = false;
    
    if ($user) {
        $user_id = $user['user_id'];
        if (!$user['is_verified']) {
            $stmt = $conn->prepare("
                UPDATE users 
                SET is_verified = 1, otp_verified_at = NOW(), last_login = NOW() 
                WHERE user_id = ?
            ");
            $stmt->execute([$user_id]);
        }
    } else {
        $stmt = $conn->prepare("
            INSERT INTO users (phone_number, phone_country_code, is_verified, otp_verified_at, registration_ip, last_login)
            VALUES (?, '+964', 1, NOW(), ?, NOW())
        ");
        $stmt->execute([$phone, $ip]);
        $user_id = $conn->lastInsertId();
        $is_new_user = true;
        $user = ['profile_completed' => 0];
    }

    // تولید JWT Token
    $payload = [
        'user_id' => $user_id,
        'phone' => $phone,
        'type' => 'access'
    ];
    
    $access_token = JWT::encode($payload);
    $refresh_token = JWT::generateRefreshToken();
    
    // ذخیره در دیتابیس
    $token_hash = hash('sha256', $access_token);
    $refresh_hash = hash('sha256', $refresh_token);
    $token_expires = date('Y-m-d H:i:s', time() + JWTConfig::$token_expiry);
    $refresh_expires = date('Y-m-d H:i:s', time() + JWTConfig::$refresh_token_expiry);
    
    $stmt = $conn->prepare("
        INSERT INTO jwt_tokens (user_id, token_hash, refresh_token_hash, device_info, ip_address, expires_at, refresh_expires_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $user_id,
        $token_hash,
        $refresh_hash,
        $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
        $ip,
        $token_expires,
        $refresh_expires
    ]);

    logActivity($conn, $user_id, 'otp_verified', 'User verified OTP successfully');

    $conn->commit();

    sendResponse(true, 'تأیید با موفقیت انجام شد', [
        'user_id' => $user_id,
        'access_token' => $access_token,
        'refresh_token' => $refresh_token,
        'token_type' => 'Bearer',
        'expires_in' => JWTConfig::$token_expiry,
        'is_new_user' => $is_new_user,
        'profile_completed' => (bool)$user['profile_completed']
    ]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    error_log("Verify OTP Error: " . $e->getMessage());
    sendResponse(false, 'خطای سرور', null, 500);
}
?>
