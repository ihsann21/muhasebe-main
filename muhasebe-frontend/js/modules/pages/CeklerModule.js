// Cekler Module
export class CeklerModule {
    constructor() {
        this.name = 'Cekler';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Çek Listesi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Çek Listesi</h2>
                    <div class="header-actions">
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excel Aktar
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
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

                <div class="content-main">
                    <!-- Tab Navigation -->
                    <div class="cek-tabs">
                        <button class="tab-btn" data-tab="gelen-cekler">
                            <i class="fas fa-arrow-down"></i> Gelen Çekler
                        </button>
                        <button class="tab-btn" data-tab="firma-cekleri">
                            <i class="fas fa-building"></i> Firma Çekleri
                        </button>
                        <button class="tab-btn active" data-tab="cek-hareketleri">
                            <i class="fas fa-exchange-alt"></i> Çek Ödeme/Tahsilat Hareketleri
                        </button>
                    </div>

                    <!-- Filter Section -->
                    <div class="filter-section cek-filters">
                        <div class="filter-row">
                            <div class="filter-group">
                                <label>VADE TARİH ARALIĞI:</label>
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
                        
                        <!-- Gelen Çekler Tablosu -->
                        <div class="tab-content" id="gelen-cekler-content" style="display: none;">
                            <table class="data-table cek-table">
                                <thead>
                                    <tr>
                                        <th>Çek No</th>
                                        <th>Çek Tarihi</th>
                                        <th>Vade Tarihi</th>
                                        <th>Banka</th>
                                        <th>Şube</th>
                                        <th>Hesap No</th>
                                        <th>Müşteri</th>
                                        <th>Tutar</th>
                                        <th>Döviz</th>
                                        <th>Kur</th>
                                        <th>Durum</th>
                                        <th>Açıklama</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1234567</td>
                                        <td>01.01.2025</td>
                                        <td>15.01.2025</td>
                                        <td>Ziraat Bankası</td>
                                        <td>Merkez Şube</td>
                                        <td>123456789</td>
                                        <td>ABC İnşaat Ltd.</td>
                                        <td>25,000.00</td>
                                        <td>TL</td>
                                        <td>1.00</td>
                                        <td>Portföyde</td>
                                        <td>Hakediş ödemesi</td>
                                    </tr>
                                    <tr>
                                        <td>2345678</td>
                                        <td>03.01.2025</td>
                                        <td>20.01.2025</td>
                                        <td>Garanti BBVA</td>
                                        <td>Kadıköy Şube</td>
                                        <td>987654321</td>
                                        <td>XYZ Yapı A.Ş.</td>
                                        <td>15,500.00</td>
                                        <td>TL</td>
                                        <td>1.00</td>
                                        <td>Tahsil Edildi</td>
                                        <td>Malzeme bedeli</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Firma Çekleri Tablosu -->
                        <div class="tab-content" id="firma-cekleri-content" style="display: none;">
                            <table class="data-table cek-table">
                                <thead>
                                    <tr>
                                        <th>Çek No</th>
                                        <th>Çek Tarihi</th>
                                        <th>Vade Tarihi</th>
                                        <th>Banka</th>
                                        <th>Şube</th>
                                        <th>Alıcı</th>
                                        <th>Tutar</th>
                                        <th>Döviz</th>
                                        <th>Kur</th>
                                        <th>Durum</th>
                                        <th>Proje</th>
                                        <th>Açıklama</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>F001234</td>
                                        <td>02.01.2025</td>
                                        <td>17.01.2025</td>
                                        <td>İş Bankası</td>
                                        <td>Ataşehir Şube</td>
                                        <td>DEF Tedarik Ltd.</td>
                                        <td>12,000.00</td>
                                        <td>TL</td>
                                        <td>1.00</td>
                                        <td>Ödendi</td>
                                        <td>Villa Projesi</td>
                                        <td>İnşaat malzemesi</td>
                                    </tr>
                                    <tr>
                                        <td>F001235</td>
                                        <td>04.01.2025</td>
                                        <td>25.01.2025</td>
                                        <td>Akbank</td>
                                        <td>Bostancı Şube</td>
                                        <td>GHI Mühendislik</td>
                                        <td>8,750.00</td>
                                        <td>TL</td>
                                        <td>1.00</td>
                                        <td>Beklemede</td>
                                        <td>Ofis Projesi</td>
                                        <td>Mühendislik hizmeti</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Çek Ödeme/Tahsilat Hareketleri Tablosu -->
                        <div class="tab-content" id="cek-hareketleri-content" style="display: block;">
                            <table class="data-table cek-table">
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
                        </div>
                        
                        <!-- Pagination -->
                        <div class="pagination-bar">
                            <span class="record-count" id="recordCount">2</span>
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
        this.initTabs();
        this.addStyles();
    }

    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        const recordCount = document.getElementById('recordCount');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show selected tab content and update record count
                const tabType = button.dataset.tab;
                const targetContent = document.getElementById(`${tabType}-content`);
                
                if (targetContent) {
                    targetContent.style.display = 'block';
                    
                    // Update record count based on tab
                    const rows = targetContent.querySelectorAll('tbody tr');
                    if (recordCount) {
                        recordCount.textContent = rows.length;
                    }
                }
                
                console.log(`Switched to ${tabType} tab`);
            });
        });
    }

    addStyles() {
        const existingStyles = document.getElementById('cekler-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'cekler-styles';
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
                color: #495057;
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
                border: 1px solid #dee2e6;
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
        `;
        document.head.appendChild(style);
    }
}
