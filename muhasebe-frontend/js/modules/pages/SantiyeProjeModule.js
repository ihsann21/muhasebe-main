// Şantiye & Proje Module
export class SantiyeProjeModule {
    constructor() {
        this.name = 'SantiyeProje';
        this.selectedSantiye = null;
        this.santiyeData = [];
        this.currentView = 'dashboard'; // dashboard, list, detail
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Şantiye & Proje Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="santiye-container dashboard-view">
                    <!-- Header -->
                    <div class="santiye-header">
                        <div class="header-left">
                            <h2>Şantiye & Proje Yönetimi</h2>
                            <p>Aktif projelerinizi yönetin, maliyetleri takip edin</p>
                        </div>
                        <div class="header-actions">
                            <button class="btn btn-success" id="newSantiyeBtn">
                                <i class="fa-solid fa-plus"></i>
                                Yeni Şantiye
                            </button>
                            <button class="btn btn-success" id="santiyeReportBtn">
                                <i class="fa-solid fa-chart-line"></i>
                                Rapor Al
                            </button>
                            <button class="btn btn-success" id="exportBtn">
                                <i class="fa-solid fa-file-excel"></i>
                                Excel Aktar
                            </button>
                        </div>
                    </div>

                    <!-- Global Stats -->
                    <div class="global-stats">
                        <div class="stat-card total-projects">
                            <div class="stat-icon">
                                <i class="fa-solid fa-building"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="totalProjects">0</span>
                                <span class="stat-label">Toplam Proje</span>
                            </div>
                        </div>
                        <div class="stat-card active-projects">
                            <div class="stat-icon">
                                <i class="fa-solid fa-hammer"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="activeProjects">0</span>
                                <span class="stat-label">Aktif Proje</span>
                            </div>
                        </div>
                        <div class="stat-card total-budget">
                            <div class="stat-icon">
                                <i class="fa-solid fa-money-bill-wave"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="totalBudget">₺0</span>
                                <span class="stat-label">Toplam Bütçe</span>
                            </div>
                        </div>
                        <div class="stat-card total-spent">
                            <div class="stat-icon">
                                <i class="fa-solid fa-chart-pie"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="totalSpent">₺0</span>
                                <span class="stat-label">Toplam Harcama</span>
                            </div>
                        </div>
                    </div>

                    <!-- View Switcher -->
                    <div class="view-switcher">
                        <button class="view-btn active" data-view="dashboard">
                            <i class="fa-solid fa-th-large"></i>
                            Dashboard
                        </button>
                        <button class="view-btn" data-view="list">
                            <i class="fa-solid fa-list"></i>
                            Liste Görünümü
                        </button>
                        <button class="view-btn" data-view="calendar">
                            <i class="fa-solid fa-calendar"></i>
                            Takvim
                        </button>
                    </div>

                    <!-- Content Area -->
                    <div class="content-area">
                        <!-- Dashboard View -->
                        <div class="view-content active" id="dashboard-view">
                            <div class="santiye-grid" id="santiyeGrid">
                                <!-- Şantiye kartları buraya gelecek -->
                            </div>
                        </div>

                        <!-- List View -->
                        <div class="view-content" id="list-view">
                            <div class="list-filters">
                                <div class="filter-row">
                                    <div class="filter-group">
                                        <label>Durum</label>
                                        <select class="filter-select" id="statusFilter">
                                            <option value="">Tümü</option>
                                            <option value="planlama">Planlama</option>
                                            <option value="aktif">Aktif</option>
                                            <option value="beklemede">Beklemede</option>
                                            <option value="tamamlandi">Tamamlandı</option>
                                            <option value="iptal">İptal</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Bütçe Aralığı</label>
                                        <select class="filter-select" id="budgetFilter">
                                            <option value="">Tümü</option>
                                            <option value="0-1M">₺0 - ₺1M</option>
                                            <option value="1M-5M">₺1M - ₺5M</option>
                                            <option value="5M-10M">₺5M - ₺10M</option>
                                            <option value="10M+">₺10M+</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Şantiye Şefi</label>
                                        <select class="filter-select" id="managerFilter">
                                            <option value="">Tümü</option>
                                            <option value="ahmet-yilmaz">Ahmet Yılmaz</option>
                                            <option value="mehmet-kaya">Mehmet Kaya</option>
                                            <option value="elif-demir">Elif Demir</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <div class="search-box">
                                            <i class="fa-solid fa-search"></i>
                                            <input type="text" placeholder="Proje adı ara..." id="searchInput">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="santiye-table-container">
                                <table class="santiye-table">
                                    <thead>
                                        <tr>
                                            <th>Proje Adı</th>
                                            <th>Şantiye Şefi</th>
                                            <th>Başlangıç</th>
                                            <th>Bitiş</th>
                                            <th>Durum</th>
                                            <th>İlerleme</th>
                                            <th>Bütçe</th>
                                            <th>Harcanan</th>
                                            <th>Kalan</th>
                                            <th>Personel</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody id="santiyeTableBody">
                                        <!-- Dinamik içerik -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Calendar View -->
                        <div class="view-content" id="calendar-view">
                            <div class="calendar-container">
                                <div class="calendar-header">
                                    <button class="btn btn-outline" id="prevMonth">
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <h3 id="currentMonth">Aralık 2024</h3>
                                    <button class="btn btn-outline" id="nextMonth">
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div class="calendar-grid" id="calendarGrid">
                                    <!-- Takvim buraya gelecek -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions Sidebar -->
                    <div class="quick-actions-sidebar">
                        <h4>Hızlı İşlemler</h4>
                        <div class="quick-action-item">
                            <i class="fa-solid fa-users"></i>
                            <span>Personel Atama</span>
                        </div>
                        <div class="quick-action-item">
                            <i class="fa-solid fa-truck"></i>
                            <span>Malzeme Siparişi</span>
                        </div>
                        <div class="quick-action-item">
                            <i class="fa-solid fa-calculator"></i>
                            <span>Maliyet Hesaplama</span>
                        </div>
                        <div class="quick-action-item">
                            <i class="fa-solid fa-chart-bar"></i>
                            <span>İlerleme Raporu</span>
                        </div>
                        <div class="quick-action-item">
                            <i class="fa-solid fa-file-invoice"></i>
                            <span>Fatura Oluştur</span>
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
        this.loadSantiyeData();
        this.initViewSwitcher();
        this.initFilters();
        this.addStyles();
    }

    loadSantiyeData() {
        // Örnek şantiye verileri
        this.santiyeData = [
            {
                id: 1,
                name: 'Villa Kompleksi Projesi',
                location: 'Beykoz, İstanbul',
                manager: 'Ahmet Yılmaz',
                startDate: '15.01.2024',
                endDate: '15.12.2024',
                status: 'aktif',
                progress: 65,
                budget: 8500000,
                spent: 5525000,
                personnel: 24,
                description: 'Lüks villa kompleksi inşaatı',
                client: 'ABC İnşaat Ltd.',
                area: '15,000 m²',
                units: 12,
                type: 'Konut'
            },
            {
                id: 2,
                name: 'Ofis Binası İnşaatı',
                location: 'Levent, İstanbul',
                manager: 'Mehmet Kaya',
                startDate: '01.03.2024',
                endDate: '01.06.2025',
                status: 'aktif',
                progress: 35,
                budget: 12000000,
                spent: 4200000,
                personnel: 32,
                description: '18 katlı modern ofis binası',
                client: 'XYZ Holding',
                area: '25,000 m²',
                units: 180,
                type: 'Ticari'
            },
            {
                id: 3,
                name: 'Alışveriş Merkezi',
                location: 'Kadıköy, İstanbul',
                manager: 'Elif Demir',
                startDate: '10.06.2024',
                endDate: '10.12.2025',
                status: 'planlama',
                progress: 10,
                budget: 25000000,
                spent: 2500000,
                personnel: 8,
                description: 'Modern alışveriş merkezi projesi',
                client: 'DEF Yatırım',
                area: '45,000 m²',
                units: 250,
                type: 'Ticari'
            },
            {
                id: 4,
                name: 'Hastane Kompleksi',
                location: 'Ümraniye, İstanbul',
                manager: 'Ahmet Yılmaz',
                startDate: '01.09.2023',
                endDate: '01.09.2024',
                status: 'tamamlandi',
                progress: 100,
                budget: 15000000,
                spent: 14250000,
                personnel: 0,
                description: 'Özel hastane kompleksi',
                client: 'Sağlık Yatırımları A.Ş.',
                area: '20,000 m²',
                units: 150,
                type: 'Sağlık'
            },
            {
                id: 5,
                name: 'Otel Projesi',
                location: 'Antalya',
                manager: 'Mehmet Kaya',
                startDate: '15.04.2024',
                endDate: '15.04.2025',
                status: 'beklemede',
                progress: 20,
                budget: 18000000,
                spent: 3600000,
                personnel: 15,
                description: '5 yıldızlı otel inşaatı',
                client: 'Turizm İnvestments',
                area: '30,000 m²',
                units: 200,
                type: 'Turizm'
            }
        ];

        this.filteredData = [...this.santiyeData];
        this.renderDashboard();
        this.renderTable();
        this.updateGlobalStats();
    }

    renderDashboard() {
        const grid = document.getElementById('santiyeGrid');
        if (!grid) return;

        grid.innerHTML = this.filteredData.map(santiye => `
            <div class="santiye-card ${santiye.status}" data-id="${santiye.id}">
                <div class="card-header">
                    <div class="card-title-section">
                        <h3 class="santiye-name">${santiye.name}</h3>
                        <p class="santiye-location">
                            <i class="fa-solid fa-map-marker-alt"></i>
                            ${santiye.location}
                        </p>
                    </div>
                    <div class="card-status">
                        <span class="status-badge ${santiye.status}">
                            ${this.getStatusText(santiye.status)}
                        </span>
                    </div>
                </div>

                <div class="card-body">
                    <div class="project-info">
                        <div class="info-row">
                            <span class="info-label">Şantiye Şefi:</span>
                            <span class="info-value">${santiye.manager}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Müşteri:</span>
                            <span class="info-value">${santiye.client}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Tür:</span>
                            <span class="info-value">${santiye.type}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Alan:</span>
                            <span class="info-value">${santiye.area}</span>
                        </div>
                    </div>

                    <div class="progress-section">
                        <div class="progress-header">
                            <span class="progress-label">İlerleme</span>
                            <span class="progress-value">${santiye.progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${santiye.progress}%"></div>
                        </div>
                    </div>

                    <div class="budget-section">
                        <div class="budget-item">
                            <span class="budget-label">Bütçe</span>
                            <span class="budget-value">${this.formatCurrency(santiye.budget)}</span>
                        </div>
                        <div class="budget-item">
                            <span class="budget-label">Harcanan</span>
                            <span class="budget-value spent">${this.formatCurrency(santiye.spent)}</span>
                        </div>
                        <div class="budget-item">
                            <span class="budget-label">Kalan</span>
                            <span class="budget-value remaining">${this.formatCurrency(santiye.budget - santiye.spent)}</span>
                        </div>
                    </div>

                    <div class="personnel-section">
                        <div class="personnel-info">
                            <i class="fa-solid fa-users"></i>
                            <span>${santiye.personnel} Personel</span>
                        </div>
                        <div class="date-info">
                            <i class="fa-solid fa-calendar"></i>
                            <span>${santiye.startDate} - ${santiye.endDate}</span>
                        </div>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="card-actions">
                        <button class="btn btn-sm btn-outline" onclick="window.santiyeModule.viewDetails(${santiye.id})">
                            <i class="fa-solid fa-eye"></i>
                            Detay
                        </button>
                        <button class="btn btn-sm btn-success" onclick="window.santiyeModule.editSantiye(${santiye.id})">
                            <i class="fa-solid fa-edit"></i>
                            Düzenle
                        </button>
                        <button class="btn btn-sm btn-success" onclick="window.santiyeModule.selectSantiye(${santiye.id})">
                            <i class="fa-solid fa-check"></i>
                            Seç
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Global erişim için
        window.santiyeModule = this;
    }

    renderTable() {
        const tbody = document.getElementById('santiyeTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.filteredData.map(santiye => `
            <tr class="santiye-row" data-id="${santiye.id}">
                <td class="project-name">
                    <div class="project-info">
                        <strong>${santiye.name}</strong>
                        <small>${santiye.location}</small>
                    </div>
                </td>
                <td>${santiye.manager}</td>
                <td>${santiye.startDate}</td>
                <td>${santiye.endDate}</td>
                <td>
                    <span class="status-badge ${santiye.status}">
                        ${this.getStatusText(santiye.status)}
                    </span>
                </td>
                <td>
                    <div class="table-progress">
                        <div class="progress-bar-small">
                            <div class="progress-fill-small" style="width: ${santiye.progress}%"></div>
                        </div>
                        <span class="progress-text">${santiye.progress}%</span>
                    </div>
                </td>
                <td class="amount">${this.formatCurrency(santiye.budget)}</td>
                <td class="amount spent">${this.formatCurrency(santiye.spent)}</td>
                <td class="amount remaining">${this.formatCurrency(santiye.budget - santiye.spent)}</td>
                <td class="text-center">${santiye.personnel}</td>
                <td class="actions">
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="window.santiyeModule.viewDetails(${santiye.id})" title="Detay">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="window.santiyeModule.editSantiye(${santiye.id})" title="Düzenle">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="btn-icon primary" onclick="window.santiyeModule.selectSantiye(${santiye.id})" title="Seç">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'planlama': 'Planlama',
            'aktif': 'Aktif',
            'beklemede': 'Beklemede',
            'tamamlandi': 'Tamamlandı',
            'iptal': 'İptal'
        };
        return statusMap[status] || status;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    initViewSwitcher() {
        const viewButtons = document.querySelectorAll('.view-btn');
        const viewContents = document.querySelectorAll('.view-content');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetView = btn.dataset.view;
                
                // Update buttons
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update content
                viewContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${targetView}-view`).classList.add('active');
                
                // Update container class for sidebar visibility
                const container = document.querySelector('.santiye-container');
                if (container) {
                    if (targetView === 'dashboard') {
                        container.classList.add('dashboard-view');
                    } else {
                        container.classList.remove('dashboard-view');
                    }
                }
                
                this.currentView = targetView;
                
                if (targetView === 'calendar') {
                    this.renderCalendar();
                }
            });
        });
    }

    initFilters() {
        ['statusFilter', 'budgetFilter', 'managerFilter', 'searchInput'].forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                const eventType = element.type === 'text' ? 'input' : 'change';
                element.addEventListener(eventType, () => this.applyFilters());
            }
        });
    }

    applyFilters() {
        const statusFilter = document.getElementById('statusFilter')?.value || '';
        const budgetFilter = document.getElementById('budgetFilter')?.value || '';
        const managerFilter = document.getElementById('managerFilter')?.value || '';
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';

        this.filteredData = this.santiyeData.filter(santiye => {
            const matchesStatus = !statusFilter || santiye.status === statusFilter;
            
            let matchesBudget = true;
            if (budgetFilter) {
                const budget = santiye.budget;
                if (budgetFilter === '0-1M') matchesBudget = budget <= 1000000;
                else if (budgetFilter === '1M-5M') matchesBudget = budget > 1000000 && budget <= 5000000;
                else if (budgetFilter === '5M-10M') matchesBudget = budget > 5000000 && budget <= 10000000;
                else if (budgetFilter === '10M+') matchesBudget = budget > 10000000;
            }
            
            const matchesManager = !managerFilter || 
                santiye.manager.toLowerCase().includes(managerFilter.replace('-', ' '));
            
            const matchesSearch = !searchTerm || 
                santiye.name.toLowerCase().includes(searchTerm) ||
                santiye.location.toLowerCase().includes(searchTerm) ||
                santiye.client.toLowerCase().includes(searchTerm);

            return matchesStatus && matchesBudget && matchesManager && matchesSearch;
        });

        this.renderDashboard();
        this.renderTable();
        this.updateGlobalStats();
    }

    updateGlobalStats() {
        const totalProjects = this.santiyeData.length;
        const activeProjects = this.santiyeData.filter(s => s.status === 'aktif').length;
        const totalBudget = this.santiyeData.reduce((sum, s) => sum + s.budget, 0);
        const totalSpent = this.santiyeData.reduce((sum, s) => sum + s.spent, 0);

        document.getElementById('totalProjects').textContent = totalProjects;
        document.getElementById('activeProjects').textContent = activeProjects;
        document.getElementById('totalBudget').textContent = this.formatCurrency(totalBudget);
        document.getElementById('totalSpent').textContent = this.formatCurrency(totalSpent);
    }

    renderCalendar() {
        // Basit takvim implementasyonu
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        calendarGrid.innerHTML = `
            <div class="calendar-placeholder">
                <i class="fa-solid fa-calendar-alt"></i>
                <h3>Proje Takvimi</h3>
                <p>Proje başlangıç ve bitiş tarihlerini takvim görünümünde görebilirsiniz.</p>
                <small>Bu özellik geliştirilme aşamasındadır.</small>
            </div>
        `;
    }

    // Action methods
    viewDetails(id) {
        const santiye = this.santiyeData.find(s => s.id === id);
        console.log('Viewing details for:', santiye?.name);
        // Detay modal açılacak
    }

    editSantiye(id) {
        const santiye = this.santiyeData.find(s => s.id === id);
        console.log('Editing santiye:', santiye?.name);
        // Edit modal açılacak
    }

    selectSantiye(id) {
        const santiye = this.santiyeData.find(s => s.id === id);
        if (santiye) {
            this.selectedSantiye = id;
            console.log('Selected santiye:', santiye.name);
            
            // Global state'i güncelle
            if (window.globalSantiye) {
                window.globalSantiye.setSelectedSantiye(santiye);
            }
            
            // Başarı mesajı göster
            this.showMessage(`"${santiye.name}" şantiyesi seçildi. Tüm sayfalar bu şantiyeye göre filtrelenecek.`, 'success');
        }
    }

    showMessage(message, type = 'info') {
        // Basit bildirim sistemi
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    addStyles() {
        const existingStyles = document.getElementById('santiye-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'santiye-styles';
        style.textContent = `
            .santiye-container {
                padding: 20px;
                background: #f8f9fa;
                min-height: calc(100vh - 200px);
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
                max-width: 100%;
                overflow-x: hidden;
            }
            
            .santiye-container.dashboard-view {
                grid-template-columns: 1fr 250px;
            }
            
            .main-content {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            /* Header */
            .santiye-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                grid-column: 1 / -1;
                min-width: 0;
                flex-wrap: wrap;
                gap: 16px;
            }
            
            .header-left h2 {
                margin: 0 0 8px 0;
                color: #1f2937;
                font-size: 28px;
                font-weight: 700;
            }
            
            .header-left p {
                margin: 0;
                color: #6b7280;
                font-size: 16px;
            }
            
            .header-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                flex-shrink: 0;
            }
            
            .btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                text-decoration: none;
            }
            
            .btn-success {
                background: #2e7d32;
                color: white;
            }
            
            .btn-success:hover {
                background: #1b5e20;
                transform: translateY(-1px);
            }
            
            .btn-outline {
                background: white;
                color: #2e7d32;
                border: 1px solid #2e7d32;
            }
            
            .btn-outline:hover {
                background: #2e7d32;
                color: white;
            }
            
            .btn-primary {
                background: #2e7d32;
                color: white;
            }
            
            .btn-sm {
                padding: 6px 12px;
                font-size: 12px;
            }
            
            /* Global Stats */
            .global-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                margin-bottom: 24px;
                grid-column: 1 / -1;
            }
            
            .stat-card {
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .stat-icon {
                width: 50px;
                height: 50px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: white;
            }
            
            .total-projects .stat-icon {
                background: #2e7d32;
            }
            
            .active-projects .stat-icon {
                background: #1976d2;
            }
            
            .total-budget .stat-icon {
                background: #388e3c;
            }
            
            .total-spent .stat-icon {
                background: #f57c00;
            }
            
            .stat-info {
                display: flex;
                flex-direction: column;
            }
            
            .stat-number {
                font-size: 24px;
                font-weight: 700;
                color: #1f2937;
                line-height: 1;
            }
            
            .stat-label {
                font-size: 14px;
                color: #6b7280;
                margin-top: 4px;
            }
            
            /* View Switcher */
            .view-switcher {
                display: flex;
                gap: 4px;
                background: white;
                padding: 4px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 20px;
                grid-column: 1 / -1;
            }
            
            .view-btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 16px;
                border: none;
                border-radius: 6px;
                background: transparent;
                color: #6b7280;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
                font-weight: 500;
            }
            
            .view-btn.active {
                background: #2e7d32;
                color: white;
            }
            
            .view-btn:hover:not(.active) {
                background: #f3f4f6;
                color: #374151;
            }
            
            /* Content Area */
            .content-area {
                grid-column: 1;
            }
            
            .view-content {
                display: none;
            }
            
            .view-content.active {
                display: block;
            }
            
            /* Dashboard Grid */
            .santiye-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                gap: 24px;
            }
            
            /* Şantiye Cards */
            .santiye-card {
                background: white;
                border-radius: 16px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                transition: all 0.3s ease;
                border-left: 4px solid #e5e7eb;
            }
            
            .santiye-card.aktif {
                border-left-color: #2e7d32;
            }
            
            .santiye-card.planlama {
                border-left-color: #1976d2;
            }
            
            .santiye-card.beklemede {
                border-left-color: #ff9800;
            }
            
            .santiye-card.tamamlandi {
                border-left-color: #4caf50;
            }
            
            .santiye-card.iptal {
                border-left-color: #f44336;
            }
            
            .santiye-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            }
            
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 24px 24px 16px;
            }
            
            .santiye-name {
                margin: 0 0 8px 0;
                font-size: 18px;
                font-weight: 700;
                color: #1f2937;
                line-height: 1.2;
            }
            
            .santiye-location {
                margin: 0;
                color: #6b7280;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .status-badge {
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .status-badge.aktif {
                background: #d4edda;
                color: #155724;
            }
            
            .status-badge.planlama {
                background: #cce7ff;
                color: #0d47a1;
            }
            
            .status-badge.beklemede {
                background: #fff3cd;
                color: #856404;
            }
            
            .status-badge.tamamlandi {
                background: #d1f2eb;
                color: #00695c;
            }
            
            .status-badge.iptal {
                background: #f8d7da;
                color: #721c24;
            }
            
            .card-body {
                padding: 0 24px 20px;
            }
            
            .project-info {
                margin-bottom: 20px;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .info-label {
                color: #6b7280;
                font-weight: 500;
            }
            
            .info-value {
                color: #1f2937;
                font-weight: 600;
            }
            
            .progress-section {
                margin-bottom: 20px;
            }
            
            .progress-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .progress-label {
                font-size: 14px;
                font-weight: 600;
                color: #374151;
            }
            
            .progress-value {
                font-size: 14px;
                font-weight: 700;
                color: #2e7d32;
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #e5e7eb;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #2e7d32, #4caf50);
                transition: width 0.3s ease;
            }
            
            .budget-section {
                background: #f9fafb;
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 16px;
            }
            
            .budget-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                font-size: 13px;
            }
            
            .budget-item:last-child {
                margin-bottom: 0;
            }
            
            .budget-label {
                color: #6b7280;
                font-weight: 500;
            }
            
            .budget-value {
                font-weight: 600;
                color: #1f2937;
            }
            
            .budget-value.spent {
                color: #dc2626;
            }
            
            .budget-value.remaining {
                color: #2e7d32;
            }
            
            .personnel-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 13px;
                color: #6b7280;
            }
            
            .personnel-info,
            .date-info {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .card-footer {
                padding: 16px 24px;
                background: #f9fafb;
                border-top: 1px solid #e5e7eb;
            }
            
            .card-actions {
                display: flex;
                gap: 8px;
            }
            
            /* Table Styles */
            .list-filters {
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
            
            .filter-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                align-items: end;
            }
            
            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            
            .filter-group label {
                font-weight: 500;
                color: #374151;
                font-size: 14px;
            }
            
            .filter-select {
                padding: 10px 12px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 14px;
                background: white;
            }
            
            .search-box {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .search-box i {
                position: absolute;
                left: 12px;
                color: #9ca3af;
                z-index: 1;
            }
            
            .search-box input {
                width: 100%;
                padding: 10px 12px 10px 40px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 14px;
            }
            
            .santiye-table-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
                max-width: 100%;
                overflow-x: auto;
            }
            
            .santiye-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
                min-width: 1300px;
            }
            
            .santiye-table th {
                background: #f8f9fa;
                padding: 16px 12px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
                font-weight: 600;
                color: #374151;
                white-space: nowrap;
            }
            
            .santiye-table th:last-child {
                width: 120px;
                min-width: 120px;
            }
            
            .santiye-table td {
                padding: 16px 12px;
                border-bottom: 1px solid #f3f4f6;
                vertical-align: middle;
            }
            
            .santiye-row:hover {
                background: #f8f9fa;
            }
            
            .project-name strong {
                display: block;
                color: #1f2937;
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .project-name small {
                color: #6b7280;
                font-size: 12px;
            }
            
            .table-progress {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .progress-bar-small {
                width: 60px;
                height: 6px;
                background: #e5e7eb;
                border-radius: 3px;
                overflow: hidden;
            }
            
            .progress-fill-small {
                height: 100%;
                background: #2e7d32;
                transition: width 0.3s ease;
            }
            
            .progress-text {
                font-size: 12px;
                font-weight: 600;
                color: #2e7d32;
                min-width: 35px;
            }
            
            .amount {
                text-align: right;
                font-weight: 600;
            }
            
            .amount.spent {
                color: #dc2626;
            }
            
            .amount.remaining {
                color: #2e7d32;
            }
            
            .text-center {
                text-align: center;
            }
            
            .action-buttons {
                display: flex;
                gap: 4px;
                justify-content: center;
                min-width: 100px;
            }
            
            .actions {
                text-align: center;
                width: 120px;
                min-width: 120px;
                padding: 8px !important;
            }
            
            .btn-icon {
                width: 28px;
                height: 28px;
                border-radius: 6px;
                border: none;
                background: #f3f4f6;
                color: #6b7280;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                font-size: 11px;
            }
            
            .btn-icon:hover {
                background: #e5e7eb;
                color: #374151;
            }
            
            .btn-icon.primary {
                background: #1976d2;
                color: white;
            }
            
            .btn-icon.primary:hover {
                background: #1565c0;
            }
            
            /* Calendar */
            .calendar-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                padding: 24px;
            }
            
            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .calendar-placeholder {
                text-align: center;
                padding: 60px 20px;
                color: #6b7280;
            }
            
            .calendar-placeholder i {
                font-size: 48px;
                margin-bottom: 16px;
                color: #d1d5db;
            }
            
            .calendar-placeholder h3 {
                margin: 0 0 8px 0;
                color: #374151;
            }
            
            /* Quick Actions Sidebar */
            .quick-actions-sidebar {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                padding: 24px;
                height: fit-content;
                position: sticky;
                top: 20px;
                display: none;
            }
            
            .santiye-container.dashboard-view .quick-actions-sidebar {
                display: block;
            }
            
            .quick-actions-sidebar h4 {
                margin: 0 0 20px 0;
                color: #1f2937;
                font-size: 16px;
                font-weight: 600;
            }
            
            .quick-action-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-bottom: 8px;
                font-size: 14px;
                color: #374151;
            }
            
            .quick-action-item:hover {
                background: #f3f4f6;
                color: #2e7d32;
            }
            
            .quick-action-item i {
                width: 20px;
                color: #6b7280;
            }
            
            .quick-action-item:hover i {
                color: #2e7d32;
            }
            
            /* Responsive */
            @media (max-width: 1200px) {
                .santiye-container {
                    grid-template-columns: 1fr;
                }
                
                .quick-actions-sidebar {
                    position: relative;
                    top: auto;
                }
                
                .global-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 768px) {
                .santiye-container {
                    padding: 12px;
                }
                
                .santiye-header {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center;
                }
                
                .header-actions {
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .global-stats {
                    grid-template-columns: 1fr;
                }
                
                .santiye-grid {
                    grid-template-columns: 1fr;
                }
                
                .filter-row {
                    grid-template-columns: 1fr;
                }
                
                .view-switcher {
                    overflow-x: auto;
                }
            }
            
            /* Animations */
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
