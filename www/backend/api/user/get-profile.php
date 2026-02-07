<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/database.php';
require_once '../../includes/functions.php';
require_once '../../includes/jwt.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$db = new Database();
$conn = $db->getConnection();

// اعتبارسنجی JWT
$payload = validateJWT($conn);
$user_id = $payload['user_id'];

try {
    $stmt = $conn->prepare("
        SELECT 
            user_id,
            phone_number,
            phone_country_code,
            full_name,
            email,
            date_of_birth,
            gender,
            is_verified,
            profile_completed,
            created_at,
            last_login
        FROM users 
        WHERE user_id = ?
    ");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        sendResponse(false, 'کاربر یافت نشد', null, 404);
    }
    
    sendResponse(true, 'پروفایل با موفقیت دریافت شد', $user);
    
} catch (Exception $e) {
    error_log("Get Profile Error: " . $e->getMessage());
    sendResponse(false, 'خطای سرور', null, 500);
}
?>
