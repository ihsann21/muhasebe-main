export class LoginManager {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.loginAttempts = 0;
        this.maxLoginAttempts = 3;
        this.lockoutTime = 300000; // 5 minutes in milliseconds
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedSession = localStorage.getItem('muhasebeSession');
        if (savedSession) {
            try {
                const session = JSON.parse(savedSession);
                if (this.isValidSession(session)) {
                    this.isLoggedIn = true;
                    this.currentUser = session.user;
                    return;
                }
            } catch (e) {
                localStorage.removeItem('muhasebeSession');
            }
        }
        
        // Show login screen if not logged in
        this.showLoginScreen();
    }

    isValidSession(session) {
        const now = new Date().getTime();
        return session && session.expires > now;
    }

    showLoginScreen() {
        document.body.innerHTML = `
            <div class="login-container">
                <div class="login-background">
                    <div class="login-overlay"></div>
                </div>
                
                <div class="login-content">
                    <div class="login-box">
                        <!-- Logo and Title -->
                        <div class="login-header">
                            <div class="company-logo">
                                <i class="fa-solid fa-building"></i>
                            </div>
                            <h1>İnşaat Muhasebe PRO</h1>
                            <p class="login-subtitle">NOA YAZILIM</p>
                        </div>

                        <!-- Login Form -->
                        <form class="login-form" id="loginForm">
                            <div class="form-group">
                                <label for="username">Kullanıcı Adı</label>
                                <div class="input-group">
                                    <i class="fa-solid fa-user"></i>
                                    <input type="text" id="username" name="username" required placeholder="Kullanıcı adınızı girin">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password">Şifre</label>
                                <div class="input-group">
                                    <i class="fa-solid fa-lock"></i>
                                    <input type="password" id="password" name="password" required placeholder="Şifrenizi girin">
                                    <button type="button" class="toggle-password" id="togglePassword">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-options">
                                <label class="checkbox-container">
                                    <input type="checkbox" id="rememberMe">
                                    <span class="checkmark"></span>
                                    Beni hatırla
                                </label>
                                <a href="#" class="forgot-password">Şifremi unuttum</a>
                            </div>

                            <button type="submit" class="login-button" id="loginButton">
                                <span class="button-text">Giriş Yap</span>
                                <div class="loading-spinner" style="display: none;">
                                    <i class="fa-solid fa-spinner fa-spin"></i>
                                </div>
                            </button>

                            <div class="error-message" id="errorMessage" style="display: none;"></div>
                        </form>

                        <!-- Additional Info -->
                        <div class="login-footer">
                            <div class="demo-credentials">
                                <h4>Demo Giriş Bilgileri:</h4>
                                <p><strong>Kullanıcı:</strong> admin</p>
                                <p><strong>Şifre:</strong> 123456</p>
                            </div>
                            <div class="support-info">
                                <p>Destek için: <a href="tel:+905001234567">+90 500 123 45 67</a></p>
                                <p>E-posta: <a href="mailto:destek@checkiom.com">destek@checkiom.com</a></p>
                            </div>
                        </div>
                    </div>

                    <!-- Features Section -->
                    <div class="features-section">
                        <h3>Özellikler</h3>
                        <div class="features-grid">
                            <div class="feature-item">
                                <i class="fa-solid fa-chart-line"></i>
                                <h4>Gelişmiş Raporlama</h4>
                                <p>Detaylı mali raporlar ve analizler</p>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-shield-alt"></i>
                                <h4>Güvenli Veri</h4>
                                <p>256-bit SSL şifreleme ile korumalı</p>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-mobile-alt"></i>
                                <h4>Mobil Uyumlu</h4>
                                <p>Her cihazdan erişim imkanı</p>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-cloud"></i>
                                <h4>Bulut Depolama</h4>
                                <p>Otomatik yedekleme ve senkronizasyon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.addLoginStyles();
        this.initLoginFunctionality();
    }

    initLoginFunctionality() {
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const loginButton = document.getElementById('loginButton');
        const errorMessage = document.getElementById('errorMessage');

        // Toggle password visibility
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = togglePassword.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });

        // Handle form submission
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            if (!username || !password) {
                this.showError('Kullanıcı adı ve şifre gereklidir.');
                return;
            }

            // Check if account is locked
            if (this.isAccountLocked()) {
                this.showError('Çok fazla başarısız giriş denemesi. Lütfen 5 dakika sonra tekrar deneyin.');
                return;
            }

            this.showLoading(true);
            
            // Simulate login delay
            setTimeout(() => {
                this.attemptLogin(username, password, rememberMe);
            }, 1500);
        });

        // Demo credentials click handlers
        const demoCredentials = document.querySelector('.demo-credentials');
        demoCredentials.addEventListener('click', (e) => {
            if (e.target.tagName === 'P' || e.target.tagName === 'STRONG') {
                document.getElementById('username').value = 'admin';
                document.getElementById('password').value = '123456';
            }
        });
    }

    attemptLogin(username, password, rememberMe) {
        // Demo credentials check
        const validCredentials = [
            { username: 'admin', password: '123456', role: 'admin', name: 'Sistem Yöneticisi' },
            { username: 'muhasebe', password: '123456', role: 'user', name: 'Muhasebe Uzmanı' },
            { username: 'demo', password: 'demo123', role: 'demo', name: 'Demo Kullanıcı' }
        ];

        const user = validCredentials.find(u => u.username === username && u.password === password);

        if (user) {
            this.loginSuccess(user, rememberMe);
        } else {
            this.loginFailed();
        }
    }

    loginSuccess(user, rememberMe) {
        this.showLoading(false);
        this.isLoggedIn = true;
        this.currentUser = user;
        this.loginAttempts = 0;

        // Save session
        const sessionData = {
            user: user,
            loginTime: new Date().getTime(),
            expires: new Date().getTime() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000) // 7 days or 1 day
        };

        localStorage.setItem('muhasebeSession', JSON.stringify(sessionData));

        // Show success message
        this.showSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');

        // Redirect to main app after delay
        setTimeout(() => {
            this.loadMainApplication();
        }, 2000);
    }

    loginFailed() {
        this.showLoading(false);
        this.loginAttempts++;
        
        if (this.loginAttempts >= this.maxLoginAttempts) {
            localStorage.setItem('accountLocked', new Date().getTime().toString());
            this.showError('Çok fazla başarısız giriş denemesi. Hesap 5 dakika kilitlendi.');
        } else {
            const remainingAttempts = this.maxLoginAttempts - this.loginAttempts;
            this.showError(`Geçersiz kullanıcı adı veya şifre. Kalan deneme hakkı: ${remainingAttempts}`);
        }
    }

    isAccountLocked() {
        const lockTime = localStorage.getItem('accountLocked');
        if (!lockTime) return false;
        
        const now = new Date().getTime();
        const lockExpiry = parseInt(lockTime) + this.lockoutTime;
        
        if (now < lockExpiry) {
            return true;
        } else {
            localStorage.removeItem('accountLocked');
            return false;
        }
    }

    showLoading(show) {
        const loginButton = document.getElementById('loginButton');
        const buttonText = loginButton.querySelector('.button-text');
        const spinner = loginButton.querySelector('.loading-spinner');
        
        if (show) {
            loginButton.disabled = true;
            buttonText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            loginButton.disabled = false;
            buttonText.style.display = 'block';
            spinner.style.display = 'none';
        }
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.className = 'error-message show error';
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }

    showSuccess(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.className = 'error-message show success';
    }

    loadMainApplication() {
        // Redirect to main application
        window.location.href = '/index.html';
    }

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('muhasebeSession');
        this.showLoginScreen();
    }

    addLoginStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                height: 100vh;
                overflow: hidden;
            }

            .login-container {
                display: flex;
                height: 100vh;
                position: relative;
            }

            .login-background {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                z-index: 1;
            }

            .login-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
            }

            .login-content {
                display: flex;
                width: 100%;
                height: 100vh;
                z-index: 2;
                position: relative;
            }

            .login-box {
                flex: 1;
                max-width: 500px;
                background: white;
                padding: 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
            }

            .login-header {
                text-align: center;
                margin-bottom: 40px;
            }

            .company-logo {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #2e7d32, #4caf50);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                color: white;
                font-size: 32px;
            }

            .login-header h1 {
                font-size: 28px;
                color: #333;
                margin-bottom: 8px;
                font-weight: 700;
            }

            .login-subtitle {
                color: #666;
                font-size: 16px;
                font-weight: 500;
            }

            .login-form {
                width: 100%;
            }

            .form-group {
                margin-bottom: 24px;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                color: #333;
                font-weight: 600;
                font-size: 14px;
            }

            .input-group {
                position: relative;
                display: flex;
                align-items: center;
            }

            .input-group i {
                position: absolute;
                left: 16px;
                color: #666;
                z-index: 1;
            }

            .input-group input {
                width: 100%;
                padding: 16px 50px 16px 50px;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                font-size: 16px;
                transition: all 0.3s ease;
                background: #f8f9fa;
            }
            
            .input-group input[type="text"] {
                padding-right: 16px;
            }

            .input-group input:focus {
                outline: none;
                border-color: #2e7d32;
                background: white;
                box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
            }

            .toggle-password {
                position: absolute;
                right: 16px;
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                padding: 4px;
                z-index: 2;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .toggle-password:hover {
                color: #2e7d32;
            }

            .form-options {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 32px;
            }

            .checkbox-container {
                display: flex;
                align-items: center;
                cursor: pointer;
                font-size: 14px;
                color: #666;
            }

            .checkbox-container input {
                margin-right: 8px;
            }

            .forgot-password {
                color: #2e7d32;
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
            }

            .forgot-password:hover {
                text-decoration: underline;
            }

            .login-button {
                width: 100%;
                padding: 16px;
                background: linear-gradient(135deg, #2e7d32, #4caf50);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }

            .login-button:hover:not(:disabled) {
                background: linear-gradient(135deg, #1b5e20, #2e7d32);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(46, 125, 50, 0.3);
            }

            .login-button:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none;
            }

            .error-message {
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                margin-top: 16px;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            }

            .error-message.show {
                opacity: 1;
                transform: translateY(0);
            }

            .error-message.error {
                background: #ffebee;
                color: #c62828;
                border: 1px solid #ffcdd2;
            }

            .error-message.success {
                background: #e8f5e8;
                color: #2e7d32;
                border: 1px solid #c8e6c9;
            }

            .login-footer {
                margin-top: 40px;
                padding-top: 24px;
                border-top: 1px solid #eee;
            }

            .demo-credentials {
                background: #f8f9fa;
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 20px;
                cursor: pointer;
                transition: background 0.2s;
            }

            .demo-credentials:hover {
                background: #e9ecef;
            }

            .demo-credentials h4 {
                color: #333;
                margin-bottom: 8px;
                font-size: 14px;
            }

            .demo-credentials p {
                color: #666;
                font-size: 13px;
                margin: 4px 0;
            }

            .support-info {
                text-align: center;
            }

            .support-info p {
                color: #666;
                font-size: 12px;
                margin: 4px 0;
            }

            .support-info a {
                color: #2e7d32;
                text-decoration: none;
            }

            .features-section {
                flex: 1;
                padding: 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: white;
            }

            .features-section h3 {
                font-size: 32px;
                margin-bottom: 40px;
                text-align: center;
                font-weight: 700;
            }

            .features-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 30px;
            }

            .feature-item {
                text-align: center;
                padding: 24px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .feature-item i {
                font-size: 40px;
                margin-bottom: 16px;
                color: #4caf50;
            }

            .feature-item h4 {
                font-size: 18px;
                margin-bottom: 12px;
                font-weight: 600;
            }

            .feature-item p {
                font-size: 14px;
                opacity: 0.9;
                line-height: 1.5;
            }

            @media (max-width: 768px) {
                .login-content {
                    flex-direction: column;
                }

                .login-box {
                    max-width: 100%;
                    padding: 20px;
                }

                .features-section {
                    padding: 20px;
                }

                .features-grid {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }

                .feature-item {
                    padding: 16px;
                }
            }

            @media (max-width: 480px) {
                .login-box {
                    padding: 16px;
                }

                .login-header h1 {
                    font-size: 24px;
                }

                .company-logo {
                    width: 60px;
                    height: 60px;
                    font-size: 24px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
