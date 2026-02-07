<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/database.php';
require_once '../../includes/functions.php';
require_once '../../includes/whatsapp.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$data = json_decode(file_get_contents("php://input"), true);
$phone = $data['phone_number'] ?? '';

$cleaned_phone = validateIraqiPhone($phone);
if (!$cleaned_phone) {
    sendResponse(false, 'فرمت شماره تلفن عراقی صحیح نیست', null, 400);
}

$db = new Database();
$conn = $db->getConnection();
$ip = getUserIP();

// Rate limit سخت‌تر برای resend
$rate_check = checkRateLimit($conn, $cleaned_phone, 'resend_otp', 2, 5);
if (!$rate_check['allowed']) {
    sendResponse(false, $rate_check['message'], null, 429);
}

try {
    // بررسی آخرین OTP ارسال شده
    $stmt = $conn->prepare("
        SELECT created_at FROM otp_codes 
        WHERE phone_number = ? 
        ORDER BY created_at DESC 
        LIMIT 1
    ");
    $stmt->execute([$cleaned_phone]);
    $last_otp = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($last_otp) {
        $time_diff = time() - strtotime($last_otp['created_at']);
        if ($time_diff < 60) { // 60 ثانیه انتظار
            $wait_time = 60 - $time_diff;
            sendResponse(false, "لطفاً $wait_time ثانیه صبر کنید", null, 429);
        }
    }
    
    $conn->beginTransaction();

    // غیرفعال کردن OTP های قبلی
    $stmt = $conn->prepare("UPDATE otp_codes SET is_used = 1 WHERE phone_number = ? AND is_used = 0");
    $stmt->execute([$cleaned_phone]);

    // تولید OTP جدید
    $otp = generateOTP();
    $expires_at = date('Y-m-d H:i:s', strtotime('+10 minutes'));

    $stmt = $conn->prepare("
        INSERT INTO otp_codes (phone_number, otp_code, expires_at, ip_address, purpose)
        VALUES (?, ?, ?, ?, 'registration')
    ");
    $stmt->execute([$cleaned_phone, $otp, $expires_at, $ip]);

    // ارسال به واتساپ
    $whatsapp = new WhatsAppAPI();
    $sent = $whatsapp->sendOTP($cleaned_phone, $otp);

    if (!$sent) {
        $conn->rollBack();
        sendResponse(false, 'خطا در ارسال مجدد OTP', null, 500);
    }

    $conn->commit();

    sendResponse(true, 'کد تأیید مجدداً ارسال شد', [
        'phone_number' => $cleaned_phone,
        'expires_in_seconds' => 600
    ]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    error_log("Resend OTP Error: " . $e->getMessage());
    sendResponse(false, 'خطای سرور', null, 500);
}
?>
