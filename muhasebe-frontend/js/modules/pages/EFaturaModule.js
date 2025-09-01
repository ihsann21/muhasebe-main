// E-Fatura Module
export class EFaturaModule {
    constructor() {
        this.name = 'E-Fatura';
        this.currentTab = 'gonderme';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'E-Fatura Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>E-Fatura Yönetimi</h2>
                    <div class="header-actions">
                        <button class="btn btn-success">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-main efatura-main">
                    <!-- Tab Navigation -->
                    <div class="efatura-tabs">
                        <button class="tab-btn active" data-tab="gonderme">
                            <i class="fas fa-paper-plane"></i>
                            Gönderme İşlemi
                        </button>
                        <button class="tab-btn" data-tab="gonderilenler">
                            <i class="fas fa-check-circle"></i>
                            Gönderilenler
                        </button>
                        <button class="tab-btn" data-tab="gelenler">
                            <i class="fas fa-inbox"></i>
                            Gelen Faturalar
                        </button>
                    </div>

                    <!-- Tab Contents -->
                    <div class="tab-content-container">
                        <!-- Gönderme İşlemi Tab -->
                        <div class="tab-content active" id="gonderme-content">
                            <div class="efatura-actions">
                                <button class="btn btn-success btn-action">Gönder</button>
                                <button class="btn btn-outline btn-action">Fatura Önizleme</button>
                                <button class="btn btn-outline btn-action">Fişini Aç</button>
                            </div>
                            
                            <div class="efatura-table-container">
                                <table class="data-table efatura-table">
                                    <thead>
                                        <tr>
                                            <th>Ref ID</th>
                                            <th>Fatura No</th>
                                            <th>Tipi</th>
                                            <th>Tarih</th>
                                            <th>Hesap Tanımı</th>
                                            <th>Açıklama</th>
                                            <th>Tutar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
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
                                    </tbody>
                                </table>
                                <div class="table-summary">
                                    <span class="summary-count">0</span>
                                </div>
                            </div>
                        </div>

                        <!-- Gönderilenler Tab -->
                        <div class="tab-content" id="gonderilenler-content">
                            <div class="filter-section">
                                <div class="filter-row">
                                    <div class="filter-group">
                                        <label>TARİH ARALIĞI:</label>
                                        <div class="date-range">
                                            <input type="text" class="filter-input" value="01.07.2018">
                                            <span>-</span>
                                            <input type="text" class="filter-input" value="31.07.2018">
                                        </div>
                                    </div>
                                    <div class="filter-actions">
                                        <button class="btn btn-dark">Faturaları Göster</button>
                                        <button class="btn btn-purple">Durum Sorgula</button>
                                        <button class="btn btn-orange">Fişini Aç</button>
                                        <button class="btn btn-success">Tekrar Gönder</button>
                                        <button class="btn btn-outline">Fatura Önizleme</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="efatura-table-container">
                                <table class="data-table efatura-table">
                                    <thead>
                                        <tr>
                                            <th>Ref ID</th>
                                            <th>Fatura No</th>
                                            <th>Durumu</th>
                                            <th>UUID</th>
                                            <th>Tipi</th>
                                            <th>Tarih</th>
                                            <th>Hesap Tanımı</th>
                                            <th>Açıklama</th>
                                            <th>Tutar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>REF001</td>
                                            <td>FAT-2024-001</td>
                                            <td><span class="status-badge status-gonderildi">Gönderildi</span></td>
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
                                            <td><span class="status-badge status-beklemede">Beklemede</span></td>
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
                                            <td><span class="status-badge status-gonderildi">Gönderildi</span></td>
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
                                            <td><span class="status-badge status-hata">Hata</span></td>
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
                                            <td><span class="status-badge status-gonderildi">Gönderildi</span></td>
                                            <td>550e8400-e29b-41d4-a716-446655440005</td>
                                            <td>Satış</td>
                                            <td>28.01.2024</td>
                                            <td>JKL İnşaat Malzemeleri</td>
                                            <td>Proje D - Demir teslimi</td>
                                            <td>12,800.00 ₺</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="table-summary">
                                    <span class="summary-count">0</span>
                                </div>
                            </div>
                        </div>

                        <!-- Gelen Faturalar Tab -->
                        <div class="tab-content" id="gelenler-content">
                            <div class="filter-section">
                                <div class="filter-row">
                                    <div class="filter-group">
                                        <label>TARİH ARALIĞI:</label>
                                        <div class="date-range">
                                            <input type="text" class="filter-input" value="01.07.2018">
                                            <span>-</span>
                                            <input type="text" class="filter-input" value="31.07.2018">
                                        </div>
                                    </div>
                                    <div class="filter-group">
                                        <label>FATURA DURUMU:</label>
                                        <select class="filter-select">
                                            <option value="onaylanan">Onaylanan</option>
                                            <option value="red">Red</option>
                                            <option value="beklemede">Beklemede</option>
                                        </select>
                                    </div>
                                    <div class="filter-actions">
                                        <button class="btn btn-success">Faturaları Al</button>
                                        <button class="btn btn-outline">Detay</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="efatura-table-container">
                                <table class="data-table efatura-table">
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
                                    </tbody>
                                </table>
                                <div class="table-summary">
                                    <span class="summary-count">0</span>
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
        this.initTabs();
        this.addStyles();
    }

    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding tab content
                const tabType = button.dataset.tab;
                const targetContent = document.getElementById(`${tabType}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                this.currentTab = tabType;
                console.log(`Switched to ${tabType} tab`);
            });
        });
    }

    addStyles() {
        const existingStyles = document.getElementById('efatura-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'efatura-styles';
        style.textContent = `
            /* Header buttons styling */
            .header-actions .btn {
                margin-left: 4px;
                font-size: 13px;
                padding: 8px 16px;
                border-radius: 4px;
                border: none;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            .btn-success {
                background-color: #2e7d32 !important;
                color: white !important;
            }
            
            .btn-success:hover {
                background-color: #1b5e20 !important;
                transform: translateY(-1px);
            }
            
            /* Main content styling */
            .efatura-main {
                padding: 15px;
            }
            
            /* Tab styling */
            .efatura-tabs {
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
                font-size: 13px;
            }
            
            .tab-btn:hover {
                background: #e9ecef;
            }
            
            .tab-btn.active {
                background: #28a745;
                color: white;
            }
            
            /* Tab content */
            .tab-content-container {
                position: relative;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
            }
            
            /* Filter section */
            .filter-section {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border: 1px solid #dee2e6;
            }
            
            .filter-row {
                display: flex;
                gap: 20px;
                align-items: flex-end;
                flex-wrap: wrap;
            }
            
            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .filter-group label {
                font-weight: 600;
                color: #495057;
                font-size: 12px;
            }
            
            .date-range {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .filter-input {
                padding: 6px 10px;
                border: 1px solid #ced4da;
                border-radius: 3px;
                font-size: 13px;
                width: 120px;
            }
            
            .filter-select {
                padding: 6px 10px;
                border: 1px solid #ced4da;
                border-radius: 3px;
                font-size: 13px;
                min-width: 150px;
            }
            
            .filter-actions {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .filter-actions .btn {
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            /* Action buttons */
            .efatura-actions {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 5px;
                border: 1px solid #dee2e6;
            }
            
            .btn-action {
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            .btn-dark {
                background-color: #343a40;
                color: white;
                border: none;
            }
            
            .btn-purple {
                background-color: #6f42c1;
                color: white;
                border: none;
            }
            
            .btn-orange {
                background-color: #fd7e14;
                color: white;
                border: none;
            }
            
            .btn-outline {
                background-color: white;
                color: #495057;
                border: 1px solid #ced4da;
            }
            
            .btn-outline:hover {
                background-color: #f8f9fa;
            }
            
            /* Table styling */
            .efatura-table-container {
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                overflow-x: auto;
            }
            
            .efatura-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 11px;
                min-width: 1000px;
            }
            
            .efatura-table th {
                background: #e9ecef;
                padding: 8px 6px;
                text-align: center;
                border: 1px solid #dee2e6;
                font-weight: 600;
                white-space: nowrap;
                font-size: 10px;
            }
            
            .efatura-table td {
                padding: 6px 4px;
                border: 1px solid #dee2e6;
                text-align: center;
                white-space: nowrap;
                font-size: 10px;
            }
            
            .efatura-table tbody tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .efatura-table tbody tr:hover {
                background: #e3f2fd;
            }
            
            /* Status badges */
            .status-badge {
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 9px;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .status-gonderildi {
                background: #d4edda;
                color: #155724;
            }
            
            .status-beklemede {
                background: #fff3cd;
                color: #856404;
            }
            
            .status-hata {
                background: #f8d7da;
                color: #721c24;
            }
            
            /* Table summary */
            .table-summary {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 15px;
                background: #f8f9fa;
                border-top: 1px solid #dee2e6;
                font-weight: 600;
            }
            
            .summary-count {
                color: #495057;
            }
            
            /* Content header styling */
            .content-header {
                padding: 10px 15px;
                border-bottom: 1px solid #dee2e6;
                background: white;
            }
            
            .content-header h2 {
                font-size: 16px;
                margin: 0;
                color: #495057;
            }
            
            .header-actions {
                display: flex;
                gap: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}
