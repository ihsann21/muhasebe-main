export class ProgramAyarlariModule {
    constructor() {
        this.settings = {
            autoBackup: true,
            backupFrequency: 'Haftalık',
            retentionPeriod: 30,
            backupLocation: 'Yerel Disk',
            emailNotifications: true,
            systemUpdates: false
        };
        this.addStyles();
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Program Ayarları - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        moduleContainer.innerHTML = `
            <div class="program-ayarlari-container">
                <!-- Header -->
                <div class="ayarlar-header">
                    <div class="header-left">
                        <h2 class="page-title">Program Ayarları</h2>
                        <div class="breadcrumb">
                            <span><i class="fa-solid fa-home"></i> Ana Sayfa</span>
                            <span><i class="fa-solid fa-chevron-right"></i> Firma Bilgileri</span>
                            <span><i class="fa-solid fa-chevron-right"></i> Program Ayarları</span>
                        </div>
                    </div>
                    <div class="header-right">
                        <button class="btn btn-secondary btn-sm" onclick="location.reload()">
                            <i class="fa-solid fa-redo"></i> Varsayılana Dön
                        </button>
                    </div>
                </div>

                <!-- Warning Alert -->
                <div class="alert alert-warning">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                    <div class="alert-content">
                        <strong>Dikkat</strong>
                        <p>Program ayarlarında yapacağınız değişiklikler tüm kullanıcıları etkileyecektir. Değişiklikleri yapmadan önce lütfen dikkatli olun.</p>
                    </div>
                </div>

                <!-- Backup Settings -->
                <div class="settings-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-database"></i> Yedekleme Ayarları</h3>
                    </div>
                    <div class="section-content">
                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">Otomatik Yedekleme</label>
                                <p class="setting-description">Verileri otomatik olarak yedeklensin</p>
                            </div>
                            <div class="setting-control">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="autoBackup" ${this.settings.autoBackup ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">Yedekleme Sıklığı</label>
                                <p class="setting-description">Otomatik yedekleme ne sıklıkla yapılsın</p>
                            </div>
                            <div class="setting-control">
                                <select class="form-control" id="backupFrequency">
                                    <option value="Haftalık" ${this.settings.backupFrequency === 'Haftalık' ? 'selected' : ''}>Haftalık</option>
                                    <option value="Günlük" ${this.settings.backupFrequency === 'Günlük' ? 'selected' : ''}>Günlük</option>
                                    <option value="Aylık" ${this.settings.backupFrequency === 'Aylık' ? 'selected' : ''}>Aylık</option>
                                </select>
                            </div>
                        </div>

                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">Yedek Saklama Süresi</label>
                                <p class="setting-description">Yedekler ne kadar süre saklanacak (gün)</p>
                            </div>
                            <div class="setting-control">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="retentionPeriod" 
                                           value="${this.settings.retentionPeriod}" min="1" max="365">
                                    <span class="input-group-text">gün</span>
                                </div>
                            </div>
                        </div>

                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">Yedekleme Konumu</label>
                                <p class="setting-description">Yedek dosyalarının saklanacağı konum</p>
                            </div>
                            <div class="setting-control">
                                <select class="form-control" id="backupLocation">
                                    <option value="Yerel Disk" ${this.settings.backupLocation === 'Yerel Disk' ? 'selected' : ''}>Yerel Disk</option>
                                    <option value="Bulut Depolama" ${this.settings.backupLocation === 'Bulut Depolama' ? 'selected' : ''}>Bulut Depolama</option>
                                    <option value="Ağ Sürücüsü" ${this.settings.backupLocation === 'Ağ Sürücüsü' ? 'selected' : ''}>Ağ Sürücüsü</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notification Settings -->
                <div class="settings-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-bell"></i> Bildirim Ayarları</h3>
                    </div>
                    <div class="section-content">
                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">E-posta Bildirimleri</label>
                                <p class="setting-description">Önemli olaylar için e-posta bildirimi gönderilsin</p>
                            </div>
                            <div class="setting-control">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="emailNotifications" ${this.settings.emailNotifications ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="setting-row">
                            <div class="setting-info">
                                <label class="setting-label">Sistem Güncellemeleri</label>
                                <p class="setting-description">Otomatik sistem güncellemesi yapılsın</p>
                            </div>
                            <div class="setting-control">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="systemUpdates" ${this.settings.systemUpdates ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Backup Status -->
                <div class="settings-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-info-circle"></i> Yedekleme Durumu</h3>
                    </div>
                    <div class="section-content">
                        <div class="backup-status-grid">
                            <div class="status-item">
                                <div class="status-icon success">
                                    <i class="fa-solid fa-check"></i>
                                </div>
                                <div class="status-info">
                                    <h4>Son Yedekleme</h4>
                                    <p>27.12.2024 - 03:00</p>
                                </div>
                            </div>
                            <div class="status-item">
                                <div class="status-icon success">
                                    <i class="fa-solid fa-clock"></i>
                                </div>
                                <div class="status-info">
                                    <h4>Sonraki Yedekleme</h4>
                                    <p>03.01.2025 - 03:00</p>
                                </div>
                            </div>
                            <div class="status-item">
                                <div class="status-icon warning">
                                    <i class="fa-solid fa-database"></i>
                                </div>
                                <div class="status-info">
                                    <h4>Yedek Boyutu</h4>
                                    <p>2.3 GB</p>
                                </div>
                            </div>
                            <div class="status-item">
                                <div class="status-icon success">
                                    <i class="fa-solid fa-folder"></i>
                                </div>
                                <div class="status-info">
                                    <h4>Toplam Yedek</h4>
                                    <p>12 dosya</p>
                                </div>
                            </div>
                        </div>

                        <div class="backup-actions">
                            <button class="btn btn-primary btn-sm">
                                <i class="fa-solid fa-play"></i> Manuel Yedekleme Başlat
                            </button>
                            <button class="btn btn-secondary btn-sm">
                                <i class="fa-solid fa-history"></i> Yedekleme Geçmişi
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons-container">
                    <button class="btn btn-secondary" onclick="history.back()">
                        <i class="fa-solid fa-times"></i> İptal
                    </button>
                    <button class="btn btn-success" id="saveSettings">
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
        // Save settings
        const saveBtn = document.getElementById('saveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveSettings();
            });
        }

        // Auto backup toggle
        const autoBackupToggle = document.getElementById('autoBackup');
        if (autoBackupToggle) {
            autoBackupToggle.addEventListener('change', (e) => {
                const dependentElements = document.querySelectorAll('#backupFrequency, #retentionPeriod, #backupLocation');
                dependentElements.forEach(el => {
                    el.disabled = !e.target.checked;
                });
            });
        }

        // Manual backup
        document.querySelector('.btn-primary').addEventListener('click', () => {
            this.startManualBackup();
        });

        // Backup history
        document.querySelector('.btn-secondary').addEventListener('click', () => {
            this.showBackupHistory();
        });
    }

    saveSettings() {
        // Collect settings
        this.settings.autoBackup = document.getElementById('autoBackup').checked;
        this.settings.backupFrequency = document.getElementById('backupFrequency').value;
        this.settings.retentionPeriod = parseInt(document.getElementById('retentionPeriod').value);
        this.settings.backupLocation = document.getElementById('backupLocation').value;
        this.settings.emailNotifications = document.getElementById('emailNotifications').checked;
        this.settings.systemUpdates = document.getElementById('systemUpdates').checked;

        // Show success message
        this.showNotification('Ayarlar başarıyla kaydedildi!', 'success');
    }

    startManualBackup() {
        this.showNotification('Manuel yedekleme başlatılıyor...', 'info');
        
        // Simulate backup process
        setTimeout(() => {
            this.showNotification('Yedekleme tamamlandı!', 'success');
        }, 3000);
    }

    showBackupHistory() {
        alert('Yedekleme geçmişi özelliği yakında eklenecek.');
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
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    addStyles() {
        if (document.getElementById('program-ayarlari-styles')) return;

        const style = document.createElement('style');
        style.id = 'program-ayarlari-styles';
        style.textContent = `
            .program-ayarlari-container {
                padding: 20px;
                background: #f5f5f5;
                min-height: calc(100vh - 140px);
            }

            .ayarlar-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 24px;
                background: white;
                padding: 20px 24px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .page-title {
                margin: 0 0 8px 0;
                color: #333;
                font-size: 24px;
                font-weight: 600;
            }

            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #666;
                font-size: 14px;
            }

            .breadcrumb i {
                font-size: 12px;
            }

            .alert {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 16px 20px;
                border-radius: 8px;
                margin-bottom: 24px;
            }

            .alert-warning {
                background: #fff8e1;
                border: 1px solid #ffcc02;
                color: #e65100;
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

            .settings-section {
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
                min-width: 200px;
            }

            .form-control {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
            }

            .input-group {
                display: flex;
                align-items: center;
            }

            .input-group .form-control {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            .input-group-text {
                padding: 8px 12px;
                background: #f8f9fa;
                border: 1px solid #ddd;
                border-left: none;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                font-size: 14px;
                color: #666;
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

            .backup-status-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }

            .status-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px;
                background: white;
                border-radius: 8px;
                border: 1px solid #eee;
            }

            .status-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
            }

            .status-icon.success { background: #4caf50; }
            .status-icon.info { background: #f8f9fa; }
            .status-icon.warning { background: #ff9800; }
            .status-icon.primary { background: #9c27b0; }

            .status-info h4 {
                margin: 0 0 4px 0;
                font-size: 14px;
                font-weight: 600;
                color: #333;
            }

            .status-info p {
                margin: 0;
                font-size: 13px;
                color: #666;
            }

            .backup-actions {
                display: flex;
                gap: 12px;
                padding-top: 16px;
                border-top: 1px solid #eee;
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
                .program-ayarlari-container {
                    padding: 16px;
                }

                .ayarlar-header {
                    flex-direction: column;
                    gap: 16px;
                    align-items: stretch;
                }

                .setting-row {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 12px;
                }

                .setting-control {
                    min-width: auto;
                }

                .backup-status-grid {
                    grid-template-columns: 1fr;
                    gap: 12px;
                }

                .backup-actions {
                    flex-direction: column;
                }

                .action-buttons-container {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
