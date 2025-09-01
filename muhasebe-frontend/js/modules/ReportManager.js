export class ReportManager {
    constructor() {
        this.currentReport = null;
        this.reportData = this.initializeReportData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeReportCards();
        
        // Ensure page starts at top when loaded
        this.forceScrollToTop();
    }

    forceScrollToTop() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if (document.documentElement.scrollTop !== 0) {
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }, 10);
        }
    }

    refresh() {
        // Re-initialize report cards for new content
        this.initializeReportCards();
        console.log('ReportManager refreshed');
    }

    bindEvents() {
        // Report card click events - using event delegation for better reliability
        document.addEventListener('click', (e) => {
            const reportCard = e.target.closest('.submenu-item[data-report], .report-card[data-report]');
            if (reportCard) {
                console.log('Report card clicked:', reportCard.getAttribute('data-report'));
                this.handleReportCardClick(reportCard);
            }
        });

        // Tab switching - using event delegation
        document.addEventListener('click', (e) => {
            const tabButton = e.target.closest('.tab-button');
            if (tabButton) {
                this.switchTab(tabButton);
            }
        });

        // Filter apply button - using event delegation
        document.addEventListener('click', (e) => {
            const applyFiltersBtn = e.target.closest('#applyFiltersBtn');
            if (applyFiltersBtn) {
                this.applyFilters();
            }
        });

        // Report actions - using event delegation
        document.addEventListener('click', (e) => {
            const savePresetBtn = e.target.closest('#savePresetBtn');
            const printReportBtn = e.target.closest('#printReportBtn');
            const exportReportBtn = e.target.closest('#exportReportBtn');

            if (savePresetBtn) {
                this.savePreset();
            }
            if (printReportBtn) {
                this.printReport();
            }
            if (exportReportBtn) {
                this.exportReport();
            }
        });

        // Advanced filter modal events - using event delegation
        document.addEventListener('click', (e) => {
            const advancedFilterBtn = e.target.closest('#advancedFilterBtn');
            const closeAdvancedModal = e.target.closest('#closeAdvancedModal');
            const resetFilters = e.target.closest('#resetFilters');
            const savePreset = e.target.closest('#savePreset');
            const applyAdvancedFilters = e.target.closest('#applyAdvancedFilters');

            if (advancedFilterBtn) {
                this.openAdvancedFilterModal();
            }
            if (closeAdvancedModal) {
                this.closeAdvancedFilterModal();
            }
            if (resetFilters) {
                this.resetAdvancedFilters();
            }
            if (savePreset) {
                this.saveFilterPreset();
            }
            if (applyAdvancedFilters) {
                this.applyAdvancedFilters();
            }
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeAdvancedFilterModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAdvancedFilterModal();
            }
        });
    }

    initializeReportCards() {
        // Add cursor pointer to report cards
        const reportCards = document.querySelectorAll('.submenu-item[data-report], .report-card[data-report]');
        console.log('Found report cards:', reportCards.length);
        
        reportCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            
            // Add keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleReportCardClick(card);
                }
            });
        });
    }

    handleReportCardClick(card) {
        const reportId = card.getAttribute('data-report-id');
        const reportName = card.querySelector('h3').textContent;
        const reportDescription = card.querySelector('p').textContent;
        
        this.showReportPage(reportId, reportName, reportDescription);
    }

    showReportPage(reportId, reportName, reportDescription) {
        // Hide module container instead of welcome screen
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.style.display = 'none';
        }

        // Show report pages container
        const reportPagesContainer = document.getElementById('reportPagesContainer');
        if (reportPagesContainer) {
            reportPagesContainer.style.display = 'block';
        }

        // Update breadcrumb
        const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = reportName;
        }

        // Update report header
        const reportTitle = document.getElementById('reportTitle');
        const reportDesc = document.getElementById('reportDescription');
        if (reportTitle) reportTitle.textContent = reportName;
        if (reportDesc) reportDesc.textContent = reportDescription;

        // Set current report
        this.currentReport = {
            id: reportId,
            name: reportName,
            description: reportDescription
        };

        // Load report data
        this.loadReportData(reportId);

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Announce to screen reader
        this.announceToScreenReader(`${reportName} raporu açıldı`);
    }

    hideReportPage() {
        // First, immediately scroll to top
        window.scrollTo(0, 0);
        
        // Show module container instead of welcome screen
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.style.display = 'block';
        }

        // Hide report pages container
        const reportPagesContainer = document.getElementById('reportPagesContainer');
        if (reportPagesContainer) {
            reportPagesContainer.style.display = 'none';
        }

        // Reset current report
        this.currentReport = null;

        // Force scroll to top again after DOM update
        setTimeout(() => {
            this.forceScrollToTop();
        }, 50);

        // Additional scroll reset after a longer delay
        setTimeout(() => {
            this.forceScrollToTop();
        }, 200);

        // Announce to screen reader
        this.announceToScreenReader('Ana sayfaya dönüldü');
    }

    switchTab(tabButton) {
        // Remove active class from all tabs
        const allTabButtons = document.querySelectorAll('.tab-button');
        allTabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked tab
        tabButton.classList.add('active');

        // Hide all tab contents
        const allTabContents = document.querySelectorAll('.tab-content');
        allTabContents.forEach(content => content.classList.remove('active'));

        // Show selected tab content
        const tabName = tabButton.getAttribute('data-tab');
        const selectedTabContent = document.getElementById(`${tabName}Tab`);
        if (selectedTabContent) {
            selectedTabContent.classList.add('active');
        }

        // Load tab-specific data
        this.loadTabData(tabName);
    }

    loadReportData(reportId) {
        const reportData = this.reportData[reportId];
        if (!reportData) return;

        // Load KPIs
        this.loadKPIs(reportData.kpis);

        // Load summary data
        this.loadSummaryData(reportData.summary);

        // Load details data
        this.loadDetailsData(reportData.details);

        // Load log data
        this.loadLogData(reportData.logs);

        // Update summary footer
        this.updateSummaryFooter(reportData.summary);
    }

    loadKPIs(kpis) {
        const kpiGrid = document.querySelector('.kpi-grid');
        if (!kpiGrid) return;

        kpiGrid.innerHTML = '';

        kpis.forEach(kpi => {
            const kpiCard = document.createElement('div');
            kpiCard.className = 'kpi-card';
            kpiCard.innerHTML = `
                <div class="kpi-header">
                    <span class="kpi-title">${kpi.title}</span>
                    <div class="kpi-icon">
                        <i class="${kpi.icon}"></i>
                    </div>
                </div>
                <div class="kpi-value">${kpi.value}</div>
                <div class="kpi-change ${kpi.changeType}">
                    <i class="fa-solid fa-${kpi.changeType === 'positive' ? 'arrow-up' : kpi.changeType === 'negative' ? 'arrow-down' : 'minus'}"></i>
                    <span>${kpi.change}</span>
                </div>
            `;
            kpiGrid.appendChild(kpiCard);
        });
    }

    loadSummaryData(summary) {
        // Load summary table
        const summaryTable = document.getElementById('summaryTable');
        if (summaryTable && summary.table) {
            const tbody = summaryTable.querySelector('tbody');
            tbody.innerHTML = '';
            
            summary.table.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.title}</td>
                    <td>${row.value}</td>
                    <td>${row.change}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Load mini cards
        const miniCardsGrid = document.getElementById('miniCardsGrid');
        if (miniCardsGrid && summary.miniCards) {
            miniCardsGrid.innerHTML = '';
            
            summary.miniCards.forEach(card => {
                const miniCard = document.createElement('div');
                miniCard.className = 'mini-card';
                miniCard.innerHTML = `
                    <div class="mini-card-value">${card.value}</div>
                    <div class="mini-card-label">${card.label}</div>
                `;
                miniCardsGrid.appendChild(miniCard);
            });
        }
    }

    loadDetailsData(details) {
        const detailsTable = document.getElementById('detailsTable');
        if (!detailsTable || !details) return;

        const tbody = detailsTable.querySelector('tbody');
        tbody.innerHTML = '';

        details.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.date}</td>
                <td>${row.description}</td>
                <td>${row.amount}</td>
                <td><span class="status-badge ${row.status}">${row.statusText}</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    loadLogData(logs) {
        const logList = document.getElementById('logList');
        if (!logList || !logs) return;

        logList.innerHTML = '';

        logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML = `
                <div class="log-icon">
                    <i class="${log.icon}"></i>
                </div>
                <div class="log-content">
                    <div class="log-title">${log.title}</div>
                    <div class="log-details">${log.details}</div>
                </div>
                <div class="log-time">${log.time}</div>
            `;
            logList.appendChild(logEntry);
        });
    }

    updateSummaryFooter(summary) {
        const totalAmount = document.getElementById('totalAmount');
        const averageAmount = document.getElementById('averageAmount');
        const totalCount = document.getElementById('totalCount');

        if (totalAmount) totalAmount.textContent = summary.total || '0,00 ₺';
        if (averageAmount) averageAmount.textContent = summary.average || '0,00 ₺';
        if (totalCount) totalCount.textContent = summary.count || '0';
    }

    loadTabData(tabName) {
        // Load specific data for each tab
        switch (tabName) {
            case 'charts':
                this.loadChartData();
                break;
            case 'pivot':
                this.loadPivotData();
                break;
            // Add more cases as needed
        }
    }

    loadChartData() {
        // Placeholder for chart loading
        console.log('Loading chart data...');
    }

    loadPivotData() {
        // Placeholder for pivot loading
        console.log('Loading pivot data...');
    }

    applyFilters() {
        const dateRange = document.getElementById('dateRange')?.value;
        const searchInput = document.getElementById('searchInput')?.value;
        const statusFilter = document.getElementById('statusFilter')?.value;

        console.log('Applying filters:', { dateRange, searchInput, statusFilter });
        
        // Here you would typically make an API call to get filtered data
        // For now, we'll just show a loading state
        this.showLoadingState();
        
        setTimeout(() => {
            this.hideLoadingState();
            this.loadReportData(this.currentReport);
        }, 1000);
    }

    showLoadingState() {
        const container = document.getElementById('reportPagesContainer');
        if (container) {
            container.classList.add('loading');
        }
    }

    hideLoadingState() {
        const container = document.getElementById('reportPagesContainer');
        if (container) {
            container.classList.remove('loading');
        }
    }

    savePreset() {
        alert('Filtre ayarları kaydedildi!');
    }

    printReport() {
        window.print();
    }

    exportReport() {
        const format = prompt('Dışa aktarma formatını seçin (CSV, XLSX, PDF):', 'PDF');
        if (format) {
            alert(`${format.toUpperCase()} formatında dışa aktarılıyor...`);
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.querySelector('[aria-live="polite"]');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    initializeReportData() {
        return {
            hesap: {
                kpis: [
                    {
                        title: 'Toplam Bakiye',
                        value: '1.250.000 ₺',
                        change: '+12.5%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-chart-pie'
                    },
                    {
                        title: 'Toplam Giriş',
                        value: '850.000 ₺',
                        change: '+8.2%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-arrow-up'
                    },
                    {
                        title: 'Toplam Çıkış',
                        value: '620.000 ₺',
                        change: '-3.1%',
                        changeType: 'negative',
                        icon: 'fa-solid fa-arrow-down'
                    },
                    {
                        title: 'Net Değişim',
                        value: '230.000 ₺',
                        change: '+15.3%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-chart-line'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Nakit', value: '450.000 ₺', change: '+5.2%' },
                        { title: 'Banka', value: '800.000 ₺', change: '+12.1%' },
                        { title: 'Alacaklar', value: '320.000 ₺', change: '-2.3%' },
                        { title: 'Borçlar', value: '180.000 ₺', change: '+1.8%' }
                    ],
                    miniCards: [
                        { value: '1.250.000 ₺', label: 'Toplam Varlık' },
                        { value: '180.000 ₺', label: 'Toplam Borç' },
                        { value: '1.070.000 ₺', label: 'Net Varlık' }
                    ],
                    total: '1.250.000 ₺',
                    average: '312.500 ₺',
                    count: '4'
                },
                details: [
                    { date: '2024-01-15', description: 'Müşteri ödemesi', amount: '50.000 ₺', status: 'completed', statusText: 'Tamamlandı' },
                    { date: '2024-01-14', description: 'Tedarikçi ödemesi', amount: '25.000 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-13', description: 'Banka transferi', amount: '100.000 ₺', status: 'completed', statusText: 'Tamamlandı' }
                ],
                logs: [
                    { icon: 'fa-solid fa-download', title: 'Rapor dışa aktarıldı', details: 'PDF formatında', time: '2 saat önce' },
                    { icon: 'fa-solid fa-print', title: 'Rapor yazdırıldı', details: 'A4 formatında', time: '1 gün önce' },
                    { icon: 'fa-solid fa-filter', title: 'Filtre uygulandı', details: 'Bu ay', time: '2 gün önce' }
                ]
            },
            santiye: {
                kpis: [
                    {
                        title: 'Bütçe',
                        value: '2.500.000 ₺',
                        change: '+5.0%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-hard-hat'
                    },
                    {
                        title: 'Gerçekleşen',
                        value: '2.100.000 ₺',
                        change: '+12.3%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-chart-bar'
                    },
                    {
                        title: 'Sapma',
                        value: '400.000 ₺',
                        change: '-8.2%',
                        changeType: 'negative',
                        icon: 'fa-solid fa-exclamation-triangle'
                    },
                    {
                        title: 'Hakediş Toplamı',
                        value: '1.800.000 ₺',
                        change: '+15.7%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-file-invoice'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Ana Şantiye', value: '1.200.000 ₺', change: '+8.5%' },
                        { title: 'Yan Şantiye A', value: '600.000 ₺', change: '+12.1%' },
                        { title: 'Yan Şantiye B', value: '300.000 ₺', change: '+5.3%' }
                    ],
                    miniCards: [
                        { value: '3', label: 'Aktif Şantiye' },
                        { value: '85%', label: 'Tamamlanma Oranı' },
                        { value: '2.5 Ay', label: 'Kalan Süre' }
                    ],
                    total: '2.100.000 ₺',
                    average: '700.000 ₺',
                    count: '3'
                },
                details: [
                    { date: '2024-01-15', description: 'Ana şantiye malzeme', amount: '75.000 ₺', status: 'completed', statusText: 'Tamamlandı' },
                    { date: '2024-01-14', description: 'Yan şantiye A işçilik', amount: '45.000 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-13', description: 'Yan şantiye B ekipman', amount: '30.000 ₺', status: 'completed', statusText: 'Tamamlandı' }
                ],
                logs: [
                    { icon: 'fa-solid fa-plus', title: 'Yeni şantiye eklendi', details: 'Yan Şantiye C', time: '1 gün önce' },
                    { icon: 'fa-solid fa-edit', title: 'Şantiye güncellendi', details: 'Ana Şantiye', time: '3 gün önce' },
                    { icon: 'fa-solid fa-chart-line', title: 'İlerleme raporu', details: 'Haftalık', time: '1 hafta önce' }
                ]
            },
            taseron: {
                kpis: [
                    {
                        title: 'Sözleşme Tutarı',
                        value: '1.800.000 ₺',
                        change: '+10.2%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-file-contract'
                    },
                    {
                        title: 'Ödenen',
                        value: '1.200.000 ₺',
                        change: '+15.7%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-money-bill-wave'
                    },
                    {
                        title: 'Kalan',
                        value: '600.000 ₺',
                        change: '-5.5%',
                        changeType: 'negative',
                        icon: 'fa-solid fa-clock'
                    },
                    {
                        title: 'Ortalama Vade',
                        value: '45 gün',
                        change: '-2.1%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-calendar'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Aktif Taşeronlar', value: '12', change: '+2' },
                        { title: 'Tamamlanan İşler', value: '8', change: '+1' },
                        { title: 'Bekleyen Ödemeler', value: '4', change: '-1' }
                    ],
                    miniCards: [
                        { value: '12', label: 'Toplam Taşeron' },
                        { value: '67%', label: 'Ödeme Oranı' },
                        { value: '45 Gün', label: 'Ort. Vade' }
                    ],
                    total: '1.800.000 ₺',
                    average: '150.000 ₺',
                    count: '12'
                },
                details: [
                    { date: '2024-01-15', description: 'ABC Taşeron ödemesi', amount: '85.000 ₺', status: 'completed', statusText: 'Ödendi' },
                    { date: '2024-01-14', description: 'XYZ Taşeron hakediş', amount: '120.000 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-13', description: 'DEF Taşeron avans', amount: '50.000 ₺', status: 'completed', statusText: 'Ödendi' }
                ],
                logs: [
                    { icon: 'fa-solid fa-user-plus', title: 'Yeni taşeron eklendi', details: 'ABC Taşeron', time: '2 gün önce' },
                    { icon: 'fa-solid fa-file-invoice', title: 'Hakediş oluşturuldu', details: 'XYZ Taşeron', time: '1 hafta önce' },
                    { icon: 'fa-solid fa-money-bill-wave', title: 'Ödeme yapıldı', details: 'DEF Taşeron', time: '1 hafta önce' }
                ]
            },
            personel: {
                kpis: [
                    {
                        title: 'Personel Sayısı',
                        value: '45',
                        change: '+3',
                        changeType: 'positive',
                        icon: 'fa-solid fa-users'
                    },
                    {
                        title: 'Toplam Saat',
                        value: '8.640',
                        change: '+5.2%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-clock'
                    },
                    {
                        title: 'Fazla Mesai',
                        value: '320',
                        change: '+12.1%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-hourglass-half'
                    },
                    {
                        title: 'Net Maaş',
                        value: '450.000 ₺',
                        change: '+8.7%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-money-bill-wave'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Mühendisler', value: '15', change: '+2' },
                        { title: 'Teknisyenler', value: '20', change: '+1' },
                        { title: 'İşçiler', value: '10', change: '0' }
                    ],
                    miniCards: [
                        { value: '45', label: 'Toplam Personel' },
                        { value: '192', label: 'Ort. Saat/Ay' },
                        { value: '7.1', label: 'Ort. Saat/Gün' }
                    ],
                    total: '450.000 ₺',
                    average: '10.000 ₺',
                    count: '45'
                },
                details: [
                    { date: '2024-01-15', description: 'Ahmet Yılmaz maaş', amount: '12.500 ₺', status: 'completed', statusText: 'Ödendi' },
                    { date: '2024-01-14', description: 'Mehmet Kaya fazla mesai', amount: '2.300 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-13', description: 'Fatma Demir avans', amount: '5.000 ₺', status: 'completed', statusText: 'Ödendi' }
                ],
                logs: [
                    { icon: 'fa-solid fa-user-plus', title: 'Yeni personel eklendi', details: 'Ahmet Yılmaz', time: '1 gün önce' },
                    { icon: 'fa-solid fa-clock', title: 'Puantaj güncellendi', details: 'Ocak 2024', time: '3 gün önce' },
                    { icon: 'fa-solid fa-money-bill-wave', title: 'Maaş ödemesi', details: 'Ocak 2024', time: '1 hafta önce' }
                ]
            },
            tedarikci: {
                kpis: [
                    {
                        title: 'Sipariş Sayısı',
                        value: '156',
                        change: '+12',
                        changeType: 'positive',
                        icon: 'fa-solid fa-shopping-cart'
                    },
                    {
                        title: 'Teslim Oranı',
                        value: '94%',
                        change: '+2.1%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-check-circle'
                    },
                    {
                        title: 'İptal/İade',
                        value: '8',
                        change: '-3',
                        changeType: 'positive',
                        icon: 'fa-solid fa-times-circle'
                    },
                    {
                        title: 'Toplam Tutar',
                        value: '850.000 ₺',
                        change: '+18.5%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-money-bill-wave'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Malzeme Tedarikçileri', value: '25', change: '+3' },
                        { title: 'Hizmet Tedarikçileri', value: '15', change: '+2' },
                        { title: 'Ekipman Tedarikçileri', value: '8', change: '+1' }
                    ],
                    miniCards: [
                        { value: '48', label: 'Toplam Tedarikçi' },
                        { value: '94%', label: 'Teslim Oranı' },
                        { value: '5.1%', label: 'İptal Oranı' }
                    ],
                    total: '850.000 ₺',
                    average: '17.708 ₺',
                    count: '48'
                },
                details: [
                    { date: '2024-01-15', description: 'ABC Malzeme siparişi', amount: '25.000 ₺', status: 'completed', statusText: 'Teslim Edildi' },
                    { date: '2024-01-14', description: 'XYZ Hizmet siparişi', amount: '15.000 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-13', description: 'DEF Ekipman siparişi', amount: '35.000 ₺', status: 'completed', statusText: 'Teslim Edildi' }
                ],
                logs: [
                    { icon: 'fa-solid fa-truck', title: 'Sipariş teslim edildi', details: 'ABC Malzeme', time: '1 gün önce' },
                    { icon: 'fa-solid fa-plus', title: 'Yeni tedarikçi eklendi', details: 'XYZ Hizmet', time: '3 gün önce' },
                    { icon: 'fa-solid fa-times', title: 'Sipariş iptal edildi', details: 'DEF Ekipman', time: '1 hafta önce' }
                ]
            },
            maas: {
                kpis: [
                    {
                        title: 'Brüt',
                        value: '650.000 ₺',
                        change: '+12.3%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-money-bill-wave'
                    },
                    {
                        title: 'Net',
                        value: '450.000 ₺',
                        change: '+8.7%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-hand-holding-usd'
                    },
                    {
                        title: 'SGK İşveren',
                        value: '120.000 ₺',
                        change: '+15.2%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-shield-alt'
                    },
                    {
                        title: 'Vergi',
                        value: '80.000 ₺',
                        change: '+10.1%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-file-invoice-dollar'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Mühendis Maaşları', value: '250.000 ₺', change: '+15.2%' },
                        { title: 'Teknisyen Maaşları', value: '200.000 ₺', change: '+8.5%' },
                        { title: 'İşçi Maaşları', value: '100.000 ₺', change: '+5.3%' }
                    ],
                    miniCards: [
                        { value: '650.000 ₺', label: 'Toplam Brüt' },
                        { value: '450.000 ₺', label: 'Toplam Net' },
                        { value: '14.444 ₺', label: 'Ort. Net Maaş' }
                    ],
                    total: '650.000 ₺',
                    average: '14.444 ₺',
                    count: '45'
                },
                details: [
                    { date: '2024-01-15', description: 'Ahmet Yılmaz brüt maaş', amount: '15.000 ₺', status: 'completed', statusText: 'Hesaplandı' },
                    { date: '2024-01-14', description: 'Mehmet Kaya net maaş', amount: '11.200 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-13', description: 'Fatma Demir SGK', amount: '3.300 ₺', status: 'completed', statusText: 'Hesaplandı' }
                ],
                logs: [
                    { icon: 'fa-solid fa-calculator', title: 'Maaş hesaplandı', details: 'Ocak 2024', time: '2 gün önce' },
                    { icon: 'fa-solid fa-file-invoice', title: 'SGK bildirimi', details: 'Ocak 2024', time: '1 hafta önce' },
                    { icon: 'fa-solid fa-money-bill-wave', title: 'Maaş ödemesi', details: 'Ocak 2024', time: '1 hafta önce' }
                ]
            },
            fatura: {
                kpis: [
                    {
                        title: 'Fatura Adedi',
                        value: '89',
                        change: '+15',
                        changeType: 'positive',
                        icon: 'fa-solid fa-file-invoice'
                    },
                    {
                        title: 'Toplam Tutar',
                        value: '1.250.000 ₺',
                        change: '+22.5%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-money-bill-wave'
                    },
                    {
                        title: 'Ödenmemiş',
                        value: '320.000 ₺',
                        change: '-8.3%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-clock'
                    },
                    {
                        title: 'Ortalama DSO',
                        value: '45 gün',
                        change: '-5.2%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-calendar'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Gelen Faturalar', value: '45', change: '+8' },
                        { title: 'Giden Faturalar', value: '44', change: '+7' },
                        { title: 'İrsaliyeler', value: '67', change: '+12' }
                    ],
                    miniCards: [
                        { value: '89', label: 'Toplam Fatura' },
                        { value: '74%', label: 'Ödeme Oranı' },
                        { value: '45 Gün', label: 'Ort. DSO' }
                    ],
                    total: '1.250.000 ₺',
                    average: '14.045 ₺',
                    count: '89'
                },
                details: [
                    { date: '2024-01-15', description: 'ABC Şirketi fatura', amount: '25.000 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-14', description: 'XYZ Müşteri ödemesi', amount: '35.000 ₺', status: 'completed', statusText: 'Ödendi' },
                    { date: '2024-01-13', description: 'DEF Tedarikçi fatura', amount: '18.000 ₺', status: 'completed', statusText: 'Ödendi' }
                ],
                logs: [
                    { icon: 'fa-solid fa-plus', title: 'Yeni fatura oluşturuldu', details: 'ABC Şirketi', time: '1 gün önce' },
                    { icon: 'fa-solid fa-check', title: 'Fatura ödendi', details: 'XYZ Müşteri', time: '2 gün önce' },
                    { icon: 'fa-solid fa-envelope', title: 'E-Fatura gönderildi', details: 'DEF Tedarikçi', time: '3 gün önce' }
                ]
            },
            odeme: {
                kpis: [
                    {
                        title: 'Toplam Tahsilat',
                        value: '850.000 ₺',
                        change: '+18.7%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-arrow-up'
                    },
                    {
                        title: 'Toplam Ödeme',
                        value: '620.000 ₺',
                        change: '+12.3%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-arrow-down'
                    },
                    {
                        title: 'Net Nakit Akışı',
                        value: '230.000 ₺',
                        change: '+35.2%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-chart-line'
                    },
                    {
                        title: 'Ortalama Vade',
                        value: '30 gün',
                        change: '-8.5%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-calendar'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Banka Transferleri', value: '45', change: '+8' },
                        { title: 'Nakit Ödemeler', value: '23', change: '+5' },
                        { title: 'Çek Ödemeleri', value: '12', change: '+2' }
                    ],
                    miniCards: [
                        { value: '850.000 ₺', label: 'Toplam Tahsilat' },
                        { value: '620.000 ₺', label: 'Toplam Ödeme' },
                        { value: '230.000 ₺', label: 'Net Akış' }
                    ],
                    total: '1.470.000 ₺',
                    average: '18.375 ₺',
                    count: '80'
                },
                details: [
                    { date: '2024-01-15', description: 'Müşteri ödemesi', amount: '50.000 ₺', status: 'completed', statusText: 'Tahsil Edildi' },
                    { date: '2024-01-14', description: 'Tedarikçi ödemesi', amount: '25.000 ₺', status: 'pending', statusText: 'Bekliyor' },
                    { date: '2024-01-13', description: 'Personel maaş ödemesi', amount: '450.000 ₺', status: 'completed', statusText: 'Ödendi' }
                ],
                logs: [
                    { icon: 'fa-solid fa-arrow-up', title: 'Tahsilat yapıldı', details: 'Müşteri ödemesi', time: '1 gün önce' },
                    { icon: 'fa-solid fa-arrow-down', title: 'Ödeme yapıldı', details: 'Tedarikçi ödemesi', time: '2 gün önce' },
                    { icon: 'fa-solid fa-university', title: 'Banka transferi', details: 'Personel maaşları', time: '1 hafta önce' }
                ]
            },
            kasa: {
                kpis: [
                    {
                        title: 'Başlangıç',
                        value: '150.000 ₺',
                        change: '+5.2%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-play'
                    },
                    {
                        title: 'Giriş',
                        value: '450.000 ₺',
                        change: '+18.7%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-arrow-up'
                    },
                    {
                        title: 'Çıkış',
                        value: '320.000 ₺',
                        change: '+12.3%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-arrow-down'
                    },
                    {
                        title: 'Gün Sonu',
                        value: '280.000 ₺',
                        change: '+15.6%',
                        changeType: 'positive',
                        icon: 'fa-solid fa-stop'
                    }
                ],
                summary: {
                    table: [
                        { title: 'Nakit Giriş', value: '250.000 ₺', change: '+20.1%' },
                        { title: 'Banka Giriş', value: '200.000 ₺', change: '+15.3%' },
                        { title: 'Nakit Çıkış', value: '180.000 ₺', change: '+8.7%' },
                        { title: 'Banka Çıkış', value: '140.000 ₺', change: '+16.2%' }
                    ],
                    miniCards: [
                        { value: '280.000 ₺', label: 'Gün Sonu Bakiye' },
                        { value: '130.000 ₺', label: 'Nakit Bakiye' },
                        { value: '150.000 ₺', label: 'Banka Bakiye' }
                    ],
                    total: '450.000 ₺',
                    average: '112.500 ₺',
                    count: '4'
                },
                details: [
                    { date: '2024-01-15', description: 'Müşteri nakit ödemesi', amount: '50.000 ₺', status: 'completed', statusText: 'Alındı' },
                    { date: '2024-01-14', description: 'Tedarikçi nakit ödemesi', amount: '25.000 ₺', status: 'completed', statusText: 'Ödendi' },
                    { date: '2024-01-13', description: 'Banka transferi', amount: '100.000 ₺', status: 'completed', statusText: 'Tamamlandı' }
                ],
                logs: [
                    { icon: 'fa-solid fa-arrow-up', title: 'Nakit girişi', details: 'Müşteri ödemesi', time: '1 gün önce' },
                    { icon: 'fa-solid fa-arrow-down', title: 'Nakit çıkışı', details: 'Tedarikçi ödemesi', time: '2 gün önce' },
                    { icon: 'fa-solid fa-university', title: 'Banka işlemi', details: 'Transfer', time: '3 gün önce' }
                ]
            }
        };
    }

    // Advanced Filter Modal Methods
    openAdvancedFilterModal() {
        const modal = document.getElementById('advancedFilterModal');
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Update category filters based on current report type
            this.updateCategoryFilters();
            
            // Set default values based on current report
            this.setDefaultFilterValues();
            
            // Focus on first input
            setTimeout(() => {
                const firstInput = modal.querySelector('.form-input, .form-select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        }
    }

    closeAdvancedFilterModal() {
        const modal = document.getElementById('advancedFilterModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    setDefaultFilterValues() {
        // Set current date range
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const datePresetSelect = document.getElementById('datePreset');
        
        if (startDateInput) {
            startDateInput.value = startOfMonth.toISOString().split('T')[0];
        }
        if (endDateInput) {
            endDateInput.value = today.toISOString().split('T')[0];
        }
        if (datePresetSelect) {
            datePresetSelect.value = 'thisMonth';
        }

        // Set default page size
        const pageSizeSelect = document.getElementById('pageSize');
        if (pageSizeSelect) {
            pageSizeSelect.value = '25';
        }

        // Set default sort
        const sortBySelect = document.getElementById('sortBy');
        const sortOrderSelect = document.getElementById('sortOrder');
        if (sortBySelect) {
            sortBySelect.value = 'date';
        }
        if (sortOrderSelect) {
            sortOrderSelect.value = 'desc';
        }
    }

    updateCategoryFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const statusFilter = document.getElementById('statusFilter');
        
        if (!categoryFilter || !statusFilter || !this.currentReport) {
            return;
        }

        // Clear existing options
        categoryFilter.innerHTML = '';
        statusFilter.innerHTML = '';

        // Get report-specific categories and statuses
        const categories = this.getReportCategories(this.currentReport.id);
        const statuses = this.getReportStatuses(this.currentReport.id);
        
        // Add "Tümü" option first for categories
        const allCategoryOption = document.createElement('option');
        allCategoryOption.value = 'all';
        allCategoryOption.textContent = 'Tümü';
        categoryFilter.appendChild(allCategoryOption);

        // Add report-specific categories
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.value;
            option.textContent = category.label;
            categoryFilter.appendChild(option);
        });

        // Add "Tümü" option first for statuses
        const allStatusOption = document.createElement('option');
        allStatusOption.value = 'all';
        allStatusOption.textContent = 'Tümü';
        statusFilter.appendChild(allStatusOption);

        // Add report-specific statuses
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status.value;
            option.textContent = status.label;
            statusFilter.appendChild(option);
        });
    }

    getReportCategories(reportId) {
        const categories = {
            hesap: [
                { value: 'nakit', label: 'Nakit' },
                { value: 'banka', label: 'Banka' },
                { value: 'alacaklar', label: 'Alacaklar' },
                { value: 'borclar', label: 'Borçlar' },
                { value: 'sermaye', label: 'Sermaye' },
                { value: 'gelir', label: 'Gelir' },
                { value: 'gider', label: 'Gider' }
            ],
            santiye: [
                { value: 'ana_santiye', label: 'Ana Şantiye' },
                { value: 'yan_santiye_a', label: 'Yan Şantiye A' },
                { value: 'yan_santiye_b', label: 'Yan Şantiye B' },
                { value: 'malzeme', label: 'Malzeme' },
                { value: 'iscilik', label: 'İşçilik' },
                { value: 'ekipman', label: 'Ekipman' },
                { value: 'hakedis', label: 'Hakediş' }
            ],
            taseron: [
                { value: 'abc_taseron', label: 'ABC Taşeron' },
                { value: 'xyz_taseron', label: 'XYZ Taşeron' },
                { value: 'def_taseron', label: 'DEF Taşeron' },
                { value: 'elektrik', label: 'Elektrik' },
                { value: 'su_tesisat', label: 'Su/Tesisat' },
                { value: 'insaat', label: 'İnşaat' },
                { value: 'boya', label: 'Boya' },
                { value: 'marangoz', label: 'Marangoz' },
                { value: 'seramik', label: 'Seramik' }
            ],
            personel: [
                { value: 'muhendisler', label: 'Mühendisler' },
                { value: 'teknisyenler', label: 'Teknisyenler' },
                { value: 'isciler', label: 'İşçiler' },
                { value: 'ahmet_yilmaz', label: 'Ahmet Yılmaz' },
                { value: 'mehmet_kaya', label: 'Mehmet Kaya' },
                { value: 'fatma_demir', label: 'Fatma Demir' },
                { value: 'maas', label: 'Maaş' },
                { value: 'fazla_mesai', label: 'Fazla Mesai' },
                { value: 'avans', label: 'Avans' }
            ],
            tedarikci: [
                { value: 'siparis', label: 'Sipariş' },
                { value: 'teslimat', label: 'Teslimat' },
                { value: 'iptal_iade', label: 'İptal/İade' },
                { value: 'malzeme', label: 'Malzeme' },
                { value: 'ekipman', label: 'Ekipman' },
                { value: 'hizmet', label: 'Hizmet' },
                { value: 'nakliye', label: 'Nakliye' },
                { value: 'enerji', label: 'Enerji' }
            ],
            maas: [
                { value: 'aylik_maas', label: 'Aylık Maaş' },
                { value: 'prim', label: 'Prim' },
                { value: 'ikramiye', label: 'İkramiye' },
                { value: 'fazla_mesai', label: 'Fazla Mesai' },
                { value: 'avans', label: 'Avans' },
                { value: 'kesinti', label: 'Kesinti' },
                { value: 'net_maas', label: 'Net Maaş' },
                { value: 'brut_maas', label: 'Brüt Maaş' }
            ],
            fatura: [
                { value: 'satis_faturasi', label: 'Satış Faturası' },
                { value: 'alis_faturasi', label: 'Alış Faturası' },
                { value: 'irsaliye', label: 'İrsaliye' },
                { value: 'proforma', label: 'Proforma' },
                { value: 'konsinye', label: 'Konsinye' },
                { value: 'odendi', label: 'Ödendi' },
                { value: 'beklemede', label: 'Beklemede' },
                { value: 'vadesi_gecti', label: 'Vadesi Geçti' }
            ],
            odeme: [
                { value: 'nakit', label: 'Nakit' },
                { value: 'banka_transferi', label: 'Banka Transferi' },
                { value: 'cek', label: 'Çek' },
                { value: 'senet', label: 'Senet' },
                { value: 'kredi_karti', label: 'Kredi Kartı' },
                { value: 'tahsilat', label: 'Tahsilat' },
                { value: 'odeme', label: 'Ödeme' },
                { value: 'transfer', label: 'Transfer' }
            ],
            kasa: [
                { value: 'baslangic', label: 'Başlangıç' },
                { value: 'giris', label: 'Giriş' },
                { value: 'cikis', label: 'Çıkış' },
                { value: 'gun_sonu', label: 'Gün Sonu' },
                { value: 'nakit_giris', label: 'Nakit Giriş' },
                { value: 'banka_giris', label: 'Banka Giriş' },
                { value: 'nakit_cikis', label: 'Nakit Çıkış' },
                { value: 'banka_cikis', label: 'Banka Çıkış' }
            ]
        };

        return categories[reportId] || [];
    }

    getReportStatuses(reportId) {
        const statuses = {
            hesap: [
                { value: 'aktif', label: 'Aktif' },
                { value: 'pasif', label: 'Pasif' },
                { value: 'kapali', label: 'Kapalı' },
                { value: 'dondurulmus', label: 'Dondurulmuş' }
            ],
            santiye: [
                { value: 'aktif', label: 'Aktif' },
                { value: 'tamamlandi', label: 'Tamamlandı' },
                { value: 'beklemede', label: 'Beklemede' },
                { value: 'iptal', label: 'İptal' },
                { value: 'planlama', label: 'Planlama' }
            ],
            taseron: [
                { value: 'aktif', label: 'Aktif' },
                { value: 'tamamlandi', label: 'Tamamlandı' },
                { value: 'beklemede', label: 'Beklemede' },
                { value: 'iptal', label: 'İptal' },
                { value: 'onay_bekliyor', label: 'Onay Bekliyor' }
            ],
            personel: [
                { value: 'aktif', label: 'Aktif' },
                { value: 'pasif', label: 'Pasif' },
                { value: 'izinli', label: 'İzinli' },
                { value: 'istifa', label: 'İstifa' },
                { value: 'emekli', label: 'Emekli' }
            ],
            tedarikci: [
                { value: 'aktif', label: 'Aktif' },
                { value: 'pasif', label: 'Pasif' },
                { value: 'onay_bekliyor', label: 'Onay Bekliyor' },
                { value: 'reddedildi', label: 'Reddedildi' },
                { value: 'dondurulmus', label: 'Dondurulmuş' }
            ],
            maas: [
                { value: 'odendi', label: 'Ödendi' },
                { value: 'beklemede', label: 'Beklemede' },
                { value: 'kismi', label: 'Kısmi Ödeme' },
                { value: 'iptal', label: 'İptal' },
                { value: 'avans', label: 'Avans' }
            ],
            fatura: [
                { value: 'odendi', label: 'Ödendi' },
                { value: 'beklemede', label: 'Beklemede' },
                { value: 'vadesi_gecti', label: 'Vadesi Geçti' },
                { value: 'iptal', label: 'İptal' },
                { value: 'kismi', label: 'Kısmi Ödeme' }
            ],
            odeme: [
                { value: 'tamamlandi', label: 'Tamamlandı' },
                { value: 'beklemede', label: 'Beklemede' },
                { value: 'iptal', label: 'İptal' },
                { value: 'kismi', label: 'Kısmi' },
                { value: 'onay_bekliyor', label: 'Onay Bekliyor' }
            ],
            kasa: [
                { value: 'giris', label: 'Giriş' },
                { value: 'cikis', label: 'Çıkış' },
                { value: 'transfer', label: 'Transfer' },
                { value: 'beklemede', label: 'Beklemede' },
                { value: 'iptal', label: 'İptal' }
            ]
        };

        return statuses[reportId] || [];
    }

    resetAdvancedFilters() {
        // Reset all form inputs
        const modal = document.getElementById('advancedFilterModal');
        if (modal) {
            const inputs = modal.querySelectorAll('.form-input, .form-select');
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else if (input.multiple) {
                    // Reset multiple select
                    Array.from(input.options).forEach(option => {
                        option.selected = false;
                    });
                } else {
                    input.value = '';
                }
            });

            // Set default values again
            this.setDefaultFilterValues();
        }
    }

    saveFilterPreset() {
        const presetName = prompt('Filtre preset adını girin:');
        if (presetName) {
            const filterData = this.getCurrentFilterData();
            const presets = JSON.parse(localStorage.getItem('filterPresets') || '{}');
            presets[presetName] = filterData;
            localStorage.setItem('filterPresets', JSON.stringify(presets));
            
            alert(`"${presetName}" filtresi kaydedildi!`);
        }
    }

    getCurrentFilterData() {
        const modal = document.getElementById('advancedFilterModal');
        if (!modal) return {};

        const filterData = {};
        const inputs = modal.querySelectorAll('.form-input, .form-select');
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                filterData[input.id] = input.checked;
            } else if (input.multiple) {
                filterData[input.id] = Array.from(input.selectedOptions).map(option => option.value);
            } else {
                filterData[input.id] = input.value;
            }
        });

        return filterData;
    }

    applyAdvancedFilters() {
        const filterData = this.getCurrentFilterData();
        
        // Apply filters to current report
        console.log('Applying advanced filters:', filterData);
        
        // Here you would typically:
        // 1. Update the report data based on filters
        // 2. Refresh the report display
        // 3. Show loading state
        // 4. Update the main filter bar with selected values
        
        // For now, just show a success message
        alert('Gelişmiş filtreler uygulandı!');
        
        // Close the modal
        this.closeAdvancedFilterModal();
        
        // Update main filter bar with selected values
        this.updateMainFilterBar(filterData);
    }

    updateMainFilterBar(filterData) {
        // Update the main filter bar with selected values from advanced modal
        const dateRangeSelect = document.querySelector('.report-filter-bar select');
        const searchInput = document.querySelector('.report-filter-bar input[type="text"]');
        const statusSelect = document.querySelector('.report-filter-bar select:last-child');
        
        if (dateRangeSelect && filterData.datePreset) {
            // Map preset values to display text
            const presetMap = {
                'today': 'Bugün',
                'yesterday': 'Dün',
                'thisWeek': 'Bu Hafta',
                'lastWeek': 'Geçen Hafta',
                'thisMonth': 'Bu Ay',
                'lastMonth': 'Geçen Ay',
                'thisQuarter': 'Bu Çeyrek',
                'lastQuarter': 'Geçen Çeyrek',
                'thisYear': 'Bu Yıl',
                'lastYear': 'Geçen Yıl'
            };
            
            const displayText = presetMap[filterData.datePreset] || 'Özel Tarih';
            dateRangeSelect.value = filterData.datePreset;
        }
        
        if (searchInput && filterData.customSearch) {
            searchInput.value = filterData.customSearch;
        }
        
        if (statusSelect && filterData.statusFilter && filterData.statusFilter.length > 0) {
            statusSelect.value = filterData.statusFilter[0];
        }
    }
}
