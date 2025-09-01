// YapSat Module
export class YapSatModule {
    constructor() {
        this.name = 'YapSat';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Emlak Satışları - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2>Emlak Satışları</h2>
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
                            <i class="fa-solid fa-chart-line"></i>
                            Satış Hareket!
                        </button>
                        <button class="btn btn-success">
                            <i class="fa-solid fa-file-excel"></i>
                            Excel Aktar
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

                <div class="content-main yapsat-main">
                    <!-- Project Selection -->
                    <div class="yapsat-controls">
                        <div class="project-selector">
                            <label>Şantiye & Proje Tanımı:</label>
                            <select class="project-select">
                                <option value="lonicera">LONİCERA OTEL İNŞAATI</option>
                                <option value="villa">VİLLA PROJESİ</option>
                                <option value="ofis">OFİS PROJESİ</option>
                            </select>
                        </div>
                    </div>

                    <!-- Data Table -->
                    <div class="yapsat-table-container">
                        <table class="data-table yapsat-table">
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
                                <tr class="row-selected">
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
                        
                        <!-- Summary Row -->
                        <div class="summary-row">
                            <span class="summary-count">3</span>
                            <span class="summary-total">1.050.000,00</span>
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
        this.initFilters();
        this.addStyles();
    }

    initFilters() {
        const filterSelect = document.querySelector('.filter-select');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                console.log('Filter changed:', e.target.value);
                this.applyFilters(e.target.value);
            });
        }
    }

    applyFilters(status) {
        console.log('Applying filters for status:', status);
        // Filter implementation would go here
    }

    addStyles() {
        const existingStyles = document.getElementById('yapsat-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'yapsat-styles';
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
            .yapsat-main {
                padding: 15px;
            }
            
            .yapsat-controls {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border: 1px solid #dee2e6;
            }
            
            .project-selector {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .project-selector label {
                font-weight: 600;
                color: #495057;
                white-space: nowrap;
            }
            
            .project-select {
                padding: 8px 12px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                min-width: 300px;
                font-size: 14px;
            }
            
            /* Table styling */
            .yapsat-table-container {
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                overflow-x: auto;
            }
            
            .yapsat-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                min-width: 1000px;
            }
            
            .yapsat-table th {
                background: #e9ecef;
                padding: 10px 8px;
                text-align: center;
                border: 1px solid #dee2e6;
                font-weight: 600;
                white-space: nowrap;
                font-size: 11px;
            }
            
            .yapsat-table td {
                padding: 8px 6px;
                border: 1px solid #dee2e6;
                text-align: center;
                white-space: nowrap;
                font-size: 11px;
            }
            
            .yapsat-table tbody tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .yapsat-table tbody tr:hover {
                background: #e3f2fd;
            }
            
            .row-selected {
                background: #d4edda !important;
            }
            
            .row-selected:hover {
                background: #c3e6cb !important;
            }
            
            /* Summary row */
            .summary-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #f8f9fa;
                border-top: 1px solid #dee2e6;
                font-weight: 600;
            }
            
            .summary-count {
                color: #495057;
            }
            
            .summary-total {
                color: #2e7d32;
                font-size: 14px;
            }
            
            /* Checkbox styling */
            .yapsat-table input[type="checkbox"] {
                transform: scale(1.2);
                cursor: pointer;
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
