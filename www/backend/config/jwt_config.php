<?php
class JWTConfig {
    // کلید مخفی - حتماً تغییرش بده و در محیط امن نگهداری کن
    public static $secret_key = "your-very-secret-jwt-key-change-this-immediately-2026";
    public static $algorithm = 'HS256';
    public static $token_expiry = 3600; // 1 hour
    public static $refresh_token_expiry = 2592000; // 30 days
    
    public static function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    public static function base64UrlDecode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
?>
