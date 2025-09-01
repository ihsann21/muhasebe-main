// Evrak Module
export class EvrakModule {
    constructor() {
        this.name = 'Evrak';
        this.currentView = 'simple'; // 'simple' or 'detailed'
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Evrak Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            this.showSimpleView();
            this.initFunctionality();
        }
    }

    showSimpleView() {
        const moduleContainer = document.getElementById('moduleViewContainer');
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2><i class="fa-solid fa-file-text"></i> Evrak Yönetimi</h2>
                    <div class="header-actions">
                    <button class="btn btn-success" id="newEvrakBtn">
                            <i class="fa-solid fa-plus"></i>
                            Yeni Evrak
                        </button>
                    <button class="btn btn-success" id="refreshBtn">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                    <button class="btn btn-success" id="editBtn">
                        <i class="fa-solid fa-edit"></i>
                        Düzenle
                        </button>
                    </div>
                </div>

                <div class="content-body">
                <div class="evrak-simple-view">
                    <div class="search-section">
                            <div class="search-box">
                                <i class="fa-solid fa-search"></i>
                                <input type="text" placeholder="Evrak ara..." />
                            </div>
                        </div>

                    <div class="evrak-table-container">
                                                <table class="data-table evrak-table">
                                <thead>
                                    <tr>
                                        <th>Evrak No</th>
                                        <th>Tarih</th>
                                        <th>Tür</th>
                                    <th>Şantiye</th>
                                    <th>İlgili Kişi</th>
                                        <th>Açıklama</th>
                                        <th>Tutar</th>
                                        <th>Durum</th>
                                    <th>Evrak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>EVR-001</td>
                                        <td>15.01.2024</td>
                                        <td>Fatura</td>
                                    <td>Örnek Proje</td>
                                    <td>Ahmet Yılmaz</td>
                                        <td>Malzeme alımı</td>
                                        <td>25.000,00 ₺</td>
                                    <td><span class="status-badge status-success">ONAYLANDI</span></td>
                                    <td>
                                        <button class="btn btn-download" onclick="downloadEvrak('EVR-001')">
                                            <i class="fa-solid fa-download"></i>
                                            İndir
                                        </button>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
    }

    showDetailedView() {
        const moduleContainer = document.getElementById('moduleViewContainer');
        moduleContainer.innerHTML = `
            <div class="evrak-detailed-view">
                <!-- Back Button -->
                <div class="back-button-container">
                    <button class="btn btn-back" id="backToSimpleBtn">
                        <i class="fa-solid fa-arrow-left"></i>
                        Geri
                    </button>
                </div>
                
                <!-- Filter Section -->
                <div class="evrak-filters">
                    <div class="filter-row">
                        <div class="filter-group">
                            <label>TARİH ARALIĞI:</label>
                            <div class="date-range">
                                <input type="text" class="filter-input" value="01.01.2025">
                                <span>-</span>
                                <input type="text" class="filter-input" value="31.12.2025">
                            </div>
                        </div>
                        
                        <div class="filter-group">
                            <label>İŞLEM TARİHİNE GÖRE:</label>
                            <select class="filter-select">
                                <option>İşlem Tarihi</option>
                            </select>
                        </div>
                        
                        <div class="filter-group radio-group">
                            <label class="radio-label">
                                <input type="radio" name="evrakFilter" value="son" checked>
                                <span>SON EKLENEN</span>
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="evrakFilter" value="tum">
                                <span>TÜM EVRAKLAR</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="filter-row">
                        <div class="filter-group">
                            <label>EVRAK KAYNAKLARI:</label>
                            <div class="checkbox-grid">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>EVRAKLARDAN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>HAREKETLERDEN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>TEKLİFLERDEN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>ARAÇLARDAN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>YAPŞATDAN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>İLERLEMEDEN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>ŞANTİYE DEFTERİNDEN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>HESAP TANIMLARINDAN</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>SADECE SORUMLU OLDUĞUM</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>SADECE EKLEDİKLERİM</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Data Table -->
                <div class="evrak-table-detailed">
                    <table class="data-table detailed-evrak-table">
                        <thead>
                            <tr>
                                <th>REF</th>
                                <th>TİPİ</th>
                                <th>EVRAK NO</th>
                                <th>ŞANTİYE</th>
                                <th>H.TİPİ</th>
                                <th>HESAP TANIMI</th>
                                <th>EKLEYEN</th>
                                <th>EVRAK TARİHİ</th>
                                <th>İŞLEM TARİHİ</th>
                                <th>CİNSİ</th>
                                <th>İLGİLİ KİŞİ</th>
                                <th>KONUSU</th>
                                <th>HAZIRLAYAN</th>
                                <th>EVRAK</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><span class="type-badge type-gelen">GELEN</span></td>
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
                                <td>
                                    <button class="btn btn-download-small" onclick="downloadEvrak('EVR-0001')">
                                        <i class="fa-solid fa-download"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><span class="type-badge type-giden">GİDEN</span></td>
                                <td>EVR-0002</td>
                                <td>LONİCERA OTEL</td>
                                <td>Fatura</td>
                                <td>ABC İNŞAAT LTD. ŞTİ.</td>
                                <td>Ana Kullanıcı</td>
                                <td>16.01.2025</td>
                                <td>16.01.2025</td>
                                <td>Fatura</td>
                                <td>Mehmet Demir</td>
                                <td>BETON MALZEME FATURASI</td>
                                <td>Muhasebe</td>
                                <td>
                                    <button class="btn btn-download-small" onclick="downloadEvrak('EVR-0002')">
                                        <i class="fa-solid fa-download"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><span class="type-badge type-gelen">GELEN</span></td>
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
                                <td>
                                    <button class="btn btn-download-small" onclick="downloadEvrak('EVR-0003')">
                                        <i class="fa-solid fa-download"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><span class="type-badge type-giden">GİDEN</span></td>
                                <td>EVR-0004</td>
                                <td>LONİCERA OTEL</td>
                                <td>Teklif</td>
                                <td>DEF YAPI MALZEMELERİ</td>
                                <td>Ana Kullanıcı</td>
                                <td>18.01.2025</td>
                                <td>18.01.2025</td>
                                <td>Teklif</td>
                                <td>Ali Özkan</td>
                                <td>ÇİMENTO TEDARİK TEKLİFİ</td>
                                <td>Satın Alma</td>
                                <td>
                                    <button class="btn btn-download-small" onclick="downloadEvrak('EVR-0004')">
                                        <i class="fa-solid fa-download"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><span class="type-badge type-gelen">GELEN</span></td>
                                <td>EVR-0005</td>
                                <td>PROJE 2</td>
                                <td>İrsaliye</td>
                                <td>GHİ NAKLİYAT</td>
                                <td>Ana Kullanıcı</td>
                                <td>19.01.2025</td>
                                <td>19.01.2025</td>
                                <td>İrsaliye</td>
                                <td>Veli Şahin</td>
                                <td>DEMİR TAŞIMA İRSALİYESİ</td>
                                <td>Lojistik</td>
                                <td>
                                    <button class="btn btn-download-small" onclick="downloadEvrak('EVR-0005')">
                                        <i class="fa-solid fa-download"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    hideWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    initFunctionality() {
        this.addStyles();
        
        // Edit button functionality
        const editBtn = document.getElementById('editBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                if (this.currentView === 'simple') {
                    this.currentView = 'detailed';
                    this.showDetailedView();
                    this.initFunctionality();
                } else {
                    this.currentView = 'simple';
                    this.showSimpleView();
                    this.initFunctionality();
                }
            });
        }
        
        // Back button functionality
        const backBtn = document.getElementById('backToSimpleBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.currentView = 'simple';
                this.showSimpleView();
                this.initFunctionality();
            });
        }
    }

    addStyles() {
        const existingStyles = document.getElementById('evrak-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'evrak-styles';
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
            
            .btn-warning {
                background-color: #2e7d32  !important;
                color: white !important;
            }
            
            /* Simple view styling */
            .evrak-simple-view {
                padding: 20px;
            }
            
            .search-section {
                margin-bottom: 20px;
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
                color: #6c757d;
            }
            
            .search-box input {
                width: 100%;
                padding: 10px 10px 10px 40px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 14px;
            }
            
            .evrak-table-container {
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                overflow-x: auto;
            }
            
            .evrak-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .evrak-table th {
                background: #f8f9fa;
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #dee2e6;
                font-weight: 600;
            }
            
            .evrak-table td {
                padding: 12px;
                border-bottom: 1px solid #dee2e6;
            }
            
            .status-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
            }
            
            .status-success {
                background: #d4edda;
                color: #155724;
            }
            
            /* Detailed view styling */
            .evrak-detailed-view {
                padding: 15px;
            }
            
            .back-button-container {
                margin-bottom: 15px;
            }
            
            .btn-back {
                background-color: #155724;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                font-size: 13px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s ease;
            }
            
            .btn-back:hover {
                transform: translateX(-2px);
            }
            
            .evrak-filters {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                border: 1px solid #dee2e6;
            }
            
            .filter-row {
                display: flex;
                gap: 30px;
                align-items: flex-start;
                margin-bottom: 20px;
            }
            
            .filter-row:last-child {
                margin-bottom: 0;
            }
            
            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .filter-group label {
                font-weight: 600;
                color: #495057;
                font-size: 13px;
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
            
            .radio-group {
                flex-direction: row !important;
                gap: 15px !important;
            }
            
            .radio-label {
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: normal !important;
                cursor: pointer;
            }
            
            .checkbox-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 8px;
                max-width: 800px;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: normal !important;
                cursor: pointer;
                font-size: 12px;
            }
            
            .evrak-table-detailed {
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                overflow-x: auto;
            }
            
            .detailed-evrak-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 11px;
                min-width: 1200px;
            }
            
            .detailed-evrak-table th {
                background: #e9ecef;
                padding: 8px 6px;
                text-align: center;
                border: 1px solid #dee2e6;
                font-weight: 600;
                white-space: nowrap;
                font-size: 10px;
            }
            
            .detailed-evrak-table td {
                padding: 6px 4px;
                border: 1px solid #dee2e6;
                text-align: center;
                white-space: nowrap;
                font-size: 10px;
            }
            
            .detailed-evrak-table tbody tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .detailed-evrak-table tbody tr:hover {
                background: #e3f2fd;
            }
            
            .type-badge {
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 9px;
                font-weight: 600;
            }
            
            .type-gelen {
                background: #d4edda;
                color: #155724;
            }
            
            .type-giden {
                background: #cce7ff;
                color: #004085;
            }
            
            /* Download buttons */
            .btn-download {
                background-color: #17a2b8;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 5px;
                transition: all 0.2s ease;
            }
            
            .btn-download:hover {
                background-color: #138496;
                transform: translateY(-1px);
            }
            
            .btn-download-small {
                background-color: #17a2b8;
                color: white;
                border: none;
                padding: 4px 8px;
                border-radius: 3px;
                font-size: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                min-width: 25px;
                height: 25px;
            }
            
            .btn-download-small:hover {
                background-color: #138496;
                transform: scale(1.1);
            }
            
            .btn-download-small i {
                font-size: 9px;
            }
        `;
        document.head.appendChild(style);
        
        // Global download function
        window.downloadEvrak = function(evrakNo) {
            // Simulate download process
            console.log('Evrak indiriliyor:', evrakNo);
            
            // Create a temporary download link
            const link = document.createElement('a');
            link.href = '#'; // In real app, this would be the actual file URL
            link.download = evrakNo + '.pdf';
            
            // Show download notification
            alert('Evrak ' + evrakNo + ' indiriliyor...');
            
            // In a real application, you would make an API call here:
            // fetch('/api/evrak/download/' + evrakNo)
            //     .then(response => response.blob())
            //     .then(blob => {
            //         const url = window.URL.createObjectURL(blob);
            //         link.href = url;
            //         document.body.appendChild(link);
            //         link.click();
            //         document.body.removeChild(link);
            //         window.URL.revokeObjectURL(url);
            //     });
        };
    }
}
