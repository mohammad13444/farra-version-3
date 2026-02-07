<?php
// تولید OTP امن
function generateOTP() {
    return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
}

// گرفتن IP واقعی کاربر
function getUserIP() {
    $ip_keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($ip_keys as $key) {
        if (!empty($_SERVER[$key])) {
            $ips = explode(',', $_SERVER[$key]);
            return trim($ips[0]);
        }
    }
    return '0.0.0.0';
}

// اعتبارسنجی شماره عراقی
function validateIraqiPhone($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    return preg_match('/^07[0-9]{9}$/', $cleaned) ? $cleaned : false;
}

// بررسی Rate Limit
function checkRateLimit($conn, $identifier, $action_type, $max_attempts = 5, $window_minutes = 10) {
    $stmt = $conn->prepare("
        SELECT attempt_count, blocked_until
        FROM rate_limits
        WHERE identifier = ? AND action_type = ?
        AND last_attempt > DATE_SUB(NOW(), INTERVAL ? MINUTE)
    ");
    $stmt->execute([$identifier, $action_type, $window_minutes]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        if ($result['blocked_until'] && strtotime($result['blocked_until']) > time()) {
            $remaining = ceil((strtotime($result['blocked_until']) - time()) / 60);
            return [
                'allowed' => false, 
                'message' => "بیش از حد مجاز تلاش کردید. $remaining دقیقه صبر کنید."
            ];
        }

        if ($result['attempt_count'] >= $max_attempts) {
            $conn->prepare("
                UPDATE rate_limits 
                SET blocked_until = DATE_ADD(NOW(), INTERVAL 30 MINUTE) 
                WHERE identifier = ? AND action_type = ?
            ")->execute([$identifier, $action_type]);
            
            return [
                'allowed' => false, 
                'message' => 'بیش از حد مجاز تلاش کردید. 30 دقیقه بلاک هستید.'
            ];
        }

        $conn->prepare("
            UPDATE rate_limits 
            SET attempt_count = attempt_count + 1, last_attempt = NOW() 
            WHERE identifier = ? AND action_type = ?
        ")->execute([$identifier, $action_type]);
    } else {
        $conn->prepare("
            INSERT INTO rate_limits (identifier, action_type) 
            VALUES (?, ?)
        ")->execute([$identifier, $action_type]);
    }

    return ['allowed' => true];
}

// ثبت لاگ فعالیت
function logActivity($conn, $user_id, $action, $details = '') {
    $stmt = $conn->prepare("
        INSERT INTO activity_logs (user_id, action, details, ip_address, user_agent) 
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $user_id,
        $action,
        $details,
        getUserIP(),
        $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
    ]);
}

// پاسخ JSON استاندارد
function sendResponse($success, $message, $data = null, $http_code = 200) {
    http_response_code($http_code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('c')
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// اعتبارسنجی توکن JWT
function validateJWT($conn) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        sendResponse(false, 'توکن معتبر ارسال نشده', null, 401);
    }
    
    $jwt = $matches[1];
    $payload = JWT::decode($jwt);
    
    if (!$payload) {
        sendResponse(false, 'توکن نامعتبر یا منقضی شده', null, 401);
    }
    
    // بررسی در دیتابیس
    $token_hash = hash('sha256', $jwt);
    $stmt = $conn->prepare("
        SELECT user_id FROM jwt_tokens 
        WHERE token_hash = ? AND is_revoked = 0 AND expires_at > NOW()
    ");
    $stmt->execute([$token_hash]);
    
    if (!$stmt->fetch()) {
        sendResponse(false, 'توکن معتبر نیست', null, 401);
    }
    
    return $payload;
}
?>
