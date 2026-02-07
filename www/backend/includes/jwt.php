<?php
require_once __DIR__ . '/../config/jwt_config.php';

class JWT {
    
    public static function encode($payload) {
        $header = json_encode([
            'typ' => 'JWT',
            'alg' => JWTConfig::$algorithm
        ]);
        
        $payload['iat'] = time();
        $payload['exp'] = time() + JWTConfig::$token_expiry;
        
        $base64UrlHeader = JWTConfig::base64UrlEncode($header);
        $base64UrlPayload = JWTConfig::base64UrlEncode(json_encode($payload));
        
        $signature = hash_hmac(
            'sha256',
            $base64UrlHeader . "." . $base64UrlPayload,
            JWTConfig::$secret_key,
            true
        );
        $base64UrlSignature = JWTConfig::base64UrlEncode($signature);
        
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }
    
    public static function decode($jwt) {
        $tokenParts = explode('.', $jwt);
        
        if (count($tokenParts) !== 3) {
            return false;
        }
        
        $header = JWTConfig::base64UrlDecode($tokenParts[0]);
        $payload = JWTConfig::base64UrlDecode($tokenParts[1]);
        $signatureProvided = $tokenParts[2];
        
        $base64UrlHeader = JWTConfig::base64UrlEncode($header);
        $base64UrlPayload = JWTConfig::base64UrlEncode($payload);
        
        $signature = hash_hmac(
            'sha256',
            $base64UrlHeader . "." . $base64UrlPayload,
            JWTConfig::$secret_key,
            true
        );
        $base64UrlSignature = JWTConfig::base64UrlEncode($signature);
        
        if ($base64UrlSignature !== $signatureProvided) {
            return false;
        }
        
        $payloadData = json_decode($payload, true);
        
        if (!isset($payloadData['exp']) || $payloadData['exp'] < time()) {
            return false;
        }
        
        return $payloadData;
    }
    
    public static function generateRefreshToken() {
        return bin2hex(random_bytes(32));
    }
}
?>
