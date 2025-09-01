// Puantaj Module
export class PuantajModule {
    constructor() {
        this.name = 'Puantaj';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Puantaj Hareketleri - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="content-header">
                    <h2><i class="fa-solid fa-calendar-check"></i> Puantaj Hareketleri</h2>
                    <div class="header-actions">
                        <button class="btn btn-success" id="editModeBtn">
                            <i class="fa-solid fa-edit"></i>
                            Düzenle
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-refresh"></i>
                            Yenile
                        </button>
                        <button class="btn btn-outline">
                            <i class="fa-solid fa-file-excel"></i>
                            Excel Aktar
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

                <!-- Filter Section at Top -->
                    <div class="puantaj-filters">
                    <div class="filter-row">
                        <div class="filter-group">
                            <label>ŞANTİYE:</label>
                            <select class="filter-select" id="santiyeSelect">
                                <option value="sirket-merkez">ŞİRKET MERKEZ ŞANTİYESİ</option>
                                <option value="diger">Diğer Şantiye</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>TAŞERON:</label>
                            <select class="filter-select" id="taseronSelect">
                                <option value="sirketin-taseronu">ŞİRKETİN TAŞERONU</option>
                                <option value="dogan-yapi">DOĞAN YAPI</option>
                                <option value="bayram-karaca">BAYRAM KARACA</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>AY:</label>
                            <select class="filter-select" id="monthSelect">
                                <option value="9" selected>Eylül</option>
                                <option value="1">Ocak</option>
                                <option value="2">Şubat</option>
                                <option value="3">Mart</option>
                                <option value="4">Nisan</option>
                                <option value="5">Mayıs</option>
                                <option value="6">Haziran</option>
                                <option value="7">Temmuz</option>
                                <option value="8">Ağustos</option>
                                <option value="10">Ekim</option>
                                <option value="11">Kasım</option>
                                <option value="12">Aralık</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>YIL:</label>
                            <select class="filter-select" id="yearSelect">
                                <option value="2025" selected>2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Main Table Area - Full Width -->

                    <div class="puantaj-table-container">
                        <table class="puantaj-table">
                            <thead>
                                <tr>
                                    <th rowspan="2">Personel</th>
                                    <th rowspan="2">Görevi</th>
                                    <th rowspan="2">Grubu</th>
                                    <th rowspan="2">Y.Ücreti</th>
                                    <th rowspan="2">İşe Giriş</th>
                                    <th rowspan="2">İşten Çıkış</th>
                                    <th class="legend-header">X</th>
                                    <th class="legend-header">/</th>
                                    <th class="legend-header">H</th>
                                    <th class="legend-header">İ</th>
                                    <th colspan="31">Günler</th>
                                </tr>
                                <tr>
                                    <th class="legend-subheader">1</th>
                                    <th class="legend-subheader">2</th>
                                    <th class="legend-subheader">3</th>
                                    <th class="legend-subheader">4</th>
                                    <th class="legend-subheader">5</th>
                                    <th class="legend-subheader">6</th>
                                    <th class="legend-subheader">7</th>
                                    <th class="legend-subheader">8</th>
                                    <th class="legend-subheader">9</th>
                                    <th class="legend-subheader">10</th>
                                    <th class="legend-subheader">11</th>
                                    <th class="legend-subheader">12</th>
                                    <th class="legend-subheader">13</th>
                                    <th class="legend-subheader">14</th>
                                    <th class="legend-subheader">15</th>
                                    <th class="legend-subheader">16</th>
                                    <th class="legend-subheader">17</th>
                                    <th class="legend-subheader">18</th>
                                    <th class="legend-subheader">19</th>
                                    <th class="legend-subheader">20</th>
                                    <th class="legend-subheader">21</th>
                                    <th class="legend-subheader">22</th>
                                    <th class="legend-subheader">23</th>
                                    <th class="legend-subheader">24</th>
                                    <th class="legend-subheader">25</th>
                                    <th class="legend-subheader">26</th>
                                    <th class="legend-subheader">27</th>
                                    <th class="legend-subheader">28</th>
                                    <th class="legend-subheader">29</th>
                                    <th class="legend-subheader">30</th>
                                    <th class="legend-subheader">31</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="group-header">
                                    <td colspan="41"><strong>▼ FİRMA PERSONELİ</strong></td>
                                </tr>
                                <tr>
                                    <td contenteditable="false" class="editable-cell">EVREN YAMAN</td>
                                    <td contenteditable="false" class="editable-cell">MUHASEBE</td>
                                    <td contenteditable="false" class="editable-cell">PERSONEL GRUBU 2</td>
                                    <td contenteditable="false" class="editable-cell">300</td>
                                    <td contenteditable="false" class="editable-cell">01.01.2017</td>
                                    <td contenteditable="false" class="editable-cell">-</td>
                                    <td class="legend-cell legend-x">X</td>
                                    <td class="legend-cell legend-slash">/</td>
                                    <td class="legend-cell legend-h">H</td>
                                    <td class="legend-cell legend-i">İ</td>
                                    <td class="attendance-cell" data-status="slash">/</td>
                                    <td class="attendance-cell" data-status="h">H</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="i">İ</td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                </tr>
                                <tr>
                                    <td contenteditable="false" class="editable-cell">REMZİ HACIHAMDİO</td>
                                    <td contenteditable="false" class="editable-cell">MUHASEBE</td>
                                    <td contenteditable="false" class="editable-cell">PERSONEL GRUBU 2</td>
                                    <td contenteditable="false" class="editable-cell">100</td>
                                    <td contenteditable="false" class="editable-cell">01.01.2017</td>
                                    <td contenteditable="false" class="editable-cell">-</td>
                                    <td class="legend-cell legend-x">X</td>
                                    <td class="legend-cell legend-slash">/</td>
                                    <td class="legend-cell legend-h">H</td>
                                    <td class="legend-cell legend-i">İ</td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                </tr>
                                <tr>
                                    <td contenteditable="false" class="editable-cell">GÜLGÜN BAŞER</td>
                                    <td contenteditable="false" class="editable-cell">MUHASEBE</td>
                                    <td contenteditable="false" class="editable-cell">PERSONEL GRUBU 2</td>
                                    <td contenteditable="false" class="editable-cell">120</td>
                                    <td contenteditable="false" class="editable-cell">13.06.2018</td>
                                    <td contenteditable="false" class="editable-cell">-</td>
                                    <td class="legend-cell legend-x">X</td>
                                    <td class="legend-cell legend-slash">/</td>
                                    <td class="legend-cell legend-h">H</td>
                                    <td class="legend-cell legend-i">İ</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="x">X</td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
                                    <td class="attendance-cell" data-status="present"></td>
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
        this.initFilters();
        this.initTableInteractions();
        this.initEditMode();
        this.addStyles();
    }

    initFilters() {
        const yearSelect = document.getElementById('yearSelect');
        const monthSelect = document.getElementById('monthSelect');
        
        if (yearSelect) {
            yearSelect.addEventListener('change', () => this.refreshTable());
        }
        
        if (monthSelect) {
            monthSelect.addEventListener('change', () => this.refreshTable());
        }
    }

    initTableInteractions() {
        const attendanceCells = document.querySelectorAll('.attendance-cell');
        attendanceCells.forEach(cell => {
            cell.addEventListener('click', () => {
                this.toggleAttendance(cell);
            });
        });
    }

    toggleAttendance(cell) {
        const currentStatus = cell.dataset.status;
        const newStatus = currentStatus === 'present' ? 'absent' : 'present';
        
        cell.dataset.status = newStatus;
        cell.textContent = newStatus === 'present' ? '✓' : '✗';
        
        console.log(`Attendance toggled to: ${newStatus}`);
    }

    refreshTable() {
        console.log('Refreshing puantaj table...');
        // Table refresh logic would go here
    }

    initEditMode() {
        const editBtn = document.getElementById('editModeBtn');
        let isEditMode = false;

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                isEditMode = !isEditMode;
                this.toggleEditMode(isEditMode);
                
                // Update button appearance
                if (isEditMode) {
                    editBtn.innerHTML = '<i class="fa-solid fa-save"></i> Kaydet';
                    editBtn.classList.remove('btn-success');
                    editBtn.classList.add('btn-warning');
                } else {
                    editBtn.innerHTML = '<i class="fa-solid fa-edit"></i> Düzenle';
                    editBtn.classList.remove('btn-warning');
                    editBtn.classList.add('btn-success');
                }
            });
        }
    }

    toggleEditMode(enabled) {
        const editableCells = document.querySelectorAll('.editable-cell');
        const attendanceCells = document.querySelectorAll('.attendance-cell');
        
        // Toggle editable cells
        editableCells.forEach(cell => {
            cell.contentEditable = enabled;
            if (enabled) {
                cell.classList.add('editing');
            } else {
                cell.classList.remove('editing');
            }
        });

        // Toggle attendance cells
        attendanceCells.forEach(cell => {
            if (enabled) {
                cell.classList.add('editing');
                cell.addEventListener('click', this.cycleAttendanceStatus);
            } else {
                cell.classList.remove('editing');
                cell.removeEventListener('click', this.cycleAttendanceStatus);
            }
        });

        // Show status message
        const message = enabled ? 'Düzenleme modu açıldı' : 'Değişiklikler kaydedildi';
        this.showStatusMessage(message, enabled ? 'info' : 'success');
    }

    cycleAttendanceStatus(event) {
        const cell = event.target;
        const currentStatus = cell.dataset.status;
        
        // Cycle through statuses: present -> x -> slash -> h -> i -> present
        let newStatus, newText;
        switch (currentStatus) {
            case 'present':
                newStatus = 'x';
                newText = 'X';
                break;
            case 'x':
                newStatus = 'slash';
                newText = '/';
                break;
            case 'slash':
                newStatus = 'h';
                newText = 'H';
                break;
            case 'h':
                newStatus = 'i';
                newText = 'İ';
                break;
            case 'i':
            default:
                newStatus = 'present';
                newText = '';
                break;
        }
        
        cell.dataset.status = newStatus;
        cell.textContent = newText;
    }

    addStyles() {
        const existingStyles = document.getElementById('puantaj-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'puantaj-styles';
        style.textContent = `
            .puantaj-filters {
                background: #f8f9fa;
                padding: 15px 20px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #dee2e6;
            }
            .filter-row {
                display: flex;
                gap: 30px;
                align-items: center;
                flex-wrap: wrap;
            }
            .filter-group {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .filter-group label {
                font-size: 14px;
                font-weight: 600;
                color: #495057;
                min-width: 80px;
            }
            .filter-select {
                padding: 8px 12px;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                background: white;
                color: #374151;
                font-size: 14px;
            }
            .puantaj-table-container {
                overflow-x: auto;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                margin: 0;
                width: 100%;
            }
            .puantaj-table {
                width: 100%;
                border-collapse: collapse;
                min-width: 1400px;
                font-size: 12px;
            }
            .puantaj-table th,
            .puantaj-table td {
                padding: 6px 4px;
                text-align: center;
                border: 1px solid #dee2e6;
                font-size: 12px;
                vertical-align: middle;
            }
            .puantaj-table th {
                background: #e9ecef;
                font-weight: 600;
                color: #495057;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .day-header,
            .legend-subheader {
                width: 25px;
                min-width: 25px;
                font-size: 10px;
                padding: 4px 2px;
            }
            .legend-header {
                width: 30px;
                min-width: 30px;
                font-size: 11px;
                font-weight: bold;
            }
            .attendance-cell {
                cursor: pointer;
                user-select: none;
                font-weight: bold;
                width: 25px;
                min-width: 25px;
                height: 25px;
                padding: 2px;
            }
            .attendance-cell[data-status="present"] {
                background: #dcfce7;
                color: #166534;
            }
            .attendance-cell[data-status="x"] {
                background: #fee2e2;
                color: #991b1b;
                font-weight: bold;
            }
            .attendance-cell[data-status="slash"] {
                background: #fef3c7;
                color: #92400e;
                font-weight: bold;
            }
            .attendance-cell[data-status="h"] {
                background: #fecaca;
                color: #991b1b;
                font-weight: bold;
            }
            .attendance-cell[data-status="i"] {
                background: #dbeafe;
                color: #1d4ed8;
                font-weight: bold;
            }
            .legend-cell {
                font-weight: bold;
                text-align: center;
                font-size: 14px;
            }
            .legend-x { background: #fee2e2; color: #991b1b; }
            .legend-slash { background: #fef3c7; color: #92400e; }
            .legend-h { background: #fecaca; color: #991b1b; }
            .legend-i { background: #dbeafe; color: #1d4ed8; }
            .group-header {
                background: #f3f4f6;
                font-weight: bold;
            }
            .group-header td {
                padding: 12px 8px;
                border-bottom: 2px solid #e5e7eb;
            }
            .total-cell {
                background: #f3f4f6;
                font-weight: bold;
                color: #1f2937;
            }
            
            /* Column widths for better layout */
            .puantaj-table th:nth-child(1) { min-width: 120px; } /* Personel */
            .puantaj-table th:nth-child(2) { min-width: 100px; } /* Görevi */
            .puantaj-table th:nth-child(3) { min-width: 120px; } /* Grubu */
            .puantaj-table th:nth-child(4) { min-width: 80px; }  /* Y.Ücreti */
            .puantaj-table th:nth-child(5) { min-width: 100px; } /* İşe Giriş */
            .puantaj-table th:nth-child(6) { min-width: 100px; } /* İşten Çıkış */

            /* Edit Mode Styles */
            .editable-cell.editing {
                background-color: #fff3cd !important;
                border: 2px solid #ffc107 !important;
                cursor: text;
                transition: all 0.2s ease;
            }
            .editable-cell.editing:hover {
                background-color: #fff3cd;
                box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.25);
            }
            .editable-cell.editing:focus {
                outline: none;
                background-color: #ffffff;
                box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.5);
            }
            
            .attendance-cell.editing {
                cursor: pointer;
                transition: all 0.2s ease;
                border: 2px solid transparent;
            }
            .attendance-cell.editing:hover {
                border-color: #007bff;
                transform: scale(1.1);
                box-shadow: 0 2px 8px rgba(0,123,255,0.3);
            }
            
            /* Success button style */
            .btn-success {
                background-color: #28a745;
                border-color: #28a745;
                color: white;
            }
            .btn-success:hover {
                background-color: #218838;
                border-color: #1e7e34;
            }
        `;
        document.head.appendChild(style);
    }
}
