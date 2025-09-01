// Tedarikci Module
export class TedarikciModule {
    constructor() {
        this.name = 'Tedarikci';
    }

    show() {
        // Hide welcome screen
        this.hideWelcomeScreen();
        
        // Update page title
        document.title = 'Tedarikçi Tanımları - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        // Update module container
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Tedarikçi Tanımları</h2>
                    <div class="header-actions">
                        <button class="btn btn-success">
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
                            Excel'e Aktar
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
                                <i class="fa-solid fa-file-contract"></i>
                                <span>Hakediş Faturası Ekle</span>
                            </a>
                            <a href="#" class="sidebar-item" data-action="satis-faturasi">
                                <i class="fa-solid fa-receipt"></i>
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
                                        <th>Banka</th>
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
        this.initTableInteractions();
        this.initHeaderButtons();
    }

    initTableInteractions() {
        const table = document.getElementById('tedarikciTable');
        if (!table) return;

        const cells = table.querySelectorAll('td[contenteditable]');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                cells.forEach(c => c.classList.remove('selected'));
                cell.classList.add('selected');
            });
        });
    }

    initHeaderButtons() {
        const buttons = document.querySelectorAll('.header-actions .btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const text = button.textContent.trim();
                this.showStatusMessage(`${text} işlemi başlatıldı`, 'info');
            });
        });
    }

    showStatusMessage(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        // Notification implementation here
    }
}
