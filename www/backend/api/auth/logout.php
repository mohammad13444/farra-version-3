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

$payload = validateJWT($conn);
$user_id = $payload['user_id'];

try {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches);
    $jwt = $matches[1];
    
    $token_hash = hash('sha256', $jwt);
    
    $stmt = $conn->prepare("
        UPDATE jwt_tokens 
        SET is_revoked = 1 
        WHERE token_hash = ? AND user_id = ?
    ");
    $stmt->execute([$token_hash, $user_id]);
    
    logActivity($conn, $user_id, 'logout', 'User logged out');
    
    sendResponse(true, 'با موفقیت خارج شدید');
    
} catch (Exception $e) {
    error_log("Logout Error: " . $e->getMessage());
    sendResponse(false, 'خطای سرور', null, 500);
}
?>
