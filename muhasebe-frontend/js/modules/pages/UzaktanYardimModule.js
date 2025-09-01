// Uzaktan Yardim Module
export class UzaktanYardimModule {
    constructor() {
        this.name = 'UzaktanYardim';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Uzaktan Yardım - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="uzaktan-yardim-container">
                    <!-- Header -->
                    <div class="uzaktan-yardim-header">
                        <div class="header-left">
                            <h2>Uzaktan Yardım</h2>
                            <p>Tek tıkla destek alın, sorunlarınızı hızlıca çözün</p>
                        </div>
                        <div class="header-right">
                           
                            <div class="working-hours">
                                <i class="fa-solid fa-clock"></i>
                                <span>Çalışma Saatleri: 09:00–18:00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Ticket System -->
                    <div class="ticket-system-header">
                        <div class="ticket-stats">
                            <div class="stat-item">
                                <i class="fa-solid fa-ticket"></i>
                                <span class="stat-number">12</span>
                                <span class="stat-label">AÇIK TALEP</span>
                            </div>
                            <div class="stat-item">
                                <i class="fa-solid fa-clock"></i>
                                <span class="stat-number">3</span>
                                <span class="stat-label">ORTALAMA YANIT</span>
                            </div>
                            <div class="stat-item">
                                <i class="fa-solid fa-check-circle"></i>
                                <span class="stat-number">98%</span>
                                <span class="stat-label">ÇÖZÜM ORANI</span>
                            </div>
                        </div>
                    </div>

                    <!-- Tab Content -->
                    <div class="ticket-content">
                        <div class="ticket-form-container">
                            <div class="form-header">
                                <h3><i class="fa-solid fa-ticket"></i> Destek Talebi Oluştur</h3>
                                <p>Teknik destek ekibimiz size en kısa sürede yardımcı olacaktır</p>
                            </div>
                            
                            <form class="ticket-form" id="ticketForm">
                                <div class="form-section">
                                    <h4><i class="fa-solid fa-info-circle"></i> Talep Bilgileri</h4>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Konu *</label>
                                            <input type="text" class="form-input" id="ticketSubject" placeholder="Sorununuzu kısaca açıklayın" required>
                                        </div>
                                        <div class="form-group">
                                            <label>Öncelik *</label>
                                            <select class="form-input" id="ticketPriority" required>
                                                <option value="">Öncelik seçin</option>
                                                <option value="low">Düşük</option>
                                                <option value="medium" selected>Orta</option>
                                                <option value="high">Yüksek</option>
                                                <option value="urgent">Acil</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Açıklama *</label>
                                        <textarea class="form-textarea" id="ticketDescription" placeholder="Sorununuzu detaylı olarak açıklayın. Hangi adımları takip ettiğiniz, hangi hata mesajlarını aldığınız gibi bilgileri ekleyin." rows="6" required></textarea>
                                        <div class="char-counter">
                                            <span id="charCount">0</span>/2000 karakter
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Kategori *</label>
                                            <select class="form-input" id="ticketCategory" required>
                                                <option value="">Kategori seçin</option>
                                                <option value="efatura">E-Fatura</option>
                                                <option value="reports">Rapor & Analiz</option>
                                                <option value="installation">Kurulum & Güncelleme</option>
                                                <option value="performance">Performans & Hız</option>
                                                <option value="login">Giriş & Yetki</option>
                                                <option value="other">Diğer</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>İlgili Şantiye/Şirket</label>
                                            <select class="form-input" id="ticketCompany">
                                                <option value="">Tümü</option>
                                                <option value="demo">DEMO İNŞAAT</option>
                                                <option value="lonicera">LONICERA OTEL</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-section">
                                    <h4><i class="fa-solid fa-user"></i> İletişim Bilgileri</h4>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Ad Soyad *</label>
                                            <input type="text" class="form-input" id="ticketName" placeholder="Adınız ve soyadınız" required>
                                        </div>
                                        <div class="form-group">
                                            <label>E-posta *</label>
                                            <input type="email" class="form-input" id="ticketEmail" placeholder="ornek@email.com" required>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Telefon</label>
                                        <input type="tel" class="form-input" id="ticketPhone" placeholder="0555 123 45 67">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Tercih Edilen İletişim Yöntemi</label>
                                        <div class="contact-preferences">
                                            <label class="radio-label">
                                                <input type="radio" name="contactMethod" value="email" checked>
                                                <span>E-posta</span>
                                            </label>
                                            <label class="radio-label">
                                                <input type="radio" name="contactMethod" value="phone">
                                                <span>Telefon</span>
                                            </label>
                                            <label class="radio-label">
                                                <input type="radio" name="contactMethod" value="both">
                                                <span>Her ikisi</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-section">
                                    <h4><i class="fa-solid fa-paperclip"></i> Ekler & Ek Bilgiler</h4>
                                    <div class="form-group">
                                        <label>Ekran Görüntüsü / Dosya Ekle</label>
                                        <div class="file-upload-area" id="fileUploadArea">
                                            <div class="upload-icon">
                                                <i class="fa-solid fa-cloud-upload-alt"></i>
                                            </div>
                                            <div class="upload-text">
                                                <p>Dosyaları buraya sürükleyin veya <span class="upload-link">tıklayarak seçin</span></p>
                                                <p class="upload-info">Desteklenen formatlar: JPG, PNG, PDF, DOC, XLS (Max: 10MB)</p>
                                            </div>
                                            <input type="file" id="ticketFiles" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" style="display: none;">
                                        </div>
                                        <div class="file-list" id="fileList"></div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Ek Notlar</label>
                                        <textarea class="form-textarea" id="ticketNotes" placeholder="Ek bilgiler, özel istekler veya notlarınızı buraya yazabilirsiniz." rows="3"></textarea>
                                    </div>
                                </div>
                                
                                <div class="form-section">
                                    <h4><i class="fa-solid fa-shield-alt"></i> Onay & Gönderim</h4>
                                    <div class="form-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="ticketKVKK" required>
                                            <span class="checkmark"></span>
                                            <span>KVKK şartlarını ve <a href="#" class="privacy-link">gizlilik politikasını</a> kabul ediyorum</span>
                                        </label>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="ticketNotification" checked>
                                            <span class="checkmark"></span>
                                            <span>Talep durumu hakkında e-posta ile bilgilendirilmek istiyorum</span>
                                        </label>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-outline" id="saveDraft">
                                            <i class="fa-solid fa-save"></i>
                                            Taslak Kaydet
                                        </button>
                                        <button type="submit" class="btn btn-success" id="submitTicket">
                                            <i class="fa-solid fa-paper-plane"></i>
                                            Talebi Gönder
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div class="ticket-sidebar">
                            <div class="help-card">
                                <div class="help-header">
                                    <i class="fa-solid fa-lightbulb"></i>
                                    <h4>Hızlı Yardım</h4>
                                </div>
                                <div class="help-tips">
                                    <div class="tip-item">
                                        <i class="fa-solid fa-check-circle"></i>
                                        <span>Ekran görüntüsü ekleyerek daha hızlı yardım alın</span>
                                    </div>
                                    <div class="tip-item">
                                        <i class="fa-solid fa-check-circle"></i>
                                        <span>Hata mesajlarını tam olarak kopyalayın</span>
                                    </div>
                                    <div class="tip-item">
                                        <i class="fa-solid fa-check-circle"></i>
                                        <span>Hangi adımları takip ettiğinizi belirtin</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="status-card">
                                <div class="status-header">
                                    <i class="fa-solid fa-clock"></i>
                                    <h4>Yanıt Süreleri</h4>
                                </div>
                                <div class="response-times">
                                    <div class="time-item">
                                        <span class="priority urgent">ACİL</span>
                                        <span class="time">2-4 saat</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="priority high">YÜKSEK</span>
                                        <span class="time">4-8 saat</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="priority medium">ORTA</span>
                                        <span class="time">8-24 saat</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="priority low">DÜŞÜK</span>
                                        <span class="time">24-48 saat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            this.initFunctionality();
        }
    }

    hideWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    initFunctionality() {
        this.initTicketFormFunctionality();
        this.initFileUploadFunctionality();
        this.initCharacterCounter();
        this.addStyles();
    }

    initTicketFormFunctionality() {
        const form = document.getElementById('ticketForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Support ticket submitted');
                this.showStatusMessage('Destek talebiniz başarıyla gönderildi!', 'success');
            });
        }
        
        // Save draft button
        const saveDraftBtn = document.getElementById('saveDraft');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => {
                console.log('Draft saved');
                this.showStatusMessage('Taslak kaydedildi!', 'info');
            });
        }
    }

    initFileUploadFunctionality() {
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('ticketFiles');
        const fileList = document.getElementById('fileList');

        if (fileUploadArea && fileInput) {
            // Click to upload
            fileUploadArea.addEventListener('click', () => {
                fileInput.click();
            });

            // Drag and drop
            fileUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadArea.classList.add('dragover');
            });

            fileUploadArea.addEventListener('dragleave', () => {
                fileUploadArea.classList.remove('dragover');
            });

            fileUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                this.handleFiles(files, fileList);
            });

            // File input change
            fileInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files, fileList);
            });
        }
    }

    handleFiles(files, fileList) {
        Array.from(files).forEach(file => {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                this.showStatusMessage('Dosya boyutu 10MB\'dan büyük olamaz!', 'error');
                return;
            }

            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fa-solid fa-file"></i>
                    <div>
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${this.formatFileSize(file.size)}</div>
                    </div>
                </div>
                <button type="button" class="remove-file" onclick="this.parentElement.remove()">
                    <i class="fa-solid fa-times"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    initCharacterCounter() {
        const textarea = document.getElementById('ticketDescription');
        const charCount = document.getElementById('charCount');
        
        if (textarea && charCount) {
            textarea.addEventListener('input', () => {
                const count = textarea.value.length;
                charCount.textContent = count;
                
                if (count > 2000) {
                    charCount.style.color = '#f44336';
                } else if (count > 1800) {
                    charCount.style.color = '#ff9800';
                } else {
                    charCount.style.color = '#6b7280';
                }
            });
        }
    }

    showStatusMessage(message, type) {
        console.log(`${type.toUpperCase()}: ${message}`);
    }

    addStyles() {
        const existingStyles = document.getElementById('uzaktan-yardim-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'uzaktan-yardim-styles';
        style.textContent = `
            :root {
                --green: #2e7d32;
                --text: #1f2937;
                --muted: #6b7280;
                --border: #e5e7eb;
                --gray-50: #f9fafb;
                --white: #ffffff;
                --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            }

            .uzaktan-yardim-container {
                padding: 20px;
                background: var(--gray-50);
                min-height: calc(100vh - 200px);
            }
            
            .uzaktan-yardim-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--white);
                padding: 20px;
                border-radius: 12px;
                box-shadow: var(--shadow);
                margin-bottom: 20px;
            }
            
            .header-left h2 {
                margin: 0 0 8px 0;
                color: var(--text);
                font-size: 24px;
            }
            
            .header-left p {
                margin: 0;
                color: var(--muted);
                font-size: 14px;
            }
            
            .header-right {
                display: flex;
                gap: 20px;
                align-items: center;
            }
            
            .status-indicator {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
            }
            
            .status-indicator.online {
                background: #e8f5e8;
                color: #2e7d32;
            }
            
            .status-indicator.online i {
                color: #4caf50;
            }
            
            .working-hours {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--muted);
                font-size: 14px;
            }

            /* Ticket System Header */
            .ticket-system-header {
                background: var(--white);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
                box-shadow: var(--shadow);
            }
            
            .ticket-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            
            .stat-item {
                text-align: center;
                padding: 16px;
                background: var(--gray-50);
                border-radius: 8px;
                border: 1px solid var(--border);
            }
            
            .stat-item i {
                font-size: 24px;
                color: var(--green);
                margin-bottom: 8px;
                display: block;
            }
            
            .stat-number {
                display: block;
                font-size: 24px;
                font-weight: 700;
                color: var(--text);
                margin-bottom: 4px;
            }
            
            .stat-label {
                font-size: 12px;
                color: var(--muted);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            /* Ticket Content Layout */
            .ticket-content {
                display: grid;
                grid-template-columns: 1fr 300px;
                gap: 20px;
            }
            
            .ticket-form-container {
                background: var(--white);
                border-radius: 12px;
                padding: 24px;
                box-shadow: var(--shadow);
            }
            
            .form-header {
                text-align: center;
                margin-bottom: 32px;
                padding-bottom: 24px;
                border-bottom: 1px solid var(--border);
            }
            
            .form-header h3 {
                margin: 0 0 12px 0;
                color: var(--text);
                font-size: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
            }
            
            .form-header h3 i {
                color: var(--green);
            }
            
            .form-header p {
                margin: 0;
                color: var(--muted);
                font-size: 16px;
            }

            /* Form Sections */
            .form-section {
                margin-bottom: 32px;
                padding: 24px;
                background: var(--gray-50);
                border-radius: 8px;
                border: 1px solid var(--border);
            }
            
            .form-section h4 {
                margin: 0 0 20px 0;
                color: var(--text);
                font-size: 18px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .form-section h4 i {
                color: var(--green);
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
                margin-bottom: 16px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: var(--text);
                font-size: 14px;
            }
            
            .form-input,
            .form-textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                font-size: 14px;
                background: var(--white);
                transition: all 0.2s ease;
                box-sizing: border-box;
            }
            
            .form-input:focus,
            .form-textarea:focus {
                outline: none;
                border-color: var(--green);
                box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
            }
            
            .form-textarea {
                resize: vertical;
                min-height: 120px;
                font-family: inherit;
            }
            
            .char-counter {
                text-align: right;
                font-size: 12px;
                color: var(--muted);
                margin-top: 4px;
            }

            /* Contact Preferences */
            .contact-preferences {
                display: flex;
                gap: 20px;
                margin-top: 8px;
            }
            
            .radio-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-size: 14px;
            }
            
            .radio-label input[type="radio"] {
                margin: 0;
            }

            /* File Upload */
            .file-upload-area {
                border: 2px dashed var(--border);
                border-radius: 8px;
                padding: 32px;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
                background: var(--white);
            }
            
            .file-upload-area:hover,
            .file-upload-area.dragover {
                border-color: var(--green);
                background: var(--gray-50);
            }
            
            .upload-icon {
                font-size: 48px;
                color: var(--muted);
                margin-bottom: 16px;
            }
            
            .upload-text p {
                margin: 0 0 8px 0;
                color: var(--text);
            }
            
            .upload-link {
                color: var(--green);
                text-decoration: underline;
                cursor: pointer;
            }
            
            .upload-info {
                font-size: 12px;
                color: var(--muted);
            }
            
            .file-list {
                margin-top: 16px;
            }
            
            .file-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                background: var(--white);
                border: 1px solid var(--border);
                border-radius: 8px;
                margin-bottom: 8px;
            }
            
            .file-info {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
            }
            
            .file-info i {
                color: var(--muted);
                font-size: 16px;
            }
            
            .file-name {
                font-weight: 500;
                color: var(--text);
                font-size: 14px;
            }
            
            .file-size {
                color: var(--muted);
                font-size: 12px;
            }
            
            .remove-file {
                background: none;
                border: none;
                color: var(--muted);
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            
            .remove-file:hover {
                background: #ffebee;
                color: #f44336;
            }

            /* Checkbox Styling */
            .checkbox-label {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                cursor: pointer;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .checkbox-label input[type="checkbox"] {
                margin: 0;
                margin-top: 2px;
            }
            
            .privacy-link {
                color: var(--green);
                text-decoration: none;
            }
            
            .privacy-link:hover {
                text-decoration: underline;
            }

            /* Form Actions */
            .form-actions {
                display: flex;
                gap: 16px;
                justify-content: flex-end;
                margin-top: 24px;
                padding-top: 24px;
                border-top: 1px solid var(--border);
            }
            
            .btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 24px;
                border: 1px solid var(--border);
                border-radius: 8px;
                background: var(--white);
                color: var(--text);
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s ease;
                text-decoration: none;
            }
            
            .btn-primary {
                background: var(--green);
                color: white;
                border-color: var(--green);
            }
            
            .btn-primary:hover {
                background: #1b5e20;
            }
            
            .btn-outline:hover {
                background: var(--gray-50);
            }

            /* Ticket Sidebar */
            .ticket-sidebar {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .help-card,
            .status-card {
                background: var(--white);
                border-radius: 12px;
                padding: 20px;
                box-shadow: var(--shadow);
                border: 1px solid var(--border);
            }
            
            .help-header,
            .status-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
            }
            
            .help-header i,
            .status-header i {
                color: var(--green);
                font-size: 20px;
            }
            
            .help-header h4,
            .status-header h4 {
                margin: 0;
                color: var(--text);
                font-size: 16px;
            }
            
            .help-tips {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .tip-item {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                font-size: 13px;
                color: var(--text);
                line-height: 1.4;
            }
            
            .tip-item i {
                color: var(--green);
                margin-top: 2px;
                flex-shrink: 0;
            }
            
            .response-times {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .time-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: var(--gray-50);
                border-radius: 6px;
                font-size: 13px;
            }
            
            .priority {
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
                text-transform: uppercase;
            }
            
            .priority.urgent {
                background: #ffebee;
                color: #c62828;
            }
            
            .priority.high {
                background: #fff3e0;
                color: #ef6c00;
            }
            
            .priority.medium {
                background: #e8f5e8;
                color: #2e7d32;
            }
            
            .priority.low {
                background: #f3e5f5;
                color: #6a1b9a;
            }
            
            .time {
                font-weight: 500;
                color: var(--text);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .ticket-content {
                    grid-template-columns: 1fr;
                }
                
                .ticket-stats {
                    grid-template-columns: 1fr;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .contact-preferences {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .form-actions {
                    flex-direction: column;
                }
                
                .uzaktan-yardim-header {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center;
                }
                
                .header-right {
                    flex-direction: column;
                    gap: 8px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
