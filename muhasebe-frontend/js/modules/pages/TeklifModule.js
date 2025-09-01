// Teklif Module
export class TeklifModule {
    constructor() {
        this.name = 'Teklif';
        this.currentView = 'list'; // 'list', 'create', 'edit'
        this.currentTeklif = null;
        this.editingRowIndex = -1;
        
        // Sample teklifler data
        this.teklifler = [
            {
                id: 1,
                teklifNo: 'TEK-2024-001',
                musteri: 'Örnek İnşaat A.Ş.',
                proje: 'Villa Kompleksi',
                konum: 'Beykoz, İstanbul',
                tarih: '2024-01-15',
                gecerlilik: '2024-02-15',
                durum: 'Gönderildi',
                toplam: 3173400,
                kdvOrani: 20,
                indirimOrani: 0,
                notlar: 'Müşteri ile görüşme yapıldı',
                kalemler: [
                    { id: 1, kod: 'K001', aciklama: 'Kazı İşleri', birim: 'm³', miktar: 2500, birimFiyat: 45, toplam: 112500 },
                    { id: 2, kod: 'B001', aciklama: 'Beton İşleri', birim: 'm³', miktar: 800, birimFiyat: 350, toplam: 280000 },
                    { id: 3, kod: 'D001', aciklama: 'Demir İşleri', birim: 'ton', miktar: 120, birimFiyat: 15000, toplam: 1800000 },
                    { id: 4, kod: 'M001', aciklama: 'Duvar İşleri', birim: 'm²', miktar: 3200, birimFiyat: 85, toplam: 272000 },
                    { id: 5, kod: 'C001', aciklama: 'Çatı İşleri', birim: 'm²', miktar: 1500, birimFiyat: 120, toplam: 180000 }
                ]
            },
            {
                id: 2,
                teklifNo: 'TEK-2024-002',
                musteri: 'Kurumsal Ltd.',
                proje: 'Ofis Binası',
                konum: 'Levent, İstanbul',
                tarih: '2024-01-12',
                gecerlilik: '2024-02-12',
                durum: 'Onaylandı',
                toplam: 5650800,
                kdvOrani: 20,
                indirimOrani: 5,
                notlar: 'Sözleşme imzalandı',
                kalemler: [
                    { id: 1, kod: 'T001', aciklama: 'Temel İşleri', birim: 'm³', miktar: 1200, birimFiyat: 280, toplam: 336000 },
                    { id: 2, kod: 'K002', aciklama: 'Kaba İnşaat', birim: 'm²', miktar: 8500, birimFiyat: 450, toplam: 3825000 },
                    { id: 3, kod: 'I001', aciklama: 'İnce İnşaat', birim: 'm²', miktar: 8500, birimFiyat: 180, toplam: 1530000 }
                ]
            },
            {
                id: 3,
                teklifNo: 'TEK-2024-003',
                musteri: 'Perakende A.Ş.',
                proje: 'Alışveriş Merkezi',
                konum: 'Kadıköy, İstanbul',
                tarih: '2024-01-10',
                gecerlilik: '2024-02-10',
                durum: 'Reddedildi',
                toplam: 12500000,
                kdvOrani: 20,
                indirimOrani: 0,
                notlar: 'Bütçe yetersizliği',
                kalemler: [
                    { id: 1, kod: 'A001', aciklama: 'Altyapı İşleri', birim: 'm²', miktar: 15000, birimFiyat: 120, toplam: 1800000 },
                    { id: 2, kod: 'Y001', aciklama: 'Yapısal İşler', birim: 'm²', miktar: 25000, birimFiyat: 380, toplam: 9500000 },
                    { id: 3, kod: 'E001', aciklama: 'Elektrik İşleri', birim: 'nokta', miktar: 2000, birimFiyat: 350, toplam: 700000 }
                ]
            },
            {
                id: 4,
                teklifNo: 'TEK-2024-004',
                musteri: 'Sağlık A.Ş.',
                proje: 'Hastane Ek Binası',
                konum: 'Ümraniye, İstanbul',
                tarih: '2024-01-08',
                gecerlilik: '2024-02-08',
                durum: 'Hazırlanıyor',
                toplam: 8750000,
                kdvOrani: 20,
                indirimOrani: 0,
                notlar: 'Teknik detaylar bekleniyor',
                kalemler: [
                    { id: 1, kod: 'H001', aciklama: 'Hastane Temeli', birim: 'm³', miktar: 2000, birimFiyat: 320, toplam: 640000 },
                    { id: 2, kod: 'H002', aciklama: 'Özel Duvarlar', birim: 'm²', miktar: 12000, birimFiyat: 580, toplam: 6960000 },
                    { id: 3, kod: 'H003', aciklama: 'Tıbbi Gaz Sistemi', birim: 'nokta', miktar: 500, birimFiyat: 2300, toplam: 1150000 }
                ]
            }
        ];

        this.filteredTeklifler = [...this.teklifler];
        this.filters = {
            durum: 'all',
            musteri: 'all',
            tarihAraligi: 'all',
            search: ''
        };

        // Yeni teklif için varsayılan template
        this.newTeklifTemplate = {
            id: null,
            teklifNo: '',
            musteri: '',
            proje: '',
            konum: '',
            tarih: new Date().toISOString().split('T')[0],
            gecerlilik: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            durum: 'Hazırlanıyor',
            toplam: 0,
            kdvOrani: 20,
            indirimOrani: 0,
            notlar: '',
            kalemler: [
                { id: 1, kod: '', aciklama: '', birim: 'm²', miktar: 0, birimFiyat: 0, toplam: 0 }
            ]
        };
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Teklif Yönetimi - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="teklif-container">
                    <!-- Header -->
                    <div class="teklif-header">
                        <div class="header-left">
                            <h2>Teklif Yönetimi</h2>
                            <p>Tekliflerinizi oluşturun, takip edin ve yönetin</p>
                        </div>
                        <div class="header-actions">
                            <button class="btn btn-success" id="newTeklifBtn">
                                <i class="fa-solid fa-plus"></i>
                                Yeni Teklif
                            </button>
                            <button class="btn btn-success" id="templateBtn">
                                <i class="fa-solid fa-file-lines"></i>
                                Şablondan
                            </button>
                            <button class="btn btn-success" id="reportBtn">
                                <i class="fa-solid fa-chart-line"></i>
                                Rapor Al
                            </button>
                            <button class="btn btn-success" id="exportBtn">
                                <i class="fa-solid fa-file-excel"></i>
                                Excel Aktar
                            </button>
                        </div>
                    </div>

                    <!-- Summary Cards -->
                    <div class="summary-cards">
                        <div class="summary-card total-teklifler">
                            <div class="card-icon">
                                <i class="fa-solid fa-file-contract"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="totalTeklifler">4</h3>
                                <p>Toplam Teklif</p>
                                <span class="trend positive">Bu Ay</span>
                            </div>
                        </div>
                        <div class="summary-card onaylanan">
                            <div class="card-icon">
                                <i class="fa-solid fa-check-circle"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="onaylananTeklifler">1</h3>
                                <p>Onaylanan</p>
                                <span class="trend positive">%25 Oran</span>
                            </div>
                        </div>
                        <div class="summary-card bekleyen">
                            <div class="card-icon">
                                <i class="fa-solid fa-clock"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="bekleyenTeklifler">2</h3>
                                <p>Bekleyen</p>
                                <span class="trend warning">Takip Et</span>
                            </div>
                        </div>
                        <div class="summary-card toplam-tutar">
                            <div class="card-icon">
                                <i class="fa-solid fa-lira-sign"></i>
                            </div>
                            <div class="card-content">
                                <h3 id="toplamTutar">₺30.074.200</h3>
                                <p>Toplam Tutar</p>
                                <span class="trend positive">+18.5%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Content Area -->
                    <div class="content-area">
                        <!-- Teklif List View -->
                        <div class="view-content active" id="list-view">
                            <!-- Filters -->
                            <div class="teklif-filters">
                                <div class="filter-row">
                                    <div class="filter-group">
                                        <label>Durum</label>
                                        <select class="filter-select" id="durumFilter">
                                            <option value="all">Tüm Durumlar</option>
                                            <option value="Hazırlanıyor">Hazırlanıyor</option>
                                            <option value="Gönderildi">Gönderildi</option>
                                            <option value="Onaylandı">Onaylandı</option>
                                            <option value="Reddedildi">Reddedildi</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Müşteri</label>
                                        <select class="filter-select" id="musteriFilter">
                                            <option value="all">Tüm Müşteriler</option>
                                            <option value="Örnek İnşaat A.Ş.">Örnek İnşaat A.Ş.</option>
                                            <option value="Kurumsal Ltd.">Kurumsal Ltd.</option>
                                            <option value="Perakende A.Ş.">Perakende A.Ş.</option>
                                            <option value="Sağlık A.Ş.">Sağlık A.Ş.</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Tarih Aralığı</label>
                                        <select class="filter-select" id="tarihFilter">
                                            <option value="all">Tüm Zamanlar</option>
                                            <option value="thisWeek">Bu Hafta</option>
                                            <option value="thisMonth">Bu Ay</option>
                                            <option value="lastMonth">Geçen Ay</option>
                                            <option value="thisYear">Bu Yıl</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <label>Arama</label>
                                        <div class="search-box">
                                            <i class="fa-solid fa-search"></i>
                                            <input type="text" id="searchTeklif" placeholder="Teklif no, müşteri veya proje ara...">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Teklif Table -->
                            <div class="teklif-table-container">
                                <table class="teklif-table">
                                    <thead>
                                        <tr>
                                            <th>Teklif No</th>
                                            <th>Müşteri</th>
                                            <th>Proje</th>
                                            <th>Konum</th>
                                            <th>Tarih</th>
                                            <th>Geçerlilik</th>
                                            <th>Durum</th>
                                            <th>Tutar</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody id="teklifTableBody">
                                        ${this.renderTeklifTable()}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Teklif Create/Edit View -->
                        <div class="view-content" id="form-view">
                            <div class="teklif-form-container">
                                <div class="form-header">
                                    <h3 id="formTitle">Yeni Teklif Oluştur</h3>
                                    <div class="form-actions">
                                        <button class="btn btn-outline" id="cancelBtn">
                                            <i class="fa-solid fa-times"></i>
                                            İptal
                                        </button>
                                        <button class="btn btn-success" id="saveBtn">
                                            <i class="fa-solid fa-save"></i>
                                            Kaydet
                                        </button>
                                        <button class="btn btn-success" id="savePdfBtn">
                                            <i class="fa-solid fa-file-pdf"></i>
                                            PDF Oluştur
                                        </button>
                                    </div>
                                </div>

                                <!-- Teklif Info Form -->
                                <div class="teklif-info-form">
                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label>Teklif No</label>
                                            <input type="text" id="teklifNo" placeholder="Otomatik oluşturulacak">
                                        </div>
                                        <div class="form-group">
                                            <label>Müşteri</label>
                                            <input type="text" id="musteri" placeholder="Müşteri adı" required>
                                        </div>
                                        <div class="form-group">
                                            <label>Proje</label>
                                            <input type="text" id="proje" placeholder="Proje adı" required>
                                        </div>
                                        <div class="form-group">
                                            <label>Konum</label>
                                            <input type="text" id="konum" placeholder="Proje konumu">
                                        </div>
                                        <div class="form-group">
                                            <label>Teklif Tarihi</label>
                                            <input type="date" id="tarih" required>
                                        </div>
                                        <div class="form-group">
                                            <label>Geçerlilik Tarihi</label>
                                            <input type="date" id="gecerlilik" required>
                                        </div>
                                        <div class="form-group">
                                            <label>Durum</label>
                                            <select id="durum" required>
                                                <option value="Hazırlanıyor">Hazırlanıyor</option>
                                                <option value="Gönderildi">Gönderildi</option>
                                                <option value="Onaylandı">Onaylandı</option>
                                                <option value="Reddedildi">Reddedildi</option>
                                            </select>
                                        </div>
                                        <div class="form-group full-width">
                                            <label>Notlar</label>
                                            <textarea id="notlar" placeholder="Teklif ile ilgili notlar..." rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <!-- Excel-like Teklif Table -->
                                <div class="excel-table-container">
                                    <div class="table-header">
                                        <h4>İş Kalemleri</h4>
                                        <button class="btn btn-sm btn-success" id="addRowBtn">
                                            <i class="fa-solid fa-plus"></i>
                                            Satır Ekle
                                        </button>
                                    </div>
                                    
                                    <div class="excel-table-wrapper">
                                        <table class="excel-table" id="excelTable">
                                            <thead>
                                                <tr>
                                                    <th style="width: 80px">Kod</th>
                                                    <th style="width: 300px">Açıklama</th>
                                                    <th style="width: 80px">Birim</th>
                                                    <th style="width: 100px">Miktar</th>
                                                    <th style="width: 120px">Birim Fiyat</th>
                                                    <th style="width: 140px">Toplam</th>
                                                    <th style="width: 60px">İşlem</th>
                                                </tr>
                                            </thead>
                                            <tbody id="excelTableBody">
                                                ${this.renderExcelTable()}
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Calculation Summary -->
                                    <div class="calculation-summary">
                                        <div class="summary-row">
                                            <span>Ara Toplam:</span>
                                            <span id="araToplam">₺0</span>
                                        </div>
                                        <div class="summary-row">
                                            <span>İndirim (<input type="number" id="indirimOrani" value="0" min="0" max="100" style="width: 50px">%):</span>
                                            <span id="indirimTutari">₺0</span>
                                        </div>
                                        <div class="summary-row">
                                            <span>İndirim Sonrası:</span>
                                            <span id="indirimSonrasi">₺0</span>
                                        </div>
                                        <div class="summary-row">
                                            <span>KDV (<input type="number" id="kdvOrani" value="20" min="0" max="30" style="width: 50px">%):</span>
                                            <span id="kdvTutari">₺0</span>
                                        </div>
                                        <div class="summary-row total">
                                            <span>GENEL TOPLAM:</span>
                                            <span id="genelToplam">₺0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        this.initFunctionality();
        this.addStyles();
        this.updateSummaryCards();
    }

    initFunctionality() {
        // Action buttons
        this.initActionButtons();
        
        // Filters
        this.initFilters();
        
        // Form functionality
        this.initFormFunctionality();
    }

    initActionButtons() {
        // New Teklif
        const newTeklifBtn = document.getElementById('newTeklifBtn');
        if (newTeklifBtn) {
            newTeklifBtn.addEventListener('click', () => this.showNewTeklifForm());
        }

        // Template
        const templateBtn = document.getElementById('templateBtn');
        if (templateBtn) {
            templateBtn.addEventListener('click', () => this.showTemplateModal());
        }

        // Report
        const reportBtn = document.getElementById('reportBtn');
        if (reportBtn) {
            reportBtn.addEventListener('click', () => this.generateReport());
        }

        // Export
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToExcel());
        }

        // Cancel
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.showListView());
        }

        // Save
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveTeklif());
        }

        // Save PDF
        const savePdfBtn = document.getElementById('savePdfBtn');
        if (savePdfBtn) {
            savePdfBtn.addEventListener('click', () => this.generatePDF());
        }

        // Add Row
        const addRowBtn = document.getElementById('addRowBtn');
        if (addRowBtn) {
            addRowBtn.addEventListener('click', () => this.addTableRow());
        }
    }

    initFilters() {
        ['durumFilter', 'musteriFilter', 'tarihFilter'].forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
            }
        });

        const searchInput = document.getElementById('searchTeklif');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }
    }

    initFormFunctionality() {
        // Calculation listeners
        const indirimOrani = document.getElementById('indirimOrani');
        const kdvOrani = document.getElementById('kdvOrani');
        
        if (indirimOrani) {
            indirimOrani.addEventListener('input', () => this.calculateTotals());
        }
        
        if (kdvOrani) {
            kdvOrani.addEventListener('input', () => this.calculateTotals());
        }
    }

    showNewTeklifForm() {
        this.currentView = 'create';
        this.currentTeklif = { ...this.newTeklifTemplate };
        this.currentTeklif.teklifNo = this.generateTeklifNo();
        
        document.getElementById('list-view').classList.remove('active');
        document.getElementById('form-view').classList.add('active');
        
        this.populateForm(this.currentTeklif);
        this.renderExcelTable();
        this.calculateTotals();
    }

    showListView() {
        this.currentView = 'list';
        document.getElementById('form-view').classList.remove('active');
        document.getElementById('list-view').classList.add('active');
    }

    populateForm(teklif) {
        document.getElementById('teklifNo').value = teklif.teklifNo || '';
        document.getElementById('musteri').value = teklif.musteri || '';
        document.getElementById('proje').value = teklif.proje || '';
        document.getElementById('konum').value = teklif.konum || '';
        document.getElementById('tarih').value = teklif.tarih || '';
        document.getElementById('gecerlilik').value = teklif.gecerlilik || '';
        document.getElementById('durum').value = teklif.durum || 'Hazırlanıyor';
        document.getElementById('notlar').value = teklif.notlar || '';
        document.getElementById('indirimOrani').value = teklif.indirimOrani || 0;
        document.getElementById('kdvOrani').value = teklif.kdvOrani || 20;
    }

    renderTeklifTable() {
        return this.filteredTeklifler.map(teklif => `
            <tr class="teklif-row">
                <td><strong>${teklif.teklifNo}</strong></td>
                <td>${teklif.musteri}</td>
                <td>${teklif.proje}</td>
                <td>${teklif.konum}</td>
                <td>${teklif.tarih}</td>
                <td>${teklif.gecerlilik}</td>
                <td>
                    <span class="status-badge ${teklif.durum.toLowerCase().replace(' ', '-')}">
                        ${teklif.durum}
                    </span>
                </td>
                <td><strong>${this.formatCurrency(teklif.toplam)}</strong></td>
                <td class="actions">
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="window.teklifModule.viewTeklif(${teklif.id})" title="Görüntüle">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="window.teklifModule.editTeklif(${teklif.id})" title="Düzenle">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="window.teklifModule.duplicateTeklif(${teklif.id})" title="Kopyala">
                            <i class="fa-solid fa-copy"></i>
                        </button>
                        <button class="btn-icon" onclick="window.teklifModule.downloadPDF(${teklif.id})" title="PDF İndir">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                        <button class="btn-icon danger" onclick="window.teklifModule.deleteTeklif(${teklif.id})" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderExcelTable() {
        const kalemler = this.currentTeklif?.kalemler || [{ id: 1, kod: '', aciklama: '', birim: 'm²', miktar: 0, birimFiyat: 0, toplam: 0 }];
        
        const tableBody = document.getElementById('excelTableBody');
        if (tableBody) {
            tableBody.innerHTML = kalemler.map((kalem, index) => `
                <tr class="excel-row" data-index="${index}">
                    <td>
                        <input type="text" class="excel-input kod" value="${kalem.kod}" 
                               onchange="window.teklifModule.updateKalem(${index}, 'kod', this.value)">
                    </td>
                    <td>
                        <input type="text" class="excel-input aciklama" value="${kalem.aciklama}" 
                               onchange="window.teklifModule.updateKalem(${index}, 'aciklama', this.value)">
                    </td>
                    <td>
                        <select class="excel-input birim" onchange="window.teklifModule.updateKalem(${index}, 'birim', this.value)">
                            <option value="m²" ${kalem.birim === 'm²' ? 'selected' : ''}>m²</option>
                            <option value="m³" ${kalem.birim === 'm³' ? 'selected' : ''}>m³</option>
                            <option value="m" ${kalem.birim === 'm' ? 'selected' : ''}>m</option>
                            <option value="adet" ${kalem.birim === 'adet' ? 'selected' : ''}>adet</option>
                            <option value="ton" ${kalem.birim === 'ton' ? 'selected' : ''}>ton</option>
                            <option value="kg" ${kalem.birim === 'kg' ? 'selected' : ''}>kg</option>
                            <option value="nokta" ${kalem.birim === 'nokta' ? 'selected' : ''}>nokta</option>
                            <option value="takım" ${kalem.birim === 'takım' ? 'selected' : ''}>takım</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" class="excel-input miktar" value="${kalem.miktar}" step="0.01" min="0"
                               onchange="window.teklifModule.updateKalem(${index}, 'miktar', parseFloat(this.value) || 0)">
                    </td>
                    <td>
                        <input type="number" class="excel-input birimFiyat" value="${kalem.birimFiyat}" step="0.01" min="0"
                               onchange="window.teklifModule.updateKalem(${index}, 'birimFiyat', parseFloat(this.value) || 0)">
                    </td>
                    <td>
                        <input type="text" class="excel-input toplam" value="${this.formatCurrency(kalem.toplam)}" readonly>
                    </td>
                    <td>
                        <button class="btn-icon danger" onclick="window.teklifModule.deleteRow(${index})" title="Sil">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    addTableRow() {
        if (!this.currentTeklif.kalemler) {
            this.currentTeklif.kalemler = [];
        }
        
        const newId = Math.max(...this.currentTeklif.kalemler.map(k => k.id), 0) + 1;
        this.currentTeklif.kalemler.push({
            id: newId,
            kod: '',
            aciklama: '',
            birim: 'm²',
            miktar: 0,
            birimFiyat: 0,
            toplam: 0
        });
        
        this.renderExcelTable();
        this.calculateTotals();
    }

    deleteRow(index) {
        if (this.currentTeklif.kalemler && this.currentTeklif.kalemler.length > 1) {
            this.currentTeklif.kalemler.splice(index, 1);
            this.renderExcelTable();
            this.calculateTotals();
        }
    }

    updateKalem(index, field, value) {
        if (!this.currentTeklif.kalemler[index]) return;
        
        this.currentTeklif.kalemler[index][field] = value;
        
        // Calculate row total if miktar or birimFiyat changed
        if (field === 'miktar' || field === 'birimFiyat') {
            const kalem = this.currentTeklif.kalemler[index];
            kalem.toplam = kalem.miktar * kalem.birimFiyat;
            
            // Update the toplam field display
            const toplamInput = document.querySelector(`tr[data-index="${index}"] .toplam`);
            if (toplamInput) {
                toplamInput.value = this.formatCurrency(kalem.toplam);
            }
        }
        
        this.calculateTotals();
    }

    calculateTotals() {
        if (!this.currentTeklif?.kalemler) return;
        
        const araToplam = this.currentTeklif.kalemler.reduce((sum, kalem) => sum + (kalem.toplam || 0), 0);
        const indirimOrani = parseFloat(document.getElementById('indirimOrani')?.value || 0);
        const kdvOrani = parseFloat(document.getElementById('kdvOrani')?.value || 20);
        
        const indirimTutari = araToplam * (indirimOrani / 100);
        const indirimSonrasi = araToplam - indirimTutari;
        const kdvTutari = indirimSonrasi * (kdvOrani / 100);
        const genelToplam = indirimSonrasi + kdvTutari;
        
        // Update display
        document.getElementById('araToplam').textContent = this.formatCurrency(araToplam);
        document.getElementById('indirimTutari').textContent = this.formatCurrency(indirimTutari);
        document.getElementById('indirimSonrasi').textContent = this.formatCurrency(indirimSonrasi);
        document.getElementById('kdvTutari').textContent = this.formatCurrency(kdvTutari);
        document.getElementById('genelToplam').textContent = this.formatCurrency(genelToplam);
        
        // Update current teklif
        this.currentTeklif.toplam = genelToplam;
        this.currentTeklif.indirimOrani = indirimOrani;
        this.currentTeklif.kdvOrani = kdvOrani;
    }

    applyFilters() {
        const durumFilter = document.getElementById('durumFilter')?.value || 'all';
        const musteriFilter = document.getElementById('musteriFilter')?.value || 'all';
        const searchInput = document.getElementById('searchTeklif')?.value.toLowerCase() || '';

        this.filteredTeklifler = this.teklifler.filter(teklif => {
            const matchesDurum = durumFilter === 'all' || teklif.durum === durumFilter;
            const matchesMusteri = musteriFilter === 'all' || teklif.musteri === musteriFilter;
            const matchesSearch = !searchInput || 
                teklif.teklifNo.toLowerCase().includes(searchInput) ||
                teklif.musteri.toLowerCase().includes(searchInput) ||
                teklif.proje.toLowerCase().includes(searchInput);

            return matchesDurum && matchesMusteri && matchesSearch;
        });

        // Update table
        const tableBody = document.getElementById('teklifTableBody');
        if (tableBody) {
            tableBody.innerHTML = this.renderTeklifTable();
        }
    }

    updateSummaryCards() {
        const totalTeklifler = this.teklifler.length;
        const onaylananTeklifler = this.teklifler.filter(t => t.durum === 'Onaylandı').length;
        const bekleyenTeklifler = this.teklifler.filter(t => t.durum === 'Gönderildi' || t.durum === 'Hazırlanıyor').length;
        const toplamTutar = this.teklifler.reduce((sum, t) => sum + t.toplam, 0);

        document.getElementById('totalTeklifler').textContent = totalTeklifler;
        document.getElementById('onaylananTeklifler').textContent = onaylananTeklifler;
        document.getElementById('bekleyenTeklifler').textContent = bekleyenTeklifler;
        document.getElementById('toplamTutar').textContent = this.formatCurrency(toplamTutar);
    }

    generateTeklifNo() {
        const year = new Date().getFullYear();
        const nextNumber = this.teklifler.length + 1;
        return `TEK-${year}-${nextNumber.toString().padStart(3, '0')}`;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Action methods (placeholders)
    viewTeklif(id) {
        const teklif = this.teklifler.find(t => t.id === id);
        if (teklif) {
            this.currentTeklif = { ...teklif };
            this.currentView = 'edit';
            document.getElementById('list-view').classList.remove('active');
            document.getElementById('form-view').classList.add('active');
            document.getElementById('formTitle').textContent = 'Teklif Görüntüle - ' + teklif.teklifNo;
            this.populateForm(teklif);
            this.renderExcelTable();
            this.calculateTotals();
        }
    }

    editTeklif(id) {
        this.viewTeklif(id);
        document.getElementById('formTitle').textContent = 'Teklif Düzenle - ' + this.currentTeklif.teklifNo;
    }

    duplicateTeklif(id) {
        const teklif = this.teklifler.find(t => t.id === id);
        if (teklif) {
            this.currentTeklif = { 
                ...teklif, 
                id: null, 
                teklifNo: this.generateTeklifNo(),
                durum: 'Hazırlanıyor',
                tarih: new Date().toISOString().split('T')[0]
            };
            this.currentView = 'create';
            document.getElementById('list-view').classList.remove('active');
            document.getElementById('form-view').classList.add('active');
            document.getElementById('formTitle').textContent = 'Teklif Kopyala - ' + this.currentTeklif.teklifNo;
            this.populateForm(this.currentTeklif);
            this.renderExcelTable();
            this.calculateTotals();
        }
    }

    deleteTeklif(id) {
        if (confirm('Bu teklifi silmek istediğinizden emin misiniz?')) {
            this.teklifler = this.teklifler.filter(t => t.id !== id);
            this.applyFilters();
            this.updateSummaryCards();
            console.log(`Teklif silindi: ${id}`);
        }
    }

    downloadPDF(id) {
        console.log(`PDF indiriliyor: ${id}`);
    }

    saveTeklif() {
        // Get form data
        const formData = {
            teklifNo: document.getElementById('teklifNo').value,
            musteri: document.getElementById('musteri').value,
            proje: document.getElementById('proje').value,
            konum: document.getElementById('konum').value,
            tarih: document.getElementById('tarih').value,
            gecerlilik: document.getElementById('gecerlilik').value,
            durum: document.getElementById('durum').value,
            notlar: document.getElementById('notlar').value
        };

        // Update current teklif
        Object.assign(this.currentTeklif, formData);

        if (this.currentView === 'create') {
            // Add new teklif
            this.currentTeklif.id = Math.max(...this.teklifler.map(t => t.id), 0) + 1;
            this.teklifler.push(this.currentTeklif);
        } else {
            // Update existing teklif
            const index = this.teklifler.findIndex(t => t.id === this.currentTeklif.id);
            if (index !== -1) {
                this.teklifler[index] = this.currentTeklif;
            }
        }

        this.applyFilters();
        this.updateSummaryCards();
        this.showListView();
        
        console.log('Teklif kaydedildi:', this.currentTeklif);
    }

    generatePDF() {
        console.log('PDF oluşturuluyor...');
        this.saveTeklif();
    }

    showTemplateModal() {
        console.log('Şablon modalı açılacak');
    }

    generateReport() {
        console.log('Rapor oluşturuluyor');
    }

    exportToExcel() {
        console.log('Excel\'e aktarılıyor');
    }

    hideWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    addStyles() {
        // Remove existing styles
        const existingStyles = document.getElementById('teklif-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'teklif-styles';
        style.textContent = `
            .teklif-container {
                padding: 20px;
                background: #f8f9fa;
                min-height: calc(100vh - 200px);
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            /* Header */
            .teklif-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                flex-wrap: wrap;
                gap: 16px;
            }

            .header-left h2 {
                margin: 0 0 8px 0;
                color: #1f2937;
                font-size: 28px;
                font-weight: 700;
            }

            .header-left p {
                margin: 0;
                color: #6b7280;
                font-size: 16px;
            }

            .header-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                flex-shrink: 0;
            }

            .btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                text-decoration: none;
            }

            .btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }

            .btn-success {
                background: #2e7d32;
                color: white;
            }

            .btn-success:hover {
                background: #1b5e20;
            }

            .btn-outline {
                background: white;
                color: #2e7d32;
                border: 1px solid #2e7d32;
            }

            .btn-outline:hover {
                background: #2e7d32;
                color: white;
            }

            .btn-sm {
                padding: 6px 12px;
                font-size: 12px;
            }

            /* Summary Cards */
            .summary-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }

            .summary-card {
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 16px;
                transition: transform 0.2s ease;
            }

            .summary-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .summary-card .card-icon {
                width: 60px;
                height: 60px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
            }

            .total-teklifler .card-icon { background: linear-gradient(135deg, #2e7d32, #4caf50); }
            .onaylanan .card-icon { background: linear-gradient(135deg, #1976d2, #42a5f5); }
            .bekleyen .card-icon { background: linear-gradient(135deg, #f57c00, #ffb74d); }
            .toplam-tutar .card-icon { background: linear-gradient(135deg, #7b1fa2, #ab47bc); }

            .summary-card .card-content h3 {
                margin: 0 0 4px 0;
                font-size: 28px;
                font-weight: 700;
                color: #1f2937;
            }

            .summary-card .card-content p {
                margin: 0 0 8px 0;
                color: #6b7280;
                font-size: 14px;
            }

            .trend {
                font-size: 12px;
                font-weight: 600;
                padding: 4px 8px;
                border-radius: 4px;
            }

            .trend.positive {
                background: #dcfce7;
                color: #166534;
            }

            .trend.warning {
                background: #fef3c7;
                color: #d97706;
            }

            /* Content Area */
            .content-area {
                flex: 1;
                position: relative;
            }

            .view-content {
                display: none;
            }

            .view-content.active {
                display: block;
            }

            /* Filters */
            .teklif-filters {
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }

            .filter-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                align-items: end;
            }

            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .filter-group label {
                font-weight: 500;
                color: #374151;
                font-size: 14px;
            }

            .filter-select {
                padding: 10px 12px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 14px;
                background: white;
            }

            .search-box {
                position: relative;
                display: flex;
                align-items: center;
            }

            .search-box i {
                position: absolute;
                left: 12px;
                color: #9ca3af;
                z-index: 1;
            }

            .search-box input {
                width: 100%;
                padding: 10px 12px 10px 40px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 14px;
            }

            /* Teklif Table */
            .teklif-table-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
                max-width: 100%;
                overflow-x: auto;
            }

            .teklif-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
                min-width: 1200px;
            }

            .teklif-table th {
                background: #f8f9fa;
                padding: 16px 12px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
                font-weight: 600;
                color: #374151;
                white-space: nowrap;
            }

            .teklif-table td {
                padding: 16px 12px;
                border-bottom: 1px solid #f3f4f6;
                vertical-align: middle;
            }

            .teklif-row:hover {
                background: #f8f9fa;
            }

            .status-badge {
                display: inline-flex;
                align-items: center;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            }

            .status-badge.hazırlanıyor {
                background: #fef3c7;
                color: #d97706;
            }

            .status-badge.gönderildi {
                background: #dbeafe;
                color: #1d4ed8;
            }

            .status-badge.onaylandı {
                background: #dcfce7;
                color: #166534;
            }

            .status-badge.reddedildi {
                background: #fef2f2;
                color: #dc2626;
            }

            .actions {
                text-align: center;
                width: 160px;
                min-width: 160px;
                padding: 8px !important;
            }

            .action-buttons {
                display: flex;
                gap: 4px;
                justify-content: center;
                flex-wrap: wrap;
            }

            .btn-icon {
                width: 28px;
                height: 28px;
                border-radius: 6px;
                border: none;
                background: #f3f4f6;
                color: #6b7280;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                font-size: 11px;
            }

            .btn-icon:hover {
                background: #e5e7eb;
                color: #374151;
            }

            .btn-icon.danger:hover {
                background: #fef2f2;
                color: #dc2626;
            }

            /* Form View */
            .teklif-form-container {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
            }

            .form-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px;
                border-bottom: 1px solid #e5e7eb;
                flex-wrap: wrap;
                gap: 16px;
            }

            .form-header h3 {
                margin: 0;
                color: #1f2937;
                font-size: 24px;
                font-weight: 600;
            }

            .form-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }

            /* Teklif Info Form */
            .teklif-info-form {
                padding: 24px;
                border-bottom: 1px solid #e5e7eb;
            }

            .form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .form-group.full-width {
                grid-column: 1 / -1;
            }

            .form-group label {
                font-weight: 500;
                color: #374151;
                font-size: 14px;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                padding: 10px 12px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 14px;
                background: white;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #2e7d32;
                box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
            }

            /* Excel Table */
            .excel-table-container {
                padding: 24px;
            }

            .table-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }

            .table-header h4 {
                margin: 0;
                color: #1f2937;
                font-size: 18px;
                font-weight: 600;
            }

            .excel-table-wrapper {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 20px;
                max-width: 100%;
                overflow-x: auto;
            }

            .excel-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
                min-width: 900px;
            }

            .excel-table th {
                background: #f8f9fa;
                padding: 12px 8px;
                text-align: center;
                border-right: 1px solid #e5e7eb;
                font-weight: 600;
                color: #374151;
                white-space: nowrap;
            }

            .excel-table th:last-child {
                border-right: none;
            }

            .excel-table td {
                padding: 4px;
                border-right: 1px solid #e5e7eb;
                border-bottom: 1px solid #e5e7eb;
                vertical-align: middle;
            }

            .excel-table td:last-child {
                border-right: none;
            }

            .excel-input {
                width: 100%;
                border: none;
                padding: 8px;
                font-size: 14px;
                background: transparent;
                text-align: center;
            }

            .excel-input:focus {
                outline: 2px solid #2e7d32;
                background: #f0f9ff;
            }

            .excel-input.aciklama {
                text-align: left;
            }

            .excel-input.toplam {
                background: #f8f9fa;
                font-weight: 600;
                color: #059669;
            }

            .excel-row:hover {
                background: #f8f9fa;
            }

            /* Calculation Summary */
            .calculation-summary {
                background: #f8f9fa;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 20px;
                max-width: 400px;
                margin-left: auto;
            }

            .summary-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
            }

            .summary-row:last-child {
                border-bottom: none;
            }

            .summary-row.total {
                font-weight: 700;
                font-size: 18px;
                color: #1f2937;
                border-top: 2px solid #2e7d32;
                padding-top: 12px;
                margin-top: 8px;
            }

            .summary-row input {
                width: 50px;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                padding: 2px 4px;
                text-align: center;
                font-size: 12px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .teklif-header {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center;
                }

                .header-actions {
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .summary-cards {
                    grid-template-columns: repeat(2, 1fr);
                }

                .filter-row {
                    grid-template-columns: 1fr;
                }

                .form-grid {
                    grid-template-columns: 1fr;
                }

                .form-header {
                    flex-direction: column;
                    text-align: center;
                }

                .calculation-summary {
                    max-width: 100%;
                    margin: 0;
                }
            }

            @media (max-width: 480px) {
                .summary-cards {
                    grid-template-columns: 1fr;
                }

                .action-buttons {
                    flex-direction: column;
                }

                .excel-table-wrapper {
                    font-size: 12px;
                }
            }
        `;

        document.head.appendChild(style);

        // Make module globally accessible
        window.teklifModule = this;
    }
}
