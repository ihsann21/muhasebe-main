// Hareketler Module
export class HareketlerModule {
    constructor() {
        this.name = 'Hareketler';
        this.logs = [];
        this.filteredLogs = [];
        this.currentSort = 'newest';
        this.filters = {
            startDate: null,
            endDate: null,
            actionType: '',
            user: ''
        };
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Sistem Hareketleri - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2><i class="fa-solid fa-right-left"></i> Sistem Hareketleri</h2>
                    <div class="header-actions">
                        <button class="btn btn-success" onclick="window.hareketlerModule.refreshLogs()">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                    </div>
                </div>

                <!-- Filter Section -->
                <div class="filter-section">
                    <div class="filter-header">
                        <h3>Filtreleme ve Sıralama</h3>
                        <span class="status-badge status-success" id="logCount">Bu ay: 0 hareket</span>
                    </div>
                    
                    <div class="filter-controls">
                        <div class="filter-group">
                            <label for="startDate">Başlangıç Tarihi (Maksimum 7 gün)</label>
                            <input type="date" id="startDate" class="filter-input">
                            <p class="filter-hint">Sadece bir aya ait veriler gösterilir. Örnek: 01.01.2025 - 31.01.2025 arasını seçebilirsiniz.</p>
                        </div>
                        <div class="filter-group">
                            <label for="endDate">Bitiş Tarihi</label>
                            <input type="date" id="endDate" class="filter-input">
                            <p class="filter-hint">Lütfen başlangıç ve bitiş tarihlerini aynı ay içinde seçiniz.</p>
                        </div>
                        <div class="filter-group">
                            <label for="actionType">Hareket Türü</label>
                            <select id="actionType" class="filter-input">
                                <option value="">Tümü</option>
                                <option value="create">Oluşturma</option>
                                <option value="update">Güncelleme</option>
                                <option value="delete">Silme</option>
                                <option value="cancel">İptal</option>
                                <option value="login">Giriş</option>
                                <option value="logout">Çıkış</option>
                                <option value="export">Dışa Aktarım</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn-filter" id="sortNewest" onclick="window.hareketlerModule.setSortOrder('newest')">
                            <i class="fa-solid fa-arrow-down"></i>
                            Yeniden Eskiye
                        </button>
                        <button class="btn-filter" id="sortOldest" onclick="window.hareketlerModule.setSortOrder('oldest')">
                            <i class="fa-solid fa-arrow-up"></i>
                            Eskiden Yeniye
                        </button>
                        <button class="btn btn-outline" onclick="window.hareketlerModule.exportAllLogs()">
                            <i class="fa-solid fa-file-excel"></i>
                            Tümünü Excel'e Aktar
                        </button>
                        <button class="btn btn-outline" onclick="window.hareketlerModule.exportFilteredLogs()">
                            <i class="fa-solid fa-file-excel"></i>
                            Filtreleneni Excel'e Aktar
                        </button>
                    </div>
                </div>

                <!-- Loading Spinner -->
                <div class="loading-spinner" id="loadingSpinner">
                    <div class="spinner"></div>
                    <p>Hareketler yükleniyor...</p>
                </div>

                <!-- Timeline Container -->
                <div class="timeline-container" id="timelineContainer">
                    <div class="timeline" id="timeline">
                        <!-- Log items will be inserted here -->
                    </div>
                </div>

                <!-- Empty State -->
                <div class="empty-state" id="emptyState" style="display: none;">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <h3>Henüz hareket bulunamadı</h3>
                    <p>Seçilen tarih aralığında herhangi bir sistem hareketi bulunmuyor.</p>
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
        this.addStyles();
        this.setupEventListeners();
        this.loadLogsFromStorage();
        this.setDefaultDateRange();
        this.applyFilters();
        
        // Varsayılan sıralama: yeniden eskiye
        this.setSortOrder('newest');
        
        // Global referans
        window.hareketlerModule = this;
    }

    setupEventListeners() {
        // Filtre inputları - otomatik filtreleme
        document.getElementById('startDate').addEventListener('change', () => this.applyFilters());
        document.getElementById('endDate').addEventListener('change', () => this.applyFilters());
        document.getElementById('actionType').addEventListener('change', () => this.applyFilters());
    }

    setDefaultDateRange() {
        const today = new Date();
        // 7 günlük görünüm için farkı 6 gün tut (bugün dahil 7 gün)
        const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
        
        document.getElementById('endDate').value = today.toISOString().split('T')[0];
        document.getElementById('startDate').value = weekAgo.toISOString().split('T')[0];
        
        this.filters.startDate = weekAgo;
        this.filters.endDate = today;
    }

    loadLogsFromStorage() {
        // LocalStorage'dan logları yükle, yoksa sabit 7 günlük dummy log üret
        const storedLogs = localStorage.getItem('muhasebeLoglar');
        if (storedLogs) {
            this.logs = JSON.parse(storedLogs).map(log => ({
                ...log,
                timestamp: new Date(log.timestamp)
            }));

            if (!Array.isArray(this.logs) || this.logs.length !== 45) {
                this.generateInitialLogs();
                this.saveLogsToStorage();
            }
        } else {
            this.generateInitialLogs();
            this.saveLogsToStorage();
        }
    }

    generateInitialLogs() {
        // 14 kayıt Temmuz 2025, 31 kayıt Ağustos 2025
        const users = ['Ana Kullanıcı', 'Muhasebe Uzmanı', 'Proje Yöneticisi', 'Sistem Yöneticisi'];
        const companies = ['Volass İnşaat', 'XYZ Malzeme Ltd.', 'ABC İnşaat', 'DEF Yapı A.Ş.'];
        const projects = ['Bahçelievler Konut Projesi', 'Ataşehir Plaza', 'Kadıköy Residence', 'Merkez Ofis'];
        const templates = [
            { type: 'create', title: 'Yeni Tedarikçi Eklendi', desc: 'tedarikçi olarak sisteme eklendi' },
            { type: 'update', title: 'Şantiye Bilgileri Güncellendi', desc: 'şantiye bilgileri güncellendi' },
            { type: 'delete', title: 'Kayıt Silindi', desc: 'kayıt sistemden kaldırıldı' },
            { type: 'cancel', title: 'Proje/Sözleşme İptali', desc: 'sözleşme iptali' },
            { type: 'login', title: 'Sisteme Giriş', desc: 'Kullanıcı sisteme başarıyla giriş yaptı' },
            { type: 'export', title: 'Rapor Dışa Aktarıldı', desc: 'raporu Excel formatında dışa aktarıldı' },
            { type: 'update', title: 'Proje Bütçesi Güncellendi', desc: 'proje bütçe revizyonu yapıldı' }
        ];

        const julyDates = Array.from({ length: 14 }, (_, i) => new Date(2025, 6, i + 1)); // Temmuz (6)
        const augDates = Array.from({ length: 31 }, (_, i) => new Date(2025, 7, i + 1)); // Ağustos (7)
        const allDates = [...julyDates, ...augDates];

        this.logs = allDates.map((date, idx) => {
            const hour = 9 + Math.floor(Math.random() * 8);
            const minute = Math.floor(Math.random() * 60);
            date.setHours(hour, minute, 0, 0);
            const t = templates[idx % templates.length];
            const user = users[idx % users.length];
            const company = companies[idx % companies.length];
            const project = projects[idx % projects.length];
            const description = t.type === 'login' ? t.desc : `${company} ${t.desc}`;
            return {
                id: idx + 1,
                timestamp: new Date(date),
                user,
                action: t.type,
                title: t.title,
                description,
                company,
                project,
                status: t.type === 'delete' ? 'error' : t.type === 'cancel' ? 'warning' : 'success'
            };
        });

        this.logs.sort((a, b) => b.timestamp - a.timestamp);
    }

    saveLogsToStorage() {
        localStorage.setItem('muhasebeLoglar', JSON.stringify(this.logs));
    }

    updateFilters() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const actionType = document.getElementById('actionType').value;

        // Aylık filtreleme kontrolü: Başlangıç ve bitiş aynı ayda olmalı
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (start.getFullYear() !== end.getFullYear() || start.getMonth() !== end.getMonth()) {
                alert('Sadece tek bir aya ait veriler gösterilir. Lütfen başlangıç ve bitiş tarihlerini aynı ay içinde seçin.');
                // Bitiş tarihini başlangıç ayının son gününe çek
                const monthEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0);
                document.getElementById('endDate').value = monthEnd.toISOString().split('T')[0];
            }
        }

        this.filters = {
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate + 'T23:59:59') : null,
            actionType: actionType,
            user: ''
        };
    }

    applyFilters() {
        this.showLoading();
        
        // Gerçek uygulamada API çağrısı simülasyonu
        setTimeout(() => {
            this.updateFilters();
            
            this.filteredLogs = this.logs.filter(log => {
                // Tarih filtresi
                if (this.filters.startDate && log.timestamp < this.filters.startDate) {
                    return false;
                }
                if (this.filters.endDate && log.timestamp > this.filters.endDate) {
                    return false;
                }
                
                // Hareket türü filtresi
                if (this.filters.actionType && log.action !== this.filters.actionType) {
                    return false;
                }
                
                return true;
            });

            // Sıralama uygula
            this.applySorting();
            this.renderTimeline();
            this.updateLogCount();
            this.hideLoading();
        }, 500);
    }

    applySorting() {
        if (this.currentSort === 'newest') {
            this.filteredLogs.sort((a, b) => b.timestamp - a.timestamp);
        } else {
            this.filteredLogs.sort((a, b) => a.timestamp - b.timestamp);
        }
    }

    setSortOrder(order) {
        this.currentSort = order;
        
        // Buton durumlarını güncelle
        document.getElementById('sortNewest').classList.toggle('active', order === 'newest');
        document.getElementById('sortOldest').classList.toggle('active', order === 'oldest');
        
        this.applySorting();
        this.renderTimeline();
    }

    renderTimeline() {
        const timeline = document.getElementById('timeline');
        const emptyState = document.getElementById('emptyState');
        
        if (this.filteredLogs.length === 0) {
            timeline.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        timeline.style.display = 'block';
        emptyState.style.display = 'none';
        
        timeline.innerHTML = this.filteredLogs.map(log => this.createTimelineItem(log)).join('');
    }

    createTimelineItem(log) {
        const date = log.timestamp.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        const time = log.timestamp.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Rozette hareket türü yazsın (ör. Oluşturma, Güncelleme, Silme, Giriş, Çıkış, Dışa Aktarım)
        const actionLabelMap = {
            create: 'Oluşturma',
            update: 'Güncelleme',
            delete: 'Silme',
            cancel: 'İptal',
            login: 'Giriş',
            logout: 'Çıkış',
            export: 'Dışa Aktarım'
        };
        let actionLabel = actionLabelMap[log.action] || 'Hareket';
        const actionBadgeClass = `badge-${log.action}`;

        return `
            <div class="timeline-item">
                <div class="timeline-header">
                    <div class="timeline-content">
                        <div class="timeline-action">
                            <div class="action-icon ${log.action}">
                                <i class="fa-solid ${this.getActionIcon(log.action)}"></i>
                            </div>
                            ${log.title}
                            <span class="status-badge ${actionBadgeClass}">${actionLabel}</span>
                        </div>
                        <div class="timeline-description">${log.description}</div>
                        <div class="timeline-details">
                            <div class="detail-item">
                                <div class="detail-label">Firma</div>
                                <div class="detail-value">${log.company}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Proje</div>
                                <div class="detail-value">${log.project}</div>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-time">
                        <div class="timeline-date">${date}</div>
                        <div class="timeline-clock">${time}</div>
                    </div>
                </div>
            </div>
        `;
    }

    getActionIcon(action) {
        const icons = {
            create: 'fa-plus',
            update: 'fa-pen',
            delete: 'fa-trash',
            cancel: 'fa-ban',
            login: 'fa-sign-in-alt',
            logout: 'fa-sign-out-alt',
            export: 'fa-download'
        };
        return icons[action] || 'fa-circle';
    }

    updateLogCount() {
        // Seçili bitiş tarihi ayındaki toplam hareket sayısı
        const end = this.filters.endDate || new Date();
        const monthStart = new Date(end.getFullYear(), end.getMonth(), 1);
        const monthEnd = new Date(end.getFullYear(), end.getMonth() + 1, 0, 23, 59, 59, 999);
        const monthlyLogs = this.logs.filter(log => log.timestamp >= monthStart && log.timestamp <= monthEnd);
        document.getElementById('logCount').textContent = `Bu ay: ${monthlyLogs.length} hareket`;
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('timelineContainer').style.display = 'none';
        document.getElementById('emptyState').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('timelineContainer').style.display = 'block';
    }

    refreshLogs() {
        // Backend olmadığı için sadece mevcut logları yeniden yükle
        this.loadLogsFromStorage();
        this.applyFilters();
    }

    exportFilteredLogs() {
        // Filtrelenmiş kayıtları Excel (xlsx) olarak indir
        const actionLabelMap = { 
            create: 'Oluşturma', 
            update: 'Güncelleme', 
            delete: 'Silme', 
            cancel: 'İptal', 
            login: 'Giriş', 
            logout: 'Çıkış', 
            export: 'Dışa Aktarım' 
        };
        
        const rows = this.filteredLogs.map(log => ({
            Tarih: log.timestamp.toLocaleDateString('tr-TR'),
            Saat: log.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            'Hareket Türü': actionLabelMap[log.action] || 'Hareket',
            Hareket: log.title,
            Açıklama: log.description,
            Firma: log.company,
            Proje: log.project
        }));
        
        if (rows.length === 0) {
            alert('Seçili filtrelere uygun indirilecek kayıt bulunamadı.');
            return;
        }
        
        this.downloadAsCSV(rows, `filtreli_sistem_hareketleri_${new Date().toISOString().split('T')[0]}.csv`);
    }

    exportAllLogs() {
        const actionLabelMap = { 
            create: 'Oluşturma', 
            update: 'Güncelleme', 
            delete: 'Silme', 
            cancel: 'İptal', 
            login: 'Giriş', 
            logout: 'Çıkış', 
            export: 'Dışa Aktarım' 
        };
        
        const rows = this.logs
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(log => ({
                Tarih: log.timestamp.toLocaleDateString('tr-TR'),
                Saat: log.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                'Hareket Türü': actionLabelMap[log.action] || 'Hareket',
                Hareket: log.title,
                Açıklama: log.description,
                Firma: log.company,
                Proje: log.project
            }));
            
        if (rows.length === 0) {
            alert('İndirilecek kayıt bulunamadı.');
            return;
        }
        
        this.downloadAsCSV(rows, `tum_sistem_hareketleri_${new Date().toISOString().split('T')[0]}.csv`);
    }

    downloadAsCSV(data, filename) {
        if (data.length === 0) return;
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');
        
        const csvWithBOM = '\ufeff' + csvContent; // UTF-8 BOM for Turkish characters
        const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    addStyles() {
        const existingStyles = document.getElementById('hareketler-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'hareketler-styles';
        style.textContent = `
            /* Hareketler sayfası özel stilleri */
            .filter-section {
                background-color: var(--white);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
            }

            .filter-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }

            .filter-header h3 {
                font-size: 16px;
                font-weight: 600;
                color: var(--text);
                margin: 0;
            }

            .filter-controls {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                margin-bottom: 16px;
            }

            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .filter-group label {
                font-size: 13px;
                font-weight: 500;
                color: var(--text);
            }

            .filter-input {
                padding: 8px 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                font-size: 14px;
                color: var(--text);
                background-color: var(--white);
                transition: all 0.2s ease;
            }

            .filter-input:focus {
                outline: none;
                border-color: var(--green);
                box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
            }

            .filter-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
            }

            .btn-filter {
                padding: 8px 16px;
                border: 1px solid var(--border);
                border-radius: 8px;
                background-color: var(--white);
                color: var(--text);
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .btn-filter:hover {
                background-color: var(--gray-50);
                border-color: var(--green);
            }

            .btn-filter.active {
                background-color: var(--green);
                color: var(--white);
                border-color: var(--green);
            }

            .timeline-container {
                position: relative;
            }

            .timeline {
                position: relative;
                padding-left: 40px;
            }

            .timeline::before {
                content: '';
                position: absolute;
                left: 20px;
                top: 0;
                bottom: 0;
                width: 2px;
                background: linear-gradient(to bottom, var(--green), var(--border));
            }

            .timeline-item {
                position: relative;
                margin-bottom: 24px;
                background-color: var(--white);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 20px;
                transition: all 0.16s ease;
            }

            .timeline-item:hover {
                box-shadow: var(--shadow-lg);
                transform: translateY(-2px);
            }

            .timeline-item::before {
                content: '';
                position: absolute;
                left: -31px;
                top: 24px;
                width: 12px;
                height: 12px;
                background-color: var(--green);
                border: 3px solid var(--white);
                border-radius: 50%;
                box-shadow: 0 0 0 2px var(--green);
            }

            .timeline-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
            }

            .timeline-time {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 4px;
            }

            .timeline-date {
                font-size: 12px;
                color: var(--muted);
                font-weight: 500;
            }

            .timeline-clock {
                font-size: 14px;
                color: var(--text);
                font-weight: 600;
            }

            .timeline-content {
                flex: 1;
            }

            .timeline-action {
                font-size: 16px;
                font-weight: 600;
                color: var(--text);
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .timeline-description {
                font-size: 14px;
                color: var(--muted);
                line-height: 1.5;
                margin-bottom: 12px;
            }

            .timeline-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 12px;
                background-color: var(--gray-50);
                padding: 12px;
                border-radius: 8px;
            }

            .detail-item {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .detail-label {
                font-size: 11px;
                color: var(--muted);
                text-transform: uppercase;
                font-weight: 600;
                letter-spacing: 0.5px;
            }

            .detail-value {
                font-size: 13px;
                color: var(--text);
                font-weight: 500;
            }

            .action-icon {
                width: 32px;
                height: 32px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                color: var(--white);
            }

            .action-icon.create { background-color: #10b981; }
            .action-icon.update { background-color: #f59e0b; }
            .action-icon.delete { background-color: #ef4444; }
            .action-icon.cancel { background-color: #f59e0b; }
            .action-icon.login { background-color: var(--green); }
            .action-icon.logout { background-color: #6b7280; }
            .action-icon.export { background-color: #8b5cf6; }

            .status-badge {
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .status-success { background-color: #dcfce7; color: #166534; }
            .status-warning { background-color: #fef3c7; color: #92400e; }
            .status-error { background-color: #fee2e2; color: #991b1b; }

            /* Hareket türü rozet renkleri */
            .badge-create { background-color: #dcfce7; color: #166534; }
            .badge-update { background-color: #dbeafe; color: #1d4ed8; }
            .badge-delete { background-color: #fee2e2; color: #991b1b; }
            .badge-cancel { background-color: #fef3c7; color: #92400e; }
            .badge-login  { background-color: #e6f4ea; color: #166534; }
            .badge-logout { background-color: #e5e7eb; color: #374151; }
            .badge-export { background-color: #ede9fe; color: #6d28d9; }

            .filter-hint {
                font-size: 12px;
                color: var(--muted);
                margin: 4px 0 0 0;
            }

            .empty-state {
                text-align: center;
                padding: 60px 20px;
                color: var(--muted);
            }

            .empty-state i {
                font-size: 48px;
                margin-bottom: 16px;
                opacity: 0.5;
            }

            .loading-spinner {
                display: none;
                text-align: center;
                padding: 40px;
            }

            .spinner {
                width: 32px;
                height: 32px;
                border: 3px solid var(--border);
                border-top: 3px solid var(--green);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Responsive */
            @media (max-width: 768px) {
                .filter-controls {
                    grid-template-columns: 1fr;
                }
                
                .filter-actions {
                    justify-content: stretch;
                }
                
                .btn-filter {
                    flex: 1;
                    justify-content: center;
                }
                
                .timeline {
                    padding-left: 20px;
                }
                
                .timeline::before {
                    left: 10px;
                }
                
                .timeline-item::before {
                    left: -16px;
                }
                
                .timeline-header {
                    flex-direction: column;
                    gap: 12px;
                    align-items: flex-start;
                }
                
                .timeline-details {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
}