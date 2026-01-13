// دالة للكشف عن نوع التوكن الموجود مع تفاصيل أكثر
const detectUserType = () => {
    const tokenTypes = ['user', 'admin', 'doctor'];
    
    for (const type of tokenTypes) {
    const accessToken = localStorage.getItem(`${type}Token`);
    const refreshToken = localStorage.getItem(`${type}TokenRefresh`);
    
    if (accessToken && refreshToken) {
        console.log(`[Token System] ✅ Detected ${type} tokens:`);
        console.log(`[Token System]   Access Token: ${accessToken.substring(0, 10)}...`);
        console.log(`[Token System]   Refresh Token: ${refreshToken.substring(0, 10)}...`);
        return type;
    } 
}
    
    console.log('[Token System] ❌ No valid token pairs found in localStorage');
    return null;
};

  // دالة تحديث التوكن مع تفاصيل أكثر
const refreshTokens = async () => {
    try {
        const userType = detectUserType();
        if (!userType) {
            console.error("لا يمكن تحديد نوع المستخدم");
            return false;
        }

        const refreshToken = localStorage.getItem(`${userType}TokenRefresh`);
        if (!refreshToken) {
            console.error("لا يوجد refresh token");
            return false;
        }

        console.log("إرسال طلب التحديث...");
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error("فشل التحديث:", data);
        //     if (response.status === 401 || response.status === 400) {
        //         logoutUser();
        // }
        return false;
    }
    
      // حفظ التوكن الجديد
        localStorage.setItem(`${userType}Token`, data.access);
      // إذا كان السيرفر يعيد refresh token جديد (حسب الإعدادات)
        if (data.refresh) {
            localStorage.setItem(`${userType}TokenRefresh`, data.refresh);
        }

        console.log("تم التحديث بنجاح");
        return true;
    } catch (error) {
        console.error("خطأ غير متوقع:", error);
        return false;
    }
};

  // بدء دورة التحديث التلقائي مع تفاصيل أكثر
const startAutoRefresh = () => {
    console.log('[Token System] ⏳ Initializing auto refresh system...');
    
    // التأكد من وجود توكنات قبل البدء
    const userType = detectUserType();
    if (!userType) {
        console.log('[Token System] 🛑 No valid tokens found - refresh cycle not started');
        return;
    }
    
    // تحديث فوري عند التحمي
    refreshTokens();

    const REFRESH_INTERVAL = 14 * 60 * 1000;
    console.log(`[Token System] ⏰ Setting up refresh interval every ${REFRESH_INTERVAL/60000} minutes`);
    
    const intervalId = setInterval(async () => {
    console.log('[Token System] 🔔 Scheduled refresh triggered');
    
    const userTypeExists = detectUserType();
    if (!userTypeExists) {
        console.log('[Token System] 🛑 No user type detected - stopping refresh cycle');
        clearInterval(intervalId);
        return;
    }

    await refreshTokens();

      // حساب الوقت المتبقي للتحديث القادم
    const nextRefresh = new Date(Date.now() + REFRESH_INTERVAL);
    console.log(`[Token System] ⏳ Next refresh scheduled at ${nextRefresh.toLocaleTimeString()}`);
    }, REFRESH_INTERVAL);
    // إضافة listener لتغيرات localStorage
    const storageListener = (event) => {
      if (event.key?.endsWith('Token') || event.key?.endsWith('TokenRefresh')) {
        console.log(`[Token System] 🛠️ Storage change detected for key: ${event.key}`);
        
        if (!detectUserType()) {
          console.log('[Token System] 🧹 Tokens cleared - stopping refresh cycle');
          clearInterval(intervalId);
          window.removeEventListener('storage', storageListener);
        }
      }
    };
  
    window.addEventListener('storage', storageListener);
  
    console.log('[Token System] ✅ Auto refresh system initialized successfully');
    return intervalId;
};

  // بدء العملية تلقائياً عند تحميل الصفحة
console.log('[Token System] 🏁 Loading token management system...');
window.addEventListener('DOMContentLoaded', () => {
    console.log('[Token System] 🖥️ DOM fully loaded - starting auto refresh');
    startAutoRefresh();
});
