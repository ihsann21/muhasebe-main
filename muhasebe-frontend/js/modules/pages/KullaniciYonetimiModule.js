export class KullaniciYonetimiModule {
    constructor() {
        this.currentUsers = [
            {
                id: 1,
                name: "Ana Kullanıcı",
                email: "admin@volasinsaat.com",
                role: "Yönetici",
                status: "AKTİF",
                lastLogin: "2024-12-30 14:30",
                avatar: "A",
                color: "#4caf50"
            },
            {
                id: 2,
                name: "Muhasebe Uzmanı",
                email: "muhasebe@volasinsaat.com",
                role: "Kullanıcı",
                status: "AKTİF",
                lastLogin: "2024-12-30 09:15",
                avatar: "M",
                color: "#2196f3"
            },
            {
                id: 3,
                name: "Proje Yöneticisi",
                email: "proje@volasinsaat.com",
                role: "Kullanıcı",
                status: "AKTİF",
                lastLogin: "2024-12-29 16:45",
                avatar: "P",
                color: "#ff9800"
            },
            {
                id: 4,
                name: "Sistem Yöneticisi",
                email: "sistem@volasinsaat.com",
                role: "Görüntüleyici",
                status: "BEKLEMEDE",
                lastLogin: "Hiç giriş yapmadı",
                avatar: "S",
                color: "#9c27b0"
            }
        ];
        this.addStyles();
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Kullanıcı Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        moduleContainer.innerHTML = `
            <div class="kullanici-yonetimi-container">
                <!-- Header -->
                <div class="kullanici-header">
                    <div class="header-left">
                        <h2 class="page-title">Kullanıcı Yönetimi</h2>
                    </div>
                    <div class="header-right">
                        <button class="btn btn-success btn-sm">
                            <i class="fa-solid fa-plus"></i> Yeni Kullanıcı
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-container">
                    <div class="stat-card stat-total">
                        <div class="stat-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>4</h3>
                            <p>Toplam Kullanıcı</p>
                        </div>
                    </div>
                    <div class="stat-card stat-active">
                        <div class="stat-icon">
                            <i class="fa-solid fa-user-check"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Aktif Kullanıcı</p>
                        </div>
                    </div>
                    <div class="stat-card stat-admin">
                        <div class="stat-icon">
                            <i class="fa-solid fa-user-tie"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1</h3>
                            <p>Yönetici</p>
                        </div>
                    </div>
                    <div class="stat-card stat-pending">
                        <div class="stat-icon">
                            <i class="fa-solid fa-user-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1</h3>
                            <p>Beklemede</p>
                        </div>
                    </div>
                </div>

                <!-- Search -->
                <div class="search-container">
                    <div class="search-box">
                        <i class="fa-solid fa-search"></i>
                        <input type="text" placeholder="Kullanıcı ara..." id="userSearch">
                    </div>
                </div>

                <!-- Users Table -->
                <div class="users-section">
                    <div class="section-header">
                        <h3><i class="fa-solid fa-users"></i> Kullanıcı Listesi</h3>
                    </div>
                    
                    <div class="users-table-container">
                        <table class="users-table">
                            <thead>
                                <tr>
                                    <th>Kullanıcı</th>
                                    <th>Rol</th>
                                    <th>Durum</th>
                                    <th>Son Giriş</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody id="usersTableBody">
                                ${this.renderUsers()}
                            </tbody>
                        </table>
                    </div>
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

    renderUsers() {
        return this.currentUsers.map(user => `
            <tr data-user-id="${user.id}">
                <td>
                    <div class="user-info">
                        <div class="user-avatar" style="background-color: ${user.color}">
                            ${user.avatar}
                        </div>
                        <div class="user-details">
                            <div class="user-name">${user.name}</div>
                            <div class="user-email">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="role-badge role-${user.role.toLowerCase().replace('ı', 'i')}">${user.role}</span>
                </td>
                <td>
                    <span class="status-badge status-${user.status.toLowerCase()}">${user.status}</span>
                </td>
                <td class="last-login">${user.lastLogin}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-edit" title="Düzenle">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-power" title="Durumu Değiştir">
                            <i class="fa-solid fa-power-off"></i>
                        </button>
                        <button class="btn-icon btn-delete" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    initFunctionality() {
        // Search functionality
        const searchInput = document.getElementById('userSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterUsers(e.target.value);
            });
        }

        // Action buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('tr').dataset.userId;
                this.editUser(userId);
            });
        });

        document.querySelectorAll('.btn-power').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('tr').dataset.userId;
                this.toggleUserStatus(userId);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.closest('tr').dataset.userId;
                this.deleteUser(userId);
            });
        });
    }

    filterUsers(searchTerm) {
        const rows = document.querySelectorAll('#usersTableBody tr');
        rows.forEach(row => {
            const userName = row.querySelector('.user-name').textContent.toLowerCase();
            const userEmail = row.querySelector('.user-email').textContent.toLowerCase();
            const isVisible = userName.includes(searchTerm.toLowerCase()) || 
                            userEmail.includes(searchTerm.toLowerCase());
            row.style.display = isVisible ? '' : 'none';
        });
    }

    editUser(userId) {
        console.log('Edit user:', userId);
        alert(`Kullanıcı düzenleme özelliği yakında eklenecek. User ID: ${userId}`);
    }

    toggleUserStatus(userId) {
        const user = this.currentUsers.find(u => u.id == userId);
        if (user) {
            user.status = user.status === 'AKTİF' ? 'PASİF' : 'AKTİF';
            this.refreshUserTable();
        }
    }

    deleteUser(userId) {
        if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
            this.currentUsers = this.currentUsers.filter(u => u.id != userId);
            this.refreshUserTable();
        }
    }

    refreshUserTable() {
        const tbody = document.getElementById('usersTableBody');
        if (tbody) {
            tbody.innerHTML = this.renderUsers();
            this.initFunctionality();
        }
    }

    addStyles() {
        if (document.getElementById('kullanici-yonetimi-styles')) return;

        const style = document.createElement('style');
        style.id = 'kullanici-yonetimi-styles';
        style.textContent = `
            .kullanici-yonetimi-container {
                padding: 20px;
                background: #f5f5f5;
                min-height: calc(100vh - 140px);
            }

            .kullanici-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
                background: white;
                padding: 20px 24px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .page-title {
                margin: 0;
                color: #333;
                font-size: 24px;
                font-weight: 600;
            }

            .stats-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 24px;
            }

            .stat-card {
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 16px;
                transition: transform 0.2s;
            }

            .stat-card:hover {
                transform: translateY(-2px);
            }

            .stat-icon {
                width: 60px;
                height: 60px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
            }

            .stat-total .stat-icon { background: #4caf50; }
            .stat-active .stat-icon { background: #2196f3; }
            .stat-admin .stat-icon { background: #ff9800; }
            .stat-pending .stat-icon { background: #9c27b0; }

            .stat-content h3 {
                margin: 0;
                font-size: 32px;
                font-weight: 700;
                color: #333;
            }

            .stat-content p {
                margin: 4px 0 0 0;
                color: #666;
                font-size: 14px;
            }

            .search-container {
                margin-bottom: 24px;
            }

            .search-box {
                position: relative;
                max-width: 400px;
            }

            .search-box i {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #666;
            }

            .search-box input {
                width: 100%;
                padding: 12px 12px 12px 40px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 14px;
                background: white;
            }

            .users-section {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

            .users-table-container {
                overflow-x: auto;
            }

            .users-table {
                width: 100%;
                border-collapse: collapse;
                background: white;
            }

            .users-table th {
                background: #f8f9fa;
                padding: 16px;
                text-align: left;
                font-weight: 600;
                color: #333;
                border-bottom: 1px solid #eee;
                font-size: 14px;
            }

            .users-table td {
                padding: 16px;
                border-bottom: 1px solid #f0f0f0;
                vertical-align: middle;
            }

            .users-table tr:hover {
                background: #f8f9fa;
            }

            .user-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 16px;
            }

            .user-details {
                flex: 1;
            }

            .user-name {
                font-weight: 600;
                color: #333;
                margin-bottom: 2px;
            }

            .user-email {
                font-size: 13px;
                color: #666;
            }

            .role-badge {
                padding: 4px 12px;
                border-radius: 16px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .role-yonetici {
                background: #e3f2fd;
                color: #1976d2;
            }

            .role-kullanici {
                background: #e8f5e8;
                color: #388e3c;
            }

            .role-goruntuleyici {
                background: #fff3e0;
                color: #f57c00;
            }

            .status-badge {
                padding: 4px 12px;
                border-radius: 16px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .status-aktif {
                background: #e8f5e8;
                color: #388e3c;
            }

            .status-beklemede {
                background: #fff3e0;
                color: #f57c00;
            }

            .status-pasif {
                background: #ffebee;
                color: #d32f2f;
            }

            .last-login {
                color: #666;
                font-size: 13px;
            }

            .action-buttons {
                display: flex;
                gap: 8px;
            }

            .btn-icon {
                width: 32px;
                height: 32px;
                border: none;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 12px;
            }

            .btn-edit {
                background: #e3f2fd;
                color: #1976d2;
            }

            .btn-edit:hover {
                background: #1976d2;
                color: white;
            }

            .btn-power {
                background: #e8f5e8;
                color: #388e3c;
            }

            .btn-power:hover {
                background: #388e3c;
                color: white;
            }

            .btn-delete {
                background: #ffebee;
                color: #d32f2f;
            }

            .btn-delete:hover {
                background: #d32f2f;
                color: white;
            }

            .btn-success {
                background: #2e7d32 !important;
                border-color: #2e7d32 !important;
            }

            .btn-success:hover {
                background: #1b5e20 !important;
                border-color: #1b5e20 !important;
            }

            @media (max-width: 768px) {
                .kullanici-yonetimi-container {
                    padding: 16px;
                }

                .kullanici-header {
                    flex-direction: column;
                    gap: 16px;
                    align-items: stretch;
                }

                .stats-container {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                }

                .stat-card {
                    padding: 16px;
                }

                .users-table {
                    font-size: 14px;
                }

                .users-table th,
                .users-table td {
                    padding: 12px 8px;
                }

                .user-info {
                    gap: 8px;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
