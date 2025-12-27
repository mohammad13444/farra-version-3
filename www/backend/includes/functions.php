<?php
// تولید کد OTP 6 رقمی
function generateOTP() {
    return str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
}

// گرفتن IP کاربر
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

// اعتبارسنجی شماره تلفن عراقی
function validateIraqiPhone($phone) {
    // فرمت: 07XXXXXXXXX (11 رقم)
    $cleaned = preg_replace('/\D/', '', $phone);
    return preg_match('/^07[0-9]{9}$/', $cleaned) ? $cleaned : false;
}

// بررسی rate limit
function checkRateLimit($conn, $identifier, $action_type, $max_attempts = 5, $window_minutes = 60) {
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
            return ['allowed' => false, 'message' => 'Too many attempts. Try again later.'];
        }
        
        if ($result['attempt_count'] >= $max_attempts) {
            // بلاک برای 30 دقیقه
            $conn->prepare("UPDATE rate_limits SET blocked_until = DATE_ADD(NOW(), INTERVAL 30 MINUTE) WHERE identifier = ? AND action_type = ?")
                 ->execute([$identifier, $action_type]);
            return ['allowed' => false, 'message' => 'Too many attempts. Blocked for 30 minutes.'];
        }
        
        // افزایش تعداد تلاش
        $conn->prepare("UPDATE rate_limits SET attempt_count = attempt_count + 1, last_attempt = NOW() WHERE identifier = ? AND action_type = ?")
             ->execute([$identifier, $action_type]);
    } else {
        // اولین تلاش
        $conn->prepare("INSERT INTO rate_limits (identifier, action_type) VALUES (?, ?)")
             ->execute([$identifier, $action_type]);
    }
    
    return ['allowed' => true];
}

// پاسخ JSON استاندارد
function sendResponse($success, $message, $data = null, $http_code = 200) {
    http_response_code($http_code);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}
?>
