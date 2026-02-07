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
$refresh_token = $data['refresh_token'] ?? '';

if (empty($refresh_token)) {
    sendResponse(false, 'Refresh token required', null, 400);
}

$db = new Database();
$conn = $db->getConnection();

try {
    $refresh_hash = hash('sha256', $refresh_token);
    
    $stmt = $conn->prepare("
        SELECT user_id, expires_at 
        FROM jwt_tokens 
        WHERE refresh_token_hash = ? AND is_revoked = 0 AND refresh_expires_at > NOW()
    ");
    $stmt->execute([$refresh_hash]);
    $token_record = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$token_record) {
        sendResponse(false, 'Invalid or expired refresh token', null, 401);
    }
    
    // ابطال توکن قدیمی
    $stmt = $conn->prepare("UPDATE jwt_tokens SET is_revoked = 1 WHERE refresh_token_hash = ?");
    $stmt->execute([$refresh_hash]);
    
    // تولید توکن جدید
    $user_id = $token_record['user_id'];
    $stmt = $conn->prepare("SELECT phone_number FROM users WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $payload = [
        'user_id' => $user_id,
        'phone' => $user['phone_number'],
        'type' => 'access'
    ];
    
    $new_access_token = JWT::encode($payload);
    $new_refresh_token = JWT::generateRefreshToken();
    
    $new_token_hash = hash('sha256', $new_access_token);
    $new_refresh_hash = hash('sha256', $new_refresh_token);
    $token_expires = date('Y-m-d H:i:s', time() + JWTConfig::$token_expiry);
    $refresh_expires = date('Y-m-d H:i:s', time() + JWTConfig::$refresh_token_expiry);
    
    $stmt = $conn->prepare("
        INSERT INTO jwt_tokens (user_id, token_hash, refresh_token_hash, device_info, ip_address, expires_at, refresh_expires_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $user_id,
        $new_token_hash,
        $new_refresh_hash,
        $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
        getUserIP(),
        $token_expires,
        $refresh_expires
    ]);
    
    sendResponse(true, 'Token refreshed successfully', [
        'access_token' => $new_access_token,
        'refresh_token' => $new_refresh_token,
        'token_type' => 'Bearer',
        'expires_in' => JWTConfig::$token_expiry
    ]);
    
} catch (Exception $e) {
    error_log("Refresh Token Error: " . $e->getMessage());
    sendResponse(false, 'Server error', null, 500);
}
?>
