// Personel Module
export class PersonelModule {
    constructor() {
        this.name = 'Personel';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Personel Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="personel-container">
                    <!-- Header -->
                    <div class="personel-header">
                        <div class="header-left">
                            <h2>Personel Yönetimi</h2>
                            <p>Şirket personellerini yönetin, bilgilerini güncelleyin</p>
                        </div>
                        <div class="header-actions">
                            <button class="btn btn-success" id="addPersonelBtn">
                                <i class="fa-solid fa-plus"></i>
                                Yeni Personel
                            </button>
                            <button class="btn btn-success">
                                <i class="fa-solid fa-file-excel"></i>
                                Excel Aktar
                            </button>
                            <button class="btn btn-success">
                                <i class="fa-solid fa-refresh"></i>
                                Yenile
                            </button>
                        </div>
                    </div>

                    <!-- Filters -->
                    <div class="personel-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Departman</label>
                                <select class="filter-select" id="departmanFilter">
                                    <option value="">Tümü</option>
                                    <option value="santiye">Şantiye Mühendisi</option>
                                    <option value="mimar">Mimar</option>
                                    <option value="formen">Formen</option>
                                    <option value="tekniker">Tekniker</option>
                                    <option value="guvenlik">İş Güvenliği Uzmanı</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Pozisyon</label>
                                <select class="filter-select" id="pozisyonFilter">
                                    <option value="">Tümü</option>
                                    <option value="muhendis">Mühendis</option>
                                    <option value="tekniker">Tekniker</option>
                                    <option value="formen">Formen</option>
                                    <option value="isci">İşçi</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Durum</label>
                                <select class="filter-select" id="durumFilter">
                                    <option value="">Tümü</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="izinde">İzinde</option>
                                    <option value="ayrild">Ayrıldı</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Arama</label>
                                <div class="search-box">
                                    <i class="fa-solid fa-search"></i>
                                    <input type="text" placeholder="Ad, pozisyon veya e-posta ara..." id="searchInput">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Personel Cards Grid -->
                    <div class="personel-grid" id="personelGrid">
                        <!-- Personel kartları buraya dinamik olarak eklenecek -->
                    </div>

                    <!-- Stats Summary -->
                    <div class="personel-stats">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fa-solid fa-users"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="totalPersonel">0</span>
                                <span class="stat-label">Toplam Personel</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon active">
                                <i class="fa-solid fa-user-check"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="activePersonel">0</span>
                                <span class="stat-label">Aktif Personel</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon vacation">
                                <i class="fa-solid fa-user-clock"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="vacationPersonel">0</span>
                                <span class="stat-label">İzinde</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon inactive">
                                <i class="fa-solid fa-user-minus"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number" id="inactivePersonel">0</span>
                                <span class="stat-label">Ayrılan</span>
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
        this.loadPersonelData();
        this.initFilters();
        this.addStyles();
    }

    loadPersonelData() {
        // Örnek personel verileri
        const personelData = [
            {
                id: 1,
                name: 'Ahmet Yılmaz',
                position: 'Şantiye Mühendisi',
                department: 'Mühendislik',
                email: 'ahmet.yilmaz@example.com',
                phone: '0532 000 00 01',
                status: 'aktif',
                avatar: 'AY',
                startDate: '15.03.2020',
                salary: '₺25,000',
                projects: ['Proje A', 'Proje B'],
                skills: ['AutoCAD', 'MS Project', 'Saha Yönetimi'],
                experience: '8 yıl'
            },
            {
                id: 2,
                name: 'Elif Demir',
                position: 'Mimar',
                department: 'Tasarım',
                email: 'elif.demir@example.com',
                phone: '0505 111 22 33',
                status: 'izinde',
                avatar: 'ED',
                startDate: '10.06.2021',
                salary: '₺22,000',
                projects: ['Proje C', 'Proje D'],
                skills: ['Revit', 'SketchUp', '3D Max'],
                experience: '5 yıl'
            },
            {
                id: 3,
                name: 'Mehmet Kaya',
                position: 'Formen',
                department: 'Saha',
                email: 'mehmet.kaya@example.com',
                phone: '0541 222 33 44',
                status: 'aktif',
                avatar: 'MK',
                startDate: '20.01.2019',
                salary: '₺18,000',
                projects: ['Proje A', 'Proje E'],
                skills: ['Saha Kontrolü', 'Ekip Yönetimi', 'Kalite Kontrol'],
                experience: '12 yıl'
            },
            {
                id: 4,
                name: 'Zeynep Çelik',
                position: 'İş Güvenliği Uzmanı',
                department: 'Güvenlik',
                email: 'zeynep.celik@example.com',
                phone: '0533 555 66 77',
                status: 'aktif',
                avatar: 'ZÇ',
                startDate: '05.09.2022',
                salary: '₺20,000',
                projects: ['Tüm Projeler'],
                skills: ['İSG', 'Risk Analizi', 'Eğitim'],
                experience: '6 yıl'
            },
            {
                id: 5,
                name: 'Eren Koç',
                position: 'Tekniker',
                department: 'Teknik',
                email: 'eren.koc@example.com',
                phone: '0530 999 88 77',
                status: 'ayrild',
                avatar: 'EK',
                startDate: '12.11.2021',
                salary: '₺16,000',
                projects: ['Proje B'],
                skills: ['Ölçüm', 'Test', 'Bakım'],
                experience: '3 yıl'
            },
            {
                id: 6,
                name: 'Fatma Özkan',
                position: 'İnsan Kaynakları Uzmanı',
                department: 'İK',
                email: 'fatma.ozkan@example.com',
                phone: '0535 444 55 66',
                status: 'aktif',
                avatar: 'FÖ',
                startDate: '08.04.2020',
                salary: '₺21,000',
                projects: ['İK Süreçleri'],
                skills: ['Bordro', 'İşe Alım', 'Eğitim'],
                experience: '7 yıl'
            }
        ];

        this.personelData = personelData;
        this.filteredData = [...personelData];
        this.renderPersonelCards();
        this.updateStats();
    }

    renderPersonelCards() {
        const grid = document.getElementById('personelGrid');
        if (!grid) return;

        grid.innerHTML = this.filteredData.map(personel => `
            <div class="personel-card" data-id="${personel.id}">
                <div class="card-header">
                    <div class="avatar ${personel.status}">
                        <span class="avatar-text">${personel.avatar}</span>
                        <div class="status-indicator ${personel.status}"></div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-icon" onclick="window.personelModule.viewPersonel(${personel.id})" title="Detay">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="window.personelModule.editPersonel(${personel.id})" title="Düzenle">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="window.personelModule.deletePersonel(${personel.id})" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="card-body">
                    <h3 class="personel-name">${personel.name}</h3>
                    <p class="personel-position">${personel.position}</p>
                    <p class="personel-department">${personel.department}</p>
                    
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fa-solid fa-envelope"></i>
                            <span>${personel.email}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fa-solid fa-phone"></i>
                            <span>${personel.phone}</span>
                        </div>
                    </div>
                    
                    <div class="personel-details">
                        <div class="detail-row">
                            <span class="detail-label">Başlangıç:</span>
                            <span class="detail-value">${personel.startDate}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Maaş:</span>
                            <span class="detail-value salary">${personel.salary}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Deneyim:</span>
                            <span class="detail-value">${personel.experience}</span>
                        </div>
                    </div>
                    
                    <div class="projects-section">
                        <h4>Aktif Projeler</h4>
                        <div class="projects-list">
                            ${personel.projects.map(project => 
                                `<span class="project-tag">${project}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="skills-section">
                        <h4>Yetenekler</h4>
                        <div class="skills-list">
                            ${personel.skills.slice(0, 3).map(skill => 
                                `<span class="skill-tag">${skill}</span>`
                            ).join('')}
                            ${personel.skills.length > 3 ? `<span class="skill-tag more">+${personel.skills.length - 3}</span>` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="status-badge ${personel.status}">
                        ${this.getStatusText(personel.status)}
                    </div>
                    <div class="card-footer-actions">
                        <button class="btn btn-sm btn-outline" onclick="window.personelModule.sendMessage(${personel.id})">
                            <i class="fa-solid fa-message"></i>
                            Mesaj
                        </button>
                        <button class="btn btn-sm btn-success" onclick="window.personelModule.callPersonel('${personel.phone}')">
                            <i class="fa-solid fa-phone"></i>
                            Ara
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Global erişim için
        window.personelModule = this;
    }

    getStatusText(status) {
        const statusMap = {
            'aktif': 'Aktif',
            'izinde': 'İzinde',
            'ayrild': 'Ayrıldı'
        };
        return statusMap[status] || status;
    }

    initFilters() {
        const departmanFilter = document.getElementById('departmanFilter');
        const pozisyonFilter = document.getElementById('pozisyonFilter');
        const durumFilter = document.getElementById('durumFilter');
        const searchInput = document.getElementById('searchInput');

        [departmanFilter, pozisyonFilter, durumFilter, searchInput].forEach(element => {
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
                if (element.type === 'text') {
                    element.addEventListener('input', () => this.applyFilters());
                }
            }
        });
    }

    applyFilters() {
        const departmanFilter = document.getElementById('departmanFilter')?.value || '';
        const pozisyonFilter = document.getElementById('pozisyonFilter')?.value || '';
        const durumFilter = document.getElementById('durumFilter')?.value || '';
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';

        this.filteredData = this.personelData.filter(personel => {
            const matchesDepartman = !departmanFilter || personel.position.toLowerCase().includes(departmanFilter);
            const matchesPozisyon = !pozisyonFilter || personel.position.toLowerCase().includes(pozisyonFilter);
            const matchesDurum = !durumFilter || personel.status === durumFilter;
            const matchesSearch = !searchTerm || 
                personel.name.toLowerCase().includes(searchTerm) ||
                personel.position.toLowerCase().includes(searchTerm) ||
                personel.email.toLowerCase().includes(searchTerm);

            return matchesDepartman && matchesPozisyon && matchesDurum && matchesSearch;
        });

        this.renderPersonelCards();
        this.updateStats();
    }

    updateStats() {
        const total = this.personelData.length;
        const active = this.personelData.filter(p => p.status === 'aktif').length;
        const vacation = this.personelData.filter(p => p.status === 'izinde').length;
        const inactive = this.personelData.filter(p => p.status === 'ayrild').length;

        document.getElementById('totalPersonel').textContent = total;
        document.getElementById('activePersonel').textContent = active;
        document.getElementById('vacationPersonel').textContent = vacation;
        document.getElementById('inactivePersonel').textContent = inactive;
    }

    // Action methods
    viewPersonel(id) {
        const personel = this.personelData.find(p => p.id === id);
        console.log('Viewing personel:', personel);
        // Modal açılacak
    }

    editPersonel(id) {
        const personel = this.personelData.find(p => p.id === id);
        console.log('Editing personel:', personel);
        // Edit modal açılacak
    }

    deletePersonel(id) {
        if (confirm('Bu personeli silmek istediğinizden emin misiniz?')) {
            this.personelData = this.personelData.filter(p => p.id !== id);
            this.applyFilters();
        }
    }

    sendMessage(id) {
        const personel = this.personelData.find(p => p.id === id);
        console.log('Sending message to:', personel?.name);
    }

    callPersonel(phone) {
        console.log('Calling:', phone);
        window.open(`tel:${phone}`);
    }

    addStyles() {
        const existingStyles = document.getElementById('personel-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'personel-styles';
        style.textContent = `
            .personel-container {
                padding: 20px;
                background: #f8f9fa;
                min-height: calc(100vh - 200px);
            }
            
            /* Header */
            .personel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 24px;
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
                color: #6b7280;
                border: 1px solid #d1d5db;
            }
            
            .btn-outline:hover {
                background: #f9fafb;
                border-color: #2e7d32;
                color: #2e7d32;
            }
            
            .btn-sm {
                padding: 6px 12px;
                font-size: 12px;
            }
            
            /* Filters */
            .personel-filters {
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 24px;
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
                transition: all 0.2s ease;
            }
            
            .filter-select:focus {
                outline: none;
                border-color: #2e7d32;
                box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
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
                transition: all 0.2s ease;
            }
            
            .search-box input:focus {
                outline: none;
                border-color: #2e7d32;
                box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
            }
            
            /* Personel Grid */
            .personel-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                gap: 24px;
                margin-bottom: 32px;
            }
            
            /* Personel Card */
            .personel-card {
                background: white;
                border-radius: 16px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                transition: all 0.3s ease;
                border: 1px solid #e5e7eb;
            }
            
            .personel-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            }
            
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 24px 24px 16px;
                position: relative;
            }
            
            .avatar {
                position: relative;
                width: 64px;
                height: 64px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                font-weight: 700;
                color: white;
                background: linear-gradient(135deg, #2e7d32, #4caf50);
                margin-bottom: 16px;
            }
            
            .avatar.izinde {
                background: linear-gradient(135deg, #ff9800, #ffb74d);
            }
            
            .avatar.ayrild {
                background: linear-gradient(135deg, #757575, #9e9e9e);
            }
            
            .avatar-text {
                font-size: 18px;
            }
            
            .status-indicator {
                position: absolute;
                bottom: 2px;
                right: 2px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 3px solid white;
            }
            
            .status-indicator.aktif {
                background: #4caf50;
            }
            
            .status-indicator.izinde {
                background: #ff9800;
            }
            
            .status-indicator.ayrild {
                background: #757575;
            }
            
            .card-actions {
                display: flex;
                gap: 4px;
            }
            
            .btn-icon {
                width: 32px;
                height: 32px;
                border-radius: 8px;
                border: none;
                background: #f3f4f6;
                color: #6b7280;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                font-size: 12px;
            }
            
            .btn-icon:hover {
                background: #e5e7eb;
                color: #374151;
            }
            
            .btn-icon.delete:hover {
                background: #fef2f2;
                color: #dc2626;
            }
            
            .card-body {
                padding: 0 24px 20px;
            }
            
            .personel-name {
                margin: 0 0 4px 0;
                font-size: 20px;
                font-weight: 700;
                color: #1f2937;
            }
            
            .personel-position {
                margin: 0 0 2px 0;
                font-size: 16px;
                font-weight: 500;
                color: #2e7d32;
            }
            
            .personel-department {
                margin: 0 0 16px 0;
                font-size: 14px;
                color: #6b7280;
            }
            
            .contact-info {
                margin-bottom: 16px;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 6px;
                font-size: 13px;
                color: #6b7280;
            }
            
            .contact-item i {
                width: 16px;
                color: #9ca3af;
            }
            
            .personel-details {
                background: #f9fafb;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 16px;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 6px;
                font-size: 13px;
            }
            
            .detail-row:last-child {
                margin-bottom: 0;
            }
            
            .detail-label {
                color: #6b7280;
                font-weight: 500;
            }
            
            .detail-value {
                color: #1f2937;
                font-weight: 500;
            }
            
            .detail-value.salary {
                color: #2e7d32;
                font-weight: 600;
            }
            
            .projects-section,
            .skills-section {
                margin-bottom: 16px;
            }
            
            .projects-section h4,
            .skills-section h4 {
                margin: 0 0 8px 0;
                font-size: 13px;
                font-weight: 600;
                color: #374151;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .projects-list,
            .skills-list {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }
            
            .project-tag {
                background: #e8f5e8;
                color: #2e7d32;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
            }
            
            .skill-tag {
                background: #f3f4f6;
                color: #374151;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
            }
            
            .skill-tag.more {
                background: #e5e7eb;
                color: #6b7280;
            }
            
            .card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 24px;
                background: #f9fafb;
                border-top: 1px solid #e5e7eb;
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
            
            .status-badge.izinde {
                background: #fff3cd;
                color: #856404;
            }
            
            .status-badge.ayrild {
                background: #f8d7da;
                color: #721c24;
            }
            
            .card-footer-actions {
                display: flex;
                gap: 8px;
            }
            
            /* Stats */
            .personel-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
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
                background: #6b7280;
            }
            
            .stat-icon.active {
                background: #2e7d32;
            }
            
            .stat-icon.vacation {
                background: #ff9800;
            }
            
            .stat-icon.inactive {
                background: #757575;
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
            
            /* Responsive */
            @media (max-width: 768px) {
                .personel-container {
                    padding: 12px;
                }
                
                .personel-header {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center;
                }
                
                .header-actions {
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .filter-row {
                    grid-template-columns: 1fr;
                }
                
                .personel-grid {
                    grid-template-columns: 1fr;
                }
                
                .personel-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 480px) {
                .personel-stats {
                    grid-template-columns: 1fr;
                }
                
                .card-footer {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .card-footer-actions {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
