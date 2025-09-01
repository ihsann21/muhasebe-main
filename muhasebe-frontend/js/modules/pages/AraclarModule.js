// Araclar Module
export class AraclarModule {
    constructor() {
        this.name = 'Araclar';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Araç/İş Makinası Listesi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Araç/İş Makinası Listesi</h2>
                    <div class="header-actions">
                        <button class="btn btn-success">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-trash"></i>
                            Sil
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-file-excel"></i>
                            Excel Aktar
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-info-circle"></i>
                            Detay
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-print"></i>
                            Yazdır
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-main araclar-main">
                    <!-- Data Table -->
                    <div class="araclar-table-container">
                        <table class="data-table araclar-table">
                            <thead>
                                <tr>
                                    <th>Plaka</th>
                                    <th>C/H Bağlantısı</th>
                                    <th>Kullanıldığı Şantiye</th>
                                    <th>Şoförü</th>
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
                                    <td><span class="status-badge status-aktif">AKTİF</span></td>
                                </tr>
                                <tr>
                                    <td>34 ABC 123</td>
                                    <td>CH-001</td>
                                    <td>LONİCERA OTEL</td>
                                    <td>MEHMET DEMİR</td>
                                    <td>FORD</td>
                                    <td>TRANSIT</td>
                                    <td>WDF123456789</td>
                                    <td>ENG987654321</td>
                                    <td>Dizel</td>
                                    <td><span class="status-badge status-aktif">AKTİF</span></td>
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
                                    <td><span class="status-badge status-bakimda">BAKIMDA</span></td>
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
                                    <td><span class="status-badge status-pasif">PASİF</span></td>
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
                                    <td><span class="status-badge status-aktif">AKTİF</span></td>
                                </tr>
                                <tr>
                                    <td>34 JKL 012</td>
                                    <td>-</td>
                                    <td>LONİCERA OTEL</td>
                                    <td>CAN YILDIZ</td>
                                    <td>MERCEDES</td>
                                    <td>SPRINTER</td>
                                    <td>MER456012789</td>
                                    <td>ENG012789456</td>
                                    <td>Dizel</td>
                                    <td><span class="status-badge status-aktif">AKTİF</span></td>
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
                                    <td><span class="status-badge status-bakimda">BAKIMDA</span></td>
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
                                    <td><span class="status-badge status-aktif">AKTİF</span></td>
                                </tr>
                            </tbody>
                        </table>
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
        this.addStyles();
    }

    addStyles() {
        const existingStyles = document.getElementById('araclar-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'araclar-styles';
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
            
            .btn-info {
                background-color: #2e7d32 !important;
                color: white !important;
            }
            
            .btn-success:hover {
                background-color: #1b5e20 !important;
                transform: translateY(-1px);
            }
            
            .btn-info:hover {
                background-color: #1b5e20 !important;
                transform: translateY(-1px);
            }
            
            /* Main content styling */
            .araclar-main {
                padding: 15px;
            }
            
            /* Table styling */
            .araclar-table-container {
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                overflow-x: auto;
            }
            
            .araclar-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                min-width: 1200px;
            }
            
            .araclar-table th {
                background: #e9ecef;
                padding: 10px 8px;
                text-align: center;
                border: 1px solid #dee2e6;
                font-weight: 600;
                white-space: nowrap;
                font-size: 11px;
            }
            
            .araclar-table td {
                padding: 8px 6px;
                border: 1px solid #dee2e6;
                text-align: center;
                white-space: nowrap;
                font-size: 11px;
            }
            
            .araclar-table tbody tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .araclar-table tbody tr:hover {
                background: #e3f2fd;
            }
            
            /* Status badges */
            .status-badge {
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .status-aktif {
                background: #d4edda;
                color: #155724;
            }
            
            .status-bakimda {
                background: #fff3cd;
                color: #856404;
            }
            
            .status-pasif {
                background: #f8d7da;
                color: #721c24;
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
