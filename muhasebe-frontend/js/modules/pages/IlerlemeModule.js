// Ilerleme Module
export class IlerlemeModule {
    constructor() {
        this.name = 'Ilerleme';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Şantiye İlerleme & Yaklaşık Maliyet Hareketleri - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Şantiye İlerleme & Yaklaşık Maliyet Hareketleri</h2>
                    <div class="header-actions">
                        <button class="btn btn-success">
                            <i class="fa-solid fa-plus"></i>
                            Yeni
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-edit"></i>
                            Düzelt
                        </button>
                        <button class="btn btn-danger">
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
                        <button class="btn btn-secondary">
                            <i class="fa-solid fa-times"></i>
                            Çıkış
                        </button>
                    </div>
                </div>

                <div class="content-main ilerleme-main">
                    <!-- Top Controls -->
                    <div class="ilerleme-controls">
                        <div class="control-left">
                            <div class="santiye-selector">
                                <label>İŞLEM ŞANTİYESİ:</label>
                                <select class="form-select">
                                    <option value="ornek-proje">ÖRNEK PROJE</option>
                                    <option value="villa-projesi">VİLLA PROJESİ</option>
                                    <option value="ofis-projesi">OFİS PROJESİ</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="control-center">
                            <button class="btn btn-outline-secondary">STOK KALMELERİNİ GİZLE</button>
                            <button class="btn btn-outline-secondary">TÜM HAREKETLER</button>
                            </div>
                        </div>
                        
                    <!-- Main Content Area -->
                    <div class="ilerleme-content">
                        <!-- Left Sidebar -->
                        <div class="ilerleme-sidebar">
                            <div class="mahal-section">
                                <h4>Mahal Bazlı</h4>
                                <div class="mahal-tree">
                                    <div class="tree-item expanded">
                                        <i class="fas fa-folder-open"></i>
                                        <span>Tümü</span>
                                    </div>
                                    <div class="tree-item active">
                                        <i class="fas fa-folder"></i>
                                        <span class="tree-label">A</span>
                                    </div>
                                    <div class="tree-item">
                                        <i class="fas fa-folder"></i>
                                        <span>B</span>
                            </div>
                            </div>
                        </div>
                    </div>

                        <!-- Right Content -->
                        <div class="ilerleme-main-content">
                            <div class="imalat-section">
                                <h4>İmalat Bilgileri</h4>
                                <div class="imalat-table-container">
                                    <table class="data-table imalat-table">
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
                                                <th>Birim</th>
                                                <th>T.İş Günü</th>
                                                <th>Birim Fiyat</th>
                                                <th>Toplam Tutar</th>
                                                <th>Döviz</th>
                                                <th>Y.G.İ.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                                <td>10001</td>
                                                <td>İNCE İŞLİ</td>
                                                <td>İÇ-DIŞ ÖRME DUVARLAR</td>
                                                <td>K#1</td>
                                                <td>D#1</td>
                                                <td></td>
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
                                                <td>İNCE İŞLİ</td>
                                                <td>İÇ KARA SIVA</td>
                                                <td>K#1</td>
                                                <td>D#1</td>
                                                <td></td>
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
                                                <td>İNCE İŞLİ</td>
                                                <td>MERMER DENİZLİK</td>
                                                <td>K#1</td>
                                                <td>D#2</td>
                                                <td></td>
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
                                                <td>İNCE İŞLİ</td>
                                                <td>ALÇI SIVA</td>
                                                <td>K#1</td>
                                                <td>D#2</td>
                                                <td></td>
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
                                                <td>İNCE İŞLİ</td>
                                                <td>ŞAP</td>
                                                <td>K#1</td>
                                                <td>D#3</td>
                                                <td></td>
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
                                                <td>İNCE İŞLİ</td>
                                                <td>CAM MONTAJI</td>
                                                <td>K#1</td>
                                                <td>D#4</td>
                                                <td></td>
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
                                            <tr class="total-row">
                                                <td colspan="9"><strong>TOPLAM</strong></td>
                                                <td><strong>72.000,00</strong></td>
                                                <td></td>
                                                <td><strong>524.880</strong></td>
                                                <td><strong>0,00</strong></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                            </table>
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
        this.addStyles();
    }

    addStyles() {
        const existingStyles = document.getElementById('ilerleme-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'ilerleme-styles';
        style.textContent = `
            .ilerleme-main {
                padding: 0;
                max-width: 100%;
                overflow-x: hidden;
            }
            
            .ilerleme-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
                margin-bottom: 15px;
            }
            
            .control-left {
                display: flex;
                align-items: center;
            }
            
            .santiye-selector {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .santiye-selector label {
                font-weight: 600;
                color: #495057;
                white-space: nowrap;
                font-size: 13px;
            }
            
            .form-select {
                padding: 4px 8px;
                border: 1px solid #ced4da;
                border-radius: 3px;
                background: white;
                min-width: 150px;
                font-size: 13px;
            }
            
            .control-center {
                display: flex;
                gap: 8px;
            }
            
            .btn.btn-outline-secondary {
                padding: 6px 12px;
                border: 1px solid #6c757d;
                background: white;
                color: #6c757d;
                border-radius: 3px;
                font-size: 12px;
                transition: all 0.2s ease;
            }
            
            .btn.btn-outline-secondary:hover {
                background: #6c757d;
                color: white;
            }
            
            .ilerleme-content {
                display: flex;
                gap: 15px;
                padding: 0 15px;
                max-width: 100%;
                overflow-x: hidden;
            }
            
            .ilerleme-sidebar {
                width: 200px;
                min-width: 200px;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                padding: 12px;
                height: fit-content;
            }
            
            .mahal-section h4 {
                margin: 0 0 15px 0;
                padding-bottom: 10px;
                border-bottom: none;
                color: #495057;
                font-size: 16px;
            }
            
            .mahal-tree {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .tree-item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            
            .tree-item:hover {
                background: #f8f9fa;
            }
            
            .tree-item.active {
                background: #28a745;
                color: white;
            }
            
            .tree-item.active .tree-label {
                background: #1e7e34;
                color: white;
                padding: 2px 8px;
                border-radius: 3px;
                font-weight: bold;
            }
            
            .tree-item i {
                width: 16px;
                color: #6c757d;
            }
            
            .tree-item.active i {
                color: white;
            }
            
            .ilerleme-main-content {
                flex: 1;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                padding: 12px;
                min-width: 0;
                overflow: hidden;
            }
            
            .imalat-section h4 {
                margin: 0 0 12px 0;
                padding-bottom: 8px;
                border-bottom: none;
                color: #495057;
                font-size: 14px;
            }
            
            .imalat-table-container {
                overflow-x: auto;
                overflow-y: auto;
                max-height: 500px;
                border: 1px solid #dee2e6;
                border-radius: 3px;
            }
            
            .imalat-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10px;
                min-width: 1200px;
            }
            
            .imalat-table th {
                background: #e9ecef;
                padding: 6px 4px;
                text-align: center;
                border: 1px solid #dee2e6;
                font-weight: 600;
                white-space: nowrap;
                position: sticky;
                top: 0;
                z-index: 1;
                font-size: 10px;
            }
            
            .imalat-table td {
                padding: 4px 3px;
                border: 1px solid #dee2e6;
                text-align: center;
                white-space: nowrap;
                font-size: 10px;
            }
            
            .imalat-table tbody tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .imalat-table tbody tr:hover {
                background: #e3f2fd;
            }
            
            .total-row {
                background: #e9ecef !important;
                font-weight: bold;
            }
            
            .total-row td {
                background: #e9ecef !important;
                border-top: 1px solid #dee2e6 !important;
            }
            
            /* Header buttons styling */
            .header-actions .btn {
                margin-left: 4px;
                font-size: 13px;
                padding: 8px 16px;
                border-radius: 4px;
                border: none;
                font-weight: 500;
                background-color: #2e7d32 !important;
                color: white !important;
                transition: all 0.2s ease;
            }
            
            .header-actions .btn:hover {
                background-color: #1b5e20 !important;
                transform: translateY(-1px);
            }
            
            .btn-success {
                background-color: #2e7d32 !important;
                color: white !important;
            }
            
            .btn-warning {
                background-color: #2e7d32 !important;
                color: white !important;
            }
            
            .btn-danger {
                background-color: #2e7d32 !important;
                color: white !important;
            }
            
            .btn-info {
                background-color: #2e7d32 !important;
                color: white !important;
            }
            
            .btn-secondary {
                background-color: #2e7d32 !important;
                color: white !important;
            }
            
            /* Content header specific styling */
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
