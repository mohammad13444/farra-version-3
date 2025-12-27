const API_BASE = 'http://localhost/farra/backend/api'; // آدرس سرور خودت رو بذار

// ذخیره‌سازی session
function saveSession(token, userId) {
    localStorage.setItem('session_token', token);
    localStorage.setItem('user_id', userId);
}

function getSessionToken() {
    return localStorage.getItem('session_token');
}

// ✅ ارسال OTP
async function sendOTP(phoneNumber) {
    try {
        const response = await fetch(`${API_BASE}/auth/send-otp.php`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({phone_number: phoneNumber})
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Send OTP Error:', error);
        return {success: false, message: 'Network error'};
    }
}

// ✅ تایید OTP
async function verifyOTP(phoneNumber, otpCode) {
    try {
        const response = await fetch(`${API_BASE}/auth/verify-otp.php`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                phone_number: phoneNumber,
                otp_code: otpCode
            })
        });
        
        const result = await response.json();
        
        if (result.success && result.data.session_token) {
            saveSession(result.data.session_token, result.data.user_id);
        }
        
        return result;
    } catch (error) {
        console.error('Verify OTP Error:', error);
        return {success: false, message: 'Network error'};
    }
}

// ✅ تکمیل پروفایل
async function completeProfile(profileData) {
    const token = getSessionToken();
    if (!token) {
        return {success: false, message: 'Not authenticated'};
    }
    
    try {
        const response = await fetch(`${API_BASE}/user/complete-profile.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Complete Profile Error:', error);
        return {success: false, message: 'Network error'};
    }
}
