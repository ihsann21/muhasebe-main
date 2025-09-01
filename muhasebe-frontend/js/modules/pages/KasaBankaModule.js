// Kasa/Banka Module
export class KasaBankaModule {
    constructor() {
        this.name = 'KasaBanka';
        this.currentView = 'dashboard'; // 'dashboard', 'movements', 'accounts'
        this.selectedAccount = 'all';
        this.dateRange = 'thisMonth';
        
        // Sample accounts data
        this.accounts = [
            { id: 1, name: 'TL Kasa', type: 'cash', currency: 'TL', balance: 125000, icon: 'fa-wallet', color: '#2e7d32' },
            { id: 2, name: 'USD Kasa', type: 'cash', currency: 'USD', balance: 5000, icon: 'fa-wallet', color: '#1976d2' },
            { id: 3, name: 'Ziraat Bankası', type: 'bank', currency: 'TL', balance: 2500000, icon: 'fa-university', color: '#d32f2f', iban: 'TR12 0001 0012 3456 7890 123456' },
            { id: 4, name: 'İş Bankası', type: 'bank', currency: 'TL', balance: 1800000, icon: 'fa-university', color: '#7b1fa2', iban: 'TR98 0006 4000 0011 2345 6789 01' },
            { id: 5, name: 'Garanti BBVA', type: 'bank', currency: 'TL', balance: 950000, icon: 'fa-university', color: '#388e3c', iban: 'TR56 0006 2000 1234 0006 2987 54' },
            { id: 6, name: 'Garanti Kredi Kartı', type: 'credit', currency: 'TL', balance: -45000, limit: 200000, icon: 'fa-credit-card', color: '#f57c00' }
        ];

        // Sample movements data
        this.movements = [
            { id: 1, date: '2024-01-15', accountId: 1, type: 'income', amount: 50000, description: 'Villa Kompleksi - Hakediş Ödemesi', category: 'Proje Geliri', reference: 'HAK-2024-001', person: 'Örnek A.Ş.' },
            { id: 2, date: '2024-01-15', accountId: 3, type: 'expense', amount: 25000, description: 'Çimento Alımı', category: 'Malzeme', reference: 'FAT-2024-045', person: 'Akçansa' },
            { id: 3, date: '2024-01-14', accountId: 1, type: 'expense', amount: 15000, description: 'İşçi Maaşları', category: 'Personel', reference: 'MAA-2024-001', person: 'Ahmet Yılmaz' },
            { id: 4, date: '2024-01-14', accountId: 4, type: 'income', amount: 75000, description: 'Ofis Binası - Avans', category: 'Proje Geliri', reference: 'AVN-2024-002', person: 'Kurumsal Ltd.' },
            { id: 5, date: '2024-01-13', accountId: 2, type: 'expense', amount: 2000, description: 'Makine Kirası (USD)', category: 'Ekipman', reference: 'KIR-2024-012', person: 'Caterpillar' },
            { id: 6, date: '2024-01-13', accountId: 6, type: 'expense', amount: 8500, description: 'Ofis Malzemeleri', category: 'İdari', reference: 'FAT-2024-046', person: 'Teknosa' },
            { id: 7, date: '2024-01-12', accountId: 3, type: 'transfer', amount: 100000, description: 'Kasa\'ya Transfer', category: 'Transfer', reference: 'TRF-2024-003', person: 'İç Transfer', targetAccount: 1 },
            { id: 8, date: '2024-01-12', accountId: 5, type: 'income', amount: 35000, description: 'Eski Malzeme Satışı', category: 'Satış', reference: 'SAT-2024-001', person: 'Hurda A.Ş.' },
            { id: 9, date: '2024-01-11', accountId: 1, type: 'expense', amount: 12000, description: 'Yakıt Gideri', category: 'Ulaşım', reference: 'FAT-2024-047', person: 'Petrol Ofisi' },
            { id: 10, date: '2024-01-11', accountId: 4, type: 'expense', amount: 28000, description: 'Sigorta Primi', category: 'Sigorta', reference: 'SIG-2024-001', person: 'Axa Sigorta' }
        ];

        this.filteredMovements = [...this.movements];
        this.filters = {
            accountId: 'all',
            type: 'all',
            category: 'all',
            dateRange: 'thisMonth',
            search: ''
        };
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Kasa & Banka Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="kasabanka-container">
                    <!-- Header -->
                    <div class="kasabanka-header">
                        <div class="header-left">
                            <h2>Kasa & Banka Yönetimi</h2>
                            <p>Nakit akışınızı takip edin, hesaplarınızı yönetin</p>
                        </div>
                        <div class="header-actions">
                            <button class="btn btn-success" id="newMovementBtn">
                                <i class="fa-solid fa-plus"></i>
                                Yeni Hareket
                            </button>
                            <button class="btn btn-success" id="transferBtn">
                                <i class="fa-solid fa-exchange-alt"></i>
                                Transfer
                            </button>
                            <button class="btn btn-success" id="reportBtn">
                                <i class="fa-solid fa-chart-line"></i>
                                Rapor Al
                            </button>
                            <button class="btn btn-success" id="exportBtn">
                                <i class="fa-solid fa-file-excel"></i>
                                Excel Aktar
                            </button>
                        </div>
                    </div>

                    <!-- Summary Cards -->
                    <div class="summary-cards">
                        <div class="summary-card total-cash">
                            <div class="card-icon">
                                <i class="fa-solid fa-coins"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="totalCash">₺5.405.000</h3>
                                <p>Toplam Bakiye</p>
                                <span class="trend positive">+12.5%</span>
                            </div>
                        </div>
                        <div class="summary-card daily-income">
                            <div class="card-icon">
                                <i class="fa-solid fa-arrow-trend-up"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="dailyIncome">₺160.000</h3>
                                <p>Bugünkü Gelir</p>
                                <span class="trend positive">+8.2%</span>
                            </div>
                        </div>
                        <div class="summary-card daily-expense">
                            <div class="card-icon">
                                <i class="fa-solid fa-arrow-trend-down"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="dailyExpense">₺88.500</h3>
                                <p>Bugünkü Gider</p>
                                <span class="trend negative">-3.1%</span>
                            </div>
                        </div>
                        <div class="summary-card net-flow">
                            <div class="card-icon">
                                <i class="fa-solid fa-balance-scale"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="netFlow">₺71.500</h3>
                                <p>Net Akış</p>
                                <span class="trend positive">+15.3%</span>
                            </div>
                        </div>
                    </div>

                    <!-- View Switcher -->
                    <div class="view-switcher">
                        <button class="view-btn active" data-view="dashboard">
                            <i class="fa-solid fa-th-large"></i>
                            Dashboard
                        </button>
                        <button class="view-btn" data-view="movements">
                            <i class="fa-solid fa-list"></i>
                            Hareketler
                        </button>
                        <button class="view-btn" data-view="accounts">
                            <i class="fa-solid fa-university"></i>
                            Hesaplar
                        </button>
                    </div>

                    <!-- Content Area -->
                    <div class="content-area">
                        <!-- Dashboard View -->
                        <div class="view-content active" id="dashboard-view">
                            <div class="dashboard-grid">
                                <!-- Accounts Grid -->
                                <div class="accounts-section">
                                    <h3>Hesaplar</h3>
                                    <div class="accounts-grid" id="accountsGrid">
                                        ${this.renderAccountCards()}
                                    </div>
                                </div>
                                
                                <!-- Recent Movements -->
                                <div class="recent-movements">
                                    <h3>Son Hareketler</h3>
                                    <div class="movements-list" id="recentMovementsList">
                                        ${this.renderRecentMovements()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Movements View -->
                        <div class="view-content" id="movements-view">
                            <!-- Filters -->
                            <div class="movements-filters">
                                <div class="filter-row">
                                    <div class="filter-group">
                                        <label>Hesap</label>
                                        <select class="filter-select" id="accountFilter">
                                            <option value="all">Tüm Hesaplar</option>
                                            ${this.accounts.map(account => 
                                                `<option value="${account.id}">${account.name}</option>`
                                            ).join('')}
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>İşlem Türü</label>
                                        <select class="filter-select" id="typeFilter">
                                            <option value="all">Tümü</option>
                                            <option value="income">Gelir</option>
                                            <option value="expense">Gider</option>
                                            <option value="transfer">Transfer</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Kategori</label>
                                        <select class="filter-select" id="categoryFilter">
                                            <option value="all">Tüm Kategoriler</option>
                                            <option value="Proje Geliri">Proje Geliri</option>
                                            <option value="Malzeme">Malzeme</option>
                                            <option value="Personel">Personel</option>
                                            <option value="Ekipman">Ekipman</option>
                                            <option value="İdari">İdari</option>
                                            <option value="Ulaşım">Ulaşım</option>
                                            <option value="Sigorta">Sigorta</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Tarih Aralığı</label>
                                        <select class="filter-select" id="dateRangeFilter">
                                            <option value="today">Bugün</option>
                                            <option value="thisWeek">Bu Hafta</option>
                                            <option value="thisMonth" selected>Bu Ay</option>
                                            <option value="lastMonth">Geçen Ay</option>
                                            <option value="thisYear">Bu Yıl</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Arama</label>
                                        <div class="search-box">
                                            <i class="fa-solid fa-search"></i>
                                            <input type="text" id="searchMovements" placeholder="Açıklama, referans veya kişi ara...">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Movements Table -->
                            <div class="movements-table-container">
                                <table class="movements-table">
                                    <thead>
                                        <tr>
                                            <th>Tarih</th>
                                            <th>Hesap</th>
                                            <th>Tür</th>
                                            <th>Açıklama</th>
                                            <th>Kategori</th>
                                            <th>Kişi/Firma</th>
                                            <th>Referans</th>
                                            <th>Tutar</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody id="movementsTableBody">
                                        ${this.renderMovementsTable()}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Accounts View -->
                        <div class="view-content" id="accounts-view">
                            <div class="accounts-management">
                                <div class="accounts-header">
                                    <h3>Hesap Yönetimi</h3>
                                    <button class="btn btn-success" id="addAccountBtn">
                                        <i class="fa-solid fa-plus"></i>
                                        Yeni Hesap
                                    </button>
                                </div>
                                <div class="accounts-detailed-grid" id="accountsDetailedGrid">
                                    ${this.renderDetailedAccountCards()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        this.initFunctionality();
        this.addStyles();
        this.updateSummaryCards();
    }

    initFunctionality() {
        // View switcher
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
                
                this.currentView = targetView;
            });
        });

        // Filters
        this.initFilters();

        // Action buttons
        this.initActionButtons();
    }

    initFilters() {
        ['accountFilter', 'typeFilter', 'categoryFilter', 'dateRangeFilter'].forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
            }
        });

        const searchInput = document.getElementById('searchMovements');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }
    }

    initActionButtons() {
        // New Movement
        const newMovementBtn = document.getElementById('newMovementBtn');
        if (newMovementBtn) {
            newMovementBtn.addEventListener('click', () => this.showNewMovementModal());
        }

        // Transfer
        const transferBtn = document.getElementById('transferBtn');
        if (transferBtn) {
            transferBtn.addEventListener('click', () => this.showTransferModal());
        }

        // Report
        const reportBtn = document.getElementById('reportBtn');
        if (reportBtn) {
            reportBtn.addEventListener('click', () => this.generateReport());
        }

        // Export
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToExcel());
        }

        // Add Account
        const addAccountBtn = document.getElementById('addAccountBtn');
        if (addAccountBtn) {
            addAccountBtn.addEventListener('click', () => this.showAddAccountModal());
        }
    }

    renderAccountCards() {
        return this.accounts.map(account => `
            <div class="account-card" data-account="${account.id}">
                <div class="account-header">
                    <div class="account-icon" style="background: ${account.color}">
                        <i class="${account.icon}"></i>
                    </div>
                    <div class="account-info">
                        <h4>${account.name}</h4>
                        <span class="account-type">${this.getAccountTypeName(account.type)}</span>
                    </div>
                </div>
                <div class="account-balance">
                    <span class="balance-amount ${account.balance < 0 ? 'negative' : 'positive'}">
                        ${this.formatCurrency(account.balance, account.currency)}
                    </span>
                    ${account.type === 'credit' ? `<span class="credit-limit">Limit: ${this.formatCurrency(account.limit, account.currency)}</span>` : ''}
                </div>
                <div class="account-actions">
                    <button class="btn-icon" onclick="window.kasaBankaModule.viewAccountDetails(${account.id})" title="Detay">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="window.kasaBankaModule.addMovement(${account.id})" title="Hareket Ekle">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderDetailedAccountCards() {
        return this.accounts.map(account => `
            <div class="detailed-account-card">
                <div class="detailed-account-header">
                    <div class="account-icon" style="background: ${account.color}">
                        <i class="${account.icon}"></i>
                    </div>
                    <div class="account-details">
                        <h4>${account.name}</h4>
                        <p class="account-type">${this.getAccountTypeName(account.type)}</p>
                        ${account.iban ? `<p class="iban">IBAN: ${account.iban}</p>` : ''}
                    </div>
                </div>
                <div class="account-stats">
                    <div class="stat-item">
                        <span class="stat-label">Bakiye</span>
                        <span class="stat-value ${account.balance < 0 ? 'negative' : 'positive'}">
                            ${this.formatCurrency(account.balance, account.currency)}
                        </span>
                    </div>
                    ${account.type === 'credit' ? `
                        <div class="stat-item">
                            <span class="stat-label">Limit</span>
                            <span class="stat-value">${this.formatCurrency(account.limit, account.currency)}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Kullanılabilir</span>
                            <span class="stat-value">${this.formatCurrency(account.limit + account.balance, account.currency)}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="account-actions">
                    <button class="btn btn-sm btn-outline" onclick="window.kasaBankaModule.viewAccountDetails(${account.id})">
                        <i class="fa-solid fa-chart-line"></i>
                        Detay
                    </button>
                    <button class="btn btn-sm btn-success" onclick="window.kasaBankaModule.addMovement(${account.id})">
                        <i class="fa-solid fa-plus"></i>
                        Hareket
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="window.kasaBankaModule.editAccount(${account.id})">
                        <i class="fa-solid fa-edit"></i>
                        Düzenle
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderRecentMovements() {
        const recentMovements = this.movements.slice(0, 5);
        return recentMovements.map(movement => {
            const account = this.accounts.find(acc => acc.id === movement.accountId);
            return `
                <div class="movement-item">
                    <div class="movement-icon ${movement.type}">
                        <i class="fa-solid ${this.getMovementIcon(movement.type)}"></i>
                    </div>
                    <div class="movement-details">
                        <div class="movement-description">${movement.description}</div>
                        <div class="movement-meta">
                            ${movement.date} • ${account.name} • ${movement.category}
                        </div>
                    </div>
                    <div class="movement-amount ${movement.type}">
                        ${movement.type === 'expense' ? '-' : '+'}${this.formatCurrency(movement.amount, account.currency)}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderMovementsTable() {
        return this.filteredMovements.map(movement => {
            const account = this.accounts.find(acc => acc.id === movement.accountId);
            return `
                <tr class="movement-row">
                    <td>${movement.date}</td>
                    <td>
                        <div class="account-cell">
                            <i class="${account.icon}" style="color: ${account.color}"></i>
                            ${account.name}
                        </div>
                    </td>
                    <td>
                        <span class="type-badge ${movement.type}">
                            <i class="fa-solid ${this.getMovementIcon(movement.type)}"></i>
                            ${this.getMovementTypeName(movement.type)}
                        </span>
                    </td>
                    <td>${movement.description}</td>
                    <td><span class="category-tag">${movement.category}</span></td>
                    <td>${movement.person}</td>
                    <td><span class="reference">${movement.reference}</span></td>
                    <td>
                        <span class="amount ${movement.type}">
                            ${movement.type === 'expense' ? '-' : '+'}${this.formatCurrency(movement.amount, account.currency)}
                        </span>
                    </td>
                    <td class="actions">
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="window.kasaBankaModule.viewMovement(${movement.id})" title="Detay">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="window.kasaBankaModule.editMovement(${movement.id})" title="Düzenle">
                                <i class="fa-solid fa-edit"></i>
                            </button>
                            <button class="btn-icon danger" onclick="window.kasaBankaModule.deleteMovement(${movement.id})" title="Sil">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    applyFilters() {
        const accountFilter = document.getElementById('accountFilter')?.value || 'all';
        const typeFilter = document.getElementById('typeFilter')?.value || 'all';
        const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
        const searchInput = document.getElementById('searchMovements')?.value.toLowerCase() || '';

        this.filteredMovements = this.movements.filter(movement => {
            const matchesAccount = accountFilter === 'all' || movement.accountId.toString() === accountFilter;
            const matchesType = typeFilter === 'all' || movement.type === typeFilter;
            const matchesCategory = categoryFilter === 'all' || movement.category === categoryFilter;
            const matchesSearch = !searchInput || 
                movement.description.toLowerCase().includes(searchInput) ||
                movement.reference.toLowerCase().includes(searchInput) ||
                movement.person.toLowerCase().includes(searchInput);

            return matchesAccount && matchesType && matchesCategory && matchesSearch;
        });

        // Update table
        const tableBody = document.getElementById('movementsTableBody');
        if (tableBody) {
            tableBody.innerHTML = this.renderMovementsTable();
        }
    }

    updateSummaryCards() {
        const totalCash = this.accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
        const todayMovements = this.movements.filter(m => m.date === '2024-01-15');
        const dailyIncome = todayMovements.filter(m => m.type === 'income').reduce((sum, m) => sum + m.amount, 0);
        const dailyExpense = todayMovements.filter(m => m.type === 'expense').reduce((sum, m) => sum + m.amount, 0);
        const netFlow = dailyIncome - dailyExpense;

        document.getElementById('totalCash').textContent = this.formatCurrency(totalCash);
        document.getElementById('dailyIncome').textContent = this.formatCurrency(dailyIncome);
        document.getElementById('dailyExpense').textContent = this.formatCurrency(dailyExpense);
        document.getElementById('netFlow').textContent = this.formatCurrency(netFlow);
    }

    // Utility methods
    getAccountTypeName(type) {
        const types = {
            'cash': 'Kasa',
            'bank': 'Banka',
            'credit': 'Kredi Kartı'
        };
        return types[type] || type;
    }

    getMovementIcon(type) {
        const icons = {
            'income': 'fa-arrow-up',
            'expense': 'fa-arrow-down',
            'transfer': 'fa-exchange-alt'
        };
        return icons[type] || 'fa-circle';
    }

    getMovementTypeName(type) {
        const types = {
            'income': 'Gelir',
            'expense': 'Gider',
            'transfer': 'Transfer'
        };
        return types[type] || type;
    }

    formatCurrency(amount, currency = 'TL') {
        const formatted = new Intl.NumberFormat('tr-TR').format(Math.abs(amount));
        return currency === 'TL' ? `₺${formatted}` : `${formatted} ${currency}`;
    }

    // Action methods (placeholders)
    showNewMovementModal() {
        console.log('Yeni hareket modalı açılacak');
    }

    showTransferModal() {
        console.log('Transfer modalı açılacak');
    }

    generateReport() {
        console.log('Rapor oluşturuluyor');
    }

    exportToExcel() {
        console.log('Excel\'e aktarılıyor');
    }

    showAddAccountModal() {
        console.log('Yeni hesap modalı açılacak');
    }

    viewAccountDetails(accountId) {
        console.log(`Hesap detayı: ${accountId}`);
    }

    addMovement(accountId) {
        console.log(`Hesaba hareket ekleniyor: ${accountId}`);
    }

    editAccount(accountId) {
        console.log(`Hesap düzenleniyor: ${accountId}`);
    }

    viewMovement(movementId) {
        console.log(`Hareket detayı: ${movementId}`);
    }

    editMovement(movementId) {
        console.log(`Hareket düzenleniyor: ${movementId}`);
    }

    deleteMovement(movementId) {
        if (confirm('Bu hareketi silmek istediğinizden emin misiniz?')) {
            console.log(`Hareket siliniyor: ${movementId}`);
        }
    }

    hideWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    addStyles() {
        // Remove existing styles
        const existingStyles = document.getElementById('kasabanka-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'kasabanka-styles';
        style.textContent = `
            .kasabanka-container {
                padding: 20px;
                background: #f8f9fa;
                min-height: calc(100vh - 200px);
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            /* Header */
            .kasabanka-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

            .btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }

            .btn-success {
                background: #2e7d32;
                color: white;
            }

            .btn-success:hover {
                background: #1b5e20;
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

            .btn-sm {
                padding: 6px 12px;
                font-size: 12px;
            }

            /* Summary Cards */
            .summary-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }

            .summary-card {
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 16px;
                transition: transform 0.2s ease;
            }

            .summary-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .summary-card .card-icon {
                width: 60px;
                height: 60px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
            }

            .total-cash .card-icon { background: linear-gradient(135deg, #2e7d32, #4caf50); }
            .daily-income .card-icon { background: linear-gradient(135deg, #1976d2, #42a5f5); }
            .daily-expense .card-icon { background: linear-gradient(135deg, #d32f2f, #ef5350); }
            .net-flow .card-icon { background: linear-gradient(135deg, #7b1fa2, #ab47bc); }

            .summary-card .card-content h3 {
                margin: 0 0 4px 0;
                font-size: 28px;
                font-weight: 700;
                color: #1f2937;
            }

            .summary-card .card-content p {
                margin: 0 0 8px 0;
                color: #6b7280;
                font-size: 14px;
            }

            .trend {
                font-size: 12px;
                font-weight: 600;
                padding: 4px 8px;
                border-radius: 4px;
            }

            .trend.positive {
                background: #dcfce7;
                color: #166534;
            }

            .trend.negative {
                background: #fef2f2;
                color: #dc2626;
            }

            /* View Switcher */
            .view-switcher {
                display: flex;
                background: white;
                border-radius: 12px;
                padding: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                gap: 4px;
            }

            .view-btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 20px;
                border: none;
                background: transparent;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: #6b7280;
                font-size: 14px;
                font-weight: 500;
            }

            .view-btn:hover {
                background: #f3f4f6;
                color: #374151;
            }

            .view-btn.active {
                background: #2e7d32;
                color: white;
            }

            /* Content Area */
            .content-area {
                flex: 1;
                position: relative;
            }

            .view-content {
                display: none;
            }

            .view-content.active {
                display: block;
            }

            /* Dashboard View */
            .dashboard-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 20px;
            }

            .accounts-section h3,
            .recent-movements h3 {
                margin: 0 0 16px 0;
                color: #1f2937;
                font-size: 20px;
                font-weight: 600;
            }

            /* Account Cards */
            .accounts-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 16px;
            }

            .account-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: transform 0.2s ease;
            }

            .account-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .account-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
            }

            .account-icon {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
            }

            .account-info h4 {
                margin: 0 0 4px 0;
                color: #1f2937;
                font-size: 16px;
                font-weight: 600;
            }

            .account-type {
                color: #6b7280;
                font-size: 12px;
            }

            .account-balance {
                margin-bottom: 16px;
            }

            .balance-amount {
                display: block;
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 4px;
            }

            .balance-amount.positive {
                color: #059669;
            }

            .balance-amount.negative {
                color: #dc2626;
            }

            .credit-limit {
                color: #6b7280;
                font-size: 12px;
            }

            .account-actions {
                display: flex;
                gap: 8px;
            }

            .btn-icon {
                width: 32px;
                height: 32px;
                border-radius: 6px;
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

            .btn-icon.danger:hover {
                background: #fef2f2;
                color: #dc2626;
            }

            /* Recent Movements */
            .recent-movements {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .movements-list {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .movement-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: 8px;
                transition: background 0.2s ease;
            }

            .movement-item:hover {
                background: #f8f9fa;
            }

            .movement-icon {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
            }

            .movement-icon.income {
                background: #059669;
            }

            .movement-icon.expense {
                background: #dc2626;
            }

            .movement-icon.transfer {
                background: #7c3aed;
            }

            .movement-details {
                flex: 1;
            }

            .movement-description {
                font-weight: 500;
                color: #1f2937;
                margin-bottom: 4px;
            }

            .movement-meta {
                color: #6b7280;
                font-size: 12px;
            }

            .movement-amount {
                font-weight: 600;
                font-size: 16px;
            }

            .movement-amount.income {
                color: #059669;
            }

            .movement-amount.expense {
                color: #dc2626;
            }

            .movement-amount.transfer {
                color: #7c3aed;
            }

            /* Movements View */
            .movements-filters {
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

            /* Movements Table */
            .movements-table-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
                max-width: 100%;
                overflow-x: auto;
            }

            .movements-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
                min-width: 1200px;
            }

            .movements-table th {
                background: #f8f9fa;
                padding: 16px 12px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
                font-weight: 600;
                color: #374151;
                white-space: nowrap;
            }

            .movements-table td {
                padding: 16px 12px;
                border-bottom: 1px solid #f3f4f6;
                vertical-align: middle;
            }

            .movement-row:hover {
                background: #f8f9fa;
            }

            .account-cell {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .type-badge {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
            }

            .type-badge.income {
                background: #dcfce7;
                color: #166534;
            }

            .type-badge.expense {
                background: #fef2f2;
                color: #dc2626;
            }

            .type-badge.transfer {
                background: #ede9fe;
                color: #7c3aed;
            }

            .category-tag {
                background: #f3f4f6;
                color: #374151;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
            }

            .reference {
                font-family: monospace;
                background: #f8f9fa;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 12px;
            }

            .amount {
                font-weight: 600;
                font-size: 16px;
            }

            .amount.income {
                color: #059669;
            }

            .amount.expense {
                color: #dc2626;
            }

            .amount.transfer {
                color: #7c3aed;
            }

            .actions {
                text-align: center;
                width: 120px;
                min-width: 120px;
                padding: 8px !important;
            }

            .action-buttons {
                display: flex;
                gap: 4px;
                justify-content: center;
                min-width: 100px;
            }

            /* Accounts Management */
            .accounts-management {
                background: white;
                border-radius: 12px;
                padding: 24px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .accounts-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            }

            .accounts-header h3 {
                margin: 0;
                color: #1f2937;
                font-size: 20px;
                font-weight: 600;
            }

            .accounts-detailed-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 20px;
            }

            .detailed-account-card {
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 20px;
                transition: transform 0.2s ease;
            }

            .detailed-account-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .detailed-account-header {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 20px;
            }

            .account-details h4 {
                margin: 0 0 4px 0;
                color: #1f2937;
                font-size: 18px;
                font-weight: 600;
            }

            .account-details p {
                margin: 0 0 4px 0;
                color: #6b7280;
                font-size: 14px;
            }

            .iban {
                font-family: monospace;
                font-size: 12px !important;
            }

            .account-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 16px;
                margin-bottom: 20px;
            }

            .stat-item {
                text-align: center;
                padding: 12px;
                background: #f8f9fa;
                border-radius: 8px;
            }

            .stat-label {
                display: block;
                color: #6b7280;
                font-size: 12px;
                margin-bottom: 4px;
            }

            .stat-value {
                display: block;
                font-weight: 600;
                font-size: 16px;
                color: #1f2937;
            }

            .stat-value.positive {
                color: #059669;
            }

            .stat-value.negative {
                color: #dc2626;
            }

            /* Responsive Design */
            @media (max-width: 1024px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                }

                .accounts-detailed-grid {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 768px) {
                .kasabanka-header {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center;
                }

                .header-actions {
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .summary-cards {
                    grid-template-columns: repeat(2, 1fr);
                }

                .filter-row {
                    grid-template-columns: 1fr;
                }

                .movements-table-container {
                    font-size: 12px;
                }
            }

            @media (max-width: 480px) {
                .summary-cards {
                    grid-template-columns: 1fr;
                }

                .view-switcher {
                    flex-direction: column;
                }

                .accounts-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;

        document.head.appendChild(style);

        // Make module globally accessible
        window.kasaBankaModule = this;
    }
}
