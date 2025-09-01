// Maaş Module
export class MaasModule {
    constructor() {
        this.name = 'Maaş';
        this.currentMonth = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
        this.maasData = [];
        this.selectedRows = new Set();
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Maaş & Bordro Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="maas-container">
                    <!-- Header -->
                    <div class="maas-header">
                        <div class="header-left">
                            <h2>Maaş & Bordro Yönetimi</h2>
                            <p>Personel maaşları, bordro hesaplamaları ve ödeme takibi</p>
                        </div>
                        <div class="header-actions">
                            <button class="btn btn-success" id="newBordroBtn">
                                <i class="fa-solid fa-plus"></i>
                                Yeni Bordro
                            </button>
                            <button class="btn btn-success" id="calculateAllBtn">
                                <i class="fa-solid fa-calculator"></i>
                                Toplu Hesapla
                            </button>
                            <button class="btn btn-success" id="exportExcelBtn">
                                <i class="fa-solid fa-file-excel"></i>
                                Excel Aktar
                            </button>
                            <button class="btn btn-success" id="printBordroBtn">
                                <i class="fa-solid fa-print"></i>
                                Bordro Yazdır
                            </button>
                        </div>
                    </div>

                    <!-- Period Selector & Stats -->
                    <div class="period-stats-container">
                        <div class="period-selector">
                            <div class="period-controls">
                                <label>Dönem Seçimi:</label>
                                <select class="period-select" id="monthSelect">
                                    <option value="1">Ocak</option>
                                    <option value="2">Şubat</option>
                                    <option value="3">Mart</option>
                                    <option value="4">Nisan</option>
                                    <option value="5">Mayıs</option>
                                    <option value="6">Haziran</option>
                                    <option value="7">Temmuz</option>
                                    <option value="8">Ağustos</option>
                                    <option value="9">Eylül</option>
                                    <option value="10">Ekim</option>
                                    <option value="11">Kasım</option>
                                    <option value="12">Aralık</option>
                                </select>
                                <select class="period-select" id="yearSelect">
                                    <option value="2023">2023</option>
                                    <option value="2024" selected>2024</option>
                                    <option value="2025">2025</option>
                                </select>
                                <button class="btn btn-outline" id="loadPeriodBtn">
                                    <i class="fa-solid fa-search"></i>
                                    Getir
                                </button>
                            </div>
                        </div>

                        <div class="maas-stats">
                            <div class="stat-card total">
                                <div class="stat-icon">
                                    <i class="fa-solid fa-users"></i>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-number" id="totalEmployees">0</span>
                                    <span class="stat-label">Toplam Personel</span>
                                </div>
                            </div>
                            <div class="stat-card gross">
                                <div class="stat-icon">
                                    <i class="fa-solid fa-money-bill-wave"></i>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-number" id="totalGross">₺0</span>
                                    <span class="stat-label">Brüt Toplam</span>
                                </div>
                            </div>
                            <div class="stat-card net">
                                <div class="stat-icon">
                                    <i class="fa-solid fa-hand-holding-dollar"></i>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-number" id="totalNet">₺0</span>
                                    <span class="stat-label">Net Toplam</span>
                                </div>
                            </div>
                            <div class="stat-card tax">
                                <div class="stat-icon">
                                    <i class="fa-solid fa-percent"></i>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-number" id="totalTax">₺0</span>
                                    <span class="stat-label">Vergi & SGK</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Filters -->
                    <div class="maas-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Departman</label>
                                <select class="filter-select" id="departmanFilter">
                                    <option value="">Tümü</option>
                                    <option value="muhendislik">Mühendislik</option>
                                    <option value="saha">Saha</option>
                                    <option value="idari">İdari</option>
                                    <option value="guvenlik">Güvenlik</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Ödeme Durumu</label>
                                <select class="filter-select" id="paymentStatusFilter">
                                    <option value="">Tümü</option>
                                    <option value="odendi">Ödendi</option>
                                    <option value="bekliyor">Ödeme Bekliyor</option>
                                    <option value="gecikti">Gecikti</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Maaş Aralığı</label>
                                <select class="filter-select" id="salaryRangeFilter">
                                    <option value="">Tümü</option>
                                    <option value="0-15000">₺0 - ₺15,000</option>
                                    <option value="15000-25000">₺15,000 - ₺25,000</option>
                                    <option value="25000-35000">₺25,000 - ₺35,000</option>
                                    <option value="35000+">₺35,000+</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <div class="bulk-actions">
                                    <button class="btn btn-sm btn-success" id="selectAllBtn">
                                        <i class="fa-solid fa-check-double"></i>
                                        Tümünü Seç
                                    </button>
                                    <button class="btn btn-sm btn-success" id="markPaidBtn" disabled>
                                        <i class="fa-solid fa-check"></i>
                                        Ödendi İşaretle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Excel-like Table -->
                    <div class="excel-table-container">
                        <div class="table-wrapper">
                            <table class="excel-table" id="maasTable">
                                <thead>
                                    <tr>
                                        <th class="checkbox-col">
                                            <input type="checkbox" id="selectAllCheckbox">
                                        </th>
                                        <th class="sticky-col">Personel</th>
                                        <th>Sicil No</th>
                                        <th>Departman</th>
                                        <th>Pozisyon</th>
                                        <th>Giriş Tarihi</th>
                                        <th>Çalışılan Gün</th>
                                        <th class="amount-col">Brüt Maaş</th>
                                        <th class="amount-col">Prim</th>
                                        <th class="amount-col">Mesai</th>
                                        <th class="amount-col">Yemek</th>
                                        <th class="amount-col">Ulaşım</th>
                                        <th class="amount-col">Brüt Toplam</th>
                                        <th class="amount-col">SGK (%14)</th>
                                        <th class="amount-col">İşsizlik (%1)</th>
                                        <th class="amount-col">Gelir Vergisi</th>
                                        <th class="amount-col">Damga Vergisi</th>
                                        <th class="amount-col">Toplam Kesinti</th>
                                        <th class="amount-col net-col">Net Maaş</th>
                                        <th>Ödeme Tarihi</th>
                                        <th>Durum</th>
                                        <th class="action-col">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody id="maasTableBody">
                                    <!-- Dinamik içerik buraya gelecek -->
                                </tbody>
                                <tfoot>
                                    <tr class="total-row">
                                        <td colspan="7" class="total-label">TOPLAM:</td>
                                        <td class="amount-col total-amount" id="totalBrutMaas">₺0</td>
                                        <td class="amount-col total-amount" id="totalPrim">₺0</td>
                                        <td class="amount-col total-amount" id="totalMesai">₺0</td>
                                        <td class="amount-col total-amount" id="totalYemek">₺0</td>
                                        <td class="amount-col total-amount" id="totalUlasim">₺0</td>
                                        <td class="amount-col total-amount" id="totalBrutToplam">₺0</td>
                                        <td class="amount-col total-amount" id="totalSGK">₺0</td>
                                        <td class="amount-col total-amount" id="totalIssizlik">₺0</td>
                                        <td class="amount-col total-amount" id="totalGelirVergisi">₺0</td>
                                        <td class="amount-col total-amount" id="totalDamgaVergisi">₺0</td>
                                        <td class="amount-col total-amount" id="totalKesinti">₺0</td>
                                        <td class="amount-col total-amount net-total" id="totalNetMaas">₺0</td>
                                        <td colspan="3"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <!-- Payment Summary -->
                    <div class="payment-summary">
                        <div class="summary-card">
                            <h4>Ödeme Özeti</h4>
                            <div class="summary-stats">
                                <div class="summary-item paid">
                                    <span class="summary-count" id="paidCount">0</span>
                                    <span class="summary-label">Ödenen</span>
                                </div>
                                <div class="summary-item pending">
                                    <span class="summary-count" id="pendingCount">0</span>
                                    <span class="summary-label">Bekleyen</span>
                                </div>
                                <div class="summary-item overdue">
                                    <span class="summary-count" id="overdueCount">0</span>
                                    <span class="summary-label">Geciken</span>
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
        this.loadMaasData();
        this.initEventListeners();
        this.initPeriodSelectors();
        this.addStyles();
    }

    loadMaasData() {
        // Örnek maaş verileri
        this.maasData = [
            {
                id: 1,
                name: 'Ahmet Yılmaz',
                sicilNo: 'AY001',
                departman: 'Mühendislik',
                pozisyon: 'Şantiye Mühendisi',
                girisTarihi: '15.03.2020',
                calisanGun: 30,
                brutMaas: 25000,
                prim: 2500,
                mesai: 1200,
                yemek: 900,
                ulasim: 600,
                odemeTarihi: '01.12.2024',
                durum: 'odendi'
            },
            {
                id: 2,
                name: 'Elif Demir',
                sicilNo: 'ED002',
                departman: 'Mühendislik',
                pozisyon: 'Mimar',
                girisTarihi: '10.06.2021',
                calisanGun: 28,
                brutMaas: 22000,
                prim: 1800,
                mesai: 800,
                yemek: 840,
                ulasim: 600,
                odemeTarihi: null,
                durum: 'bekliyor'
            },
            {
                id: 3,
                name: 'Mehmet Kaya',
                sicilNo: 'MK003',
                departman: 'Saha',
                pozisyon: 'Formen',
                girisTarihi: '20.01.2019',
                calisanGun: 30,
                brutMaas: 18000,
                prim: 1500,
                mesai: 2000,
                yemek: 900,
                ulasim: 500,
                odemeTarihi: '28.11.2024',
                durum: 'gecikti'
            },
            {
                id: 4,
                name: 'Zeynep Çelik',
                sicilNo: 'ZC004',
                departman: 'Güvenlik',
                pozisyon: 'İş Güvenliği Uzmanı',
                girisTarihi: '05.09.2022',
                calisanGun: 30,
                brutMaas: 20000,
                prim: 1000,
                mesai: 600,
                yemek: 900,
                ulasim: 600,
                odemeTarihi: '01.12.2024',
                durum: 'odendi'
            },
            {
                id: 5,
                name: 'Fatma Özkan',
                sicilNo: 'FO005',
                departman: 'İdari',
                pozisyon: 'İK Uzmanı',
                girisTarihi: '08.04.2020',
                calisanGun: 30,
                brutMaas: 21000,
                prim: 1200,
                mesai: 400,
                yemek: 900,
                ulasim: 600,
                odemeTarihi: null,
                durum: 'bekliyor'
            },
            {
                id: 6,
                name: 'Can Özdemir',
                sicilNo: 'CO006',
                departman: 'Saha',
                pozisyon: 'Tekniker',
                girisTarihi: '12.11.2021',
                calisanGun: 30,
                brutMaas: 16000,
                prim: 800,
                mesai: 1500,
                yemek: 900,
                ulasim: 500,
                odemeTarihi: null,
                durum: 'bekliyor'
            }
        ];

        this.filteredData = [...this.maasData];
        this.renderTable();
        this.updateStats();
        this.updatePaymentSummary();
    }

    calculateSalary(employee) {
        const brutToplam = employee.brutMaas + employee.prim + employee.mesai + employee.yemek + employee.ulasim;
        
        // Kesintiler
        const sgk = Math.round(brutToplam * 0.14); // %14 SGK
        const issizlik = Math.round(brutToplam * 0.01); // %1 İşsizlik
        const gelirVergisi = this.calculateIncomeTax(brutToplam); // Gelir vergisi
        const damgaVergisi = Math.round(brutToplam * 0.00759); // %0.759 Damga vergisi
        
        const toplamKesinti = sgk + issizlik + gelirVergisi + damgaVergisi;
        const netMaas = brutToplam - toplamKesinti;

        return {
            brutToplam,
            sgk,
            issizlik,
            gelirVergisi,
            damgaVergisi,
            toplamKesinti,
            netMaas
        };
    }

    calculateIncomeTax(brutToplam) {
        // Basitleştirilmiş gelir vergisi hesabı
        if (brutToplam <= 22000) return Math.round(brutToplam * 0.15);
        if (brutToplam <= 49000) return Math.round(brutToplam * 0.20);
        return Math.round(brutToplam * 0.27);
    }

    renderTable() {
        const tbody = document.getElementById('maasTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.filteredData.map(employee => {
            const calculations = this.calculateSalary(employee);
            const isSelected = this.selectedRows.has(employee.id);
            
            return `
                <tr class="salary-row ${isSelected ? 'selected' : ''}" data-id="${employee.id}">
                    <td class="checkbox-col">
                        <input type="checkbox" class="row-checkbox" data-id="${employee.id}" ${isSelected ? 'checked' : ''}>
                    </td>
                    <td class="sticky-col employee-name">
                        <div class="employee-info">
                            <div class="employee-avatar">${employee.name.split(' ').map(n => n[0]).join('')}</div>
                            <span>${employee.name}</span>
                        </div>
                    </td>
                    <td>${employee.sicilNo}</td>
                    <td>${employee.departman}</td>
                    <td>${employee.pozisyon}</td>
                    <td>${employee.girisTarihi}</td>
                    <td class="text-center">${employee.calisanGun}</td>
                    <td class="amount-col">${this.formatCurrency(employee.brutMaas)}</td>
                    <td class="amount-col">${this.formatCurrency(employee.prim)}</td>
                    <td class="amount-col">${this.formatCurrency(employee.mesai)}</td>
                    <td class="amount-col">${this.formatCurrency(employee.yemek)}</td>
                    <td class="amount-col">${this.formatCurrency(employee.ulasim)}</td>
                    <td class="amount-col brut-total">${this.formatCurrency(calculations.brutToplam)}</td>
                    <td class="amount-col">${this.formatCurrency(calculations.sgk)}</td>
                    <td class="amount-col">${this.formatCurrency(calculations.issizlik)}</td>
                    <td class="amount-col">${this.formatCurrency(calculations.gelirVergisi)}</td>
                    <td class="amount-col">${this.formatCurrency(calculations.damgaVergisi)}</td>
                    <td class="amount-col kesinti-total">${this.formatCurrency(calculations.toplamKesinti)}</td>
                    <td class="amount-col net-col net-amount">${this.formatCurrency(calculations.netMaas)}</td>
                    <td>${employee.odemeTarihi || '-'}</td>
                    <td>
                        <span class="status-badge ${employee.durum}">
                            ${this.getStatusText(employee.durum)}
                        </span>
                    </td>
                    <td class="action-col">
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="window.maasModule.viewBordro(${employee.id})" title="Bordro Görüntüle">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button class="btn-icon" onclick="window.maasModule.editSalary(${employee.id})" title="Düzenle">
                                <i class="fa-solid fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="window.maasModule.printBordro(${employee.id})" title="Bordro Yazdır">
                                <i class="fa-solid fa-print"></i>
                            </button>
                            <button class="btn-icon ${employee.durum === 'odendi' ? 'disabled' : ''}" 
                                    onclick="window.maasModule.markAsPaid(${employee.id})" 
                                    title="Ödendi İşaretle"
                                    ${employee.durum === 'odendi' ? 'disabled' : ''}>
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        this.updateTotals();
        
        // Global erişim için
        window.maasModule = this;
    }

    updateTotals() {
        const totals = this.filteredData.reduce((acc, employee) => {
            const calc = this.calculateSalary(employee);
            acc.brutMaas += employee.brutMaas;
            acc.prim += employee.prim;
            acc.mesai += employee.mesai;
            acc.yemek += employee.yemek;
            acc.ulasim += employee.ulasim;
            acc.brutToplam += calc.brutToplam;
            acc.sgk += calc.sgk;
            acc.issizlik += calc.issizlik;
            acc.gelirVergisi += calc.gelirVergisi;
            acc.damgaVergisi += calc.damgaVergisi;
            acc.toplamKesinti += calc.toplamKesinti;
            acc.netMaas += calc.netMaas;
            return acc;
        }, {
            brutMaas: 0, prim: 0, mesai: 0, yemek: 0, ulasim: 0,
            brutToplam: 0, sgk: 0, issizlik: 0, gelirVergisi: 0,
            damgaVergisi: 0, toplamKesinti: 0, netMaas: 0
        });

        // Footer totals update
        Object.keys(totals).forEach(key => {
            const element = document.getElementById(`total${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) {
                element.textContent = this.formatCurrency(totals[key]);
            }
        });
    }

    getStatusText(status) {
        const statusMap = {
            'odendi': 'Ödendi',
            'bekliyor': 'Ödeme Bekliyor',
            'gecikti': 'Gecikti'
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

    initEventListeners() {
        // Checkbox selections
        document.getElementById('selectAllCheckbox')?.addEventListener('change', (e) => {
            this.selectAll(e.target.checked);
        });

        // Row checkboxes
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('row-checkbox')) {
                const id = parseInt(e.target.dataset.id);
                if (e.target.checked) {
                    this.selectedRows.add(id);
                } else {
                    this.selectedRows.delete(id);
                }
                this.updateBulkActionButtons();
                this.updateRowSelection(id);
            }
        });

        // Bulk actions
        document.getElementById('selectAllBtn')?.addEventListener('click', () => {
            this.selectAll(true);
        });

        document.getElementById('markPaidBtn')?.addEventListener('click', () => {
            this.markSelectedAsPaid();
        });

        // Filters
        ['departmanFilter', 'paymentStatusFilter', 'salaryRangeFilter'].forEach(filterId => {
            document.getElementById(filterId)?.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Header buttons
        document.getElementById('exportExcelBtn')?.addEventListener('click', () => {
            this.exportToExcel();
        });

        document.getElementById('calculateAllBtn')?.addEventListener('click', () => {
            this.calculateAllSalaries();
        });
    }

    initPeriodSelectors() {
        const monthSelect = document.getElementById('monthSelect');
        const yearSelect = document.getElementById('yearSelect');
        
        if (monthSelect) monthSelect.value = this.currentMonth;
        if (yearSelect) yearSelect.value = this.currentYear;
    }

    selectAll(checked) {
        this.selectedRows.clear();
        if (checked) {
            this.filteredData.forEach(emp => this.selectedRows.add(emp.id));
        }
        
        document.querySelectorAll('.row-checkbox').forEach(cb => {
            cb.checked = checked;
        });
        
        document.querySelectorAll('.salary-row').forEach(row => {
            row.classList.toggle('selected', checked);
        });
        
        this.updateBulkActionButtons();
    }

    updateBulkActionButtons() {
        const markPaidBtn = document.getElementById('markPaidBtn');
        if (markPaidBtn) {
            markPaidBtn.disabled = this.selectedRows.size === 0;
        }
    }

    updateRowSelection(id) {
        const row = document.querySelector(`[data-id="${id}"]`);
        if (row) {
            row.classList.toggle('selected', this.selectedRows.has(id));
        }
    }

    applyFilters() {
        const departmanFilter = document.getElementById('departmanFilter')?.value || '';
        const paymentStatusFilter = document.getElementById('paymentStatusFilter')?.value || '';
        const salaryRangeFilter = document.getElementById('salaryRangeFilter')?.value || '';

        this.filteredData = this.maasData.filter(employee => {
            const calc = this.calculateSalary(employee);
            
            const matchesDepartman = !departmanFilter || 
                employee.departman.toLowerCase().includes(departmanFilter.toLowerCase());
            
            const matchesPaymentStatus = !paymentStatusFilter || 
                employee.durum === paymentStatusFilter;
            
            let matchesSalaryRange = true;
            if (salaryRangeFilter) {
                const netSalary = calc.netMaas;
                if (salaryRangeFilter === '0-15000') matchesSalaryRange = netSalary <= 15000;
                else if (salaryRangeFilter === '15000-25000') matchesSalaryRange = netSalary > 15000 && netSalary <= 25000;
                else if (salaryRangeFilter === '25000-35000') matchesSalaryRange = netSalary > 25000 && netSalary <= 35000;
                else if (salaryRangeFilter === '35000+') matchesSalaryRange = netSalary > 35000;
            }

            return matchesDepartman && matchesPaymentStatus && matchesSalaryRange;
        });

        this.renderTable();
        this.updateStats();
        this.updatePaymentSummary();
    }

    updateStats() {
        const totalEmployees = this.filteredData.length;
        const totalGross = this.filteredData.reduce((sum, emp) => {
            return sum + this.calculateSalary(emp).brutToplam;
        }, 0);
        const totalNet = this.filteredData.reduce((sum, emp) => {
            return sum + this.calculateSalary(emp).netMaas;
        }, 0);
        const totalTax = totalGross - totalNet;

        document.getElementById('totalEmployees').textContent = totalEmployees;
        document.getElementById('totalGross').textContent = this.formatCurrency(totalGross);
        document.getElementById('totalNet').textContent = this.formatCurrency(totalNet);
        document.getElementById('totalTax').textContent = this.formatCurrency(totalTax);
    }

    updatePaymentSummary() {
        const paid = this.filteredData.filter(emp => emp.durum === 'odendi').length;
        const pending = this.filteredData.filter(emp => emp.durum === 'bekliyor').length;
        const overdue = this.filteredData.filter(emp => emp.durum === 'gecikti').length;

        document.getElementById('paidCount').textContent = paid;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('overdueCount').textContent = overdue;
    }

    // Action methods
    viewBordro(id) {
        const employee = this.maasData.find(emp => emp.id === id);
        console.log('Viewing bordro for:', employee?.name);
    }

    editSalary(id) {
        const employee = this.maasData.find(emp => emp.id === id);
        console.log('Editing salary for:', employee?.name);
    }

    printBordro(id) {
        const employee = this.maasData.find(emp => emp.id === id);
        console.log('Printing bordro for:', employee?.name);
        window.print();
    }

    markAsPaid(id) {
        const employee = this.maasData.find(emp => emp.id === id);
        if (employee && employee.durum !== 'odendi') {
            employee.durum = 'odendi';
            employee.odemeTarihi = new Date().toLocaleDateString('tr-TR');
            this.renderTable();
            this.updateStats();
            this.updatePaymentSummary();
        }
    }

    markSelectedAsPaid() {
        if (this.selectedRows.size === 0) return;
        
        if (confirm(`${this.selectedRows.size} personelin maaşını ödendi olarak işaretlemek istediğinizden emin misiniz?`)) {
            this.selectedRows.forEach(id => {
                this.markAsPaid(id);
            });
            this.selectedRows.clear();
            this.updateBulkActionButtons();
        }
    }

    calculateAllSalaries() {
        console.log('Calculating all salaries...');
        this.renderTable();
    }

    exportToExcel() {
        console.log('Exporting to Excel...');
        // Excel export functionality would go here
    }

    addStyles() {
        const existingStyles = document.getElementById('maas-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'maas-styles';
        style.textContent = `
            .maas-container {
                padding: 20px;
                background: #f8f9fa;
                min-height: calc(100vh - 200px);
            }
            
            /* Header */
            .maas-header {
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
                flex-wrap: wrap;
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
            
            .btn-sm {
                padding: 8px 16px;
                font-size: 12px;
            }
            
            .btn-warning {
                background: #ff9800;
                color: white;
            }
            
            .btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none !important;
            }
            
            /* Period & Stats */
            .period-stats-container {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 24px;
                margin-bottom: 24px;
            }
            
            .period-selector {
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .period-controls {
                display: flex;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            
            .period-controls label {
                font-weight: 600;
                color: #374151;
                white-space: nowrap;
            }
            
            .period-select {
                padding: 8px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                background: white;
            }
            
            .maas-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
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
            }
            
            .stat-card.total .stat-icon {
                background: #2e7d32;
            }
            
            .stat-card.gross .stat-icon {
                background: #1976d2;
            }
            
            .stat-card.net .stat-icon {
                background: #388e3c;
            }
            
            .stat-card.tax .stat-icon {
                background: #f57c00;
            }
            
            .stat-info {
                display: flex;
                flex-direction: column;
            }
            
            .stat-number {
                font-size: 20px;
                font-weight: 700;
                color: #1f2937;
                line-height: 1;
            }
            
            .stat-label {
                font-size: 12px;
                color: #6b7280;
                margin-top: 4px;
            }
            
            /* Filters */
            .maas-filters {
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
            }
            
            .bulk-actions {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            /* Excel Table */
            .excel-table-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 24px;
                overflow: hidden;
            }
            
            .table-wrapper {
                overflow-x: auto;
                max-height: 600px;
                overflow-y: auto;
            }
            
            .excel-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                min-width: 1800px;
            }
            
            .excel-table th {
                background: #f8f9fa;
                padding: 12px 8px;
                text-align: center;
                border: 1px solid #e5e7eb;
                font-weight: 600;
                color: #374151;
                white-space: nowrap;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            
            .excel-table td {
                padding: 10px 8px;
                border: 1px solid #e5e7eb;
                text-align: center;
                white-space: nowrap;
                font-size: 11px;
            }
            
            .sticky-col {
                position: sticky;
                left: 45px;
                background: white;
                z-index: 5;
                min-width: 180px;
                text-align: left !important;
            }
            
            .checkbox-col {
                position: sticky;
                left: 0;
                background: white;
                z-index: 5;
                width: 45px;
                min-width: 45px;
            }
            
            .amount-col {
                text-align: right !important;
                font-weight: 500;
                min-width: 90px;
            }
            
            .net-col {
                background: #f0f9ff !important;
                font-weight: 700 !important;
            }
            
            .action-col {
                position: sticky;
                right: 0;
                background: white;
                z-index: 5;
                min-width: 120px;
            }
            
            .employee-info {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .employee-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #2e7d32;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: 600;
                flex-shrink: 0;
            }
            
            .salary-row:hover {
                background: #f8f9fa;
            }
            
            .salary-row.selected {
                background: #e3f2fd;
            }
            
            .status-badge {
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .status-badge.odendi {
                background: #d4edda;
                color: #155724;
            }
            
            .status-badge.bekliyor {
                background: #fff3cd;
                color: #856404;
            }
            
            .status-badge.gecikti {
                background: #f8d7da;
                color: #721c24;
            }
            
            .action-buttons {
                display: flex;
                gap: 4px;
                justify-content: center;
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
            
            .btn-icon:disabled,
            .btn-icon.disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            /* Total Row */
            .total-row {
                background: #f8f9fa !important;
                font-weight: 700;
            }
            
            .total-label {
                text-align: center !important;
                font-weight: 700;
                color: #1f2937;
            }
            
            .total-amount {
                color: #1f2937 !important;
                font-weight: 700 !important;
            }
            
            .net-total {
                background: #e8f5e8 !important;
                color: #2e7d32 !important;
            }
            
            /* Payment Summary */
            .payment-summary {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                padding: 24px;
            }
            
            .summary-card h4 {
                margin: 0 0 16px 0;
                color: #1f2937;
                font-size: 18px;
            }
            
            .summary-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            
            .summary-item {
                text-align: center;
                padding: 16px;
                border-radius: 8px;
            }
            
            .summary-item.paid {
                background: #d4edda;
                color: #155724;
            }
            
            .summary-item.pending {
                background: #fff3cd;
                color: #856404;
            }
            
            .summary-item.overdue {
                background: #f8d7da;
                color: #721c24;
            }
            
            .summary-count {
                display: block;
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 4px;
            }
            
            .summary-label {
                font-size: 14px;
                font-weight: 500;
            }
            
            /* Responsive */
            @media (max-width: 1200px) {
                .maas-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .period-stats-container {
                    grid-template-columns: 1fr;
                }
            }
            
            @media (max-width: 768px) {
                .maas-container {
                    padding: 12px;
                }
                
                .maas-header {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center;
                }
                
                .header-actions {
                    justify-content: center;
                }
                
                .maas-stats {
                    grid-template-columns: 1fr;
                }
                
                .filter-row {
                    grid-template-columns: 1fr;
                }
                
                .summary-stats {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
