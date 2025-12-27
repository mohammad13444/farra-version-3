<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../../config/database.php';
require_once '../../includes/functions.php';
require_once '../../includes/whatsapp.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$data = json_decode(file_get_contents("php://input"), true);
$phone = $data['phone_number'] ?? '';

// ✅ اعتبارسنجی شماره
$cleaned_phone = validateIraqiPhone($phone);
if (!$cleaned_phone) {
    sendResponse(false, 'Invalid Iraqi phone number format', null, 400);
}

$db = new Database();
$conn = $db->getConnection();
$ip = getUserIP();

// ✅ بررسی rate limit
$rate_check = checkRateLimit($conn, $cleaned_phone, 'send_otp', 3, 10);
if (!$rate_check['allowed']) {
    sendResponse(false, $rate_check['message'], null, 429);
}

try {
    $conn->beginTransaction();
    
    // ✅ غیرفعال کردن OTP های قبلی
    $stmt = $conn->prepare("UPDATE otp_codes SET is_used = 1 WHERE phone_number = ? AND is_used = 0");
    $stmt->execute([$cleaned_phone]);
    
    // ✅ تولید OTP جدید
    $otp = generateOTP();
    $expires_at = date('Y-m-d H:i:s', strtotime('+10 minutes'));
    
    $stmt = $conn->prepare("
        INSERT INTO otp_codes (phone_number, otp_code, expires_at, ip_address, purpose)
        VALUES (?, ?, ?, ?, 'registration')
    ");
    $stmt->execute([$cleaned_phone, $otp, $expires_at, $ip]);
    
    // ✅ ارسال OTP به WhatsApp
    $whatsapp = new WhatsAppAPI();
    $sent = $whatsapp->sendOTP($cleaned_phone, $otp);
    
    if (!$sent) {
        $conn->rollBack();
        sendResponse(false, 'Failed to send OTP', null, 500);
    }
    
    $conn->commit();
    
    sendResponse(true, 'OTP sent successfully', [
        'phone_number' => $cleaned_phone,
        'expires_in_seconds' => 600
    ]);
    
} catch (Exception $e) {
    $conn->rollBack();
    error_log("Send OTP Error: " . $e->getMessage());
    sendResponse(false, 'Server error', null, 500);
}
?>
