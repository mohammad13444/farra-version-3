<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../../config/database.php';
require_once '../../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$data = json_decode(file_get_contents("php://input"), true);
$phone = validateIraqiPhone($data['phone_number'] ?? '');
$otp = preg_replace('/\D/', '', $data['otp_code'] ?? '');

if (!$phone || strlen($otp) !== 6) {
    sendResponse(false, 'Invalid input', null, 400);
}

$db = new Database();
$conn = $db->getConnection();
$ip = getUserIP();

// ✅ بررسی rate limit
$rate_check = checkRateLimit($conn, $phone, 'verify_otp', 5, 10);
if (!$rate_check['allowed']) {
    sendResponse(false, $rate_check['message'], null, 429);
}

try {
    // ✅ بررسی OTP
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
        sendResponse(false, 'Invalid OTP code', null, 400);
    }
    
    // ✅ بررسی انقضا
    if (strtotime($otp_record['expires_at']) < time()) {
        sendResponse(false, 'OTP expired', null, 400);
    }
    
    // ✅ بررسی تعداد تلاش
    if ($otp_record['attempts'] >= $otp_record['max_attempts']) {
        sendResponse(false, 'Maximum attempts exceeded', null, 429);
    }
    
    $conn->beginTransaction();
    
    // ✅ علامت‌گذاری OTP به عنوان استفاده شده
    $stmt = $conn->prepare("UPDATE otp_codes SET is_used = 1, verified_at = NOW() WHERE otp_id = ?");
    $stmt->execute([$otp_record['otp_id']]);
    
    // ✅ ایجاد یا به‌روزرسانی کاربر
    $stmt = $conn->prepare("SELECT user_id, is_verified FROM users WHERE phone_number = ?");
    $stmt->execute([$phone]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        $user_id = $user['user_id'];
        if (!$user['is_verified']) {
            $stmt = $conn->prepare("UPDATE users SET is_verified = 1, otp_verified_at = NOW(), last_login = NOW() WHERE user_id = ?");
            $stmt->execute([$user_id]);
        }
    } else {
        $stmt = $conn->prepare("
            INSERT INTO users (phone_number, phone_country_code, is_verified, otp_verified_at, registration_ip, last_login)
            VALUES (?, '+964', 1, NOW(), ?, NOW())
        ");
        $stmt->execute([$phone, $ip]);
        $user_id = $conn->lastInsertId();
    }
    
    // ✅ ایجاد session token
    $session_token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', strtotime('+30 days'));
    
    $stmt = $conn->prepare("
        INSERT INTO login_sessions (user_id, session_token, ip_address, expires_at, device_info)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$user_id, $session_token, $ip, $expires_at, $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown']);
    
    $conn->commit();
    
    sendResponse(true, 'OTP verified successfully', [
        'user_id' => $user_id,
        'session_token' => $session_token,
        'is_new_user' => !$user
    ]);
    
} catch (Exception $e) {
    $conn->rollBack();
    error_log("Verify OTP Error: " . $e->getMessage());
    sendResponse(false, 'Server error', null, 500);
}
?>
