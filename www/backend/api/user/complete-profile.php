<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../config/database.php';
require_once '../../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

// ✅ بررسی token
$headers = getallheaders();
$token = $headers['Authorization'] ?? '';
$token = str_replace('Bearer ', '', $token);

if (!$token) {
    sendResponse(false, 'Unauthorized', null, 401);
}

$db = new Database();
$conn = $db->getConnection();

// ✅ اعتبارسنجی token
$stmt = $conn->prepare("
    SELECT user_id FROM login_sessions 
    WHERE session_token = ? AND expires_at > NOW()
");
$stmt->execute([$token]);
$session = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$session) {
    sendResponse(false, 'Invalid or expired token', null, 401);
}

$user_id = $session['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data['full_name'] ?? '');
$age = intval($data['age'] ?? 0);
$city = trim($data['city'] ?? '');
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);

if (!$full_name || $age < 1 || $age > 120 || !$city || !$email) {
    sendResponse(false, 'Invalid input data', null, 400);
}

try {
    $conn->beginTransaction();
    
    // ✅ بررسی وجود پروفایل
    $stmt = $conn->prepare("SELECT profile_id FROM user_profiles WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $profile = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($profile) {
        // به‌روزرسانی
        $stmt = $conn->prepare("
            UPDATE user_profiles 
            SET full_name = ?, age = ?, city = ?, email = ?, profile_completed = 1, updated_at = NOW()
            WHERE user_id = ?
        ");
        $stmt->execute([$full_name, $age, $city, $email, $user_id]);
    } else {
        // ایجاد جدید
        $stmt = $conn->prepare("
            INSERT INTO user_profiles (user_id, full_name, age, city, email, profile_completed)
            VALUES (?, ?, ?, ?, ?, 1)
        ");
        $stmt->execute([$user_id, $full_name, $age, $city, $email]);
    }
    
    $conn->commit();
    
    sendResponse(true, 'Profile completed successfully', [
        'user_id' => $user_id,
        'profile_completed' => true
    ]);
    
} catch (Exception $e) {
    $conn->rollBack();
    error_log("Complete Profile Error: " . $e->getMessage());
    sendResponse(false, 'Server error', null, 500);
}
?>
