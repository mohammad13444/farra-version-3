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

$rate_check = checkRateLimit($conn, $cleaned_phone, 'send_otp', 3, 10);
if (!$rate_check['allowed']) {
    sendResponse(false, $rate_check['message'], null, 429);
}

try {
    $conn->beginTransaction();

    // غیرفعال کردن OTP های قبلی
    $stmt = $conn->prepare("UPDATE otp_codes SET is_used = 1 WHERE phone_number = ? AND is_used = 0");
    $stmt->execute([$cleaned_phone]);

    // تولید OTP
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
        sendResponse(false, 'خطا در ارسال OTP. لطفاً دوباره تلاش کنید.', null, 500);
    }

    $conn->commit();

    sendResponse(true, 'کد تأیید با موفقیت ارسال شد', [
        'phone_number' => $cleaned_phone,
        'expires_in_seconds' => 600
    ]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    error_log("Send OTP Error: " . $e->getMessage());
    sendResponse(false, 'خطای سرور. لطفاً دوباره تلاش کنید.', null, 500);
}
?>
