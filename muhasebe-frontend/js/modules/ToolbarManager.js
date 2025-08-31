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
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.classList.add('hidden');
        }
    }

    setupEventListeners() {
        this.toolbarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
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
                } else if (label === 'E-Fatura') {
                    console.log('E-Fatura button clicked!');
                    this.showEFaturaModule();
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
        
        // Update main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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
        
        // Update main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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

    showEFaturaModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'E-Fatura Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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

    showYapSatModule() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Emlak Satışları - İnşaat Muhasebe PRO - NOA YAZILIM - Firma: DEMO İNŞAAT';
        
        // Update main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const months = [
                'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
            ];
            
            mainContent.innerHTML = `
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
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
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
        
        // Here you would typically make an API call to filter data
        // For now, just log the filter values
    }

}
