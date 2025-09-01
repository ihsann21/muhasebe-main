// Taseron Module
export class TaseronModule {
    constructor() {
        this.name = 'Taseron';
    }

    show() {
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
            
            // Initialize functionality
            this.initFunctionality();
        }
    }

    hideWelcomeScreen() {
        // Hide welcome screen within module container
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    initFunctionality() {
        // Initialize Excel-like table functionality
        this.initExcelTable();
        
        // Initialize sidebar functionality
        this.initSidebar();
        
        // Initialize table interactions for taseron
        this.initTableInteractions();
    }

    initExcelTable() {
        const table = document.getElementById('taseronTable');
        if (!table) return;

        let editMode = false;
        let selectedCell = null;

        // Function to toggle edit mode
        const toggleEditMode = (enabled, table) => {
            editMode = enabled;
            const cells = table.querySelectorAll('td[contenteditable]');
            
            cells.forEach(cell => {
                cell.contentEditable = enabled;
                if (enabled) {
                    cell.classList.add('editable');
                } else {
                    cell.classList.remove('editable');
                    cell.classList.remove('selected');
                }
            });
            
            if (!enabled) {
                selectedCell = null;
            }
        };

        // Function to show status message
        const showStatusMessage = (message, type = 'info') => {
            // Create notification container if it doesn't exist
            let notificationContainer = document.getElementById('notification-container');
            if (!notificationContainer) {
                notificationContainer = document.createElement('div');
                notificationContainer.id = 'notification-container';
                notificationContainer.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                `;
                document.body.appendChild(notificationContainer);
            }

            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.style.cssText = `
                background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                margin-bottom: 10px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                animation: slideInRight 0.3s ease-out;
            `;
            
            notification.textContent = message;
            notificationContainer.appendChild(notification);

            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        };

        // Function to add new row
        const addNewRow = (table) => {
            const tbody = table.querySelector('tbody');
            const newRowIndex = tbody.children.length;
            
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td contenteditable="true" data-row="${newRowIndex}" data-col="0">TAŞ-${String(newRowIndex + 1).padStart(4, '0')}</td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="1"></td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="2"></td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="3"></td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="4"></td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="5"></td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="6"></td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="7"></td>
                <td contenteditable="true" data-row="${newRowIndex}" data-col="8"></td>
            `;
            
            tbody.appendChild(newRow);
            
            // Re-initialize table interactions for new row
            this.initTableInteractions();
            
            showStatusMessage('Yeni satır eklendi', 'success');
        };

        // Set up header buttons
        const headerButtons = document.querySelectorAll('.header-actions .btn');
        headerButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                
                switch (buttonText) {
                    case 'Yeni':
                        addNewRow(table);
                        break;
                    case 'Düzelt':
                        toggleEditMode(true, table);
                        showStatusMessage('Düzenleme modu açıldı', 'info');
                        break;
                    case 'Yenile':
                        location.reload();
                        break;
                    case 'Excele Aktar':
                        showStatusMessage('Excel aktarımı başlatıldı', 'info');
                        break;
                    case 'Yazdır':
                        window.print();
                        break;
                    case 'Çıkış':
                        if (editMode) {
                            toggleEditMode(false, table);
                            showStatusMessage('Düzenleme modu kapatıldı', 'info');
                        }
                        break;
                }
            });
        });

        // Initially disable edit mode
        toggleEditMode(false, table);
    }

    initSidebar() {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                sidebarItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                const action = item.getAttribute('data-action');
                console.log('Sidebar action clicked:', action);
                
                // Handle different sidebar actions
                switch (action) {
                    case 'hareket-ekle':
                        this.showStatusMessage('Hareket ekleme formu açılıyor...', 'info');
                        break;
                    case 'hakedis-faturasi':
                        this.showHakedisFaturasi();
                        break;
                    case 'hareket-listesi':
                        this.showStatusMessage('Hareket listesi yükleniyor...', 'info');
                        break;
                    case 'hesap-extresi':
                        this.showStatusMessage('Hesap extresi hazırlanıyor...', 'info');
                        break;
                    case 'hareket-toplamlari':
                        this.showStatusMessage('Hareket toplamları hesaplanıyor...', 'info');
                        break;
                }
            });
        });
    }

    initTableInteractions() {
        const table = document.getElementById('taseronTable');
        if (!table) return;

        // Add click handlers for table cells
        const cells = table.querySelectorAll('td[contenteditable]');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                // Remove selection from other cells
                cells.forEach(c => c.classList.remove('selected'));
                
                // Select current cell
                cell.classList.add('selected');
                
                console.log(`Cell selected: Row ${cell.dataset.row}, Col ${cell.dataset.col}`);
            });

            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // Move to next row, same column
                    const currentRow = parseInt(cell.dataset.row);
                    const currentCol = parseInt(cell.dataset.col);
                    const nextRowCell = table.querySelector(`td[data-row="${currentRow + 1}"][data-col="${currentCol}"]`);
                    if (nextRowCell) {
                        nextRowCell.focus();
                        nextRowCell.click();
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    // Move to next cell
                    const currentRow = parseInt(cell.dataset.row);
                    const currentCol = parseInt(cell.dataset.col);
                    let nextCell = table.querySelector(`td[data-row="${currentRow}"][data-col="${currentCol + 1}"]`);
                    
                    // If no next cell in same row, move to first cell of next row
                    if (!nextCell) {
                        nextCell = table.querySelector(`td[data-row="${currentRow + 1}"][data-col="0"]`);
                    }
                    
                    if (nextCell) {
                        nextCell.focus();
                        nextCell.click();
                    }
                }
            });
        });
    }

    showHakedisFaturasi() {
        // This will be implemented later or can call the existing method
        console.log('Hakediş Faturası functionality will be implemented');
    }

    showStatusMessage(message, type = 'info') {
        // Create notification container if it doesn't exist
        let notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            notificationContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
            `;
            document.body.appendChild(notificationContainer);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.textContent = message;
        notificationContainer.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}
