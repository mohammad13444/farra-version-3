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
require_once '../../includes/jwt.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$db = new Database();
$conn = $db->getConnection();

// اعتبارسنجی JWT
$payload = validateJWT($conn);
$user_id = $payload['user_id'];

$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$date_of_birth = $data['date_of_birth'] ?? '';
$gender = $data['gender'] ?? '';

// اعتبارسنجی
$errors = [];

if (empty($full_name) || mb_strlen($full_name) < 3) {
    $errors[] = 'نام و نام خانوادگی باید حداقل 3 کاراکتر باشد';
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'فرمت ایمیل صحیح نیست';
}

if (!empty($date_of_birth)) {
    $dob = DateTime::createFromFormat('Y-m-d', $date_of_birth);
    if (!$dob || $dob->format('Y-m-d') !== $date_of_birth) {
        $errors[] = 'فرمت تاریخ تولد صحیح نیست (YYYY-MM-DD)';
    }
}

if (!empty($gender) && !in_array($gender, ['male', 'female', 'other'])) {
    $errors[] = 'جنسیت نامعتبر است';
}

if (!empty($errors)) {
    sendResponse(false, implode(', ', $errors), null, 400);
}

try {
    $conn->beginTransaction();

    $stmt = $conn->prepare("
        UPDATE users 
        SET full_name = ?, 
            email = ?, 
            date_of_birth = ?, 
            gender = ?, 
            profile_completed = 1,
            updated_at = NOW()
        WHERE user_id = ?
    ");
    
    $stmt->execute([
        $full_name,
        $email ?: null,
        $date_of_birth ?: null,
        $gender ?: null,
        $user_id
    ]);

    logActivity($conn, $user_id, 'profile_completed', 'User completed their profile');

    $conn->commit();

    sendResponse(true, 'پروفایل با موفقیت تکمیل شد', [
        'profile_completed' => true
    ]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    error_log("Complete Profile Error: " . $e->getMessage());
    sendResponse(false, 'خطای سرور', null, 500);
}
?>
