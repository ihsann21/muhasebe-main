// Toolbar Management
export class ToolbarManager {
    constructor() {
        this.toolbarItems = document.querySelectorAll('.toolbar-item');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    hideWelcomeScreen() {
        // Hide welcome screen within module container
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    setupEventListeners() {
        this.toolbarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // =================================================================
                // === YENİ EKLENECEK KOD BAŞLANGICI ===
                // Herhangi bir toolbar butonuna tıklandığında, önce rapor detay sayfasını
                // kapatıp ana modül görünümüne geri döndüğümüzden emin oluyoruz.
                // Bu tek blok, tüm sorunu kökünden çözer.
                if (window.reportManager) {
                    window.reportManager.hideReportPage();
                }
                // === YENİ EKLENECEK KOD BİTİŞİ ===
                // =================================================================

                const label = item.querySelector('span').textContent;
                console.log('Toolbar item clicked:', label);
                
                // Handle specific toolbar item clicks
                if (label === 'Taşeron') {
                    this.showTaseronModule();
                } else if (label === 'Tedarikçi') {
                    this.showTedarikciModule();
                } else if (label === 'Puantaj') {
                    this.showPuantajModule();
                                } else if (label === 'Çekler') {
                    console.log('Çekler button clicked!');
                    this.showCeklerModule();
                } else if (label === 'İlerleme') {
                    console.log('İlerleme button clicked!');
                    this.showIlerlemeModule();
                } else if (label === 'YapSat') {
                    console.log('YapSat button clicked!');
                    this.showYapSatModule();
                } else if (label === 'Evrak') {
                    console.log('Evrak button clicked!');
                    this.showEvrakModule();
                } else if (label === 'E-Fatura') {
                    console.log('E-Fatura button clicked!');
                    this.showEFaturaModule();
                } else if (label === 'Araçlar') {
                    console.log('Araçlar button clicked!');
                    this.showAraclarModule();
                } else if (label === 'Uzaktan Yardım') {
                    console.log('Uzaktan Yardım button clicked!');
                    this.showUzaktanYardimModule();
                } else if (label === 'Raporlar') {
                    console.log('Raporlar button clicked!');
                    this.showRaporlarModule();
                }
                // Handle other toolbar items here
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        // Setup main menu event listeners (for top navigation)
        this.setupMainMenuEventListeners();


    }

    setupMainMenuEventListeners() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const label = item.querySelector('span').textContent;
                console.log('Main menu item clicked:', label);
                

                // Handle other main menu items here
            });
        });
    }

    showTaseronModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Taşeron Tanımları - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        // Update module container instead of main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Taşeron Tanımları</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excele Aktar
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-ellipsis-v"></i>
                            Detay
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body">
                    <!-- Left Sidebar - İşlemler -->
                    <aside class="sidebar">
                        <h3>İşlemler</h3>
                        <nav class="sidebar-nav">
                            <a href="#" class="sidebar-item" data-action="hareket-ekle">
                                <i class="fa-solid fa-plus-circle"></i>
                                <span>Hareket Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hakedis-faturasi">
                                <i class="fa-solid fa-file-invoice"></i>
                                <span>Hakediş Faturası Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hareket-listesi">
                                <i class="fa-solid fa-list"></i>
                                <span>Hareket Listesi</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hesap-extresi">
                                <i class="fa-solid fa-chart-line"></i>
                                <span>Hesap Extresi</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hareket-toplamlari">
                                <i class="fa-solid fa-calculator"></i>
                                <span>Hareket Toplamları</span>
                            </a>
                        </nav>
                    </aside>

                    <!-- Main Data Area -->
                    <div class="data-area">
                        <!-- Filter Bar -->
                        <div class="filter-bar">
                            <div class="search-box">
                                <i class="fa-solid fa-search"></i>
                                <input type="text" placeholder="Filtre Alanı..." />
                            </div>
                        </div>

                        <!-- Data Table -->
                        <div class="table-container">
                            <table class="data-table" id="taseronTable">
                                <thead>
                                    <tr>
                                        <th>Kodu</th>
                                        <th>Tanımı</th>
                                        <th>Yetkili</th>
                                        <th>Görevi</th>
                                        <th>Telefon</th>
                                        <th>GSM</th>
                                        <th>Vergi Dairesi</th>
                                        <th>Vergi No</th>
                                        <th>Banka</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td contenteditable="true" data-row="0" data-col="0">TAŞ-0001</td>
                                        <td contenteditable="true" data-row="0" data-col="1">ŞİRKETİN TAŞERONU</td>
                                        <td contenteditable="true" data-row="0" data-col="2"></td>
                                        <td contenteditable="true" data-row="0" data-col="3"></td>
                                        <td contenteditable="true" data-row="0" data-col="4"></td>
                                        <td contenteditable="true" data-row="0" data-col="5"></td>
                                        <td contenteditable="true" data-row="0" data-col="6"></td>
                                        <td contenteditable="true" data-row="0" data-col="7"></td>
                                        <td contenteditable="true" data-row="0" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="1" data-col="0">TAŞ-0002</td>
                                        <td contenteditable="true" data-row="1" data-col="1">DOĞAN YAPI</td>
                                        <td contenteditable="true" data-row="1" data-col="2">MEHMET DOĞAN</td>
                                        <td contenteditable="true" data-row="1" data-col="3">SIVACI</td>
                                        <td contenteditable="true" data-row="1" data-col="4">0 242 511 11 11</td>
                                        <td contenteditable="true" data-row="1" data-col="5">0 532 400 00 00</td>
                                        <td contenteditable="true" data-row="1" data-col="6">ALANYA</td>
                                        <td contenteditable="true" data-row="1" data-col="7">23701787131</td>
                                        <td contenteditable="true" data-row="1" data-col="8">GARANTİ</td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="2" data-col="0">TAŞ-0003</td>
                                        <td contenteditable="true" data-row="2" data-col="1">BAYRAM KARACA</td>
                                        <td contenteditable="true" data-row="2" data-col="2">BAYRAM KARACA</td>
                                        <td contenteditable="true" data-row="2" data-col="3">SIVACI</td>
                                        <td contenteditable="true" data-row="2" data-col="4">0 540 511 65 45</td>
                                        <td contenteditable="true" data-row="2" data-col="5"></td>
                                        <td contenteditable="true" data-row="2" data-col="6"></td>
                                        <td contenteditable="true" data-row="2" data-col="7"></td>
                                        <td contenteditable="true" data-row="2" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="3" data-col="0">TAŞ-0004</td>
                                        <td contenteditable="true" data-row="3" data-col="1">MUHAMMET TEKELİ</td>
                                        <td contenteditable="true" data-row="3" data-col="2">MUHAMMET TEKELİ</td>
                                        <td contenteditable="true" data-row="3" data-col="3">KALIPÇI</td>
                                        <td contenteditable="true" data-row="3" data-col="4"></td>
                                        <td contenteditable="true" data-row="3" data-col="5"></td>
                                        <td contenteditable="true" data-row="3" data-col="6"></td>
                                        <td contenteditable="true" data-row="3" data-col="7"></td>
                                        <td contenteditable="true" data-row="3" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="4" data-col="0">TAŞ-0005</td>
                                        <td contenteditable="true" data-row="4" data-col="1">AHMET YÜKSEL</td>
                                        <td contenteditable="true" data-row="4" data-col="2"></td>
                                        <td contenteditable="true" data-row="4" data-col="3">KALIPÇI</td>
                                        <td contenteditable="true" data-row="4" data-col="4"></td>
                                        <td contenteditable="true" data-row="4" data-col="5"></td>
                                        <td contenteditable="true" data-row="4" data-col="6"></td>
                                        <td contenteditable="true" data-row="4" data-col="7"></td>
                                        <td contenteditable="true" data-row="4" data-col="8"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            
            // Initialize Excel-like table functionality
            this.initExcelTable();
            
            // Initialize sidebar functionality
            this.initSidebar();
            
            // Initialize table interactions for taseron
            this.initTaseronTableInteractions();
        }
    }

    showTedarikciModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Tedarikçi Tanımları - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update module container instead of main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Tedarikçi Tanımları</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-ellipsis-v"></i>
                            Detay
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excele Aktar
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body">
                    <!-- Left Sidebar - İşlemler -->
                    <aside class="sidebar">
                        <h3>İşlemler</h3>
                        <nav class="sidebar-nav">
                            <a href="#" class="sidebar-item" data-action="hareket-ekle">
                                <i class="fa-solid fa-plus-circle"></i>
                                <span>Hareket Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="alis-faturasi">
                                <i class="fa-solid fa-file-invoice"></i>
                                <span>Alış Faturası Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="iade-faturasi">
                                <i class="fa-solid fa-undo"></i>
                                <span>İade Faturası Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="alis-irsaliye">
                                <i class="fa-solid fa-truck"></i>
                                <span>Alış İrsaliye Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hakedis-faturasi">
                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                <span>Hakediş Faturası Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="satis-faturasi">
                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                <span>Satış Faturası Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hareket-listesi">
                                <i class="fa-solid fa-list"></i>
                                <span>Hareket Listesi</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hareket-toplamlari">
                                <i class="fa-solid fa-calculator"></i>
                                <span>Hareket Toplamları</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hesap-extresi">
                                <i class="fa-solid fa-chart-line"></i>
                                <span>Hesap Extresi</span>
                            </a>
                        </nav>
                    </aside>

                    <!-- Main Data Area -->
                    <div class="data-area">
                        <!-- Filter Bar -->
                        <div class="filter-bar">
                            <div class="search-box">
                                <i class="fa-solid fa-search"></i>
                                <input type="text" placeholder="Filtre Alanı..." />
                            </div>
                        </div>

                        <!-- Data Table -->
                        <div class="table-container">
                            <table class="data-table" id="tedarikciTable">
                                <thead>
                                    <tr>
                                        <th>Kodu</th>
                                        <th>Tanımı</th>
                                        <th>Yetkili</th>
                                        <th>Y.Telefon</th>
                                        <th>Satış Temsilcisi</th>
                                        <th>S.T.Telefon</th>
                                        <th>Vergi Dairesi</th>
                                        <th>Vergi No</th>
                                        <th>Bar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td contenteditable="true" data-row="0" data-col="0">CARİ-0001</td>
                                        <td contenteditable="true" data-row="0" data-col="1">ÖRNEK TEDARİKÇİ</td>
                                        <td contenteditable="true" data-row="0" data-col="2">AHMET GÜLTEPE</td>
                                        <td contenteditable="true" data-row="0" data-col="3">0 532 811 44 44</td>
                                        <td contenteditable="true" data-row="0" data-col="4">MEHMET GÜLER</td>
                                        <td contenteditable="true" data-row="0" data-col="5">0 242 511 18 79</td>
                                        <td contenteditable="true" data-row="0" data-col="6">ALANYA</td>
                                        <td contenteditable="true" data-row="0" data-col="7">2370178713</td>
                                        <td contenteditable="true" data-row="0" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="1" data-col="0">CARİ-0003</td>
                                        <td contenteditable="true" data-row="1" data-col="1">ALYAP YAPI TİCARET</td>
                                        <td contenteditable="true" data-row="1" data-col="2">AHMET GÜR</td>
                                        <td contenteditable="true" data-row="1" data-col="3">0 242 511 11 11</td>
                                        <td contenteditable="true" data-row="1" data-col="4"></td>
                                        <td contenteditable="true" data-row="1" data-col="5"></td>
                                        <td contenteditable="true" data-row="1" data-col="6"></td>
                                        <td contenteditable="true" data-row="1" data-col="7"></td>
                                        <td contenteditable="true" data-row="1" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="2" data-col="0">CARİ-0004</td>
                                        <td contenteditable="true" data-row="2" data-col="1">ÖZLÜ KLİMA</td>
                                        <td contenteditable="true" data-row="2" data-col="2">AHMET ÖZLÜ</td>
                                        <td contenteditable="true" data-row="2" data-col="3"></td>
                                        <td contenteditable="true" data-row="2" data-col="4"></td>
                                        <td contenteditable="true" data-row="2" data-col="5"></td>
                                        <td contenteditable="true" data-row="2" data-col="6"></td>
                                        <td contenteditable="true" data-row="2" data-col="7"></td>
                                        <td contenteditable="true" data-row="2" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="3" data-col="0">CARİ-0005</td>
                                        <td contenteditable="true" data-row="3" data-col="1">AKARSU İSKELE</td>
                                        <td contenteditable="true" data-row="3" data-col="2">MEHMET GÜLER</td>
                                        <td contenteditable="true" data-row="3" data-col="3"></td>
                                        <td contenteditable="true" data-row="3" data-col="4"></td>
                                        <td contenteditable="true" data-row="3" data-col="5"></td>
                                        <td contenteditable="true" data-row="3" data-col="6"></td>
                                        <td contenteditable="true" data-row="3" data-col="7"></td>
                                        <td contenteditable="true" data-row="3" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="4" data-col="0">CARİ-0006</td>
                                        <td contenteditable="true" data-row="4" data-col="1">AKDENİZ ELEKTRİK DAĞITIM A.Ş.</td>
                                        <td contenteditable="true" data-row="4" data-col="2"></td>
                                        <td contenteditable="true" data-row="4" data-col="3"></td>
                                        <td contenteditable="true" data-row="4" data-col="4"></td>
                                        <td contenteditable="true" data-row="4" data-col="5"></td>
                                        <td contenteditable="true" data-row="4" data-col="6"></td>
                                        <td contenteditable="true" data-row="4" data-col="7"></td>
                                        <td contenteditable="true" data-row="4" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="5" data-col="0">CARİ-0007</td>
                                        <td contenteditable="true" data-row="5" data-col="1">ALANYA İHSAN TİCARET LTD. ŞTİ.</td>
                                        <td contenteditable="true" data-row="5" data-col="2"></td>
                                        <td contenteditable="true" data-row="5" data-col="3"></td>
                                        <td contenteditable="true" data-row="5" data-col="4"></td>
                                        <td contenteditable="true" data-row="5" data-col="5"></td>
                                        <td contenteditable="true" data-row="5" data-col="6"></td>
                                        <td contenteditable="true" data-row="5" data-col="7"></td>
                                        <td contenteditable="true" data-row="5" data-col="8"></td>
                                    </tr>
                                    <tr>
                                        <td contenteditable="true" data-row="6" data-col="0">CARİ-0008</td>
                                        <td contenteditable="true" data-row="6" data-col="1">AYMER LTD. ŞTİ</td>
                                        <td contenteditable="true" data-row="6" data-col="2">MEHMET BEY</td>
                                        <td contenteditable="true" data-row="6" data-col="3"></td>
                                        <td contenteditable="true" data-row="6" data-col="4"></td>
                                        <td contenteditable="true" data-row="6" data-col="5"></td>
                                        <td contenteditable="true" data-row="6" data-col="6"></td>
                                        <td contenteditable="true" data-row="6" data-col="7"></td>
                                        <td contenteditable="true" data-row="6" data-col="8"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            
            // Initialize Excel-like table functionality
            this.initExcelTable();
            
            // Initialize sidebar functionality
            this.initSidebar();
            
            // Initialize table interactions for tedarikci
            this.initTedarikciTableInteractions();
        }
    }

    showCeklerModule() {
        console.log('showCeklerModule called!');
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Çek Listesi - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Çek Listesi</h2>
                    <div class="header-actions">
                        <button class="btn btn-secondary">
                            <i class="fas fa-sync"></i> Yenile
                        </button>
                        <button class="btn btn-warning">
                            <i class="fas fa-file-excel"></i> Excele Aktar
                        </button>
                        <button class="btn btn-dark">
                            <i class="fas fa-print"></i> Yazdır
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-search"></i> Detay ▾
                        </button>
                        <button class="btn btn-outline-secondary">
                            <i class="fas fa-times"></i> Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-main">
                    <!-- Tab Navigation -->
                    <div class="cek-tabs">
                        <button class="tab-btn active" data-tab="gelen-cekler">
                            <i class="fas fa-arrow-down"></i> Gelen Çekler
                        </button>
                        <button class="tab-btn" data-tab="firma-cekleri">
                            <i class="fas fa-building"></i> Firma Çekleri
                        </button>
                        <button class="tab-btn" data-tab="cek-hareketleri">
                            <i class="fas fa-exchange-alt"></i> Çek Ödeme/Tahsilat Hareketleri
                        </button>
                    </div>

                    <!-- Filter Section -->
                    <div class="filter-section cek-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Vade Tarih Aralığı:</label>
                                <div class="date-range">
                                    <div class="input-with-icon">
                                        <input type="text" class="filter-input" placeholder="Başlangıç" value="01.01.2025">
                                        <i class="fas fa-calendar"></i>
                                    </div>
                                    <span>-</span>
                                    <div class="input-with-icon">
                                        <input type="text" class="filter-input" placeholder="Bitiş" value="31.12.2025">
                                        <i class="fas fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Durum:</label>
                                <div class="radio-group">
                                    <label class="radio-label">
                                        <input type="radio" name="status" value="portfoy">
                                        <span>Portföytekiler</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="status" value="tahsil">
                                        <span>Tahsil Edilmişler</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="status" value="ciro">
                                        <span>Ciro Edilmişler</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="status" value="takas">
                                        <span>Takastaki Çekler</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="status" value="teminat">
                                        <span>Teminattaki Çekler</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="status" value="tumu" checked>
                                        <span>Tümü</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Data Table Container -->
                    <div class="data-table-container cek-table-container">
                        <div class="grouping-area">
                            <p>Gruplamak istediğiniz sütunu buraya sürükleyiniz</p>
                        </div>
                        
                        <table class="data-table cek-table" id="cekTable">
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    <th>Evrak No</th>
                                    <th>Tarih</th>
                                    <th>Vade Tarihi</th>
                                    <th>Durumu</th>
                                    <th>Banka</th>
                                    <th>Hesap Tipi</th>
                                    <th>Hesap Tanımı</th>
                                    <th>Bağlı Şantiye</th>
                                    <th>Tutar</th>
                                    <th>Döviz</th>
                                    <th>Kur</th>
                                    <th>Grubu</th>
                                    <th>Hareket Özel Grubu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>EVR001</td>
                                    <td>01.01.2025</td>
                                    <td>15.01.2025</td>
                                    <td>Ciro Edilmiş</td>
                                    <td>Ziraat Bankası</td>
                                    <td>Ticari Hesap</td>
                                    <td>Ana Hesap</td>
                                    <td>Şantiye A</td>
                                    <td>10,000.00</td>
                                    <td>TL</td>
                                    <td>1.00</td>
                                    <td>Grup 1</td>
                                    <td>Özel İşlem</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>EVR002</td>
                                    <td>05.01.2025</td>
                                    <td>20.01.2025</td>
                                    <td>Portföyde</td>
                                    <td>Garanti BBVA</td>
                                    <td>Vadesiz Hesap</td>
                                    <td>Yedek Hesap</td>
                                    <td>Şantiye B</td>
                                    <td>5,500.00</td>
                                    <td>USD</td>
                                    <td>30.50</td>
                                    <td>Grup 2</td>
                                    <td>Normal İşlem</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <!-- Pagination -->
                        <div class="pagination-bar">
                            <span class="record-count">2</span>
                            <div class="pagination-controls">
                                <button class="pagination-btn" disabled>
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="pagination-btn" disabled>
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add custom styles for cekler
            this.addCeklerStyles();
            
            // Initialize cekler functionality
            this.initCeklerFunctionality();
            
            // Initialize table interactions for cekler
            this.initCeklerTableInteractions();
        }
    }

    showCeklerFallback() {
        // Update page title
        document.title = 'Çek Listesi - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content with fallback
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Çek Listesi</h2>
                    <div class="header-actions">
                        <button class="btn btn-secondary">
                            <i class="fas fa-sync"></i> Yenile
                        </button>
                        <button class="btn btn-warning">
                            <i class="fas fa-file-excel"></i> Excele Aktar
                        </button>
                        <button class="btn btn-dark">
                            <i class="fas fa-print"></i> Yazdır
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-search"></i> Detay ▾
                        </button>
                        <button class="btn btn-outline-secondary">
                            <i class="fas fa-times"></i> Çıkış
                        </button>
                    </div>
                </div>
                <div class="content-main">
                    <p>Çek modülü yükleniyor...</p>
                </div>
            `;
        }
    }

    showEvrakModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Gelen/Giden Evrak Takibi - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Gelen/Giden Evrak Takibi</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-paperclip"></i>
                            Ekler
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excele Aktar
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-ellipsis-v"></i>
                            Detay
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body evrak-content">
                    <!-- Filter Section -->
                    <div class="filter-section evrak-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Tarih Aralığı:</label>
                                <div class="date-range">
                                    <div class="input-with-icon">
                                        <input type="text" class="filter-input" placeholder="Başlangıç" value="01.01.2025">
                                        <i class="fa-solid fa-calendar"></i>
                                    </div>
                                    <span>-</span>
                                    <div class="input-with-icon">
                                        <input type="text" class="filter-input" placeholder="Bitiş" value="31.12.2025">
                                        <i class="fa-solid fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-group">
                                <label>İşlem Tarihine Göre:</label>
                                <select class="filter-select">
                                    <option>Evrak Tarihi</option>
                                    <option selected>İşlem Tarihi</option>
                                    <option>Vade Tarihi</option>
                                </select>
                            </div>
                            <div class="filter-group radio-group">
                                <label class="radio-label">
                                    <input type="radio" name="evrakType" value="sonEklenen" checked>
                                    <span>Son Eklenen</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="evrakType" value="tumu">
                                    <span>Tüm Evraklar</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="filter-row">
                            <div class="filter-group evrak-sources-group">
                                <label>Evrak Kaynakları:</label>
                                <div class="evrak-sources-horizontal">
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Evraklardan</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Hareketlerden</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Tekliflerden</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Araçlardan</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">YapSatdan</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">İlerlemeden</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Şantiye Defterinden</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Hesap Tanımlarından</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Sadece Sorumlu Olduğum</span>
                                        </label>
                                    </div>
                                    <div class="source-item">
                                        <label class="source-checkbox">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            <span class="source-label">Sadece Eklediklerim</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>

                    <!-- Data Table -->
                    <div class="data-table-container evrak-table-container">
                        <table class="data-table evrak-table" id="evrakTable">
                            <thead>
                                <tr>
                                    <th>Ref</th>
                                    <th>Tipi</th>
                                    <th>Evrak No</th>
                                    <th>Şantiye</th>
                                    <th>H.Tipi</th>
                                    <th>Hesap Tanımı</th>
                                    <th>Ekleyen</th>
                                    <th>Evrak Tarihi</th>
                                    <th>İşlem Tarihi</th>
                                    <th>Cinsi</th>
                                    <th>İlgili Kişi</th>
                                    <th>Konusu</th>
                                    <th>Hazırlayan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0001</td>
                                    <td>ÖRNEK PROJE</td>
                                    <td>Personel</td>
                                    <td>FİRMA PERSONELİ</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>15.01.2025</td>
                                    <td>15.01.2025</td>
                                    <td>Kimlik</td>
                                    <td>Ahmet Yılmaz</td>
                                    <td>KİMLİK FOTOKOPİSİ</td>
                                    <td>İnsan Kaynakları</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><span class="evrak-type outgoing">Giden</span></td>
                                    <td>EVR-0002</td>
                                    <td>LONICERA OTEL</td>
                                    <td>Fatura</td>
                                    <td>ABC İNŞAAT LTD. ŞTİ.</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>16.01.2025</td>
                                    <td>16.01.2025</td>
                                    <td>Fatura</td>
                                    <td>Mehmet Demir</td>
                                    <td>BETON MALZEME FATURASI</td>
                                    <td>Muhasebe</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0003</td>
                                    <td>PROJE 1</td>
                                    <td>Sözleşme</td>
                                    <td>XYZ MÜTEAHHİTLİK</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>17.01.2025</td>
                                    <td>17.01.2025</td>
                                    <td>Sözleşme</td>
                                    <td>Fatma Kaya</td>
                                    <td>TAŞERON SÖZLEŞMESİ</td>
                                    <td>Hukuk</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><span class="evrak-type outgoing">Giden</span></td>
                                    <td>EVR-0004</td>
                                    <td>LONICERA OTEL</td>
                                    <td>Teklif</td>
                                    <td>DEF YAPI MALZEMELERİ</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>18.01.2025</td>
                                    <td>18.01.2025</td>
                                    <td>Teklif</td>
                                    <td>Ali Özkan</td>
                                    <td>ÇİMENTO TEDARİK TEKLİFİ</td>
                                    <td>Satın Alma</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0005</td>
                                    <td>PROJE 2</td>
                                    <td>İrsaliye</td>
                                    <td>GHI NAKLİYAT</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>19.01.2025</td>
                                    <td>19.01.2025</td>
                                    <td>İrsaliye</td>
                                    <td>Veli Şahin</td>
                                    <td>DEMİR TAŞIMA İRSALİYESİ</td>
                                    <td>Lojistik</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0006</td>
                                    <td>LONICERA OTEL</td>
                                    <td>Fatura</td>
                                    <td>JKL ÇELİK SANAYİ</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>20.01.2025</td>
                                    <td>20.01.2025</td>
                                    <td>Fatura</td>
                                    <td>Can Yıldız</td>
                                    <td>ÇELİK KONSTRÜKSİYON FATURASI</td>
                                    <td>Mühendislik</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td><span class="evrak-type outgoing">Giden</span></td>
                                    <td>EVR-0007</td>
                                    <td>PROJE 1</td>
                                    <td>Teklif</td>
                                    <td>MNO ELEKTRİK</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>21.01.2025</td>
                                    <td>21.01.2025</td>
                                    <td>Teklif</td>
                                    <td>Zeynep Arslan</td>
                                    <td>ELEKTRİK TESİSATI TEKLİFİ</td>
                                    <td>Teknik</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0008</td>
                                    <td>PROJE 2</td>
                                    <td>Sözleşme</td>
                                    <td>PQR İZOLASYON</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>22.01.2025</td>
                                    <td>22.01.2025</td>
                                    <td>Sözleşme</td>
                                    <td>Murat Kaya</td>
                                    <td>İZOLASYON İŞLERİ SÖZLEŞMESİ</td>
                                    <td>Proje</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td><span class="evrak-type outgoing">Giden</span></td>
                                    <td>EVR-0009</td>
                                    <td>LONICERA OTEL</td>
                                    <td>İrsaliye</td>
                                    <td>RST BOYA</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>23.01.2025</td>
                                    <td>23.01.2025</td>
                                    <td>İrsaliye</td>
                                    <td>Elif Demir</td>
                                    <td>BOYA MALZEMESİ İRSALİYESİ</td>
                                    <td>Satın Alma</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0010</td>
                                    <td>PROJE 1</td>
                                    <td>Fatura</td>
                                    <td>TUV CAM</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>24.01.2025</td>
                                    <td>24.01.2025</td>
                                    <td>Fatura</td>
                                    <td>Burak Özkan</td>
                                    <td>CAM SİSTEMLERİ FATURASI</td>
                                    <td>Mimarlık</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td><span class="evrak-type outgoing">Giden</span></td>
                                    <td>EVR-0011</td>
                                    <td>PROJE 2</td>
                                    <td>Teklif</td>
                                    <td>VWX ASANSÖR</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>25.01.2025</td>
                                    <td>25.01.2025</td>
                                    <td>Teklif</td>
                                    <td>Deniz Yılmaz</td>
                                    <td>ASANSÖR SİSTEMİ TEKLİFİ</td>
                                    <td>Teknik</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0012</td>
                                    <td>LONICERA OTEL</td>
                                    <td>Sözleşme</td>
                                    <td>YZA PEYZAJ</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>26.01.2025</td>
                                    <td>26.01.2025</td>
                                    <td>Sözleşme</td>
                                    <td>Gizem Şahin</td>
                                    <td>PEYZAJ DÜZENLEME SÖZLEŞMESİ</td>
                                    <td>Mimarlık</td>
                                </tr>
                                <tr>
                                    <td>13</td>
                                    <td><span class="evrak-type outgoing">Giden</span></td>
                                    <td>EVR-0013</td>
                                    <td>PROJE 1</td>
                                    <td>İrsaliye</td>
                                    <td>BCD MOBİLYA</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>27.01.2025</td>
                                    <td>27.01.2025</td>
                                    <td>İrsaliye</td>
                                    <td>Kemal Arslan</td>
                                    <td>OFİS MOBİLYASI İRSALİYESİ</td>
                                    <td>İç Mimari</td>
                                </tr>
                                <tr>
                                    <td>14</td>
                                    <td><span class="evrak-type incoming">Gelen</span></td>
                                    <td>EVR-0014</td>
                                    <td>PROJE 2</td>
                                    <td>Fatura</td>
                                    <td>EFG KLİMA</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>28.01.2025</td>
                                    <td>28.01.2025</td>
                                    <td>Fatura</td>
                                    <td>Serkan Yıldız</td>
                                    <td>KLİMA SİSTEMİ FATURASI</td>
                                    <td>Mekanik</td>
                                </tr>
                                <tr>
                                    <td>15</td>
                                    <td><span class="evrak-type outgoing">Giden</span></td>
                                    <td>EVR-0015</td>
                                    <td>LONICERA OTEL</td>
                                    <td>Teklif</td>
                                    <td>HIJ GÜVENLİK</td>
                                    <td>Ana Kullanıcı</td>
                                    <td>29.01.2025</td>
                                    <td>29.01.2025</td>
                                    <td>Teklif</td>
                                    <td>Aslı Kaya</td>
                                    <td>GÜVENLİK SİSTEMİ TEKLİFİ</td>
                                    <td>Teknik</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <!-- Summary Bar -->
                        <div class="summary-bar">
                            <span class="record-count">15 kayıt</span>
                            <div class="summary-stats">
                                <span class="stat-item">
                                    <i class="fa-solid fa-inbox"></i>
                                    Gelen: 9
                                </span>
                                <span class="stat-item">
                                    <i class="fa-solid fa-paper-plane"></i>
                                    Giden: 6
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add custom styles for evrak
            this.addEvrakStyles();
            
            // Initialize evrak functionality
            this.initEvrakFunctionality();
            
            // Initialize table interactions for evrak
            this.initEvrakTableInteractions();
        }
    }

    showEFaturaModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'E-Fatura Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>E-Fatura Yönetimi</h2>
                    <div class="header-actions">
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body efatura-content">
                    <!-- Tab Navigation -->
                    <div class="efatura-tabs">
                        <button class="tab-btn" data-tab="gonderme-islemi">
                            <i class="fa-solid fa-paper-plane"></i>
                            Gönderme İşlemi
                        </button>
                        <button class="tab-btn" data-tab="gonderilenler">
                            <i class="fa-solid fa-check-circle"></i>
                            Gönderilenler
                        </button>
                        <button class="tab-btn active" data-tab="gelen-faturalar">
                            <i class="fa-solid fa-inbox"></i>
                            Gelen Faturalar
                        </button>
                    </div>

                    <!-- Filter Section -->
                    <div class="filter-section efatura-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Tarih Aralığı:</label>
                                <div class="date-range">
                                    <div class="input-with-icon">
                                        <input type="text" class="filter-input" placeholder="Başlangıç" value="01.07.2018">
                                        <i class="fa-solid fa-calendar"></i>
                                    </div>
                                    <span>-</span>
                                    <div class="input-with-icon">
                                        <input type="text" class="filter-input" placeholder="Bitiş" value="31.07.2018">
                                        <i class="fa-solid fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-group">
                                <label>Fatura Durumu:</label>
                                <select class="filter-select" id="faturaDurumu">
                                    <option value="onaylanan" selected>Onaylanan</option>
                                    <option value="bekleyen">Bekleyen</option>
                                    <option value="reddedilen">Reddedilen</option>
                                </select>
                            </div>
                            <div class="filter-actions">
                                <button class="btn btn-primary">
                                    <i class="fa-solid fa-download"></i>
                                    Faturaları Al
                                </button>
                                <button class="btn btn-outline">
                                    <i class="fa-solid fa-search"></i>
                                    Detay
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Data Table -->
                    <div class="data-table-container efatura-table-container">
                        <table class="data-table efatura-table" id="efaturaTable">
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>Gönderen</th>
                                    <th>Vergi No</th>
                                    <th>Fatura No</th>
                                    <th>ETTN</th>
                                    <th>Senaryo</th>
                                    <th>Ara Toplam</th>
                                    <th>Vergi Toplam</th>
                                    <th>Tutar</th>
                                    <th>Döviz</th>
                                    <th>Kur</th>
                                    <th>KDV 18</th>
                                    <th>KDV 1</th>
                                    <th>KDV 8</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="14" class="no-data"><<Gösterilecek data yok>></td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <!-- Summary Bar -->
                        <div class="summary-bar">
                            <span class="record-count">0</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Add custom styles for efatura
            this.addEFaturaStyles();
            
            // Initialize efatura functionality
            this.initEFaturaFunctionality();
            
            // Load initial data for "Gelen Faturalar" tab (default active tab)
            setTimeout(() => {
                const tableBody = document.querySelector('#efaturaTable tbody');
                if (tableBody) {
                    this.loadGelenFaturalar(tableBody);
                }
            }, 100);
        }
    }

    showRaporlarModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Raporlar - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        // Update module container instead of main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Raporlar</h2>
                    <p class="header-description">Muhasebe ve finansal analiz raporları</p>
                </div>
                
                <div class="reports-grid">
                    <div class="report-card submenu-item" data-report="hesap-raporu" data-report-id="hesap">
                        <div class="report-icon">
                            <i class="fa-solid fa-coins"></i>
                        </div>
                        <h3>Hesap Raporu</h3>
                        <p>Genel hesap durumu ve bakiye analizi</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="santiye-raporu" data-report-id="santiye">
                        <div class="report-icon">
                            <i class="fa-solid fa-hard-hat"></i>
                        </div>
                        <h3>Şantiye Raporu</h3>
                        <p>Şantiye bazlı maliyet ve hakediş analizi</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="taseron-raporu" data-report-id="taseron">
                        <div class="report-icon">
                            <i class="fa-solid fa-user-tie"></i>
                        </div>
                        <h3>Taşeron Raporu</h3>
                        <p>Taşeron performans ve ödeme analizi</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="personel-raporu" data-report-id="personel">
                        <div class="report-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <h3>Personel Raporu</h3>
                        <p>Personel çalışma ve maaş analizi</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="tedarikci-raporu" data-report-id="tedarikci">
                        <div class="report-icon">
                            <i class="fa-solid fa-truck"></i>
                        </div>
                        <h3>Tedarikçi Raporu</h3>
                        <p>Tedarikçi analiz ve teslimat performansı</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="maas-raporu" data-report-id="maas">
                        <div class="report-icon">
                            <i class="fa-solid fa-money-bill-wave"></i>
                        </div>
                        <h3>Maaş Raporu</h3>
                        <p>Personel maaş ve kesinti özetleri</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="fatura-raporu" data-report-id="fatura">
                        <div class="report-icon">
                            <i class="fa-solid fa-file-invoice"></i>
                        </div>
                        <h3>Fatura/İrsaliye Raporu</h3>
                        <p>Fatura ve irsaliye takip analizi</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="odeme-raporu" data-report-id="odeme">
                        <div class="report-icon">
                            <i class="fa-solid fa-credit-card"></i>
                        </div>
                        <h3>Ödeme & Tahsilat Raporu</h3>
                        <p>Ödeme akışları ve nakit analizi</p>
                    </div>
                    
                    <div class="report-card submenu-item" data-report="kasa-raporu" data-report-id="kasa">
                        <div class="report-icon">
                            <i class="fa-solid fa-cash-register"></i>
                        </div>
                        <h3>Kasa Raporu</h3>
                        <p>Kasa durumu ve günlük özet</p>
                    </div>
                </div>
            `;
            
            // Add styles
            this.addRaporlarStyles();
            
            // Initialize functionality
            this.initRaporlarFunctionality();
            
            // Re-initialize ReportManager for the new content
            if (window.reportManager) {
                // Force re-initialization of report cards
                setTimeout(() => {
                    window.reportManager.refresh();
                    console.log('ReportManager re-initialized for toolbar reports');
                }, 100);
            } else {
                console.log('ReportManager not found in window object');
            }
        }
    }

    showYapSatModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Emlak Satışları - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Emlak Satışları</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-money-bill-wave"></i>
                            Satış Hareketi
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excele Aktar
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body yapsat-content">
                    <!-- Project Selection -->
                    <div class="project-selection">
                        <label>Şantiye & Proje Tanımı:</label>
                        <select class="project-select" id="projectFilter">
                            <option value="lonicera" selected>LONICERA OTEL İNŞAATI</option>
                            <option value="project1">PROJE 1</option>
                            <option value="project2">PROJE 2</option>
                        </select>
                    </div>

                    <!-- Data Table -->
                    <div class="data-table-container yapsat-table-container">
                        <table class="data-table yapsat-table" id="yapsatTable">
                            <thead>
                                <tr>
                                    <th>Blok</th>
                                    <th>Daire No</th>
                                    <th>Tipi</th>
                                    <th>Kat</th>
                                    <th>Yön</th>
                                    <th>Satış Fiyatı</th>
                                    <th>Döviz</th>
                                    <th>Ölçü</th>
                                    <th>Oda</th>
                                    <th>Banyo</th>
                                    <th>Durumu</th>
                                    <th>Alıcı</th>
                                    <th>Tapu</th>
                                    <th>Öd</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="selected">
                                    <td>A</td>
                                    <td>1</td>
                                    <td>2+1</td>
                                    <td>1</td>
                                    <td>1 DOĞU</td>
                                    <td>300.000</td>
                                    <td>TL</td>
                                    <td>200</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>SATILDI</td>
                                    <td>EVREN YAMAN</td>
                                    <td><input type="checkbox"></td>
                                    <td><input type="checkbox"></td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td>2</td>
                                    <td>3+1</td>
                                    <td>1</td>
                                    <td>1 BATI</td>
                                    <td>350.000</td>
                                    <td>TL</td>
                                    <td>200</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>SATILIK</td>
                                    <td></td>
                                    <td><input type="checkbox"></td>
                                    <td><input type="checkbox"></td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td>3</td>
                                    <td>3+1</td>
                                    <td>2</td>
                                    <td>2 DOĞU</td>
                                    <td>400.000</td>
                                    <td>TL</td>
                                    <td>300</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>SATILIK</td>
                                    <td></td>
                                    <td><input type="checkbox"></td>
                                    <td><input type="checkbox"></td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <!-- Summary Bar -->
                        <div class="summary-bar">
                            <span class="record-count">3</span>
                            <span class="total-amount">1.050.000,00</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Add custom styles for yapsat
            this.addYapSatStyles();
            
            // Initialize yapsat functionality
            this.initYapSatFunctionality();
        }
    }

    showIlerlemeModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Şantiye İlerleme & Yaklaşık Maliyet Hareketleri - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Şantiye İlerleme & Yaklaşık Maliyet Hareketleri</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excele Aktar
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-ellipsis-v"></i>
                            Detay
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body ilerleme-content">
                    <!-- Top Section - Filters -->
                    <div class="filter-section ilerleme-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>İşlem Şantiyesi:</label>
                                <select class="filter-select" id="santiyeFilter">
                                    <option value="ornek-proje" selected>ÖRNEK PROJE</option>
                                    <option value="santiye1">ŞANTİYE 1</option>
                                    <option value="santiye2">ŞANTİYE 2</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="stokGizle">
                                    <span>Stok Kalmelerini Gizle</span>
                                </label>
                            </div>
                            <div class="filter-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="tumHareketler">
                                    <span>Tüm Hareketler</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Main Content Area -->
                    <div class="ilerleme-main">
                        <!-- Left Pane - Navigation -->
                        <aside class="ilerleme-sidebar">
                            <h3>Mahal Bazlı</h3>
                            <div class="tree-view">
                                <div class="tree-item">
                                    <i class="fa-solid fa-folder"></i>
                                    <span>Tümü</span>
                                </div>
                                <div class="tree-item expanded">
                                    <i class="fa-solid fa-folder-open"></i>
                                    <span>A</span>
                                </div>
                                <div class="tree-item">
                                    <i class="fa-solid fa-folder"></i>
                                    <span>B</span>
                                </div>
                            </div>
                        </aside>

                        <!-- Right Pane - Data Grid -->
                        <div class="ilerleme-data-area">
                            <h3>İmalat Bilgileri</h3>
                            <div class="table-container">
                                <table class="data-table ilerleme-table" id="ilerlemeTable">
                                    <thead>
                                        <tr>
                                            <th>Fiş No</th>
                                            <th>Grubu</th>
                                            <th>İmalat Tanımı</th>
                                            <th>Blok</th>
                                            <th>Kat</th>
                                            <th>Daire</th>
                                            <th>Mahal</th>
                                            <th>Baş. Tarih</th>
                                            <th>Bit.Tarihi</th>
                                            <th>Top.Metraj</th>
                                            <th>Birimi</th>
                                            <th>T.İş Günü</th>
                                            <th>Birim Fiyat</th>
                                            <th>Toplam Tutar</th>
                                            <th>Döviz</th>
                                            <th>Y.G.İ.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="selected">
                                            <td>10001</td>
                                            <td>İNCE İŞLI</td>
                                            <td>İÇ-DIŞ ÖRME DUVARLARI</td>
                                            <td></td>
                                            <td>K#1</td>
                                            <td>D#1</td>
                                            <td></td>
                                            <td>01.01.2025</td>
                                            <td>15.01.2025</td>
                                            <td>720</td>
                                            <td>m²</td>
                                            <td>10</td>
                                            <td>0,00</td>
                                            <td>0,00</td>
                                            <td>TL</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>10002</td>
                                            <td>İNCE İŞLI</td>
                                            <td>İÇ KARA SIVA</td>
                                            <td></td>
                                            <td>K#1</td>
                                            <td>D#1</td>
                                            <td></td>
                                            <td>16.01.2025</td>
                                            <td>25.01.2025</td>
                                            <td>720</td>
                                            <td>m²</td>
                                            <td>8</td>
                                            <td>0,00</td>
                                            <td>0,00</td>
                                            <td>TL</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>10003</td>
                                            <td>İNCE İŞLI</td>
                                            <td>MERMER DENİZLİK</td>
                                            <td></td>
                                            <td>K#1</td>
                                            <td>D#2</td>
                                            <td></td>
                                            <td>26.01.2025</td>
                                            <td>05.02.2025</td>
                                            <td>150</td>
                                            <td>m</td>
                                            <td>8</td>
                                            <td>0,00</td>
                                            <td>0,00</td>
                                            <td>TL</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>10004</td>
                                            <td>İNCE İŞLI</td>
                                            <td>ALÇI SIVA</td>
                                            <td></td>
                                            <td>K#1</td>
                                            <td>D#2</td>
                                            <td></td>
                                            <td>06.02.2025</td>
                                            <td>15.02.2025</td>
                                            <td>720</td>
                                            <td>m²</td>
                                            <td>8</td>
                                            <td>0,00</td>
                                            <td>0,00</td>
                                            <td>TL</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>10005</td>
                                            <td>İNCE İŞLI</td>
                                            <td>ŞAP</td>
                                            <td></td>
                                            <td>K#1</td>
                                            <td>D#3</td>
                                            <td></td>
                                            <td>16.02.2025</td>
                                            <td>25.02.2025</td>
                                            <td>720</td>
                                            <td>m²</td>
                                            <td>8</td>
                                            <td>0,00</td>
                                            <td>0,00</td>
                                            <td>TL</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>10006</td>
                                            <td>İNCE İŞLI</td>
                                            <td>CAM MONTAJI</td>
                                            <td></td>
                                            <td>K#1</td>
                                            <td>D#4</td>
                                            <td></td>
                                            <td>26.02.2025</td>
                                            <td>05.03.2025</td>
                                            <td>150</td>
                                            <td>m²</td>
                                            <td>8</td>
                                            <td>0,00</td>
                                            <td>0,00</td>
                                            <td>TL</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr class="summary-row">
                                            <td colspan="9">TOPLAM</td>
                                            <td>72.000,00</td>
                                            <td></td>
                                            <td>524.880</td>
                                            <td></td>
                                            <td>0,00</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add custom styles for ilerleme
            this.addIlerlemeStyles();
            
            // Initialize ilerleme functionality
            this.initIlerlemeFunctionality();
        }
    }

    showPuantajModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Puantaj Hareketleri - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const months = [
                'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
            ];
            
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Puantaj Hareketleri</h2>
                    <div class="header-actions">
                        <button class="btn btn-secondary">
                            <i class="fas fa-sync"></i> Yenile
                        </button>
                        <button class="btn btn-warning">
                            <i class="fas fa-file-excel"></i> Excele Aktar
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-ellipsis-v"></i> Detay ▾
                        </button>
                        <button class="btn btn-dark">
                            <i class="fas fa-print"></i> Yazdır
                        </button>
                        <button class="btn btn-outline-secondary">
                            <i class="fas fa-times"></i> Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-main">
                    <div class="filter-section puantaj-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>Şantiye:</label>
                                <select class="filter-select" id="santiyeFilter">
                                    <option value="merkez">ŞİRKET MERKEZ ŞANTİYESİ</option>
                                    <option value="santiye1">ŞANTİYE 1</option>
                                    <option value="santiye2">ŞANTİYE 2</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Taşeron:</label>
                                <select class="filter-select" id="taseronFilter">
                                    <option value="sirket">ŞİRKETİN TAŞERONU</option>
                                    <option value="taseron1">TAŞERON 1</option>
                                    <option value="taseron2">TAŞERON 2</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Ay:</label>
                                <select class="filter-select" id="monthFilter">
                                    ${months.map((month, index) => 
                                        `<option value="${index}" ${index === currentMonth ? 'selected' : ''}>${month}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Yıl:</label>
                                <select class="filter-select" id="yearFilter">
                                    ${this.generatePuantajYearOptions(currentYear)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="data-table-container puantaj-table-container">
                        <table class="data-table puantaj-table" id="puantajTable">
                            <thead>
                                <tr>
                                    <th>Personel</th>
                                    <th>Görevi</th>
                                    <th>Grubu</th>
                                    <th>Y.Ücreti</th>
                                    <th>İşe Giriş</th>
                                    <th>İşten Çıkış</th>
                                    ${this.generatePuantajDayHeaders(currentYear, currentMonth)}
                                    <th>Y.Toplam</th>
                                    <th>M.Toplam</th>
                                    <th>Y.Ka</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.generatePuantajData(currentYear, currentMonth)}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            // Add custom styles for puantaj
            this.addPuantajStyles();
            
            // Initialize puantaj functionality
            this.initPuantajFunctionality();
            
            // Initialize table interactions for puantaj
            this.initPuantajTableInteractions();
        }
    }

    generatePuantajYearOptions(currentYear) {
        let options = '';
        for (let year = currentYear - 5; year <= currentYear + 1; year++) {
            options += `<option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>`;
        }
        return options;
    }

    generatePuantajDayHeaders(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let headers = '';
        for (let day = 1; day <= daysInMonth; day++) {
            headers += `<th class="day-header">${day}</th>`;
        }
        return headers;
    }

    generatePuantajData(year, month) {
        return `
            <tr class="group-row" data-group="firma-personel">
                <td colspan="6" class="group-header">
                    <i class="fas fa-chevron-down"></i> FİRMA PERSONELİ
                </td>
                ${this.generatePuantajDayCells('group', year, month)}
                <td class="total-cell">4,5</td>
                <td class="total-cell">8</td>
                <td class="total-cell">-</td>
            </tr>
            <tr class="detail-row" data-group="firma-personel">
                <td>EVREN YAMAN</td>
                <td>MUHASEBE</td>
                <td>PERSONEL GRUBU 2</td>
                <td>300</td>
                <td>01.01.2017</td>
                <td>-</td>
                ${this.generatePuantajDayCells('evren', year, month)}
                <td class="total-cell">4</td>
                <td class="total-cell">0</td>
                <td class="total-cell">-</td>
            </tr>
            <tr class="detail-row" data-group="firma-personel">
                <td>REMZİ HACIHAMDIO</td>
                <td>MUHASEBE</td>
                <td>PERSONEL GRUBU 2</td>
                <td>100</td>
                <td>01.01.2017</td>
                <td>-</td>
                ${this.generatePuantajDayCells('remzi', year, month)}
                <td class="total-cell">8</td>
                <td class="total-cell">0</td>
                <td class="total-cell">-</td>
            </tr>
            <tr class="detail-row" data-group="firma-personel">
                <td>GÜLGÜN BAŞER</td>
                <td>MUHASEBE</td>
                <td>PERSONEL GRUBU 2</td>
                <td>120</td>
                <td>13.06.2018</td>
                <td>-</td>
                ${this.generatePuantajDayCells('gulgun', year, month)}
                <td class="total-cell">30</td>
                <td class="total-cell">0</td>
                <td class="total-cell">-</td>
            </tr>
        `;
    }

    generatePuantajDayCells(person, year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let cells = '';
        
        for (let day = 1; day <= daysInMonth; day++) {
            let cellContent = '';
            let cellClass = 'day-cell';
            
            // Generate different attendance patterns based on person
            if (person === 'evren') {
                if (day >= 3 && day <= 6) cellContent = 'X';
                else if (day === 1) cellContent = '/';
                else if (day === 2) cellContent = 'H';
                else if (day === 7) cellContent = 'i';
                else if (day >= 8 && day <= 10) cellContent = '';
                else cellContent = '';
            } else if (person === 'remzi') {
                if (day >= 7 && day <= 14) cellContent = 'X';
                else if (day >= 1 && day <= 6) cellContent = '';
                else cellContent = '';
            } else if (person === 'gulgun') {
                if (day >= 1 && day <= 12) cellContent = 'X';
                else cellContent = '';
            } else if (person === 'group') {
                if (day === 1) cellContent = 'X';
                else if (day === 2) cellContent = '/';
                else if (day === 3) cellContent = 'H';
                else if (day === 4) cellContent = 'i';
                else if (day >= 5 && day <= 8) cellContent = '';
                else cellContent = '';
            }
            
            if (cellContent === '') {
                cellClass += ' empty-cell';
            } else if (cellContent === 'X') {
                cellClass += ' present-cell';
            } else if (cellContent === '/') {
                cellClass += ' half-day-cell';
            } else if (cellContent === 'H') {
                cellClass += ' holiday-cell';
            } else if (cellContent === 'i') {
                cellClass += ' illness-cell';
            }
            
            cells += `<td class="${cellClass}" data-day="${day}">${cellContent}</td>`;
        }
        
        return cells;
    }

    addPuantajStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .puantaj-filters {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            
            .filter-row {
                display: flex;
                gap: 20px;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .filter-group {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .filter-group label {
                font-weight: 600;
                color: #495057;
                min-width: 80px;
            }
            
            .filter-select {
                padding: 6px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 150px;
            }
            
            .puantaj-table-container {
                overflow-x: auto;
                max-width: 100%;
            }
            
            .puantaj-table {
                min-width: 1200px;
                font-size: 12px;
            }
            
            .puantaj-table th {
                background: #e9ecef;
                padding: 8px 4px;
                text-align: center;
                border: 1px solid #dee2e6;
                font-weight: 600;
            }
            
            .puantaj-table td {
                padding: 6px 4px;
                border: 1px solid #dee2e6;
                text-align: center;
                vertical-align: middle;
            }
            
            .day-header {
                min-width: 30px;
                max-width: 30px;
            }
            
            .day-cell {
                min-width: 30px;
                max-width: 30px;
                height: 30px;
                cursor: pointer;
                position: relative;
                transition: all 0.2s ease;
                border: 1px solid transparent;
            }
            
            .day-cell:hover {
                background-color: #e3f2fd !important;
                border-color: #2196f3;
                transform: scale(1.05);
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .day-cell:active {
                transform: scale(0.95);
            }
            
            .empty-cell {
                background-color: #f8f9fa;
            }
            
            .present-cell {
                background-color: #d4edda;
                color: #155724;
                font-weight: bold;
            }
            
            .half-day-cell {
                background-color: #fff3cd;
                color: #856404;
                font-weight: bold;
            }
            
            .holiday-cell {
                background-color: #f8d7da;
                color: #721c24;
                font-weight: bold;
            }
            
            .illness-cell {
                background-color: #d1ecf1;
                color: #0c5460;
                font-weight: bold;
            }
            
            .group-row {
                background-color: #e9ecef;
                font-weight: bold;
            }
            
            .group-header {
                text-align: left !important;
                padding-left: 15px !important;
            }
            
            .group-header i {
                margin-right: 8px;
                cursor: pointer;
            }
            
            .detail-row {
                background-color: white;
            }
            
            .detail-row:nth-child(even) {
                background-color: #f8f9fa;
            }
            
            .total-cell {
                background-color: #f8f9fa;
                font-weight: bold;
                text-align: center;
            }
            
            .puantaj-table th:nth-child(1) { min-width: 120px; }
            .puantaj-table th:nth-child(2) { min-width: 100px; }
            .puantaj-table th:nth-child(3) { min-width: 120px; }
            .puantaj-table th:nth-child(4) { min-width: 80px; }
            .puantaj-table th:nth-child(5) { min-width: 100px; }
            .puantaj-table th:nth-child(6) { min-width: 100px; }
            .puantaj-table th:nth-last-child(3) { min-width: 80px; }
            .puantaj-table th:nth-last-child(2) { min-width: 80px; }
            .puantaj-table th:nth-last-child(1) { min-width: 60px; }
        `;
        document.head.appendChild(style);
    }

    initPuantajFunctionality() {
        this.initPuantajFilters();
        this.initPuantajTableInteractions();
        this.initPuantajGroupCollapse();
        this.initPuantajEditableCells();
    }

    initPuantajFilters() {
        const monthFilter = document.getElementById('monthFilter');
        const yearFilter = document.getElementById('yearFilter');
        
        if (monthFilter) {
            monthFilter.addEventListener('change', () => {
                const newMonth = parseInt(monthFilter.value);
                const newYear = parseInt(yearFilter.value);
                this.refreshPuantajTable(newYear, newMonth);
            });
        }
        
        if (yearFilter) {
            yearFilter.addEventListener('change', () => {
                const newMonth = parseInt(monthFilter.value);
                const newYear = parseInt(yearFilter.value);
                this.refreshPuantajTable(newYear, newMonth);
            });
        }
    }

    initPuantajTableInteractions() {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            const dayCells = document.querySelectorAll('.day-cell');
            console.log('Found day cells:', dayCells.length); // Debug log
            
            dayCells.forEach(cell => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Day cell clicked:', cell.textContent); // Debug log
                    this.togglePuantajAttendance(cell);
                });
                
                // Also add hover effect to show it's clickable
                cell.style.cursor = 'pointer';
            });
        }, 100);
    }

    togglePuantajAttendance(cell) {
        const currentValue = cell.textContent.trim();
        const day = cell.getAttribute('data-day');
        
        console.log('Toggling attendance for day', day, 'current value:', currentValue); // Debug log
        
        // Cycle through attendance states
        let newValue = '';
        let newClass = 'empty-cell';
        
        if (currentValue === '') {
            newValue = 'X';
            newClass = 'present-cell';
        } else if (currentValue === 'X') {
            newValue = '/';
            newClass = 'half-day-cell';
        } else if (currentValue === '/') {
            newValue = 'H';
            newClass = 'holiday-cell';
        } else if (currentValue === 'H') {
            newValue = 'i';
            newClass = 'illness-cell';
        } else {
            newValue = '';
            newClass = 'empty-cell';
        }
        
        // Update cell
        cell.textContent = newValue;
        cell.className = `day-cell ${newClass}`;
        
        // Add visual feedback
        cell.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 150);
        
        console.log('Updated to:', newValue, 'with class:', newClass); // Debug log
        
        // Recalculate totals
        this.calculatePuantajTotals();
    }

    initPuantajGroupCollapse() {
        const groupHeaders = document.querySelectorAll('.group-header');
        
        groupHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const group = header.closest('tr').getAttribute('data-group');
                this.togglePuantajGroup(group);
            });
        });
    }

    togglePuantajGroup(group) {
        const detailRows = document.querySelectorAll(`[data-group="${group}"]`);
        const groupRow = detailRows[0];
        const icon = groupRow.querySelector('i');
        
        detailRows.forEach((row, index) => {
            if (index > 0) { // Skip the group header row
                row.style.display = row.style.display === 'none' ? '' : 'none';
            }
        });
        
        // Toggle icon
        if (icon.classList.contains('fa-chevron-down')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-right');
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-down');
        }
    }

    calculatePuantajTotals() {
        // This would calculate totals based on attendance data
        console.log('Calculating puantaj totals...');
    }

    initPuantajEditableCells() {
        // Make personnel information cells editable
        setTimeout(() => {
            const editableCells = document.querySelectorAll('.puantaj-table td:not(.day-cell):not(.total-cell):not(.group-header)');
            
            editableCells.forEach(cell => {
                // Skip the first 6 columns (Personel, Görevi, Grubu, Y.Ücreti, İşe Giriş, İşten Çıkış)
                const cellIndex = cell.cellIndex;
                if (cellIndex < 6) {
                    cell.contentEditable = true;
                    cell.style.cursor = 'text';
                    cell.addEventListener('click', (e) => {
                        if (e.target === cell) {
                            cell.focus();
                            // Select all text when clicking
                            const range = document.createRange();
                            range.selectNodeContents(cell);
                            const selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    });
                    
                    cell.addEventListener('blur', () => {
                        // Save changes when cell loses focus
                        console.log('Cell updated:', cell.textContent);
                    });
                }
            });
        }, 100);
    }

    refreshPuantajTable(year, month) {
        // Re-render the table with new month/year
        this.showPuantajModule();
    }



    addIlerlemeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ilerleme-content {
                display: flex;
                flex-direction: column;
                height: calc(100vh - 120px);
            }
            
            .ilerleme-filters {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 15px;
                border: 1px solid #dee2e6;
            }
            
            .ilerleme-filters .filter-row {
                display: flex;
                gap: 30px;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .ilerleme-filters .filter-group {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .ilerleme-filters .filter-group label {
                font-weight: 600;
                color: #495057;
                min-width: 120px;
            }
            
            .ilerleme-filters .filter-select {
                padding: 6px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 200px;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-weight: normal;
            }
            
            .checkbox-label input[type="checkbox"] {
                margin: 0;
            }
            
            .ilerleme-main {
                display: flex;
                flex: 1;
                gap: 15px;
                min-height: 0;
            }
            
            .ilerleme-sidebar {
                width: 250px;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                padding: 15px;
                overflow-y: auto;
            }
            
            .ilerleme-sidebar h3 {
                margin: 0 0 15px 0;
                color: #495057;
                font-size: 16px;
                font-weight: 600;
                border-bottom: 2px solid #28a745;
                padding-bottom: 8px;
            }
            
            .tree-view {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .tree-item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
            }
            
            .tree-item:hover {
                background: #e8f5e8;
                color: #2e7d32;
            }
            
            .tree-item.expanded {
                background: #e8f5e8;
                color: #2e7d32;
                font-weight: 600;
            }
            
            .tree-item i {
                width: 16px;
                text-align: center;
                color: #6c757d;
            }
            
            .tree-item.expanded i {
                color: #2e7d32;
            }
            
            .ilerleme-data-area {
                flex: 1;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .ilerleme-data-area h3 {
                margin: 0;
                padding: 15px;
                background: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
                color: #495057;
                font-size: 16px;
                font-weight: 600;
            }
            
            .ilerleme-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                flex: 1;
            }
            
            .ilerleme-table th {
                background: #e9ecef;
                padding: 10px 8px;
                text-align: left;
                border: 1px solid #dee2e6;
                font-weight: 600;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            
            .ilerleme-table td {
                padding: 8px;
                border: 1px solid #dee2e6;
                text-align: left;
            }
            
            .ilerleme-table tbody tr {
                transition: all 0.2s ease;
            }
            
            .ilerleme-table tbody tr:hover {
                background: #f8f9fa;
            }
            
            .ilerleme-table tbody tr.selected {
                background: #e8f5e8 !important;
                color: #2e7d32;
                font-weight: 600;
            }
            
            .ilerleme-table tbody tr.selected:hover {
                background: #c8e6c9 !important;
            }
            
            .ilerleme-table tbody td.selected {
                background: white !important;
                color: #495057;
                font-weight: normal;
                border: 2px solid #2e7d32;
            }
            
            .ilerleme-table tbody td.selected:hover {
                background: #f8f9fa !important;
            }
            
            .summary-row {
                background: #f8f9fa !important;
                font-weight: bold;
                color: #495057;
            }
            
            .summary-row td {
                border-top: 2px solid #dee2e6;
            }
            
            /* Column widths */
            .ilerleme-table th:nth-child(1) { width: 80px; }   /* Fiş No */
            .ilerleme-table th:nth-child(2) { width: 100px; }  /* Grubu */
            .ilerleme-table th:nth-child(3) { width: 200px; }  /* İmalat Tanımı */
            .ilerleme-table th:nth-child(4) { width: 60px; }   /* Blok */
            .ilerleme-table th:nth-child(5) { width: 60px; }   /* Kat */
            .ilerleme-table th:nth-child(6) { width: 60px; }   /* Daire */
            .ilerleme-table th:nth-child(7) { width: 80px; }   /* Mahal */
            .ilerleme-table th:nth-child(8) { width: 90px; }   /* Baş. Tarih */
            .ilerleme-table th:nth-child(9) { width: 90px; }   /* Bit.Tarihi */
            .ilerleme-table th:nth-child(10) { width: 100px; } /* Top.Metraj */
            .ilerleme-table th:nth-child(11) { width: 60px; }  /* Birimi */
            .ilerleme-table th:nth-child(12) { width: 80px; }  /* T.İş Günü */
            .ilerleme-table th:nth-child(13) { width: 100px; } /* Birim Fiyat */
            .ilerleme-table th:nth-child(14) { width: 100px; } /* Toplam Tutar */
            .ilerleme-table th:nth-child(15) { width: 60px; }  /* Döviz */
            .ilerleme-table th:nth-child(16) { width: 60px; }  /* Y.G.İ. */
        `;
        document.head.appendChild(style);
    }

    initIlerlemeFunctionality() {
        this.initIlerlemeFilters();
        this.initIlerlemeTableInteractions();
        this.initIlerlemeTreeView();
    }

    initIlerlemeFilters() {
        const santiyeFilter = document.getElementById('santiyeFilter');
        const stokGizle = document.getElementById('stokGizle');
        const tumHareketler = document.getElementById('tumHareketler');
        
        if (santiyeFilter) {
            santiyeFilter.addEventListener('change', () => {
                this.applyIlerlemeFilters();
            });
        }
        
        if (stokGizle) {
            stokGizle.addEventListener('change', () => {
                this.applyIlerlemeFilters();
            });
        }
        
        if (tumHareketler) {
            tumHareketler.addEventListener('change', () => {
                this.applyIlerlemeFilters();
            });
        }
    }

    applyIlerlemeFilters() {
        const santiye = document.getElementById('santiyeFilter').value;
        const stokGizle = document.getElementById('stokGizle').checked;
        const tumHareketler = document.getElementById('tumHareketler').checked;
        
        console.log('Applying ilerleme filters:', { santiye, stokGizle, tumHareketler });
        
        // Here you would typically make an API call to filter data
        // For now, just log the filter values
    }

    initIlerlemeTableInteractions() {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            const tableCells = document.querySelectorAll('.ilerleme-table tbody td');
            
            tableCells.forEach(cell => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Check if cell is already in edit mode
                    if (cell.querySelector('input')) {
                        return;
                    }
                    
                    // Remove selected class from all cells
                    tableCells.forEach(c => c.classList.remove('selected'));
                    
                    // Add selected class to clicked cell
                    cell.classList.add('selected');
                    
                    // Make cell editable immediately
                    this.makeCellEditable(cell);
                    
                    console.log('Cell selected and made editable:', cell.textContent);
                });
            });
        }, 100);
    }

    makeCellEditable(cell) {
        const originalContent = cell.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalContent;
        input.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: white;
            padding: 4px;
            font-size: inherit;
            color: #495057;
            font-weight: normal;
        `;
        
        // Clear cell and add input
        cell.textContent = '';
        cell.appendChild(input);
        input.focus();
        
        // Select all text
        input.select();
        
        input.addEventListener('blur', () => {
            cell.textContent = input.value;
            console.log('Cell updated:', input.value);
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cell.textContent = originalContent;
                cell.classList.remove('selected');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                // Move to next cell
                const currentRow = cell.parentElement;
                const currentIndex = Array.from(currentRow.cells).indexOf(cell);
                const nextCell = currentRow.cells[currentIndex + 1];
                if (nextCell) {
                    input.blur();
                    setTimeout(() => {
                        nextCell.click();
                        nextCell.dispatchEvent(new Event('dblclick'));
                    }, 10);
                }
            }
        });
    }

    initIlerlemeTreeView() {
        const treeItems = document.querySelectorAll('.tree-item');
        
        treeItems.forEach(item => {
            item.addEventListener('click', () => {
                // Toggle expanded state
                if (item.classList.contains('expanded')) {
                    item.classList.remove('expanded');
                    item.querySelector('i').className = 'fa-solid fa-folder';
                } else {
                    item.classList.add('expanded');
                    item.querySelector('i').className = 'fa-solid fa-folder-open';
                }
                
                console.log('Tree item clicked:', item.querySelector('span').textContent);
                
                // Here you would typically filter the table based on the selected tree item
            });
        });
    }

    addYapSatStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .yapsat-content {
                display: flex;
                flex-direction: column;
                height: calc(100vh - 120px);
            }
            
            .project-selection {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 15px;
                border: 1px solid #dee2e6;
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .project-selection label {
                font-weight: 600;
                color: #495057;
                min-width: 180px;
            }
            
            .project-select {
                padding: 8px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 300px;
                font-size: 14px;
            }
            
            .project-select option {
                padding: 8px 12px;
            }
            
            .project-select option:hover {
                background: #e8f5e8 !important;
                color: #2e7d32 !important;
            }
            
            .project-select option:checked {
                background: #e8f5e8 !important;
                color: #2e7d32 !important;
            }
            
            /* Genel dropdown stilleri */
            select option:hover {
                background: #e8f5e8 !important;
                color: #2e7d32 !important;
            }
            
            select option:checked {
                background: #e8f5e8 !important;
                color: #2e7d32 !important;
            }
            
            select:focus {
                border-color: #2e7d32 !important;
                box-shadow: 0 0 0 0.2rem rgba(46, 125, 50, 0.25) !important;
            }
            
            .yapsat-table-container {
                flex: 1;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .yapsat-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                flex: 1;
            }
            
            .yapsat-table th {
                background: #e9ecef;
                padding: 10px 8px;
                text-align: left;
                border: 1px solid #dee2e6;
                font-weight: 600;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            
            .yapsat-table td {
                padding: 8px;
                border: 1px solid #dee2e6;
                text-align: left;
            }
            
            .yapsat-table tbody tr {
                transition: all 0.2s ease;
            }
            
            .yapsat-table tbody tr:hover {
                background: #f8f9fa;
            }
            
            .yapsat-table tbody tr.selected {
                background: #e8f5e8 !important;
                color: #2e7d32;
                font-weight: 600;
            }
            
            .yapsat-table tbody tr.selected:hover {
                background: #c8e6c9 !important;
            }
            
            .yapsat-table tbody td.selected {
                background: white !important;
                color: #495057;
                font-weight: normal;
                border: 2px solid #2e7d32;
            }
            
            .yapsat-table tbody td.selected:hover {
                background: #f8f9fa !important;
            }
            
            .yapsat-table input[type="checkbox"] {
                margin: 0;
                cursor: pointer;
            }
            
            .summary-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #f8f9fa;
                border-top: 1px solid #dee2e6;
                font-weight: 600;
                color: #495057;
            }
            
            .record-count {
                font-size: 14px;
            }
            
            .total-amount {
                font-size: 16px;
                color: #2e7d32;
            }
            
            /* Column widths */
            .yapsat-table th:nth-child(1) { width: 60px; }   /* Blok */
            .yapsat-table th:nth-child(2) { width: 80px; }   /* Daire No */
            .yapsat-table th:nth-child(3) { width: 80px; }   /* Tipi */
            .yapsat-table th:nth-child(4) { width: 60px; }   /* Kat */
            .yapsat-table th:nth-child(5) { width: 100px; }  /* Yön */
            .yapsat-table th:nth-child(6) { width: 120px; }  /* Satış Fiyatı */
            .yapsat-table th:nth-child(7) { width: 60px; }   /* Döviz */
            .yapsat-table th:nth-child(8) { width: 80px; }   /* Ölçü */
            .yapsat-table th:nth-child(9) { width: 60px; }   /* Oda */
            .yapsat-table th:nth-child(10) { width: 60px; }  /* Banyo */
            .yapsat-table th:nth-child(11) { width: 100px; } /* Durumu */
            .yapsat-table th:nth-child(12) { width: 150px; } /* Alıcı */
            .yapsat-table th:nth-child(13) { width: 60px; }  /* Tapu */
            .yapsat-table th:nth-child(14) { width: 60px; }  /* Öd */
            
            /* General table styles for all modules */
            .data-table tbody td.selected {
                background: white !important;
                color: #495057 !important;
                font-weight: normal !important;
                border: 2px solid #2e7d32 !important;
                position: relative;
                z-index: 5;
            }
            
            .data-table tbody td.selected:hover {
                background: #f8f9fa !important;
            }
            
            /* Make all table cells clickable */
            .data-table tbody td {
                cursor: pointer;
                transition: all 0.2s ease;
            }
        `;
        document.head.appendChild(style);
    }

    initYapSatFunctionality() {
        this.initYapSatFilters();
        this.initYapSatTableInteractions();
    }

    initYapSatFilters() {
        const projectFilter = document.getElementById('projectFilter');
        
        if (projectFilter) {
            projectFilter.addEventListener('change', () => {
                this.applyYapSatFilters();
            });
        }
    }

    applyYapSatFilters() {
        const project = document.getElementById('projectFilter').value;
        
        console.log('Applying yapsat filters:', { project });
        
        // Here you would typically make an API call to filter data
        // For now, just log the filter values
    }

    initYapSatTableInteractions() {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            const tableCells = document.querySelectorAll('.yapsat-table tbody td');
            
            tableCells.forEach(cell => {
                // Skip checkbox cells
                if (cell.querySelector('input[type="checkbox"]')) {
                    return;
                }
                
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Check if cell is already in edit mode
                    if (cell.querySelector('input')) {
                        return;
                    }
                    
                    // Remove selected class from all cells
                    tableCells.forEach(c => c.classList.remove('selected'));
                    
                    // Add selected class to clicked cell
                    cell.classList.add('selected');
                    
                    // Make cell editable immediately
                    this.makeCellEditable(cell);
                    
                    console.log('Cell selected and made editable:', cell.textContent);
                });
            });
            
            // Handle checkbox interactions
            const checkboxes = document.querySelectorAll('.yapsat-table input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    e.stopPropagation();
                    console.log('Checkbox changed:', checkbox.checked);
                });
            });
        }, 100);
    }

    addCeklerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cek-tabs {
                display: flex;
                gap: 2px;
                margin-bottom: 20px;
                border-bottom: 1px solid #dee2e6;
            }
            
            .tab-btn {
                padding: 10px 20px;
                border: none;
                background: #f8f9fa;
                cursor: pointer;
                border-radius: 5px 5px 0 0;
                font-weight: 500;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .tab-btn:hover {
                background: #e9ecef;
            }
            
            .tab-btn.active {
                background: #28a745;
                color: white;
            }
            
            .cek-filters {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            
            .filter-row {
                display: flex;
                gap: 20px;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .filter-row:last-child {
                margin-bottom: 0;
            }
            
            .filter-group {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .filter-group label {
                font-weight: 600;
                color: #495057;
                min-width: 120px;
            }
            
            .date-range {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .input-with-icon {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .input-with-icon input {
                padding: 6px 30px 6px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 120px;
            }
            
            .input-with-icon i {
                position: absolute;
                right: 8px;
                color: #6c757d;
                cursor: pointer;
            }
            
            .radio-group {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .radio-label {
                display: flex;
                align-items: center;
                gap: 5px;
                cursor: pointer;
                font-weight: normal;
            }
            
            .radio-label input[type="radio"] {
                margin: 0;
            }
            
            .cek-table-container {
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
            }
            
            .grouping-area {
                padding: 10px 15px;
                background: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
                text-align: center;
                color: #6c757d;
                font-style: italic;
            }
            
            .cek-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
            }
            
            .cek-table th {
                background: #e9ecef;
                padding: 10px 8px;
                text-align: left;
                border: 1px solid #dee2e6;
                font-weight: 600;
                cursor: pointer;
                user-select: none;
            }
            
            .cek-table th:hover {
                background: #dee2e6;
            }
            
            .cek-table td {
                padding: 8px;
                border: 1px solid #dee2e6;
                text-align: left;
            }
            
            .no-data {
                text-align: center;
                color: #6c757d;
                font-style: italic;
                padding: 40px !important;
            }
            
            .pagination-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #f8f9fa;
                border-top: 1px solid #dee2e6;
            }
            
            .record-count {
                font-weight: 600;
                color: #495057;
            }
            
            .pagination-controls {
                display: flex;
                gap: 5px;
            }
            
            .pagination-btn {
                padding: 5px 10px;
                border: 1px solid #ced4da;
                background: white;
                cursor: pointer;
                border-radius: 3px;
                transition: all 0.2s ease;
            }
            
            .pagination-btn:hover:not(:disabled) {
                background: #e9ecef;
            }
            
            .pagination-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            /* Column widths */
            .cek-table th:nth-child(1) { width: 80px; }  /* Ref ID */
            .cek-table th:nth-child(2) { width: 100px; } /* Evrak No */
            .cek-table th:nth-child(3) { width: 90px; }  /* Tarih */
            .cek-table th:nth-child(4) { width: 90px; }  /* Vade Tarihi */
            .cek-table th:nth-child(5) { width: 100px; } /* Durumu */
            .cek-table th:nth-child(6) { width: 120px; } /* Banka */
            .cek-table th:nth-child(7) { width: 100px; } /* Hesap Tipi */
            .cek-table th:nth-child(8) { width: 150px; } /* Hesap Tanımı */
            .cek-table th:nth-child(9) { width: 120px; } /* Bağlı Şantiye */
            .cek-table th:nth-child(10) { width: 100px; } /* Tutar */
            .cek-table th:nth-child(11) { width: 60px; }  /* Döviz */
            .cek-table th:nth-child(12) { width: 80px; }  /* Kur */
            .cek-table th:nth-child(13) { width: 100px; } /* Grubu */
            .cek-table th:nth-child(14) { width: 150px; } /* Hareket Özel Grubu */
        `;
        document.head.appendChild(style);
    }

    initCeklerFunctionality() {
        this.initCeklerTabs();
        this.initCeklerFilters();
        this.initCeklerTableInteractions();
    }

    initCeklerTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active class from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked tab
                btn.classList.add('active');
                
                // Handle tab change
                this.handleCeklerTabChange(targetTab);
            });
        });
    }

    handleCeklerTabChange(tabName) {
        console.log('Cekler tab changed to:', tabName);
        
        // Update table content based on tab
        const tableBody = document.querySelector('#cekTable tbody');
        
        switch(tabName) {
            case 'gelen-cekler':
                this.loadGelenCekler(tableBody);
                break;
            case 'firma-cekleri':
                this.loadFirmaCekleri(tableBody);
                break;
            case 'cek-hareketleri':
                this.loadCekHareketleri(tableBody);
                break;
        }
    }

    loadGelenCekler(tableBody) {
        // Load incoming checks data
        tableBody.innerHTML = `
            <tr>
                <td colspan="14" class="no-data"><<Gelen çekler için data yok>></td>
            </tr>
        `;
    }

    loadFirmaCekleri(tableBody) {
        // Load company checks data
        tableBody.innerHTML = `
            <tr>
                <td colspan="14" class="no-data"><<Firma çekleri için data yok>></td>
            </tr>
        `;
    }

    loadCekHareketleri(tableBody) {
        // Load check transaction data
        tableBody.innerHTML = `
            <tr>
                <td colspan="14" class="no-data"><<Çek hareketleri için data yok>></td>
            </tr>
        `;
    }

    initCeklerFilters() {
        // Date range filters
        const dateInputs = document.querySelectorAll('.input-with-icon input');
        dateInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.applyCeklerFilters();
            });
        });

        // Status radio buttons
        const radioButtons = document.querySelectorAll('input[name="status"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.applyCeklerFilters();
            });
        });
    }

    applyCeklerFilters() {
        const startDate = document.querySelector('.date-range input:first-child').value;
        const endDate = document.querySelector('.date-range input:last-child').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        
        console.log('Applying cekler filters:', { startDate, endDate, status });
        
        // Here you would typically make an API call to filter data
        // For now, just log the filter values
    }

    initCeklerTableInteractions() {
        // Make table headers sortable
        const headers = document.querySelectorAll('.cek-table th');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                this.sortCeklerTable(header);
            });
        });

        // Add drag and drop for grouping
        this.initCeklerDragAndDrop();
        
        // Make table cells editable
        this.initCeklerEditableCells();
    }

    sortCeklerTable(header) {
        const column = header.cellIndex;
        const table = document.querySelector('#cekTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Remove sort indicators from all headers
        document.querySelectorAll('.cek-table th').forEach(h => {
            h.classList.remove('sort-asc', 'sort-desc');
        });
        
        // Add sort indicator to clicked header
        if (header.classList.contains('sort-asc')) {
            header.classList.remove('sort-asc');
            header.classList.add('sort-desc');
        } else {
            header.classList.remove('sort-desc');
            header.classList.add('sort-asc');
        }
        
        console.log('Sorting cekler column:', column);
    }

    initCeklerEditableCells() {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            const tableCells = document.querySelectorAll('.cek-table tbody td');
            
            tableCells.forEach(cell => {
                // Make all cells editable
                cell.contentEditable = true;
                cell.style.cursor = 'text';
                
                // Handle click to focus and select text
                cell.addEventListener('click', (e) => {
                    if (e.target === cell) {
                        cell.focus();
                        // Select all text when clicking
                        const range = document.createRange();
                        range.selectNodeContents(cell);
                        const selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                });
                
                // Handle Enter key to move to next row
                cell.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const currentRow = cell.parentElement;
                        const nextRow = currentRow.nextElementSibling;
                        if (nextRow) {
                            const nextCell = nextRow.cells[cell.cellIndex];
                            if (nextCell) {
                                nextCell.click();
                            }
                        }
                    }
                    
                    // Handle Tab key to move to next cell
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        const currentRow = cell.parentElement;
                        const nextCell = cell.nextElementSibling;
                        if (nextCell) {
                            nextCell.click();
                        } else {
                            // Move to first cell of next row
                            const nextRow = currentRow.nextElementSibling;
                            if (nextRow && nextRow.cells[0]) {
                                nextRow.cells[0].click();
                            }
                        }
                    }
                });
                
                // Handle blur to save changes
                cell.addEventListener('blur', () => {
                    console.log('Cell updated:', cell.textContent);
                    // Here you would typically save the data to backend
                });
                
                // Handle input to show it's being edited
                cell.addEventListener('input', () => {
                    cell.style.backgroundColor = '#fff3cd';
                    cell.style.border = '1px solid #ffc107';
                });
            });
        }, 100);
    }

    initCeklerDragAndDrop() {
        const headers = document.querySelectorAll('.cek-table th');
        const groupingArea = document.querySelector('.grouping-area');
        
        headers.forEach(header => {
            header.draggable = true;
            
            header.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', header.textContent);
                header.style.opacity = '0.5';
            });
            
            header.addEventListener('dragend', () => {
                header.style.opacity = '1';
            });
        });
        
        groupingArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            groupingArea.style.backgroundColor = '#e3f2fd';
        });
        
        groupingArea.addEventListener('dragleave', () => {
            groupingArea.style.backgroundColor = '#f8f9fa';
        });
        
        groupingArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const columnName = e.dataTransfer.getData('text/plain');
            groupingArea.style.backgroundColor = '#f8f9fa';
            
            console.log('Grouping cekler by column:', columnName);
            // Here you would implement the grouping logic
        });
    }

    showPuantajFallback() {
        // Update page title
        document.title = 'Puantaj Hareketleri - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content with fallback
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Puantaj Hareketleri</h2>
                    <div class="header-actions">
                        <button class="btn btn-secondary">
                            <i class="fas fa-sync"></i> Yenile
                        </button>
                        <button class="btn btn-warning">
                            <i class="fas fa-file-excel"></i> Excele Aktar
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-ellipsis-v"></i> Detay ▾
                        </button>
                        <button class="btn btn-dark">
                            <i class="fas fa-print"></i> Yazdır
                        </button>
                        <button class="btn btn-outline-secondary">
                            <i class="fas fa-times"></i> Çıkış
                        </button>
                    </div>
                </div>
                <div class="content-main">
                    <p>Puantaj modülü yükleniyor...</p>
                </div>
            `;
        }
    }

    initSidebar() {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                sidebarItems.forEach(si => si.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                const action = item.dataset.action;
                console.log('Sidebar item clicked:', action); // Debug log
                
                if (action === 'hakedis-faturasi') {
                    this.showHakedisFaturasi();
                }
            });
        });
    }

    showHakedisFaturasi() {
        // Update page title
        document.title = 'Hakediş Girişi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Hakediş Girişi</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-save"></i>
                            Kaydet
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-alt"></i>
                            Metraj Kaydı Seç
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-search"></i>
                            Detay
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body hakedis-content">
                    <!-- Left Sidebar - İşlemler -->
                    <aside class="sidebar">
                        <h3>İşlemler</h3>
                        <nav class="sidebar-nav">
                            <a href="#" class="sidebar-item" data-action="hareket-ekle">
                                <i class="fa-solid fa-plus-circle"></i>
                                <span>Hareket Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item active" data-action="hakedis-faturasi">
                                <i class="fa-solid fa-file-invoice"></i>
                                <span>Hakediş Faturası Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hareket-listesi">
                                <i class="fa-solid fa-list"></i>
                                <span>Hareket Listesi</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hesap-extresi">
                                <i class="fa-solid fa-chart-line"></i>
                                <span>Hesap Extresi</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="hareket-toplamlari">
                                <i class="fa-solid fa-calculator"></i>
                                <span>Hareket Toplamları</span>
                            </a>
                        </nav>
                    </aside>

                    <!-- Main Data Area -->
                    <div class="data-area hakedis-area">
                        <!-- Hakediş Girişi Toolbar -->
                        <div class="hakedis-toolbar">
                            <h3>Hakediş Girişi</h3>
                            <div class="toolbar-buttons">
                                <button class="toolbar-btn">
                                    <i class="fa-solid fa-save"></i>
                                    <span>Kaydet</span>
                                </button>
                                <button class="toolbar-btn">
                                    <i class="fa-solid fa-trash"></i>
                                    <span>Sil</span>
                                </button>
                                <button class="toolbar-btn">
                                    <i class="fa-solid fa-print"></i>
                                    <span>Yazdır</span>
                                </button>
                                <button class="toolbar-btn">
                                    <i class="fa-solid fa-file-alt"></i>
                                    <span>Metraj Kaydı Seç</span>
                                </button>
                                <button class="toolbar-btn">
                                    <i class="fa-solid fa-search"></i>
                                    <span>Detay</span>
                                </button>
                                <button class="toolbar-btn">
                                    <i class="fa-solid fa-times"></i>
                                    <span>Çıkış</span>
                                </button>
                            </div>
                        </div>

                        <!-- Tabs -->
                        <div class="hakedis-tabs">
                            <button class="tab-btn active" data-tab="genel-bilgiler">Genel Bilgiler</button>
                            <button class="tab-btn" data-tab="aciklama">Açıklama</button>
                        </div>

                        <!-- Tab Content -->
                        <div class="tab-content">
                            <!-- Genel Bilgiler Tab -->
                            <div class="tab-pane active" id="genel-bilgiler">
                                <div class="form-grid">
                                    <!-- Left Column -->
                                    <div class="form-column">
                                        <div class="form-group">
                                            <label>Evrak No</label>
                                            <input type="text" value="HAKE-0008" class="form-input">
                                        </div>
                                        <div class="form-group">
                                            <label>Tarihi</label>
                                            <div class="input-with-icon">
                                                <input type="text" value="16.07.2018" class="form-input">
                                                <i class="fa-solid fa-calendar"></i>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Vade Tarihi</label>
                                            <div class="input-with-icon">
                                                <input type="text" class="form-input">
                                                <i class="fa-solid fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Middle Column -->
                                    <div class="form-column">
                                        <div class="form-group">
                                            <label>Hesap Tipi</label>
                                            <div class="input-with-dropdown">
                                                <input type="text" value="Taşeron" class="form-input">
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Hesap Tanımı</label>
                                            <input type="text" value="BAYRAM KARACA" class="form-input">
                                        </div>
                                        <div class="form-group">
                                            <label>Şantiye Tanımı</label>
                                            <input type="text" class="form-input">
                                        </div>
                                        <div class="form-group">
                                            <label>Döviz/Kur</label>
                                            <div class="currency-row">
                                                <div class="input-with-dropdown">
                                                    <input type="text" value="TL" class="form-input">
                                                    <i class="fa-solid fa-chevron-down"></i>
                                                </div>
                                                <input type="text" value="1,0000" class="form-input">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Right Column -->
                                    <div class="form-column">
                                        <div class="form-group">
                                            <label>Hareket Grubu</label>
                                            <div class="input-with-dropdown">
                                                <input type="text" class="form-input">
                                                <i class="fa-solid fa-chevron-down"></i>
                                                <button class="btn-dots">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Hareket Ö.G</label>
                                            <div class="input-with-dropdown">
                                                <input type="text" class="form-input">
                                                <i class="fa-solid fa-chevron-down"></i>
                                                <button class="btn-dots">...</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Fatura Tipi</label>
                                            <div class="input-with-dropdown">
                                                <input type="text" value="Normal Fatura" class="form-input">
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="checkbox-label">
                                                <input type="checkbox">
                                                <span>Resmi ?</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Data Grid -->
                                <div class="data-grid-container">
                                    <table class="data-grid">
                                        <thead>
                                            <tr>
                                                <th>İmalat Kodu</th>
                                                <th>Tanımı</th>
                                                <th>Birimi</th>
                                                <th>Açıklama</th>
                                                <th>Miktar</th>
                                                <th>Birim Fiyat</th>
                                                <th>İsk.1(%)</th>
                                                <th>İsk.2(%)</th>
                                                <th>İsk.B.Fiyat</th>
                                                <th>Stopaj (%)</th>
                                                <th>KDV</th>
                                                <th>KDVli B.Fiyat</th>
                                                <th>Toplam</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="13" class="no-data"><<Gösterilecek data yok>></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Totals Section -->
                                <div class="totals-section">
                                    <div class="totals-grid">
                                        <div class="total-item">
                                            <label>Toplam:</label>
                                            <span>0,00</span>
                                        </div>
                                        <div class="total-item">
                                            <label>İskonto Toplamı:</label>
                                            <span>0,00</span>
                                        </div>
                                        <div class="total-item">
                                            <label>Ara Toplam:</label>
                                            <span>0,00</span>
                                        </div>
                                        <div class="total-item">
                                            <label>Stopaj Toplamı:</label>
                                            <span>0,00</span>
                                        </div>
                                        <div class="total-item">
                                            <label>KDV Toplamı:</label>
                                            <span>0,00</span>
                                        </div>
                                        <div class="total-item">
                                            <label>Alt Toplam:</label>
                                            <span>0,00</span>
                                        </div>
                                        <div class="total-item">
                                            <label>Tevfikat:</label>
                                            <span></span>
                                        </div>
                                        <div class="total-item">
                                            <label>Genel Toplam:</label>
                                            <span>0,00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Açıklama Tab -->
                            <div class="tab-pane" id="aciklama">
                                <div class="form-group">
                                    <label>Açıklama</label>
                                    <textarea class="form-textarea" rows="10" placeholder="Açıklama giriniz..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Initialize hakediş functionality
            this.initHakedisFunctionality();
        }
    }

    initHakedisFunctionality() {
        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Remove active class from all tabs and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding pane
                btn.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Initialize sidebar functionality
        this.initSidebar();
    }

    initExcelTable() {
        const table = document.getElementById('taseronTable');
        if (!table) return;

        let currentCell = null;
        let isEditing = false;
        let editMode = false; // Track edit mode state

        // Add click event to all cells
        const cells = table.querySelectorAll('td[contenteditable="true"]');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                if (!editMode) return; // Only allow editing when in edit mode
                
                if (currentCell && currentCell !== cell) {
                    currentCell.classList.remove('editing');
                }
                currentCell = cell;
                cell.classList.add('editing');
                cell.focus();
                
                // Select all text when clicking
                const range = document.createRange();
                range.selectNodeContents(cell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });

            cell.addEventListener('keydown', (e) => {
                const currentRow = parseInt(cell.dataset.row);
                const currentCol = parseInt(cell.dataset.col);
                
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        // Move to next row, same column
                        const nextRow = table.querySelector(`td[data-row="${currentRow + 1}"][data-col="${currentCol}"]`);
                        if (nextRow) {
                            nextRow.click();
                        }
                        break;
                    case 'Tab':
                        e.preventDefault();
                        // Move to next column, same row
                        const nextCol = table.querySelector(`td[data-row="${currentRow}"][data-col="${currentCol + 1}"]`);
                        if (nextCol) {
                            nextCol.click();
                        }
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        const upRow = table.querySelector(`td[data-row="${currentRow - 1}"][data-col="${currentCol}"]`);
                        if (upRow) {
                            upRow.click();
                        }
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        const downRow = table.querySelector(`td[data-row="${currentRow + 1}"][data-col="${currentCol}"]`);
                        if (downRow) {
                            downRow.click();
                        }
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        const leftCol = table.querySelector(`td[data-row="${currentRow}"][data-col="${currentCol - 1}"]`);
                        if (leftCol) {
                            leftCol.click();
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        const rightCol = table.querySelector(`td[data-row="${currentRow}"][data-col="${currentCol + 1}"]`);
                        if (rightCol) {
                            rightCol.click();
                        }
                        break;
                }
            });

            cell.addEventListener('blur', () => {
                cell.classList.remove('editing');
            });

            cell.addEventListener('input', () => {
                // Auto-save functionality can be added here
                console.log(`Cell ${cell.dataset.row},${cell.dataset.col} updated:`, cell.textContent);
            });
        });

        // Add new row functionality
        const addRowBtn = document.querySelector('.btn-primary');
        if (addRowBtn) {
            addRowBtn.addEventListener('click', () => {
                this.addNewRow(table);
            });
        }

        // Add edit mode toggle functionality
        const editBtn = document.querySelector('.btn-outline');
        if (editBtn && editBtn.textContent.includes('Düzelt')) {
            editBtn.addEventListener('click', () => {
                editMode = !editMode;
                this.toggleEditMode(editMode, table);
            });
        }
    }

    toggleEditMode(enabled, table) {
        const cells = table.querySelectorAll('td[contenteditable="true"]');
        const editBtn = document.querySelector('.btn-outline');
        
        cells.forEach(cell => {
            if (enabled) {
                cell.contentEditable = true;
                cell.classList.add('edit-mode-active');
            } else {
                cell.contentEditable = false;
                cell.classList.remove('edit-mode-active');
                cell.classList.remove('editing');
            }
        });

        // Update button appearance
        if (editBtn && editBtn.textContent.includes('Düzelt')) {
            if (enabled) {
                editBtn.classList.add('active');
                editBtn.innerHTML = '<i class="fa-solid fa-check"></i> Kaydet';
            } else {
                editBtn.classList.remove('active');
                editBtn.innerHTML = '<i class="fa-solid fa-edit"></i> Düzelt';
            }
        }

        // Show status message
        if (enabled) {
            this.showStatusMessage('Düzenleme modu aktif - Hücreleri tıklayarak düzenleyebilirsiniz', 'success');
        } else {
            this.showStatusMessage('Düzenleme modu kapatıldı', 'info');
        }
    }

    showStatusMessage(message, type = 'info') {
        // Remove existing status message
        const existingStatus = document.querySelector('.status-message');
        if (existingStatus) {
            existingStatus.remove();
        }

        // Create new status message
        const statusDiv = document.createElement('div');
        statusDiv.className = `status-message status-${type}`;
        statusDiv.textContent = message;
        statusDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        if (type === 'success') {
            statusDiv.style.backgroundColor = '#2E7D32';
        } else if (type === 'info') {
            statusDiv.style.backgroundColor = '#1976D2';
        }

        document.body.appendChild(statusDiv);

        // Remove after 3 seconds
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.remove();
            }
        }, 3000);
    }

    addNewRow(table) {
        const tbody = table.querySelector('tbody');
        const rowCount = tbody.children.length;
        const newRow = document.createElement('tr');
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('td');
            cell.contentEditable = true;
            cell.dataset.row = rowCount;
            cell.dataset.col = i;
            
            // Auto-generate code for first column
            if (i === 0) {
                cell.textContent = `TAŞ-${String(rowCount + 1).padStart(4, '0')}`;
            }
            
            newRow.appendChild(cell);
        }
        
        tbody.appendChild(newRow);
        
        // Re-initialize the table to add event listeners to new cells
        setTimeout(() => {
            this.initExcelTable();
        }, 100);
    }

    // Table interaction methods for all modules
    initTaseronTableInteractions() {
        setTimeout(() => {
            const tableCells = document.querySelectorAll('#taseronTable tbody td');
            
            tableCells.forEach(cell => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (cell.querySelector('input')) {
                        return;
                    }
                    
                    tableCells.forEach(c => c.classList.remove('selected'));
                    cell.classList.add('selected');
                    this.makeCellEditable(cell);
                });
            });
        }, 100);
    }

    initTedarikciTableInteractions() {
        setTimeout(() => {
            const tableCells = document.querySelectorAll('#tedarikciTable tbody td');
            
            tableCells.forEach(cell => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (cell.querySelector('input')) {
                        return;
                    }
                    
                    tableCells.forEach(c => c.classList.remove('selected'));
                    cell.classList.add('selected');
                    this.makeCellEditable(cell);
                });
            });
        }, 100);
    }

    initCeklerTableInteractions() {
        setTimeout(() => {
            const tableCells = document.querySelectorAll('#cekTable tbody td');
            
            tableCells.forEach(cell => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (cell.querySelector('input')) {
                        return;
                    }
                    
                    tableCells.forEach(c => c.classList.remove('selected'));
                    cell.classList.add('selected');
                    this.makeCellEditable(cell);
                });
            });
        }, 100);
    }

    initPuantajTableInteractions() {
        setTimeout(() => {
            const tableCells = document.querySelectorAll('#puantajTable tbody td:not(.day-cell)');
            
            tableCells.forEach(cell => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (cell.querySelector('input')) {
                        return;
                    }
                    
                    tableCells.forEach(c => c.classList.remove('selected'));
                    cell.classList.add('selected');
                    this.makeCellEditable(cell);
                });
            });
        }, 100);
    }

    addEFaturaStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .efatura-content {
                display: flex;
                flex-direction: column;
                height: calc(100vh - 120px);
            }
            
            .efatura-tabs {
                display: flex;
                gap: 2px;
                margin-bottom: 20px;
                border-bottom: 1px solid #dee2e6;
            }
            
            .efatura-tabs .tab-btn {
                padding: 10px 20px;
                border: none;
                background: #f8f9fa;
                cursor: pointer;
                border-radius: 5px 5px 0 0;
                font-weight: 500;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .efatura-tabs .tab-btn:hover {
                background: #e9ecef;
            }
            
            .efatura-tabs .tab-btn.active {
                background: #28a745;
                color: white;
            }
            
            .efatura-filters {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border: 1px solid #dee2e6;
            }
            
            .efatura-filters .filter-row {
                display: flex;
                gap: 20px;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .efatura-filters .filter-group {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .efatura-filters .filter-group label {
                font-weight: 600;
                color: #495057;
                min-width: 100px;
            }
            
            .efatura-filters .date-range {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .efatura-filters .input-with-icon {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .efatura-filters .input-with-icon input {
                padding: 6px 30px 6px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 120px;
            }
            
            .efatura-filters .input-with-icon i {
                position: absolute;
                right: 8px;
                color: #6c757d;
                cursor: pointer;
            }
            
            .efatura-filters .filter-select {
                padding: 6px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 150px;
            }
            
            .efatura-filters .filter-actions {
                display: flex;
                gap: 10px;
                margin-left: auto;
            }
            
            .efatura-table-container {
                flex: 1;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .efatura-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                flex: 1;
            }
            
            .efatura-table th {
                background: #e9ecef;
                padding: 10px 8px;
                text-align: left;
                border: 1px solid #dee2e6;
                font-weight: 600;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            
            .efatura-table td {
                padding: 8px;
                border: 1px solid #dee2e6;
                text-align: left;
            }
            
            .efatura-table tbody tr {
                transition: all 0.2s ease;
            }
            
            .efatura-table tbody tr:hover {
                background: #f8f9fa;
            }
            
            .efatura-table .no-data {
                text-align: center;
                color: #6c757d;
                font-style: italic;
                padding: 40px !important;
            }
            
            .summary-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #f8f9fa;
                border-top: 1px solid #dee2e6;
                font-weight: 600;
                color: #495057;
            }
            
            .record-count {
                font-size: 14px;
            }
            
            /* Column widths */
            .efatura-table th:nth-child(1) { width: 90px; }   /* Tarih */
            .efatura-table th:nth-child(2) { width: 150px; }  /* Gönderen */
            .efatura-table th:nth-child(3) { width: 120px; }  /* Vergi No */
            .efatura-table th:nth-child(4) { width: 120px; }  /* Fatura No */
            .efatura-table th:nth-child(5) { width: 200px; }  /* ETTN */
            .efatura-table th:nth-child(6) { width: 100px; }  /* Senaryo */
            .efatura-table th:nth-child(7) { width: 100px; }  /* Ara Toplam */
            .efatura-table th:nth-child(8) { width: 100px; }  /* Vergi Toplam */
            .efatura-table th:nth-child(9) { width: 100px; }  /* Tutar */
            .efatura-table th:nth-child(10) { width: 60px; }  /* Döviz */
            .efatura-table th:nth-child(11) { width: 80px; }  /* Kur */
            .efatura-table th:nth-child(12) { width: 80px; }  /* KDV 18 */
            .efatura-table th:nth-child(13) { width: 80px; }  /* KDV 1 */
            .efatura-table th:nth-child(14) { width: 80px; }  /* KDV 8 */
        `;
        document.head.appendChild(style);
    }

    initEFaturaFunctionality() {
        this.initEFaturaTabs();
        this.initEFaturaFilters();
        this.initEFaturaTableInteractions();
    }

    initEFaturaTableInteractions() {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            const table = document.querySelector('#efaturaTable');
            if (!table) {
                console.log('E-Fatura table not found');
                return;
            }

            console.log('Initializing E-Fatura table interactions');

            // Add event listeners for table cells
            table.addEventListener('click', (e) => {
                if (e.target.tagName === 'TD' && !e.target.querySelector('input')) {
                    console.log('Cell clicked:', e.target.textContent);
                    
                    // Remove selected class from all cells
                    const allCells = table.querySelectorAll('td');
                    allCells.forEach(cell => cell.classList.remove('selected'));
                    
                    // Add selected class to clicked cell
                    e.target.classList.add('selected');
                    
                    // Make cell editable
                    this.makeCellEditable(e.target);
                }
            });

            // Handle keyboard navigation
            table.addEventListener('keydown', (e) => {
                const activeCell = table.querySelector('td.selected');
                if (!activeCell) return;

                const currentRow = activeCell.parentElement;
                const currentIndex = Array.from(currentRow.children).indexOf(activeCell);
                const allRows = Array.from(table.querySelectorAll('tbody tr'));

                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.makeCellEditable(activeCell);
                        break;
                    case 'Tab':
                        e.preventDefault();
                        this.navigateToNextCell(activeCell, currentRow, currentIndex, allRows);
                        break;
                    case 'Escape':
                        this.cancelCellEdit(activeCell);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.navigateToCell(activeCell, -1, 0, allRows);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.navigateToCell(activeCell, 1, 0, allRows);
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.navigateToCell(activeCell, 0, -1, allRows);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.navigateToCell(activeCell, 0, 1, allRows);
                        break;
                }
            });

            console.log('E-Fatura table interactions initialized');
        }, 200); // Increased timeout to ensure DOM is ready
    }

    makeCellEditable(cell) {
        console.log('Making cell editable:', cell.textContent);
        
        if (cell.querySelector('input')) {
            console.log('Cell already in edit mode');
            return; // Already editing
        }

        const originalText = cell.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        input.className = 'cell-edit-input';
        input.spellcheck = false; // Disable spell checking
        
        // Style the input
        input.style.cssText = `
            width: 100%;
            border: none;
            outline: none;
            background: white;
            color: #495057;
            font-size: inherit;
            font-family: inherit;
            padding: 4px;
            box-sizing: border-box;
        `;

        // Clear cell and add input
        cell.textContent = '';
        cell.appendChild(input);
        input.focus();
        input.select();

        console.log('Cell made editable');

        // Handle input events
        input.addEventListener('blur', () => {
            console.log('Input blur, saving:', input.value);
            this.saveCellEdit(cell, input.value);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Enter pressed, saving:', input.value);
                this.saveCellEdit(cell, input.value);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                console.log('Escape pressed, canceling');
                this.cancelCellEdit(cell, originalText);
            }
        });
    }

    saveCellEdit(cell, newValue) {
        console.log('Saving cell edit:', newValue);
        const input = cell.querySelector('input');
        if (input) {
            input.remove();
        }
        cell.textContent = newValue;
        cell.classList.add('selected');
        console.log('Cell edit saved');
    }

    cancelCellEdit(cell, originalText = null) {
        console.log('Canceling cell edit, original text:', originalText);
        const input = cell.querySelector('input');
        if (input) {
            input.remove();
        }
        if (originalText !== null) {
            cell.textContent = originalText;
        }
        cell.classList.add('selected');
        console.log('Cell edit canceled');
    }

    navigateToNextCell(currentCell, currentRow, currentIndex, allRows) {
        const currentRowIndex = allRows.indexOf(currentRow);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < currentRow.children.length) {
            // Next cell in same row
            this.selectCell(currentRow.children[nextIndex]);
        } else if (currentRowIndex + 1 < allRows.length) {
            // First cell in next row
            this.selectCell(allRows[currentRowIndex + 1].children[0]);
        }
    }

    navigateToCell(currentCell, rowOffset, colOffset, allRows) {
        const currentRow = currentCell.parentElement;
        const currentRowIndex = allRows.indexOf(currentRow);
        const currentColIndex = Array.from(currentRow.children).indexOf(currentCell);
        
        const newRowIndex = currentRowIndex + rowOffset;
        const newColIndex = currentColIndex + colOffset;
        
        if (newRowIndex >= 0 && newRowIndex < allRows.length) {
            const newRow = allRows[newRowIndex];
            if (newColIndex >= 0 && newColIndex < newRow.children.length) {
                this.selectCell(newRow.children[newColIndex]);
            }
        }
    }

    selectCell(cell) {
        // Remove selection from all cells
        const table = document.querySelector('#efaturaTable');
        const allCells = table.querySelectorAll('td');
        allCells.forEach(c => c.classList.remove('selected'));
        
        // Add selection to new cell
        cell.classList.add('selected');
        cell.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    initEFaturaTabs() {
        const tabBtns = document.querySelectorAll('.efatura-tabs .tab-btn');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active class from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked tab
                btn.classList.add('active');
                
                // Handle tab change
                this.handleEFaturaTabChange(targetTab);
            });
        });
    }

    handleEFaturaTabChange(tabName) {
        console.log('E-Fatura tab changed to:', tabName);
        
        // Update table content based on tab
        const tableBody = document.querySelector('#efaturaTable tbody');
        
        switch(tabName) {
            case 'gonderme-islemi':
                this.loadGondermeIslemi(tableBody);
                break;
            case 'gonderilenler':
                this.loadGonderilenler(tableBody);
                break;
            case 'gelen-faturalar':
                this.loadGelenFaturalar(tableBody);
                break;
        }
    }

    loadGondermeIslemi(tableBody) {
        // Update the filter section for "Gönderme İşlemi" tab
        const filterSection = document.querySelector('.efatura-filters');
        if (filterSection) {
            filterSection.innerHTML = `
                <div class="filter-row">
                    <div class="filter-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-paper-plane" style="color: #28a745;"></i>
                            Gönder
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-search"></i>
                            Fatura Önizleme
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-leaf" style="color: #28a745;"></i>
                            Fişini Aç
                        </button>
                    </div>
                </div>
            `;
            
            // Re-initialize filters for the new content
            this.initEFaturaFilters();
        }
        
        // Update table headers for "Gönderme İşlemi"
        const tableHead = document.querySelector('#efaturaTable thead tr');
        if (tableHead) {
            tableHead.innerHTML = `
                <th>Ref ID</th>
                <th>Fatura No</th>
                <th>Tipi</th>
                <th>Tarih</th>
                <th>Hesap Tanımı</th>
                <th>Açıklama</th>
                <th>Tutar</th>
            `;
        }
        
        // Update table content
        tableBody.innerHTML = `
            <tr>
                <td>REF001</td>
                <td>FAT-2024-001</td>
                <td>Satış</td>
                <td>15.01.2024</td>
                <td>ABC İnşaat Ltd. Şti.</td>
                <td>Proje A - Malzeme teslimi</td>
                <td>25,000.00 ₺</td>
            </tr>
            <tr>
                <td>REF002</td>
                <td>FAT-2024-002</td>
                <td>Hizmet</td>
                <td>18.01.2024</td>
                <td>XYZ Müteahhitlik</td>
                <td>Proje B - İşçilik hizmeti</td>
                <td>15,500.00 ₺</td>
            </tr>
            <tr>
                <td>REF003</td>
                <td>FAT-2024-003</td>
                <td>Satış</td>
                <td>22.01.2024</td>
                <td>DEF Yapı Malzemeleri</td>
                <td>Proje C - Çimento teslimi</td>
                <td>8,750.00 ₺</td>
            </tr>
            <tr>
                <td>REF004</td>
                <td>FAT-2024-004</td>
                <td>Hizmet</td>
                <td>25.01.2024</td>
                <td>GHI Nakliyat</td>
                <td>Proje A - Malzeme taşıma</td>
                <td>3,200.00 ₺</td>
            </tr>
        `;
    }

    loadGonderilenler(tableBody) {
        // Update the filter section for "Gönderilenler" tab
        const filterSection = document.querySelector('.efatura-filters');
        if (filterSection) {
            filterSection.innerHTML = `
                <div class="filter-row">
                    <div class="filter-group">
                        <label>Tarih Aralığı:</label>
                        <div class="date-range">
                            <div class="input-with-icon">
                                <input type="text" class="filter-input" placeholder="Başlangıç" value="01.07.2018">
                                <i class="fa-solid fa-calendar"></i>
                            </div>
                            <span>-</span>
                            <div class="input-with-icon">
                                <input type="text" class="filter-input" placeholder="Bitiş" value="31.07.2018">
                                <i class="fa-solid fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div class="filter-actions">
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-alt"></i>
                            Faturaları Göster
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-cube" style="color: #6f42c1;"></i>
                            Durum Sorgula
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-folder" style="color: #ffc107;"></i>
                            Fişini Aç
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-redo" style="color: #28a745;"></i>
                            Tekrar Gönder
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-search"></i>
                            Fatura Önizleme
                        </button>
                    </div>
                </div>
            `;
            
            // Re-initialize filters for the new content
            this.initEFaturaFilters();
        }
        
        // Update table headers for "Gönderilenler"
        const tableHead = document.querySelector('#efaturaTable thead tr');
        if (tableHead) {
            tableHead.innerHTML = `
                <th>Ref ID</th>
                <th>Fatura No</th>
                <th>Durumu</th>
                <th>UUID</th>
                <th>Tipi</th>
                <th>Tarih</th>
                <th>Hesap Tanımı</th>
                <th>Açıklama</th>
                <th>Tutar</th>
            `;
        }
        
        // Update table content
        tableBody.innerHTML = `
            <tr>
                <td>REF001</td>
                <td>FAT-2024-001</td>
                <td><span class="status-success">Gönderildi</span></td>
                <td>550e8400-e29b-41d4-a716-446655440001</td>
                <td>Satış</td>
                <td>15.01.2024</td>
                <td>ABC İnşaat Ltd. Şti.</td>
                <td>Proje A - Malzeme teslimi</td>
                <td>25,000.00 ₺</td>
            </tr>
            <tr>
                <td>REF002</td>
                <td>FAT-2024-002</td>
                <td><span class="status-pending">Beklemede</span></td>
                <td>550e8400-e29b-41d4-a716-446655440002</td>
                <td>Hizmet</td>
                <td>18.01.2024</td>
                <td>XYZ Müteahhitlik</td>
                <td>Proje B - İşçilik hizmeti</td>
                <td>15,500.00 ₺</td>
            </tr>
            <tr>
                <td>REF003</td>
                <td>FAT-2024-003</td>
                <td><span class="status-success">Gönderildi</span></td>
                <td>550e8400-e29b-41d4-a716-446655440003</td>
                <td>Satış</td>
                <td>22.01.2024</td>
                <td>DEF Yapı Malzemeleri</td>
                <td>Proje C - Çimento teslimi</td>
                <td>8,750.00 ₺</td>
            </tr>
            <tr>
                <td>REF004</td>
                <td>FAT-2024-004</td>
                <td><span class="status-error">Hata</span></td>
                <td>550e8400-e29b-41d4-a716-446655440004</td>
                <td>Hizmet</td>
                <td>25.01.2024</td>
                <td>GHI Nakliyat</td>
                <td>Proje A - Malzeme taşıma</td>
                <td>3,200.00 ₺</td>
            </tr>
            <tr>
                <td>REF005</td>
                <td>FAT-2024-005</td>
                <td><span class="status-success">Gönderildi</span></td>
                <td>550e8400-e29b-41d4-a716-446655440005</td>
                <td>Satış</td>
                <td>28.01.2024</td>
                <td>JKL İnşaat Malzemeleri</td>
                <td>Proje D - Demir teslimi</td>
                <td>12,800.00 ₺</td>
            </tr>
        `;
    }

    loadGelenFaturalar(tableBody) {
        // Restore the original filter section for "Gelen Faturalar" tab
        const filterSection = document.querySelector('.efatura-filters');
        if (filterSection) {
            filterSection.innerHTML = `
                <div class="filter-row">
                    <div class="filter-group">
                        <label>Tarih Aralığı:</label>
                        <div class="date-range">
                            <div class="input-with-icon">
                                <input type="text" class="filter-input" placeholder="Başlangıç" value="01.07.2018">
                                <i class="fa-solid fa-calendar"></i>
                            </div>
                            <span>-</span>
                            <div class="input-with-icon">
                                <input type="text" class="filter-input" placeholder="Bitiş" value="31.07.2018">
                                <i class="fa-solid fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div class="filter-group">
                        <label>Fatura Durumu:</label>
                        <select class="filter-select" id="faturaDurumu">
                            <option value="onaylanan" selected>Onaylanan</option>
                            <option value="bekleyen">Bekleyen</option>
                            <option value="reddedilen">Reddedilen</option>
                        </select>
                    </div>
                    <div class="filter-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-download"></i>
                            Faturaları Al
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-search"></i>
                            Detay
                        </button>
                    </div>
                </div>
            `;
            
            // Re-initialize filters for the new content
            this.initEFaturaFilters();
        }
        
        // Restore original table headers for "Gelen Faturalar"
        const tableHead = document.querySelector('#efaturaTable thead tr');
        if (tableHead) {
            tableHead.innerHTML = `
                <th>Tarih</th>
                <th>Gönderen</th>
                <th>Vergi No</th>
                <th>Fatura No</th>
                <th>ETTN</th>
                <th>Senaryo</th>
                <th>Ara Toplam</th>
                <th>Vergi Toplam</th>
                <th>Tutar</th>
                <th>Döviz</th>
                <th>Kur</th>
                <th>KDV 18</th>
                <th>KDV 1</th>
                <th>KDV 8</th>
            `;
        }
        
        // Update table content
        tableBody.innerHTML = `
            <tr>
                <td>15.01.2024</td>
                <td>ABC İnşaat Ltd. Şti.</td>
                <td>1234567890</td>
                <td>FAT-2024-001</td>
                <td>550e8400-e29b-41d4-a716-446655440001</td>
                <td>Temelwisi</td>
                <td>21,186.44 ₺</td>
                <td>3,813.56 ₺</td>
                <td>25,000.00 ₺</td>
                <td>TRY</td>
                <td>1.00</td>
                <td>3,813.56 ₺</td>
                <td>0.00 ₺</td>
                <td>0.00 ₺</td>
            </tr>
            <tr>
                <td>18.01.2024</td>
                <td>XYZ Müteahhitlik</td>
                <td>9876543210</td>
                <td>FAT-2024-002</td>
                <td>550e8400-e29b-41d4-a716-446655440002</td>
                <td>Temelwisi</td>
                <td>13,135.59 ₺</td>
                <td>2,364.41 ₺</td>
                <td>15,500.00 ₺</td>
                <td>TRY</td>
                <td>1.00</td>
                <td>2,364.41 ₺</td>
                <td>0.00 ₺</td>
                <td>0.00 ₺</td>
            </tr>
            <tr>
                <td>22.01.2024</td>
                <td>DEF Yapı Malzemeleri</td>
                <td>1122334455</td>
                <td>FAT-2024-003</td>
                <td>550e8400-e29b-41d4-a716-446655440003</td>
                <td>Temelwisi</td>
                <td>7,415.25 ₺</td>
                <td>1,334.75 ₺</td>
                <td>8,750.00 ₺</td>
                <td>TRY</td>
                <td>1.00</td>
                <td>1,334.75 ₺</td>
                <td>0.00 ₺</td>
                <td>0.00 ₺</td>
            </tr>
            <tr>
                <td>25.01.2024</td>
                <td>GHI Nakliyat</td>
                <td>5566778899</td>
                <td>FAT-2024-004</td>
                <td>550e8400-e29b-41d4-a716-446655440004</td>
                <td>Temelwisi</td>
                <td>2,711.86 ₺</td>
                <td>488.14 ₺</td>
                <td>3,200.00 ₺</td>
                <td>TRY</td>
                <td>1.00</td>
                <td>488.14 ₺</td>
                <td>0.00 ₺</td>
                <td>0.00 ₺</td>
            </tr>
            <tr>
                <td>28.01.2024</td>
                <td>JKL İnşaat Malzemeleri</td>
                <td>9988776655</td>
                <td>FAT-2024-005</td>
                <td>550e8400-e29b-41d4-a716-446655440005</td>
                <td>Temelwisi</td>
                <td>10,847.46 ₺</td>
                <td>1,952.54 ₺</td>
                <td>12,800.00 ₺</td>
                <td>TRY</td>
                <td>1.00</td>
                <td>1,952.54 ₺</td>
                <td>0.00 ₺</td>
                <td>0.00 ₺</td>
            </tr>
        `;
    }

    initEFaturaFilters() {
        const dateInputs = document.querySelectorAll('.efatura-filters .input-with-icon input');
        const faturaDurumu = document.getElementById('faturaDurumu');
        
        dateInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.applyEFaturaFilters();
            });
        });
        
        if (faturaDurumu) {
            faturaDurumu.addEventListener('change', () => {
                this.applyEFaturaFilters();
            });
        }
    }

    applyEFaturaFilters() {
        const startDate = document.querySelector('.efatura-filters .date-range input:first-child').value;
        const endDate = document.querySelector('.efatura-filters .date-range input:last-child').value;
        const faturaDurumu = document.getElementById('faturaDurumu').value;
        
        console.log('Applying E-Fatura filters:', { startDate, endDate, faturaDurumu });
    }

    addEvrakStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .evrak-content {
                display: flex;
                flex-direction: column;
                height: calc(100vh - 120px);
            }
            
            .evrak-filters {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #dee2e6;
            }
            
            .evrak-filters .filter-row {
                display: flex;
                gap: 20px;
                align-items: center;
                margin-bottom: 15px;
                flex-wrap: wrap;
                min-height: 40px;
            }
            
            .evrak-filters .filter-row:last-child {
                margin-bottom: 0;
            }
            
            .evrak-filters .filter-group {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .evrak-filters .filter-group.radio-group {
                display: flex;
                align-items: center;
                gap: 16px;
                flex-wrap: nowrap;
            }
            
            .evrak-filters .filter-group label {
                font-weight: 600;
                color: #495057;
                min-width: 120px;
            }
            
            .evrak-filters .date-range {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .evrak-filters .input-with-icon {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .evrak-filters .input-with-icon input {
                padding: 8px 30px 8px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 120px;
                font-size: 14px;
            }
            
            .evrak-filters .input-with-icon i {
                position: absolute;
                right: 8px;
                color: #6c757d;
                cursor: pointer;
            }
            
            .evrak-filters .filter-select {
                padding: 8px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 150px;
                font-size: 14px;
            }
            
            .evrak-filters .filter-input {
                padding: 8px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 200px;
                font-size: 14px;
            }
            
            .evrak-filters .filter-input-small {
                padding: 6px 8px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                width: 60px;
                text-align: center;
                font-size: 14px;
            }
            
            .radio-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-weight: normal;
                margin-right: 20px;
                vertical-align: middle;
            }
            
            .radio-label input[type="radio"] {
                margin: 0;
                vertical-align: middle;
                position: relative;
                top: 0;
            }
            
            .radio-label input[type="radio"] + span {
                vertical-align: middle;
                line-height: 1.2;
            }
            
            .evrak-sources-group {
                width: 100%;
            }
            
            .evrak-sources-horizontal {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                margin-top: 10px;
                padding: 15px;
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                align-items: center;
            }
            
            .source-item {
                display: flex;
                align-items: center;
            }
            
            .source-checkbox {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding: 8px 12px;
                border-radius: 4px;
                transition: all 0.2s ease;
                width: 100%;
                position: relative;
            }
            
            .source-checkbox:hover {
                background: #f8f9fa;
            }
            
            .source-checkbox input[type="checkbox"] {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }
            
            .checkmark {
                height: 18px;
                width: 18px;
                background-color: white;
                border: 2px solid #ced4da;
                border-radius: 3px;
                position: relative;
                flex-shrink: 0;
                transition: all 0.2s ease;
            }
            
            .source-checkbox:hover .checkmark {
                border-color: #2e7d32;
            }
            
            .source-checkbox input:checked ~ .checkmark {
                background-color: #2e7d32;
                border-color: #2e7d32;
            }
            
            .checkmark:after {
                content: "";
                position: absolute;
                display: none;
                left: 5px;
                top: 2px;
                width: 4px;
                height: 8px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
            
            .source-checkbox input:checked ~ .checkmark:after {
                display: block;
            }
            
            .source-label {
                font-size: 13px;
                font-weight: 500;
                color: #495057;
                flex: 1;
            }
            
            .search-box {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            .search-box i {
                position: absolute;
                left: 12px;
                color: #6c757d;
                z-index: 2;
            }
            
            .search-box input {
                padding-left: 35px;
                padding-right: 12px;
                min-width: 250px;
            }
            
            .search-box-header {
                position: relative;
                display: flex;
                align-items: center;
                margin-right: 15px;
            }
            
            .search-box-header i {
                position: absolute;
                left: 12px;
                color: #6c757d;
                z-index: 2;
            }
            
            .header-search-input {
                padding: 8px 12px 8px 35px;
                border: 1px solid #ced4da;
                border-radius: 6px;
                background: white;
                min-width: 250px;
                font-size: 14px;
                transition: border-color 0.2s ease;
            }
            
            .header-search-input:focus {
                outline: none;
                border-color: #2e7d32;
                box-shadow: 0 0 0 0.2rem rgba(46, 125, 50, 0.25);
            }
            
            .checkbox-group {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                margin-top: 5px;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 6px;
                cursor: pointer;
                font-weight: normal;
                font-size: 13px;
            }
            
            .checkbox-label input[type="checkbox"] {
                margin: 0;
            }
            
            .evrak-table-container {
                flex: 1;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                overflow: auto;
                max-height: calc(100vh - 400px);
            }
            
            .evrak-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                flex: 1;
            }
            
            .evrak-table th {
                background: #e9ecef;
                padding: 12px 8px;
                text-align: left;
                border: 1px solid #dee2e6;
                font-weight: 600;
                position: sticky;
                top: 0;
                z-index: 10;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .evrak-table td {
                padding: 10px 8px;
                border: 1px solid #dee2e6;
                text-align: left;
                vertical-align: middle;
            }
            
            .evrak-table tbody tr {
                transition: all 0.2s ease;
            }
            
            .evrak-table tbody tr:hover {
                background: #f8f9fa;
            }
            
            .evrak-table tbody tr.selected {
                background: #e8f5e8 !important;
                color: #2e7d32;
                font-weight: 600;
            }
            
            .evrak-type {
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .evrak-type.incoming {
                background: #d4edda;
                color: #155724;
            }
            
            .evrak-type.outgoing {
                background: #d1ecf1;
                color: #0c5460;
            }
            
            .summary-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 20px;
                background: #f8f9fa;
                border-top: 1px solid #dee2e6;
                font-weight: 600;
                color: #495057;
            }
            
            .record-count {
                font-size: 14px;
            }
            
            .summary-stats {
                display: flex;
                gap: 20px;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 13px;
            }
            
            .stat-item i {
                font-size: 14px;
            }
            
            /* Column widths */
            .evrak-table th:nth-child(1) { width: 50px; }   /* Ref */
            .evrak-table th:nth-child(2) { width: 80px; }   /* Tipi */
            .evrak-table th:nth-child(3) { width: 100px; }  /* Evrak No */
            .evrak-table th:nth-child(4) { width: 120px; }  /* Şantiye */
            .evrak-table th:nth-child(5) { width: 80px; }   /* H.Tipi */
            .evrak-table th:nth-child(6) { width: 150px; }  /* Hesap Tanımı */
            .evrak-table th:nth-child(7) { width: 100px; }  /* Ekleyen */
            .evrak-table th:nth-child(8) { width: 90px; }   /* Evrak Tarihi */
            .evrak-table th:nth-child(9) { width: 90px; }   /* İşlem Tarihi */
            .evrak-table th:nth-child(10) { width: 80px; }  /* Cinsi */
            .evrak-table th:nth-child(11) { width: 120px; } /* İlgili Kişi */
            .evrak-table th:nth-child(12) { width: 200px; } /* Konusu */
            .evrak-table th:nth-child(13) { width: 100px; } /* Hazırlayan */
            
            /* Scrollbar styles for evrak table */
            .evrak-table-container::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            .evrak-table-container::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }
            
            .evrak-table-container::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 4px;
            }
            
            .evrak-table-container::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }
        `;
        document.head.appendChild(style);
    }

    initEvrakFunctionality() {
        this.initEvrakFilters();
        this.initEvrakTableInteractions();
    }

    initEvrakFilters() {
        // Date inputs
        const dateInputs = document.querySelectorAll('.evrak-filters .input-with-icon input');
        dateInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.applyEvrakFilters();
            });
        });

        // Radio buttons
        const radioButtons = document.querySelectorAll('input[name="evrakType"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.applyEvrakFilters();
            });
        });

        // Evrak source checkboxes
        const sourceCheckboxes = document.querySelectorAll('.source-checkbox input[type="checkbox"]');
        sourceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.applyEvrakFilters();
                this.updateSourceCheckboxStyle(checkbox);
            });
        });

        // Other checkboxes
        const otherCheckboxes = document.querySelectorAll('.evrak-filters input[type="checkbox"]:not(.source-checkbox input)');
        otherCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.applyEvrakFilters();
            });
        });



        // Select dropdowns
        const selects = document.querySelectorAll('.evrak-filters .filter-select');
        selects.forEach(select => {
            select.addEventListener('change', () => {
                this.applyEvrakFilters();
            });
        });

        // Initialize source checkbox styles
        sourceCheckboxes.forEach(checkbox => {
            this.updateSourceCheckboxStyle(checkbox);
        });
    }

    updateSourceCheckboxStyle(checkbox) {
        const sourceItem = checkbox.closest('.source-item');
        if (checkbox.checked) {
            sourceItem.style.opacity = '1';
            sourceItem.style.fontWeight = '600';
        } else {
            sourceItem.style.opacity = '0.6';
            sourceItem.style.fontWeight = 'normal';
        }
    }

    applyEvrakFilters() {
        const startDate = document.querySelector('.evrak-filters .date-range input:first-child').value;
        const endDate = document.querySelector('.evrak-filters .date-range input:last-child').value;
        const evrakType = document.querySelector('input[name="evrakType"]:checked').value;
        
        console.log('Applying evrak filters:', { startDate, endDate, evrakType });
        
        // Here you would typically make an API call to filter data
        // For now, just log the filter values
    }

    initEvrakTableInteractions() {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            const tableCells = document.querySelectorAll('.evrak-table tbody td');
            
            tableCells.forEach(cell => {
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Check if cell is already in edit mode
                    if (cell.querySelector('input')) {
                        return;
                    }
                    
                    // Remove selected class from all cells
                    tableCells.forEach(c => c.classList.remove('selected'));
                    
                    // Add selected class to clicked cell
                    cell.classList.add('selected');
                    
                    // Make cell editable immediately
                    this.makeCellEditable(cell);
                    
                    console.log('Evrak cell selected and made editable:', cell.textContent);
                });
            });

            // Make table headers sortable
            const headers = document.querySelectorAll('.evrak-table th');
            headers.forEach(header => {
                header.addEventListener('click', () => {
                    this.sortEvrakTable(header);
                });
                header.style.cursor = 'pointer';
            });
        }, 100);
    }

    sortEvrakTable(header) {
        const column = header.cellIndex;
        const table = document.querySelector('#evrakTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Remove sort indicators from all headers
        document.querySelectorAll('.evrak-table th').forEach(h => {
            h.classList.remove('sort-asc', 'sort-desc');
        });
        
        // Add sort indicator to clicked header
        if (header.classList.contains('sort-asc')) {
            header.classList.remove('sort-asc');
            header.classList.add('sort-desc');
        } else {
            header.classList.remove('sort-desc');
            header.classList.add('sort-asc');
        }
        
        console.log('Sorting evrak column:', column);
    }

    addRaporlarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .header-description {
                color: #6b7280;
                font-size: 14px;
                margin-top: 4px;
            }

            .reports-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 24px;
                margin-top: 32px;
            }

            .report-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .report-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                border-color: #2e7d32;
            }

            .report-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #2e7d32, #4caf50);
            }

            .report-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
            }

            .report-icon i {
                font-size: 28px;
                color: #2e7d32;
            }

            .report-card h3 {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin: 0 0 8px 0;
            }

            .report-card p {
                color: #6b7280;
                font-size: 14px;
                line-height: 1.5;
                margin: 0;
            }

            /* Report Detail Page Styles */
            .report-detail {
                display: none;
            }

            .report-detail.active {
                display: block;
            }

            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 24px;
                font-size: 14px;
                color: #6b7280;
            }

            .breadcrumb a {
                color: #2e7d32;
                text-decoration: none;
                cursor: pointer;
            }

            .breadcrumb a:hover {
                text-decoration: underline;
            }

            .breadcrumb .separator {
                color: #d1d5db;
            }

            .report-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            }

            .report-title {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .report-title-icon {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .report-title-icon i {
                font-size: 24px;
                color: #2e7d32;
            }

            .report-title h1 {
                font-size: 24px;
                font-weight: 600;
                color: #1f2937;
                margin: 0;
            }

            .report-title p {
                color: #6b7280;
                font-size: 14px;
                margin: 4px 0 0 0;
            }

            .report-actions {
                display: flex;
                gap: 12px;
            }

            .filter-bar {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 24px;
                position: sticky;
                top: 0;
                z-index: 100;
            }

            .filter-row {
                display: flex;
                gap: 16px;
                align-items: flex-end;
                flex-wrap: wrap;
            }

            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
                min-width: 200px;
            }

            .filter-group label {
                font-size: 12px;
                font-weight: 500;
                color: #374151;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .filter-input, .filter-select {
                padding: 8px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                transition: border-color 0.2s ease;
            }

            .filter-input:focus, .filter-select:focus {
                outline: none;
                border-color: #2e7d32;
            }

            .filter-actions {
                display: flex;
                gap: 8px;
                align-items: flex-end;
            }

            .kpi-strip {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                margin-bottom: 24px;
            }

            .kpi-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .kpi-card:hover {
                border-color: #2e7d32;
                transform: translateY(-2px);
            }

            .kpi-card.positive {
                border-left: 4px solid #10b981;
            }

            .kpi-card.negative {
                border-left: 4px solid #ef4444;
            }

            .kpi-card.neutral {
                border-left: 4px solid #6b7280;
            }

            .kpi-value {
                font-size: 28px;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 4px;
            }

            .kpi-label {
                font-size: 12px;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
            }

            .kpi-change {
                font-size: 12px;
                font-weight: 500;
            }

            .kpi-change.positive {
                color: #10b981;
            }

            .kpi-change.negative {
                color: #ef4444;
            }

            .kpi-change.neutral {
                color: #6b7280;
            }

            .report-tabs {
                display: flex;
                border-bottom: 1px solid #e5e7eb;
                margin-bottom: 24px;
            }

            .report-tab {
                padding: 12px 24px;
                border: none;
                background: none;
                color: #6b7280;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: all 0.2s ease;
            }

            .report-tab.active {
                color: #2e7d32;
                border-bottom-color: #2e7d32;
            }

            .report-tab:hover {
                color: #2e7d32;
            }

            .report-content {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                min-height: 400px;
            }

            .report-tab-content {
                display: none;
            }

            .report-tab-content.active {
                display: block;
            }

            .summary-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 16px;
                padding: 24px;
            }

            .summary-card {
                background: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                padding: 16px;
            }

            .summary-card h4 {
                font-size: 14px;
                font-weight: 600;
                color: #374151;
                margin: 0 0 8px 0;
            }

            .summary-value {
                font-size: 20px;
                font-weight: 700;
                color: #2e7d32;
            }

            .chart-container {
                padding: 24px;
                text-align: center;
            }

            .chart-placeholder {
                width: 100%;
                height: 300px;
                background: #f9fafb;
                border: 2px dashed #d1d5db;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6b7280;
                font-size: 16px;
            }

            .detail-table {
                width: 100%;
                border-collapse: collapse;
            }

            .detail-table th,
            .detail-table td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
            }

            .detail-table th {
                background: #f9fafb;
                font-weight: 600;
                color: #374151;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .detail-table tbody tr:hover {
                background: #f9fafb;
            }

            .pivot-container {
                padding: 24px;
            }

            .pivot-fields {
                display: flex;
                gap: 16px;
                margin-bottom: 24px;
            }

            .pivot-field {
                flex: 1;
            }

            .pivot-field label {
                display: block;
                font-size: 12px;
                font-weight: 500;
                color: #374151;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .pivot-field select {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
            }

            .log-container {
                padding: 24px;
            }

            .log-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #f3f4f6;
            }

            .log-info {
                flex: 1;
            }

            .log-date {
                font-size: 12px;
                color: #6b7280;
            }

            .log-action {
                font-size: 14px;
                color: #374151;
                font-weight: 500;
            }

            .log-filters {
                font-size: 12px;
                color: #6b7280;
                margin-top: 4px;
            }

            .sticky-footer {
                position: sticky;
                bottom: 0;
                background: white;
                border-top: 1px solid #e5e7eb;
                padding: 16px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                font-weight: 500;
                color: #374151;
            }

            .footer-totals {
                display: flex;
                gap: 24px;
            }

            .footer-total {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .footer-total-value {
                font-weight: 700;
                color: #2e7d32;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .reports-grid {
                    grid-template-columns: 1fr;
                    gap: 16px;
                }

                .report-card {
                    padding: 16px;
                }

                .filter-row {
                    flex-direction: column;
                    align-items: stretch;
                }

                .filter-group {
                    min-width: auto;
                }

                .kpi-strip {
                    grid-template-columns: repeat(2, 1fr);
                }

                .report-tabs {
                    overflow-x: auto;
                }

                .report-tab {
                    white-space: nowrap;
                }
            }
        `;
        document.head.appendChild(style);
    }

    initRaporlarFunctionality() {
        const reportCards = document.querySelectorAll('.report-card');
        
        reportCards.forEach(card => {
            card.addEventListener('click', () => {
                const reportType = card.getAttribute('data-report');
                this.showReportDetail(reportType);
            });
        });
    }

    showReportDetail(reportType) {
        const moduleContainer = document.getElementById('moduleViewContainer');
        const reportData = this.getReportData(reportType);
        
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="breadcrumb">
                    <a onclick="toolbarManager.goBackToReports()">Raporlar</a>
                    <span class="separator">/</span>
                    <span>${reportData.title}</span>
                </div>

                <div class="report-header">
                    <div class="report-title">
                        <div class="report-title-icon">
                            <i class="${reportData.icon}"></i>
                        </div>
                        <div>
                            <h1>${reportData.title}</h1>
                            <p>${reportData.description}</p>
                        </div>
                    </div>
                    <div class="report-actions">
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-save"></i>
                            Kaydet
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-share"></i>
                            Paylaş
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-download"></i>
                            Dışa Aktar
                        </button>
                    </div>
                </div>

                <div class="filter-bar">
                    <div class="filter-row">
                        <div class="filter-group">
                            <label>Tarih Aralığı</label>
                            <select class="filter-select">
                                <option>Bugün</option>
                                <option selected>Bu Ay</option>
                                <option>Son 3 Ay</option>
                                <option>Bu Yıl</option>
                                <option>Özel</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Arama</label>
                            <input type="text" class="filter-input" placeholder="Cari, şantiye, taşeron...">
                        </div>
                        <div class="filter-group">
                            <label>Şantiye</label>
                            <select class="filter-select">
                                <option>Tümü</option>
                                <option>LONICERA OTEL</option>
                                <option>PROJE 1</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Durum</label>
                            <select class="filter-select">
                                <option>Tümü</option>
                                <option>Aktif</option>
                                <option>Pasif</option>
                            </select>
                        </div>
                        <div class="filter-actions">
                            <button class="btn btn-primary">
                                <i class="fa-solid fa-search"></i>
                                Filtrele
                            </button>
                            <button class="btn btn-outline">
                                <i class="fa-solid fa-cog"></i>
                                Gelişmiş
                            </button>
                        </div>
                    </div>
                </div>

                <div class="kpi-strip">
                    ${reportData.kpis.map(kpi => `
                        <div class="kpi-card ${kpi.trend}">
                            <div class="kpi-value">${kpi.value}</div>
                            <div class="kpi-label">${kpi.label}</div>
                            <div class="kpi-change ${kpi.trend}">
                                ${kpi.change > 0 ? '+' : ''}${kpi.change}% önceki dönem
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="report-tabs">
                    <button class="report-tab active" data-tab="ozet">Özet</button>
                    <button class="report-tab" data-tab="grafikler">Grafikler</button>
                    <button class="report-tab" data-tab="detay">Detay</button>
                    <button class="report-tab" data-tab="pivot">Pivot</button>
                    <button class="report-tab" data-tab="log">Log</button>
                </div>

                <div class="report-content">
                    <div class="report-tab-content active" id="ozet">
                        ${this.getSummaryContent(reportType)}
                    </div>
                    <div class="report-tab-content" id="grafikler">
                        <div class="chart-container">
                            <div class="chart-placeholder">
                                <i class="fa-solid fa-chart-bar"></i> Grafikler burada görüntülenecek
                            </div>
                        </div>
                    </div>
                    <div class="report-tab-content" id="detay">
                        ${this.getDetailContent(reportType)}
                    </div>
                    <div class="report-tab-content" id="pivot">
                        ${this.getPivotContent(reportType)}
                    </div>
                    <div class="report-tab-content" id="log">
                        ${this.getLogContent(reportType)}
                    </div>
                </div>

                <div class="sticky-footer">
                    <div class="footer-totals">
                        <div class="footer-total">
                            <span>Toplam:</span>
                            <span class="footer-total-value">${reportData.footer.total}</span>
                        </div>
                        <div class="footer-total">
                            <span>Ortalama:</span>
                            <span class="footer-total-value">${reportData.footer.average}</span>
                        </div>
                        <div class="footer-total">
                            <span>Adet:</span>
                            <span class="footer-total-value">${reportData.footer.count}</span>
                        </div>
                    </div>
                    <div class="footer-actions">
                        <button class="btn btn-outline btn-sm">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                    </div>
                </div>
            `;
            
            this.initReportDetailFunctionality();
        }
    }

    getReportData(reportType) {
        const reportData = {
            hesap: {
                title: 'Hesap Raporu',
                description: 'Genel hesap durumu ve bakiye analizi',
                icon: 'fa-solid fa-coins',
                kpis: [
                    { label: 'Toplam Bakiye', value: '2,450,000 ₺', change: 12.5, trend: 'positive' },
                    { label: 'Toplam Giriş', value: '1,850,000 ₺', change: 8.3, trend: 'positive' },
                    { label: 'Toplam Çıkış', value: '1,200,000 ₺', change: -5.2, trend: 'negative' },
                    { label: 'Net Değişim', value: '650,000 ₺', change: 15.7, trend: 'positive' },
                    { label: 'İşlem Sayısı', value: '1,247', change: 3.1, trend: 'neutral' }
                ],
                footer: { total: '2,450,000 ₺', average: '245,000 ₺', count: '10' }
            },
            santiye: {
                title: 'Şantiye Raporu',
                description: 'Şantiye bazlı maliyet ve hakediş analizi',
                icon: 'fa-solid fa-hard-hat',
                kpis: [
                    { label: 'Bütçe', value: '15,000,000 ₺', change: 0, trend: 'neutral' },
                    { label: 'Gerçekleşen', value: '12,450,000 ₺', change: 8.5, trend: 'positive' },
                    { label: 'Sapma', value: '2,550,000 ₺', change: -15.2, trend: 'negative' },
                    { label: 'Hakediş Toplamı', value: '14,200,000 ₺', change: 12.3, trend: 'positive' },
                    { label: 'Aktif Şantiye', value: '8', change: 0, trend: 'neutral' }
                ],
                footer: { total: '12,450,000 ₺', average: '1,556,250 ₺', count: '8' }
            },
            taseron: {
                title: 'Taşeron Raporu',
                description: 'Taşeron performans ve ödeme analizi',
                icon: 'fa-solid fa-user-tie',
                kpis: [
                    { label: 'Sözleşme Tutarı', value: '8,500,000 ₺', change: 5.2, trend: 'positive' },
                    { label: 'Ödenen', value: '6,200,000 ₺', change: 12.8, trend: 'positive' },
                    { label: 'Kalan', value: '2,300,000 ₺', change: -8.5, trend: 'negative' },
                    { label: 'Ortalama Vade', value: '45 gün', change: -5.1, trend: 'positive' },
                    { label: 'Gecikme Sayısı', value: '3', change: -25.0, trend: 'positive' }
                ],
                footer: { total: '8,500,000 ₺', average: '850,000 ₺', count: '10' }
            },
            personel: {
                title: 'Personel Raporu',
                description: 'Personel çalışma ve maaş analizi',
                icon: 'fa-solid fa-users',
                kpis: [
                    { label: 'Personel Sayısı', value: '45', change: 2.2, trend: 'positive' },
                    { label: 'Toplam Saat', value: '7,650', change: 8.7, trend: 'positive' },
                    { label: 'Fazla Mesai', value: '320 saat', change: -12.5, trend: 'positive' },
                    { label: 'Net Maaş', value: '1,250,000 ₺', change: 6.8, trend: 'positive' },
                    { label: 'Avanslar', value: '85,000 ₺', change: -8.2, trend: 'negative' }
                ],
                footer: { total: '1,250,000 ₺', average: '27,778 ₺', count: '45' }
            },
            tedarikci: {
                title: 'Tedarikçi Raporu',
                description: 'Tedarikçi analiz ve teslimat performansı',
                icon: 'fa-solid fa-truck',
                kpis: [
                    { label: 'Sipariş Sayısı', value: '156', change: 15.3, trend: 'positive' },
                    { label: 'Teslim Oranı', value: '94.2%', change: 2.1, trend: 'positive' },
                    { label: 'İptal/İade', value: '8', change: -20.0, trend: 'positive' },
                    { label: 'Toplam Tutar', value: '3,850,000 ₺', change: 18.7, trend: 'positive' },
                    { label: 'Ortalama Vade', value: '30 gün', change: -8.3, trend: 'positive' }
                ],
                footer: { total: '3,850,000 ₺', average: '24,679 ₺', count: '156' }
            },
            maas: {
                title: 'Maaş Raporu',
                description: 'Personel maaş ve kesinti özetleri',
                icon: 'fa-solid fa-money-bill-wave',
                kpis: [
                    { label: 'Brüt', value: '1,850,000 ₺', change: 7.2, trend: 'positive' },
                    { label: 'Net', value: '1,250,000 ₺', change: 6.8, trend: 'positive' },
                    { label: 'SGK İşveren', value: '320,000 ₺', change: 8.1, trend: 'positive' },
                    { label: 'Vergi', value: '280,000 ₺', change: 5.9, trend: 'positive' },
                    { label: 'Kişi Başına Ort.', value: '27,778 ₺', change: 4.5, trend: 'positive' }
                ],
                footer: { total: '1,250,000 ₺', average: '27,778 ₺', count: '45' }
            },
            fatura: {
                title: 'Fatura/İrsaliye Raporu',
                description: 'Fatura ve irsaliye takip analizi',
                icon: 'fa-solid fa-file-invoice',
                kpis: [
                    { label: 'Fatura Adedi', value: '1,247', change: 12.5, trend: 'positive' },
                    { label: 'Toplam Tutar', value: '8,450,000 ₺', change: 18.7, trend: 'positive' },
                    { label: 'Ödenmemiş', value: '2,150,000 ₺', change: -8.3, trend: 'positive' },
                    { label: 'Geciken', value: '450,000 ₺', change: -15.2, trend: 'positive' },
                    { label: 'Ortalama DSO', value: '32 gün', change: -12.5, trend: 'positive' }
                ],
                footer: { total: '8,450,000 ₺', average: '6,780 ₺', count: '1,247' }
            },
            odeme: {
                title: 'Ödeme & Tahsilat Raporu',
                description: 'Ödeme akışları ve nakit analizi',
                icon: 'fa-solid fa-credit-card',
                kpis: [
                    { label: 'Toplam Tahsilat', value: '6,200,000 ₺', change: 15.3, trend: 'positive' },
                    { label: 'Toplam Ödeme', value: '4,850,000 ₺', change: 12.8, trend: 'positive' },
                    { label: 'Net Nakit Akışı', value: '1,350,000 ₺', change: 25.7, trend: 'positive' },
                    { label: 'Ortalama Vade', value: '28 gün', change: -8.5, trend: 'positive' },
                    { label: 'Gecikme Oranı', value: '3.2%', change: -15.8, trend: 'positive' }
                ],
                footer: { total: '11,050,000 ₺', average: '552,500 ₺', count: '20' }
            },
            kasa: {
                title: 'Kasa Raporu',
                description: 'Kasa durumu ve günlük özet',
                icon: 'fa-solid fa-cash-register',
                kpis: [
                    { label: 'Başlangıç', value: '850,000 ₺', change: 0, trend: 'neutral' },
                    { label: 'Giriş', value: '2,450,000 ₺', change: 18.7, trend: 'positive' },
                    { label: 'Çıkış', value: '1,850,000 ₺', change: 12.3, trend: 'positive' },
                    { label: 'Gün Sonu', value: '1,450,000 ₺', change: 25.8, trend: 'positive' },
                    { label: 'Gün Sayısı', value: '31', change: 0, trend: 'neutral' }
                ],
                footer: { total: '1,450,000 ₺', average: '46,774 ₺', count: '31' }
            }
        };
        
        return reportData[reportType] || reportData.hesap;
    }

    getSummaryContent(reportType) {
        const summaryData = {
            hesap: `
                <div class="summary-grid">
                    <div class="summary-card">
                        <h4>Nakit Hesaplar</h4>
                        <div class="summary-value">1,250,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>Alacak Hesaplar</h4>
                        <div class="summary-value">850,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>Borç Hesaplar</h4>
                        <div class="summary-value">350,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>Net Durum</h4>
                        <div class="summary-value">1,750,000 ₺</div>
                    </div>
                </div>
            `,
            santiye: `
                <div class="summary-grid">
                    <div class="summary-card">
                        <h4>LONICERA OTEL</h4>
                        <div class="summary-value">8,500,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>PROJE 1</h4>
                        <div class="summary-value">3,200,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>PROJE 2</h4>
                        <div class="summary-value">750,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>Toplam</h4>
                        <div class="summary-value">12,450,000 ₺</div>
                    </div>
                </div>
            `,
            taseron: `
                <div class="summary-grid">
                    <div class="summary-card">
                        <h4>Ahmet Yılmaz İnşaat</h4>
                        <div class="summary-value">2,500,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>Mehmet Kaya Yapı</h4>
                        <div class="summary-value">1,800,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>Fatma Demir İnşaat</h4>
                        <div class="summary-value">1,200,000 ₺</div>
                    </div>
                    <div class="summary-card">
                        <h4>Toplam</h4>
                        <div class="summary-value">5,500,000 ₺</div>
                    </div>
                </div>
            `
        };
        
        return summaryData[reportType] || summaryData.hesap;
    }

    getDetailContent(reportType) {
        const detailData = {
            hesap: `
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>Tarih</th>
                            <th>Hesap</th>
                            <th>Açıklama</th>
                            <th>Belge No</th>
                            <th>Giriş</th>
                            <th>Çıkış</th>
                            <th>Bakiye</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15.01.2024</td>
                            <td>100 KASA</td>
                            <td>Müşteri ödemesi</td>
                            <td>FAT-001</td>
                            <td>50,000 ₺</td>
                            <td>-</td>
                            <td>1,300,000 ₺</td>
                        </tr>
                        <tr>
                            <td>16.01.2024</td>
                            <td>120 ALICAKLAR</td>
                            <td>Mal satışı</td>
                            <td>FAT-002</td>
                            <td>75,000 ₺</td>
                            <td>-</td>
                            <td>925,000 ₺</td>
                        </tr>
                        <tr>
                            <td>17.01.2024</td>
                            <td>320 SATICILAR</td>
                            <td>Mal alımı</td>
                            <td>FAT-003</td>
                            <td>-</td>
                            <td>25,000 ₺</td>
                            <td>325,000 ₺</td>
                        </tr>
                    </tbody>
                </table>
            `,
            santiye: `
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th>Tarih</th>
                            <th>Şantiye</th>
                            <th>Taşeron</th>
                            <th>Malzeme/Hizmet</th>
                            <th>Miktar</th>
                            <th>Tutar</th>
                            <th>Hakediş No</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15.01.2024</td>
                            <td>LONICERA OTEL</td>
                            <td>Ahmet Yılmaz</td>
                            <td>Beton dökümü</td>
                            <td>500 m³</td>
                            <td>250,000 ₺</td>
                            <td>HK-001</td>
                        </tr>
                        <tr>
                            <td>16.01.2024</td>
                            <td>LONICERA OTEL</td>
                            <td>Mehmet Kaya</td>
                            <td>Demir montajı</td>
                            <td>50 ton</td>
                            <td>180,000 ₺</td>
                            <td>HK-002</td>
                        </tr>
                    </tbody>
                </table>
            `
        };
        
        return detailData[reportType] || detailData.hesap;
    }

    getPivotContent(reportType) {
        return `
            <div class="pivot-container">
                <div class="pivot-fields">
                    <div class="pivot-field">
                        <label>Satır Alanları</label>
                        <select>
                            <option>Şantiye</option>
                            <option>Taşeron</option>
                            <option>Hesap</option>
                        </select>
                    </div>
                    <div class="pivot-field">
                        <label>Sütun Alanları</label>
                        <select>
                            <option>Ay</option>
                            <option>Çeyrek</option>
                            <option>Yıl</option>
                        </select>
                    </div>
                    <div class="pivot-field">
                        <label>Değer</label>
                        <select>
                            <option>Tutar: Toplam</option>
                            <option>Tutar: Ortalama</option>
                            <option>Adet</option>
                        </select>
                    </div>
                </div>
                <div class="chart-placeholder">
                    <i class="fa-solid fa-table"></i> Pivot tablo burada görüntülenecek
                </div>
            </div>
        `;
    }

    getLogContent(reportType) {
        return `
            <div class="log-container">
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-date">15.01.2024 14:30</div>
                        <div class="log-action">Rapor dışa aktarıldı (Excel)</div>
                        <div class="log-filters">Filtreler: Bu Ay, Tüm Şantiyeler</div>
                    </div>
                </div>
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-date">14.01.2024 11:15</div>
                        <div class="log-action">Rapor yazdırıldı</div>
                        <div class="log-filters">Filtreler: Son 3 Ay, LONICERA OTEL</div>
                    </div>
                </div>
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-date">13.01.2024 16:45</div>
                        <div class="log-action">Filtre preset kaydedildi</div>
                        <div class="log-filters">Preset: "Aylık Özet"</div>
                    </div>
                </div>
            </div>
        `;
    }

    initReportDetailFunctionality() {
        // Tab functionality
        const tabs = document.querySelectorAll('.report-tab');
        const tabContents = document.querySelectorAll('.report-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // KPI card click functionality
        const kpiCards = document.querySelectorAll('.kpi-card');
        kpiCards.forEach(card => {
            card.addEventListener('click', () => {
                // Highlight corresponding data in detail tab
                const detailTab = document.querySelector('[data-tab="detay"]');
                if (detailTab) {
                    detailTab.click();
                }
            });
        });
    }

    goBackToReports() {
        this.showRaporlarModule();
    }

    showAraclarModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Araç/İş Makinası Listesi - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Araç/İş Makinası Listesi</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excele Aktar
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-ellipsis-v"></i>
                            Detay
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-body arac-content">
                    <!-- Data Table -->
                    <div class="data-table-container arac-table-container">
                        <table class="data-table arac-table" id="aracTable">
                            <thead>
                                <tr>
                                    <th>Plaka</th>
                                    <th>C/H Bağlantısı</th>
                                    <th>Kullanıldığı Şantiye</th>
                                    <th>Şöförü</th>
                                    <th>Marka</th>
                                    <th>Model</th>
                                    <th>Şase No</th>
                                    <th>Motor No</th>
                                    <th>Yakıt</th>
                                    <th>Durumu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>07 NOA 34</td>
                                    <td>-</td>
                                    <td>ŞİRKET MERKEZ ŞANTİ</td>
                                    <td>EVREN YAMAN</td>
                                    <td>TOYOTA</td>
                                    <td>COROLLA</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>Benzin</td>
                                    <td><span class="status-badge active">Aktif</span></td>
                                </tr>
                                <tr>
                                    <td>34 ABC 123</td>
                                    <td>CH-001</td>
                                    <td>LONICERA OTEL</td>
                                    <td>MEHMET DEMİR</td>
                                    <td>FORD</td>
                                    <td>TRANSIT</td>
                                    <td>WDF123456789</td>
                                    <td>ENG987654321</td>
                                    <td>Dizel</td>
                                    <td><span class="status-badge active">Aktif</span></td>
                                </tr>
                                <tr>
                                    <td>06 XYZ 789</td>
                                    <td>CH-002</td>
                                    <td>PROJE 1</td>
                                    <td>ALİ ÖZKAN</td>
                                    <td>VOLVO</td>
                                    <td>EXCAVATOR</td>
                                    <td>VOL456789123</td>
                                    <td>ENG123456789</td>
                                    <td>Dizel</td>
                                    <td><span class="status-badge maintenance">Bakımda</span></td>
                                </tr>
                                <tr>
                                    <td>35 DEF 456</td>
                                    <td>-</td>
                                    <td>PROJE 2</td>
                                    <td>FATMA KAYA</td>
                                    <td>BMW</td>
                                    <td>X5</td>
                                    <td>BMW789123456</td>
                                    <td>ENG456789123</td>
                                    <td>Benzin</td>
                                    <td><span class="status-badge inactive">Pasif</span></td>
                                </tr>
                                <tr>
                                    <td>07 GHI 789</td>
                                    <td>CH-003</td>
                                    <td>ŞİRKET MERKEZ ŞANTİ</td>
                                    <td>VELİ ŞAHİN</td>
                                    <td>CATERPILLAR</td>
                                    <td>BULLDOZER</td>
                                    <td>CAT123789456</td>
                                    <td>ENG789456123</td>
                                    <td>Dizel</td>
                                    <td><span class="status-badge active">Aktif</span></td>
                                </tr>
                                <tr>
                                    <td>34 JKL 012</td>
                                    <td>-</td>
                                    <td>LONICERA OTEL</td>
                                    <td>CAN YILDIZ</td>
                                    <td>MERCEDES</td>
                                    <td>SPRINTER</td>
                                    <td>MER456012789</td>
                                    <td>ENG012789456</td>
                                    <td>Dizel</td>
                                    <td><span class="status-badge active">Aktif</span></td>
                                </tr>
                                <tr>
                                    <td>06 MNO 345</td>
                                    <td>CH-004</td>
                                    <td>PROJE 1</td>
                                    <td>AYŞE YILMAZ</td>
                                    <td>KOMATSU</td>
                                    <td>EXCAVATOR</td>
                                    <td>KOM789345012</td>
                                    <td>ENG345012789</td>
                                    <td>Dizel</td>
                                    <td><span class="status-badge maintenance">Bakımda</span></td>
                                </tr>
                                <tr>
                                    <td>35 PQR 678</td>
                                    <td>-</td>
                                    <td>PROJE 2</td>
                                    <td>OSMAN KAYA</td>
                                    <td>HONDA</td>
                                    <td>CIVIC</td>
                                    <td>HON012678345</td>
                                    <td>ENG678345012</td>
                                    <td>Benzin</td>
                                    <td><span class="status-badge active">Aktif</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }
        
        // Add specific styles for arac module
        this.addAracStyles();
        
        // Initialize arac functionality
        this.initAracFunctionality();
    }

    addAracStyles() {
        // Add specific styles for arac module if not already present
        if (!document.getElementById('arac-styles')) {
            const style = document.createElement('style');
            style.id = 'arac-styles';
            style.textContent = `
                .arac-content {
                    padding: 20px;
                    height: calc(100vh - 200px);
                }
                
                .arac-filters {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                
                .arac-table-container {
                    height: 100%;
                    overflow: auto;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    background: var(--white);
                    box-shadow: var(--shadow);
                    max-height: calc(100vh - 400px);
                }
                
                .arac-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .arac-table th {
                    background-color: var(--gray-100);
                    padding: 12px 16px;
                    text-align: left;
                    font-weight: 600;
                    color: var(--text);
                    border-bottom: 1px solid var(--border);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                
                .arac-table td {
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--border);
                    color: var(--text);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    position: relative;
                }
                
                .arac-table tbody tr:hover {
                    background-color: var(--gray-50);
                }
                
                /* Hücre seçimi için yeşil border */
                .arac-table td.selected {
                    border: 2px solid var(--green) !important;
                    background-color: #f8fff8 !important;
                    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.1);
                    z-index: 5;
                    position: relative;
                }
                
                .arac-table td.selected:hover {
                    background-color: #f0f8f0 !important;
                }
                
                /* Hücreye tıklandığında aktif durum */
                .arac-table td.active {
                    border: 2px solid var(--green) !important;
                    background-color: #f8fff8 !important;
                    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
                    outline: none;
                }
                
                /* Hücre focus durumu */
                .arac-table td:focus {
                    outline: none;
                    border: 2px solid var(--green) !important;
                    background-color: #f8fff8 !important;
                    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.1);
                }
                
                /* Text selection styles */
                .arac-table td::selection {
                    background-color:rgb(141, 186, 231);
                    color: white;
                }
                
                .arac-table td::-moz-selection {
                    background-color:rgb(136, 184, 232);
                    color: white;
                }
                
                /* Cursor styles for better UX */
                .arac-table td.editable-cell {
                    cursor: text;
                }
                
                .arac-table td.editable-cell:hover {
                    background-color: #f0f8ff;
                }
                
                .editable-cell {
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .editable-cell:hover {
                    background-color: #f0f8f0;
                }
                
                .editable-cell:focus {
                    outline: 2px solid var(--green);
                    outline-offset: -2px;
                    background-color: #f8fff8;
                    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.1);
                }
                
                .cell-focused {
                    outline: 2px solid var(--green);
                    outline-offset: -2px;
                    background-color: #f8fff8;
                    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.1);
                }
                
                .status-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    text-transform: uppercase;
                }
                
                .status-badge.active {
                    background-color: #e8f5e8;
                    color: #2e7d32;
                }
                
                .status-badge.inactive {
                    background-color: #ffebee;
                    color: #c62828;
                }
                
                .status-badge.maintenance {
                    background-color: #fff3e0;
                    color: #ef6c00;
                }
                
                .summary-bar {
                    display: flex;
                    gap: 20px;
                    padding: 16px;
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    margin-top: 20px;
                }
                
                .summary-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }
                
                .summary-label {
                    font-size: 12px;
                    color: var(--muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .summary-value {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--green);
                }
                
                /* Scrollbar styles for arac table */
                .arac-table-container::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                .arac-table-container::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                
                .arac-table-container::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 4px;
                }
                
                .arac-table-container::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `;
            document.head.appendChild(style);
        }
    }

    initAracFunctionality() {
        // Initialize table interactions
        this.initAracTableInteractions();
        
        // Initialize filter functionality
        this.initAracFilters();
    }

    initAracTableInteractions() {
        const table = document.getElementById('aracTable');
        if (!table) return;

        // Make all cells editable except status column
        const cells = table.querySelectorAll('tbody td:not(:last-child)');
        cells.forEach(cell => {
            cell.setAttribute('contenteditable', 'true');
            cell.classList.add('editable-cell');
            
            // Click to focus and highlight
            cell.addEventListener('click', () => {
                // Remove focus from all cells
                cells.forEach(c => {
                    c.classList.remove('cell-focused');
                    c.classList.remove('selected');
                    c.classList.remove('active');
                });
                // Add focus to clicked cell
                cell.classList.add('cell-focused');
                cell.classList.add('selected');
                cell.classList.add('active');
                cell.focus();
                
                // Select all text in the cell (Excel-like behavior)
                setTimeout(() => {
                    if (window.getSelection) {
                        const selection = window.getSelection();
                        const range = document.createRange();
                        range.selectNodeContents(cell);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }, 10);
            });
            
            // Blur event to save changes
            cell.addEventListener('blur', () => {
                cell.classList.remove('cell-focused');
                cell.classList.remove('active');
                console.log('Cell updated:', cell.textContent);
            });
            
            // Enter key to move to next cell
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const nextCell = cell.nextElementSibling;
                    if (nextCell && nextCell.classList.contains('editable-cell')) {
                        nextCell.click();
                    }
                }
            });
            
            // Double click to select all text
            cell.addEventListener('dblclick', () => {
                if (window.getSelection) {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(cell);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            });
        });

        // Row selection
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', (e) => {
                // Don't trigger row selection if clicking on editable cell
                if (e.target.classList.contains('editable-cell')) {
                    return;
                }
                
                // Remove selection from all rows
                rows.forEach(r => r.classList.remove('selected'));
                // Add selection to clicked row
                row.classList.add('selected');
            });
        });
    }

    initAracFilters() {
        // Filter functionality
        const filterSelects = document.querySelectorAll('.arac-filters select');
        filterSelects.forEach(select => {
            select.addEventListener('change', () => {
                this.applyAracFilters();
            });
        });

        // Search button
        const searchBtn = document.querySelector('.arac-filters .btn-primary');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.applyAracFilters();
            });
        }
    }

    applyAracFilters() {
        const santiye = document.querySelector('.arac-filters select:nth-child(1)').value;
        const durum = document.querySelector('.arac-filters select:nth-child(2)').value;
        const yakit = document.querySelector('.arac-filters select:nth-child(3)').value;
        
        console.log('Applying arac filters:', { santiye, durum, yakit });
        
        // Here you would typically filter the table data
        // For now, just log the filter values
    }

    showUzaktanYardimModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Uzaktan Yardım - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
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
                            <div class="status-indicator online">
                                <i class="fa-solid fa-circle"></i>
                                <span>Çevrimiçi / Ortalama Yanıt: 3 dk</span>
                            </div>
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
                                <span class="stat-label">Açık Talep</span>
                            </div>
                            <div class="stat-item">
                                <i class="fa-solid fa-clock"></i>
                                <span class="stat-number">3</span>
                                <span class="stat-label">Ortalama Yanıt</span>
                            </div>
                            <div class="stat-item">
                                <i class="fa-solid fa-check-circle"></i>
                                <span class="stat-number">98%</span>
                                <span class="stat-label">Çözüm Oranı</span>
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
                                        <button type="submit" class="btn btn-primary" id="submitTicket">
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
                                        <span class="priority urgent">Acil</span>
                                        <span class="time">2-4 saat</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="priority high">Yüksek</span>
                                        <span class="time">4-8 saat</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="priority medium">Orta</span>
                                        <span class="time">8-24 saat</span>
                                    </div>
                                    <div class="time-item">
                                        <span class="priority low">Düşük</span>
                                        <span class="time">24-48 saat</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                </div>
            `;
        }
        
        // Add specific styles for uzaktan yardim module
        this.addUzaktanYardimStyles();
        
        // Initialize uzaktan yardim functionality
        this.initUzaktanYardimFunctionality();
        
        // Debug: Log all tab panes
        setTimeout(() => {
            this.debugTabPanes();
        }, 100);
    }

    addUzaktanYardimStyles() {
        // Add specific styles for uzaktan yardim module if not already present
        if (!document.getElementById('uzaktan-yardim-styles')) {
            const style = document.createElement('style');
            style.id = 'uzaktan-yardim-styles';
            style.textContent = `
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
                
                .uzaktan-yardim-tabs {
                    display: flex;
                    background: var(--white);
                    border-radius: 12px;
                    padding: 8px;
                    box-shadow: var(--shadow);
                    margin-bottom: 20px;
                    overflow-x: auto;
                }
                
                .tab-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 16px;
                    border: none;
                    background: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    color: var(--muted);
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }
                
                .tab-button:hover {
                    background: var(--gray-50);
                    color: var(--text);
                }
                
                .tab-button.active {
                    background: var(--green);
                    color: white;
                }
                
                .tab-content {
                    background: var(--white);
                    border-radius: 12px;
                    box-shadow: var(--shadow);
                    overflow: hidden;
                    min-height: 500px;
                    position: relative;
                }
                
                .tab-pane {
                    display: none;
                    padding: 20px;
                    min-height: 400px;
                    opacity: 0;
                    visibility: hidden;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }
                
                .tab-pane.active {
                    display: block;
                    visibility: visible;
                    opacity: 1;
                    position: relative;
                    top: auto;
                    left: auto;
                    right: auto;
                    bottom: auto;
                    z-index: 10;
                }
                
                /* Hızlı Bağlantı Styles */
                .hizli-baglanti-container {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 20px;
                }
                
                .session-card {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 24px;
                }
                
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                }
                
                .card-header i {
                    font-size: 24px;
                    color: var(--green);
                }
                
                .card-header h3 {
                    margin: 0;
                    color: var(--text);
                    font-size: 20px;
                }
                
                .session-code-section {
                    margin-bottom: 24px;
                }
                
                .code-display {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 12px;
                }
                
                .session-code {
                    font-size: 32px;
                    font-weight: 700;
                    color: var(--green);
                    font-family: 'Courier New', monospace;
                }
                
                .code-actions {
                    display: flex;
                    gap: 8px;
                }
                
                .btn-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    background: var(--white);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .btn-icon:hover {
                    background: var(--gray-50);
                    border-color: var(--green);
                }
                
                .code-timer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--muted);
                    font-size: 14px;
                }
                
                .share-link-section {
                    margin-bottom: 24px;
                }
                
                .share-link-section label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: var(--text);
                }
                
                .link-input {
                    display: flex;
                    gap: 8px;
                }
                
                .link-input input {
                    flex: 1;
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    font-size: 14px;
                }
                
                .permissions-section {
                    margin-bottom: 24px;
                }
                
                .permissions-section h4 {
                    margin: 0 0 16px 0;
                    color: var(--text);
                }
                
                .permission-toggles {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .toggle {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                }
                
                .toggle-slider {
                    position: relative;
                    width: 44px;
                    height: 24px;
                    background: var(--border);
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }
                
                .toggle input:checked + .toggle-slider {
                    background: var(--green);
                }
                
                .toggle-slider::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .toggle input:checked + .toggle-slider::after {
                    transform: translateX(20px);
                }
                
                .toggle input {
                    display: none;
                }
                
                .screenshot-section {
                    margin-bottom: 24px;
                }
                
                .screenshot-section label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: var(--text);
                }
                
                .drag-drop-area {
                    border: 2px dashed var(--border);
                    border-radius: 8px;
                    padding: 32px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .drag-drop-area:hover {
                    border-color: var(--green);
                    background: var(--gray-50);
                }
                
                .drag-drop-area i {
                    font-size: 32px;
                    color: var(--muted);
                    margin-bottom: 12px;
                }
                
                .drag-drop-area p {
                    margin: 0;
                    color: var(--muted);
                    font-size: 14px;
                }
                
                .action-buttons {
                    display: flex;
                    gap: 12px;
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
                
                /* Right Column Styles */
                .right-column {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                
                .status-card {
                    background: var(--white);
                    border: 1px solid var(--green);
                    border-radius: 12px;
                    padding: 20px;
                }
                
                .status-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .status-header i {
                    color: var(--green);
                    font-size: 20px;
                }
                
                .status-header h4 {
                    margin: 0;
                    color: var(--text);
                }
                
                .timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .timeline-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px 0;
                    color: var(--muted);
                    font-size: 14px;
                }
                
                .timeline-item.completed {
                    color: var(--green);
                }
                
                .timeline-item.active {
                    color: var(--text);
                    font-weight: 500;
                }
                
                .quick-help {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 20px;
                }
                
                .quick-help h4 {
                    margin: 0 0 16px 0;
                    color: var(--text);
                }
                
                .quick-help-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .quick-help-btn {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    background: var(--white);
                    color: var(--text);
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s ease;
                }
                
                .quick-help-btn:hover {
                    background: var(--gray-50);
                    border-color: var(--green);
                }
                
                /* Chat Styles */
                .chat-container {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    height: 600px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    overflow: hidden;
                }
                
                .chat-sidebar {
                    background: var(--gray-50);
                    border-right: 1px solid var(--border);
                    padding: 20px;
                }
                
                .chat-sidebar h4 {
                    margin: 0 0 16px 0;
                    color: var(--text);
                }
                
                .chat-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .chat-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .chat-item:hover {
                    background: var(--white);
                }
                
                .chat-item.active {
                    background: var(--green);
                    color: white;
                }
                
                .chat-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--green);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                
                .chat-info {
                    flex: 1;
                }
                
                .chat-name {
                    font-weight: 500;
                    margin-bottom: 4px;
                }
                
                .chat-last-message {
                    font-size: 12px;
                    opacity: 0.8;
                }
                
                .chat-time {
                    font-size: 12px;
                    opacity: 0.8;
                }
                
                .chat-main {
                    display: flex;
                    flex-direction: column;
                }
                
                .chat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid var(--border);
                }
                
                .chat-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 500;
                }
                
                .chat-status {
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                }
                
                .chat-status.online {
                    background: #e8f5e8;
                    color: #2e7d32;
                }
                
                .chat-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .message {
                    display: flex;
                    flex-direction: column;
                    max-width: 70%;
                }
                
                .message.user {
                    align-self: flex-end;
                }
                
                .message.agent {
                    align-self: flex-start;
                }
                
                .message-content {
                    padding: 12px 16px;
                    border-radius: 12px;
                    font-size: 14px;
                }
                
                .message.user .message-content {
                    background: var(--green);
                    color: white;
                }
                
                .message.agent .message-content {
                    background: var(--gray-50);
                    color: var(--text);
                }
                
                .message-time {
                    font-size: 12px;
                    color: var(--muted);
                    margin-top: 4px;
                }
                
                .quick-templates {
                    display: flex;
                    gap: 8px;
                    padding: 16px 20px;
                    border-top: 1px solid var(--border);
                }
                
                .template-btn {
                    padding: 8px 12px;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    background: var(--white);
                    color: var(--text);
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.2s ease;
                }
                
                .template-btn:hover {
                    background: var(--gray-50);
                    border-color: var(--green);
                }
                
                .chat-input {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 20px;
                    border-top: 1px solid var(--border);
                }
                
                .chat-input input {
                    flex: 1;
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    font-size: 14px;
                }
                
                /* System Check Styles */
                .system-check-container {
                    padding: 20px;
                }
                
                .system-check-container h3 {
                    margin: 0 0 24px 0;
                    color: var(--text);
                }
                
                .check-summary {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 24px;
                }
                
                .check-card {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                }
                
                .check-card.passed {
                    border-color: var(--green);
                }
                
                .check-card.warning {
                    border-color: #ff9800;
                }
                
                .check-card.error {
                    border-color: #f44336;
                }
                
                .check-card i {
                    font-size: 32px;
                    margin-bottom: 12px;
                }
                
                .check-card.passed i {
                    color: var(--green);
                }
                
                .check-card.warning i {
                    color: #ff9800;
                }
                
                .check-card.error i {
                    color: #f44336;
                }
                
                .check-card h4 {
                    margin: 0 0 8px 0;
                    color: var(--text);
                }
                
                .check-card p {
                    margin: 0 0 16px 0;
                    color: var(--muted);
                    font-size: 14px;
                }
                
                .check-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 500;
                }
                
                .check-card.passed .check-status {
                    color: var(--green);
                }
                
                .check-card.warning .check-status {
                    color: #ff9800;
                }
                
                .check-card.error .check-status {
                    color: #f44336;
                }
                
                /* FAQ Styles */
                .faq-container {
                    padding: 20px;
                }
                
                .faq-search {
                    margin-bottom: 24px;
                }
                
                .search-box {
                    position: relative;
                    margin-bottom: 16px;
                }
                
                .search-box i {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--muted);
                }
                
                .search-box input {
                    width: 100%;
                    padding: 12px 12px 12px 40px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    font-size: 14px;
                }
                
                .faq-tags {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                
                .tag-btn {
                    padding: 8px 16px;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    background: var(--white);
                    color: var(--text);
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s ease;
                }
                
                .tag-btn.active,
                .tag-btn:hover {
                    background: var(--green);
                    color: white;
                    border-color: var(--green);
                }
                
                .faq-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .faq-item {
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .faq-question {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px;
                    background: var(--white);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .faq-question:hover {
                    background: var(--gray-50);
                }
                
                .faq-question i {
                    transition: transform 0.2s ease;
                }
                
                .faq-item.active .faq-question i {
                    transform: rotate(180deg);
                }
                
                .faq-answer {
                    padding: 0 16px;
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .faq-item.active .faq-answer {
                    padding: 16px;
                    max-height: 500px;
                }
                
                .faq-answer ol {
                    margin: 0 0 16px 0;
                    padding-left: 20px;
                }
                
                .faq-answer li {
                    margin-bottom: 8px;
                    color: var(--text);
                }
                
                .faq-link {
                    color: var(--green);
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .faq-link:hover {
                    text-decoration: underline;
                }
                
                /* Downloads Styles */
                .downloads-container {
                    padding: 20px;
                }
                
                .downloads-container h3 {
                    margin: 0 0 24px 0;
                    color: var(--text);
                }
                
                .download-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                }
                
                .download-card {
                    background: var(--white);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                
                .download-icon {
                    width: 60px;
                    height: 60px;
                    background: var(--green);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                }
                
                .download-info {
                    flex: 1;
                }
                
                .download-info h4 {
                    margin: 0 0 8px 0;
                    color: var(--text);
                }
                
                .download-info p {
                    margin: 0 0 4px 0;
                    color: var(--muted);
                    font-size: 14px;
                }
                
                .download-actions {
                    display: flex;
                    gap: 8px;
                }
                
                /* Ticket System Styles */
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
                
                .file-upload-area:hover {
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
                
                /* Checkbox and Radio Styling */
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
                }
            `;
            document.head.appendChild(style);
        }
    }

    initUzaktanYardimFunctionality() {
        // Initialize ticket form functionality
        this.initTicketFormFunctionality();
        
        // Initialize file upload functionality
        this.initFileUploadFunctionality();
        
        // Initialize character counter
        this.initCharacterCounter();
        
        console.log('Ticket system functionality initialized');
    }

    initTicketFormFunctionality() {
        const form = document.getElementById('ticketForm');
        if (!form) return;

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTicketSubmission();
        });

        // Save draft functionality
        const saveDraftBtn = document.getElementById('saveDraft');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => {
                this.saveTicketDraft();
            });
        }

        // Priority change handler
        const prioritySelect = document.getElementById('ticketPriority');
        if (prioritySelect) {
            prioritySelect.addEventListener('change', (e) => {
                this.updatePriorityIndicator(e.target.value);
            });
        }

        console.log('Ticket form functionality initialized');
    }

    initFileUploadFunctionality() {
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('ticketFiles');
        const fileList = document.getElementById('fileList');

        if (!fileUploadArea || !fileInput || !fileList) return;

        // Click to select files
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop functionality
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'var(--green)';
            fileUploadArea.style.background = 'var(--gray-50)';
        });

        fileUploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'var(--border)';
            fileUploadArea.style.background = 'var(--white)';
        });

        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'var(--border)';
            fileUploadArea.style.background = 'var(--white)';
            
            const files = e.dataTransfer.files;
            this.handleFileSelection(files);
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFileSelection(e.target.files);
        });

        console.log('File upload functionality initialized');
    }

    initCharacterCounter() {
        const descriptionTextarea = document.getElementById('ticketDescription');
        const charCount = document.getElementById('charCount');

        if (!descriptionTextarea || !charCount) return;

        descriptionTextarea.addEventListener('input', (e) => {
            const count = e.target.value.length;
            charCount.textContent = count;
            
            // Update counter color based on length
            if (count > 1800) {
                charCount.style.color = '#f44336';
            } else if (count > 1500) {
                charCount.style.color = '#ff9800';
            } else {
                charCount.style.color = 'var(--muted)';
            }
        });

        console.log('Character counter initialized');
    }

    handleFileSelection(files) {
        const fileList = document.getElementById('fileList');
        if (!fileList) return;

        // Clear existing list
        fileList.innerHTML = '';

        Array.from(files).forEach((file, index) => {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                this.showNotification('Dosya boyutu 10MB\'dan büyük olamaz: ' + file.name, 'error');
                return;
            }

            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fa-solid fa-file"></i>
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${this.formatFileSize(file.size)}</span>
                </div>
                <button class="remove-file" data-index="${index}">
                    <i class="fa-solid fa-times"></i>
                </button>
            `;

            // Remove file functionality
            const removeBtn = fileItem.querySelector('.remove-file');
            removeBtn.addEventListener('click', () => {
                this.removeFile(index);
            });

            fileList.appendChild(fileItem);
        });

        console.log(`${files.length} dosya seçildi`);
    }

    removeFile(index) {
        const fileInput = document.getElementById('ticketFiles');
        const fileList = document.getElementById('fileList');

        if (!fileInput || !fileList) return;

        // Create new FileList without the removed file
        const dt = new DataTransfer();
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            if (i !== index) {
                dt.items.add(files[i]);
            }
        }

        fileInput.files = dt.files;
        this.handleFileSelection(fileInput.files);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    updatePriorityIndicator(priority) {
        // Update any priority-related UI elements
        console.log('Priority updated to:', priority);
    }

    saveTicketDraft() {
        const formData = this.getFormData();
        localStorage.setItem('ticketDraft', JSON.stringify(formData));
        this.showNotification('Taslak kaydedildi', 'success');
        console.log('Ticket draft saved');
    }

    handleTicketSubmission() {
        const formData = this.getFormData();
        
        // Validate form
        if (!this.validateTicketForm(formData)) {
            return;
        }

        // Show loading state
        this.showLoadingState(true);

        // Simulate API call
        setTimeout(() => {
            this.showLoadingState(false);
            this.showTicketSuccess(formData);
        }, 2000);

        console.log('Ticket submitted:', formData);
    }

    getFormData() {
        const form = document.getElementById('ticketForm');
        if (!form) return {};

        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add additional form data
        data.subject = document.getElementById('ticketSubject')?.value || '';
        data.priority = document.getElementById('ticketPriority')?.value || '';
        data.description = document.getElementById('ticketDescription')?.value || '';
        data.category = document.getElementById('ticketCategory')?.value || '';
        data.company = document.getElementById('ticketCompany')?.value || '';
        data.name = document.getElementById('ticketName')?.value || '';
        data.email = document.getElementById('ticketEmail')?.value || '';
        data.phone = document.getElementById('ticketPhone')?.value || '';
        data.notes = document.getElementById('ticketNotes')?.value || '';
        data.contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || '';
        data.kvkk = document.getElementById('ticketKVKK')?.checked || false;
        data.notifications = document.getElementById('ticketNotification')?.checked || false;

        return data;
    }

    validateTicketForm(data) {
        const requiredFields = ['subject', 'priority', 'description', 'category', 'name', 'email'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showNotification(`Lütfen ${this.getFieldLabel(field)} alanını doldurun`, 'error');
                return false;
            }
        }

        if (!data.kvkk) {
            this.showNotification('KVKK şartlarını kabul etmelisiniz', 'error');
            return false;
        }

        return true;
    }

    getFieldLabel(field) {
        const labels = {
            subject: 'konu',
            priority: 'öncelik',
            description: 'açıklama',
            category: 'kategori',
            name: 'ad soyad',
            email: 'e-posta'
        };
        return labels[field] || field;
    }

    showLoadingState(show) {
        const submitBtn = document.getElementById('submitTicket');
        if (!submitBtn) return;

        if (show) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Talebi Gönder';
        }
    }

    showTicketSuccess(data) {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'ticket-success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fa-solid fa-check-circle"></i>
                </div>
                <h3>Talep Başarıyla Gönderildi!</h3>
                <p>Destek talebiniz alınmıştır. En kısa sürede size dönüş yapılacaktır.</p>
                <div class="ticket-details">
                    <div class="detail-item">
                        <strong>Talep No:</strong> TK-${Date.now().toString().slice(-6)}
                    </div>
                    <div class="detail-item">
                        <strong>Konu:</strong> ${data.subject}
                    </div>
                    <div class="detail-item">
                        <strong>Öncelik:</strong> ${this.getPriorityLabel(data.priority)}
                    </div>
                </div>
                <button class="btn btn-primary" onclick="this.closest('.ticket-success-modal').remove()">
                    Tamam
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        if (!document.getElementById('ticket-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'ticket-modal-styles';
            style.textContent = `
                .ticket-success-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background: white;
                    padding: 32px;
                    border-radius: 12px;
                    text-align: center;
                    max-width: 500px;
                    width: 90%;
                }
                
                .success-icon {
                    font-size: 64px;
                    color: var(--green);
                    margin-bottom: 24px;
                }
                
                .ticket-details {
                    background: var(--gray-50);
                    padding: 20px;
                    border-radius: 8px;
                    margin: 24px 0;
                    text-align: left;
                }
                
                .detail-item {
                    margin-bottom: 8px;
                }
                
                .detail-item:last-child {
                    margin-bottom: 0;
                }
            `;
            document.head.appendChild(style);
        }

        // Clear form
        document.getElementById('ticketForm').reset();
        document.getElementById('charCount').textContent = '0';
        document.getElementById('fileList').innerHTML = '';
    }

    getPriorityLabel(priority) {
        const labels = {
            low: 'Düşük',
            medium: 'Orta',
            high: 'Yüksek',
            urgent: 'Acil'
        };
        return labels[priority] || priority;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fa-solid fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fa-solid fa-times"></i>
            </button>
        `;

        // Add notification styles
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 16px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    z-index: 1001;
                    animation: slideIn 0.3s ease;
                }
                
                .notification.success {
                    border-left: 4px solid var(--green);
                }
                
                .notification.error {
                    border-left: 4px solid #f44336;
                }
                
                .notification.info {
                    border-left: 4px solid #2196f3;
                }
                
                .notification i {
                    font-size: 18px;
                }
                
                .notification.success i {
                    color: var(--green);
                }
                
                .notification.error i {
                    color: #f44336;
                }
                
                .notification.info i {
                    color: #2196f3;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--muted);
                    padding: 4px;
                    margin-left: auto;
                }
                
                .notification-close:hover {
                    color: var(--text);
                }
                
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

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}
