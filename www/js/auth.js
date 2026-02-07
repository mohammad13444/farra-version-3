const API_CONFIG = {
    BASE_URL: 'https://microcementazma.com',
    ENDPOINTS: {
        SEND_OTP: '/api/auth/send-otp.php',
        VERIFY_OTP: '/api/auth/verify-otp.php',
        RESEND_OTP: '/api/auth/resend-otp.php',
        COMPLETE_PROFILE: '/api/user/complete-profile.php',
        GET_PROFILE: '/api/user/get-profile.php',
        REFRESH_TOKEN: '/api/auth/refresh-token.php',
        LOGOUT: '/api/auth/logout.php'
    }
};

// مدیریت توکن
const TokenManager = {
    set: (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    },
    
    get: () => ({
        access: localStorage.getItem('access_token'),
        refresh: localStorage.getItem('refresh_token')
    }),
    
    clear: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },
    
    getAuthHeader: () => {
        const token = localStorage.getItem('access_token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
};

// درخواست API با مدیریت خطا
async function apiRequest(endpoint, method = 'POST', data = null, requiresAuth = false) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json',
        ...(requiresAuth ? TokenManager.getAuthHeader() : {})
    };
    
    const options = {
        method,
        headers
    };
    
    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        // اگر توکن منقضی شده، تلاش برای refresh
        if (!result.success && response.status === 401 && requiresAuth) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                // تلاش مجدد با توکن جدید
                headers['Authorization'] = `Bearer ${TokenManager.get().access}`;
                const retryResponse = await fetch(url, options);
                return await retryResponse.json();
            }
        }
        
        return result;
    } catch (error) {
        console.error('API Request Error:', error);
        return {
            success: false,
            message: 'خطا در برقراری ارتباط با سرور'
        };
    }
}

// Refresh کردن توکن
async function refreshAccessToken() {
    const tokens = TokenManager.get();
    if (!tokens.refresh) return false;
    
    try {
        const result = await apiRequest(API_CONFIG.ENDPOINTS.REFRESH_TOKEN, 'POST', {
            refresh_token: tokens.refresh
        });
        
        if (result.success) {
            TokenManager.set(result.data.access_token, result.data.refresh_token);
            return true;
        }
        
        TokenManager.clear();
        window.location.href = 'signup.html';
        return false;
    } catch (error) {
        console.error('Token Refresh Error:', error);
        return false;
    }
}
