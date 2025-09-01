export class FirmaBilgileriModule {
    constructor() {
        this.companyData = {
            name: 'Volas İnşaat',
            taxNumber: '1234567890',
            mersisNumber: '01234567890123456',
            foundingDate: '15.01.2010',
            taxOffice: 'Kadıköy Vergi Dairesi',
            phone: '+90 216 123 45 67',
            fax: '+90 216 123 45 68',
            email: 'info@volasinsaat.com',
            website: 'https://www.volasinsaat.com',
            address: 'Atatürk Cad. No: 123/A\nKadıköy / İstanbul'
        };
        this.addStyles();
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Firma Bilgileri - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        moduleContainer.innerHTML = `
            <div class="firma-bilgileri-container">
                <!-- Header -->
                <div class="firma-header">
                    <div class="header-left">
                        <div class="company-logo">
                            <i class="fa-solid fa-building"></i>
                        </div>
                        <div class="header-info">
                            <h2 class="page-title">Firma Bilgileri Yönetimi</h2>
                            <p class="page-subtitle">Bu sayfada şirketinizin temel bilgilerini güncelleyebilir ve iletişim detaylarını düzenleyebilirsiniz.</p>
                        </div>
                    </div>
                </div>

                <!-- Info Alert -->
                <div class="alert alert-info">
                    <i class="fa-solid fa-info-circle"></i>
                    <div class="alert-content">
                        <strong>Firma Bilgileri Yönetimi</strong>
                        <p>Bu sayfada şirketinizin temel bilgilerini güncelleyebilir ve iletişim detaylarını düzenleyebilirsiniz. Değişiklikler otomatik olarak kaydedilir.</p>
                    </div>
                </div>

                <!-- Company Basic Info -->
                <div class="info-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-building"></i> Temel Firma Bilgileri</h3>
                    </div>
                    <div class="section-content">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Firma Adı *</label>
                                <input type="text" class="form-control" id="companyName" value="${this.companyData.name}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Vergi Numarası *</label>
                                <input type="text" class="form-control" id="taxNumber" value="${this.companyData.taxNumber}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ticaret Sicil No</label>
                                <input type="text" class="form-control" id="tradeNumber" value="123456">
                            </div>
                            <div class="form-group">
                                <label class="form-label">MERSİS No</label>
                                <input type="text" class="form-control" id="mersisNumber" value="${this.companyData.mersisNumber}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Vergi Dairesi</label>
                                <input type="text" class="form-control" id="taxOffice" value="${this.companyData.taxOffice}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Kuruluş Tarihi</label>
                                <input type="date" class="form-control" id="foundingDate" value="2010-01-15">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="info-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-address-book"></i> İletişim Bilgileri</h3>
                    </div>
                    <div class="section-content">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Telefon</label>
                                <input type="tel" class="form-control" id="phone" value="${this.companyData.phone}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Faks</label>
                                <input type="tel" class="form-control" id="fax" value="${this.companyData.fax}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">E-posta</label>
                                <input type="email" class="form-control" id="email" value="${this.companyData.email}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Web Sitesi</label>
                                <input type="url" class="form-control" id="website" value="${this.companyData.website}">
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label class="form-label">Adres</label>
                            <textarea class="form-control" id="address" rows="3">${this.companyData.address}</textarea>
                        </div>
                    </div>
                </div>

                <!-- Additional Settings -->
                <div class="info-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-cog"></i> Ek Ayarlar</h3>
                    </div>
                    <div class="section-content">
                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">Logo Görüntüleme</label>
                                <p class="setting-description">Raporlarda ve belgelerde firma logosu görüntülensin</p>
                            </div>
                            <div class="setting-control">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="showLogo" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">Otomatik Fatura Numaralandırma</label>
                                <p class="setting-description">Fatura numaraları otomatik olarak artan şekilde verilsin</p>
                            </div>
                            <div class="setting-control">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="autoInvoiceNumber" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">E-Fatura Entegrasyonu</label>
                                <p class="setting-description">E-Fatura sistemi ile entegrasyon aktif olsun</p>
                            </div>
                            <div class="setting-control">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="eInvoiceIntegration">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Logo Upload Section -->
                <div class="info-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-image"></i> Firma Logosu</h3>
                    </div>
                    <div class="section-content">
                        <div class="logo-upload-area">
                            <div class="current-logo">
                                <div class="logo-placeholder">
                                    <i class="fa-solid fa-building"></i>
                                    <p>Mevcut Logo</p>
                                </div>
                            </div>
                            <div class="upload-controls">
                                <input type="file" id="logoFile" accept="image/*" style="display: none;">
                                <button class="btn btn-primary btn-sm" onclick="document.getElementById('logoFile').click()">
                                    <i class="fa-solid fa-upload"></i> Yeni Logo Yükle
                                </button>
                                <button class="btn btn-secondary btn-sm">
                                    <i class="fa-solid fa-trash"></i> Logoyu Kaldır
                                </button>
                                <p class="upload-info">
                                    Desteklenen formatlar: JPG, PNG, GIF<br>
                                    Maksimum boyut: 2MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons-container">
                    <button class="btn btn-secondary">
                        <i class="fa-solid fa-times"></i> İptal
                    </button>
                    <button class="btn btn-success" id="saveCompanyInfo">
                        <i class="fa-solid fa-save"></i> Kaydet
                    </button>
                </div>
            </div>
        `;

        this.initFunctionality();
    }

    hideWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    initFunctionality() {
        // Save company info
        const saveBtn = document.getElementById('saveCompanyInfo');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveCompanyInfo();
            });
        }

        // Logo file upload
        const logoFile = document.getElementById('logoFile');
        if (logoFile) {
            logoFile.addEventListener('change', (e) => {
                this.handleLogoUpload(e.target.files[0]);
            });
        }

        // Form validation
        this.addFormValidation();
    }

    saveCompanyInfo() {
        // Collect form data
        const formData = {
            name: document.getElementById('companyName').value,
            taxNumber: document.getElementById('taxNumber').value,
            mersisNumber: document.getElementById('mersisNumber').value,
            taxOffice: document.getElementById('taxOffice').value,
            phone: document.getElementById('phone').value,
            fax: document.getElementById('fax').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            address: document.getElementById('address').value
        };

        // Validate required fields
        if (!formData.name || !formData.taxNumber) {
            this.showNotification('Lütfen zorunlu alanları doldurun!', 'error');
            return;
        }

        // Update company data
        this.companyData = { ...this.companyData, ...formData };

        // Show success message
        this.showNotification('Firma bilgileri başarıyla güncellendi!', 'success');
    }

    handleLogoUpload(file) {
        if (!file) return;

        // Validate file
        if (file.size > 2 * 1024 * 1024) {
            this.showNotification('Dosya boyutu 2MB\'dan büyük olamaz!', 'error');
            return;
        }

        if (!file.type.startsWith('image/')) {
            this.showNotification('Lütfen geçerli bir resim dosyası seçin!', 'error');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const logoPlaceholder = document.querySelector('.logo-placeholder');
            logoPlaceholder.innerHTML = `
                <img src="${e.target.result}" alt="Firma Logosu" style="max-width: 100%; max-height: 100px; object-fit: contain;">
                <p>Yeni Logo</p>
            `;
        };
        reader.readAsDataURL(file);

        this.showNotification('Logo başarıyla yüklendi!', 'success');
    }

    addFormValidation() {
        // Tax number validation
        const taxNumberInput = document.getElementById('taxNumber');
        if (taxNumberInput) {
            taxNumberInput.addEventListener('input', (e) => {
                const value = e.target.value.replace(/\D/g, ''); // Only numbers
                e.target.value = value.substring(0, 10); // Max 10 digits
            });
        }

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.startsWith('90')) {
                        value = '+90 ' + value.substring(2);
                    } else if (!value.startsWith('+90')) {
                        value = '+90 ' + value;
                    }
                }
                e.target.value = value;
            });
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fa-solid fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    addStyles() {
        if (document.getElementById('firma-bilgileri-styles')) return;

        const style = document.createElement('style');
        style.id = 'firma-bilgileri-styles';
        style.textContent = `
            .firma-bilgileri-container {
                padding: 20px;
                background: #f5f5f5;
                min-height: calc(100vh - 140px);
            }

            .firma-header {
                display: flex;
                align-items: center;
                margin-bottom: 24px;
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .header-left {
                display: flex;
                align-items: center;
                gap: 20px;
            }

            .company-logo {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #2e7d32, #4caf50);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 32px;
            }

            .header-info {
                flex: 1;
            }

            .page-title {
                margin: 0 0 8px 0;
                color: #333;
                font-size: 28px;
                font-weight: 700;
            }

            .page-subtitle {
                margin: 0;
                color: #666;
                font-size: 16px;
                line-height: 1.5;
            }

            .alert {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 16px 20px;
                border-radius: 8px;
                margin-bottom: 24px;
            }

            .alert-info {
                background: #e3f2fd;
                border: 1px solid #2196f3;
                color: #1565c0;
            }

            .alert-content strong {
                display: block;
                margin-bottom: 4px;
            }

            .alert-content p {
                margin: 0;
                font-size: 14px;
                line-height: 1.4;
            }

            .info-section {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin-bottom: 24px;
                overflow: hidden;
            }

            .section-header {
                padding: 20px 24px;
                border-bottom: 1px solid #eee;
                background: #f8f9fa;
            }

            .section-header h3 {
                margin: 0;
                color: #333;
                font-size: 18px;
                font-weight: 600;
            }

            .section-header i {
                margin-right: 8px;
                color: #666;
            }

            .section-content {
                padding: 24px;
            }

            .form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
            }

            .form-group.full-width {
                grid-column: 1 / -1;
            }

            .form-label {
                font-weight: 600;
                color: #333;
                margin-bottom: 6px;
                font-size: 14px;
            }

            .form-control {
                padding: 10px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                transition: border-color 0.2s, box-shadow 0.2s;
            }

            .form-control:focus {
                outline: none;
                border-color: #2e7d32;
                box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
            }

            textarea.form-control {
                resize: vertical;
                min-height: 80px;
            }

            .setting-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 0;
                border-bottom: 1px solid #f0f0f0;
            }

            .setting-row:last-child {
                border-bottom: none;
            }

            .setting-info {
                flex: 1;
                margin-right: 20px;
            }

            .setting-label {
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
                display: block;
            }

            .setting-description {
                color: #666;
                font-size: 14px;
                margin: 0;
                line-height: 1.4;
            }

            .setting-control {
                min-width: 60px;
            }

            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }

            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: 0.3s;
                border-radius: 24px;
            }

            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
            }

            input:checked + .toggle-slider {
                background-color: #2e7d32;
            }

            input:checked + .toggle-slider:before {
                transform: translateX(26px);
            }

            .logo-upload-area {
                display: flex;
                gap: 24px;
                align-items: flex-start;
            }

            .current-logo {
                flex-shrink: 0;
            }

            .logo-placeholder {
                width: 120px;
                height: 120px;
                border: 2px dashed #ddd;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: #f9f9f9;
                color: #666;
                text-align: center;
            }

            .logo-placeholder i {
                font-size: 32px;
                margin-bottom: 8px;
            }

            .logo-placeholder p {
                margin: 0;
                font-size: 12px;
                font-weight: 500;
            }

            .upload-controls {
                flex: 1;
            }

            .upload-info {
                margin-top: 12px;
                font-size: 12px;
                color: #666;
                line-height: 1.4;
            }

            .action-buttons-container {
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                padding: 20px 0;
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                text-decoration: none;
            }

            .btn-sm {
                padding: 6px 12px;
                font-size: 13px;
            }

            .btn-primary {
                background: #2196f3;
                color: white;
            }

            .btn-primary:hover {
                background: #1976d2;
            }

            .btn-success {
                background: #2e7d32 !important;
                color: white;
            }

            .btn-success:hover {
                background: #1b5e20 !important;
            }

            .btn-secondary {
                background: #6c757d;
                color: white;
            }

            .btn-secondary:hover {
                background: #5a6268;
            }

            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 16px;
                border-radius: 6px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .notification.show {
                transform: translateX(0);
            }

            .notification-success {
                background: #4caf50;
            }

            .notification-info {
                background: #2196f3;
            }

            .notification-error {
                background: #f44336;
            }

            @media (max-width: 768px) {
                .firma-bilgileri-container {
                    padding: 16px;
                }

                .firma-header {
                    flex-direction: column;
                    text-align: center;
                }

                .header-left {
                    flex-direction: column;
                    text-align: center;
                }

                .form-grid {
                    grid-template-columns: 1fr;
                    gap: 16px;
                }

                .setting-row {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 12px;
                }

                .setting-control {
                    min-width: auto;
                    align-self: flex-end;
                }

                .logo-upload-area {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .action-buttons-container {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
