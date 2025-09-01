// Hareketler Sayfası JavaScript
class HareketlerManager {
    constructor() {
        this.logs = [];
        this.filteredLogs = [];
        this.currentSort = 'newest';
        this.filters = {
            startDate: null,
            endDate: null,
            actionType: '',
            user: ''
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadLogsFromStorage();
        this.setDefaultDateRange();
        this.updateDateTime();
        this.applyFilters();
        
        // Her dakika tarih/saat güncelle
        setInterval(() => this.updateDateTime(), 60000);
    }

    setupEventListeners() {
        // Filtre inputları - otomatik filtreleme
        document.getElementById('startDate').addEventListener('change', () => this.applyFilters());
        document.getElementById('endDate').addEventListener('change', () => this.applyFilters());
        document.getElementById('actionType').addEventListener('change', () => this.applyFilters());
        // Kullanıcı filtresi kaldırıldı

        // Enter tuşu ile filtreleme
        // Kullanıcı filtresi kaldırıldı
    }

    updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Istanbul'
        };
        
        const dateTimeString = now.toLocaleString('tr-TR', options);
        document.getElementById('currentDateTime').textContent = `Sunucu Tarihi: ${dateTimeString}`;
    }

    setDefaultDateRange() {
        const today = new Date();
        // 7 günlük görünüm için farkı 6 gün tut (bugün dahil 7 gün)
        const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
        
        document.getElementById('endDate').value = today.toISOString().split('T')[0];
        document.getElementById('startDate').value = weekAgo.toISOString().split('T')[0];
        
        this.filters.startDate = weekAgo;
        this.filters.endDate = today;
    }

    loadLogsFromStorage() {
        // LocalStorage'dan logları yükle, yoksa sabit 7 günlük dummy log üret
        const storedLogs = localStorage.getItem('muhasebeLoglar');
        if (storedLogs) {
            this.logs = JSON.parse(storedLogs).map(log => ({
                ...log,
                timestamp: new Date(log.timestamp)
            }));

            if (!Array.isArray(this.logs) || this.logs.length !== 45) {
                this.generateInitialLogs();
                this.saveLogsToStorage();
            }
        } else {
            this.generateInitialLogs();
            this.saveLogsToStorage();
        }
    }

    generateInitialLogs() {
        // 14 kayıt Temmuz 2025, 31 kayıt Ağustos 2025
        const users = ['Ana Kullanıcı', 'Muhasebe Uzmanı', 'Proje Yöneticisi', 'Sistem Yöneticisi'];
        const companies = ['Volass İnşaat', 'XYZ Malzeme Ltd.', 'ABC İnşaat', 'DEF Yapı A.Ş.'];
        const projects = ['Bahçelievler Konut Projesi', 'Ataşehir Plaza', 'Kadıköy Residence', 'Merkez Ofis'];
        const templates = [
            { type: 'create', title: 'Yeni Tedarikçi Eklendi', desc: 'tedarikçi olarak sisteme eklendi' },
            { type: 'update', title: 'Şantiye Bilgileri Güncellendi', desc: 'şantiye bilgileri güncellendi' },
            { type: 'delete', title: 'Kayıt Silindi', desc: 'kayıt sistemden kaldırıldı' },
            { type: 'cancel', title: 'Proje/Sözleşme İptali', desc: 'sözleşme iptali' },
            { type: 'login', title: 'Sisteme Giriş', desc: 'Kullanıcı sisteme başarıyla giriş yaptı' },
            { type: 'export', title: 'Rapor Dışa Aktarıldı', desc: 'raporu Excel formatında dışa aktarıldı' },
            { type: 'update', title: 'Proje Bütçesi Güncellendi', desc: 'proje bütçe revizyonu yapıldı' }
        ];

        const julyDates = Array.from({ length: 14 }, (_, i) => new Date(2025, 6, i + 1)); // Temmuz (6)
        const augDates = Array.from({ length: 31 }, (_, i) => new Date(2025, 7, i + 1)); // Ağustos (7)
        const allDates = [...julyDates, ...augDates];

        this.logs = allDates.map((date, idx) => {
            const hour = 9 + Math.floor(Math.random() * 8);
            const minute = Math.floor(Math.random() * 60);
            date.setHours(hour, minute, 0, 0);
            const t = templates[idx % templates.length];
            const user = users[idx % users.length];
            const company = companies[idx % companies.length];
            const project = projects[idx % projects.length];
            const description = t.type === 'login' ? t.desc : `${company} ${t.desc}`;
            return {
                id: idx + 1,
                timestamp: new Date(date),
                user,
                action: t.type,
                title: t.title,
                description,
                company,
                project,
                status: t.type === 'delete' ? 'error' : t.type === 'cancel' ? 'warning' : 'success'
            };
        });

        this.logs.sort((a, b) => b.timestamp - a.timestamp);
    }

    saveLogsToStorage() {
        localStorage.setItem('muhasebeLoglar', JSON.stringify(this.logs));
    }

    getRandomStatus() {
        const statuses = ['success', 'warning', 'error'];
        const weights = [0.7, 0.2, 0.1]; // %70 başarılı, %20 uyarı, %10 hata
        
        const random = Math.random();
        let sum = 0;
        
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i];
            if (random <= sum) {
                return statuses[i];
            }
        }
        
        return 'success';
    }

    updateFilters() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const actionType = document.getElementById('actionType').value;
        const userFilter = '';

        // Aylık filtreleme kontrolü: Başlangıç ve bitiş aynı ayda olmalı
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (start.getFullYear() !== end.getFullYear() || start.getMonth() !== end.getMonth()) {
                alert('Sadece tek bir aya ait veriler gösterilir. Lütfen başlangıç ve bitiş tarihlerini aynı ay içinde seçin.');
                // Bitiş tarihini başlangıç ayının son gününe çek
                const monthEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0);
                document.getElementById('endDate').value = monthEnd.toISOString().split('T')[0];
            }
        }

        this.filters = {
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate + 'T23:59:59') : null,
            actionType: actionType,
            user: userFilter
        };
    }

    applyFilters() {
        this.showLoading();
        
        // Gerçek uygulamada API çağrısı simülasyonu
        setTimeout(() => {
            this.updateFilters();
            
            this.filteredLogs = this.logs.filter(log => {
                // Tarih filtresi
                if (this.filters.startDate && log.timestamp < this.filters.startDate) {
                    return false;
                }
                if (this.filters.endDate && log.timestamp > this.filters.endDate) {
                    return false;
                }
                
                // Hareket türü filtresi
                if (this.filters.actionType && log.action !== this.filters.actionType) {
                    return false;
                }
                
                // Kullanıcı filtresi kaldırıldı
                
                return true;
            });

            // Sıralama uygula
            this.applySorting();
            this.renderTimeline();
            this.updateLogCount();
            this.hideLoading();
        }, 500);
    }

    applySorting() {
        if (this.currentSort === 'newest') {
            this.filteredLogs.sort((a, b) => b.timestamp - a.timestamp);
        } else {
            this.filteredLogs.sort((a, b) => a.timestamp - b.timestamp);
        }
    }

    setSortOrder(order) {
        this.currentSort = order;
        
        // Buton durumlarını güncelle
        document.getElementById('sortNewest').classList.toggle('active', order === 'newest');
        document.getElementById('sortOldest').classList.toggle('active', order === 'oldest');
        
        this.applySorting();
        this.renderTimeline();
    }

    renderTimeline() {
        const timeline = document.getElementById('timeline');
        const emptyState = document.getElementById('emptyState');
        
        if (this.filteredLogs.length === 0) {
            timeline.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        timeline.style.display = 'block';
        emptyState.style.display = 'none';
        
        timeline.innerHTML = this.filteredLogs.map(log => this.createTimelineItem(log)).join('');
    }

    createTimelineItem(log) {
        const date = log.timestamp.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        const time = log.timestamp.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Rozette hareket türü yazsın (ör. Oluşturma, Güncelleme, Silme, Giriş, Çıkış, Dışa Aktarım)
        const actionLabelMap = {
            create: 'Oluşturma',
            update: 'Güncelleme',
            delete: 'Silme',
            cancel: 'İptal',
            login: 'Giriş',
            logout: 'Çıkış',
            export: 'Dışa Aktarım'
        };
        let actionLabel = actionLabelMap[log.action] || 'Hareket';
        const actionBadgeClass = `badge-${log.action}`;

        return `
            <div class="timeline-item">
                <div class="timeline-header">
                    <div class="timeline-content">
                        <div class="timeline-action">
                            <div class="action-icon ${log.action}">
                                <i class="fa-solid ${this.getActionIcon(log.action)}"></i>
                            </div>
                            ${log.title}
                            <span class="status-badge ${actionBadgeClass}">${actionLabel}</span>
                        </div>
                        <div class="timeline-description">${log.description}</div>
                        <div class="timeline-details">
                            <div class="detail-item">
                                <div class="detail-label">Firma</div>
                                <div class="detail-value">${log.company}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Proje</div>
                                <div class="detail-value">${log.project}</div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="timeline-time">
                        <div class="timeline-date">${date}</div>
                        <div class="timeline-clock">${time}</div>
                    </div>
                </div>
            </div>
        `;
    }

    getActionIcon(action) {
        const icons = {
            create: 'fa-plus',
            update: 'fa-pen',
            delete: 'fa-trash',
            cancel: 'fa-ban',
            login: 'fa-sign-in-alt',
            logout: 'fa-sign-out-alt',
            export: 'fa-download'
        };
        return icons[action] || 'fa-circle';
    }

    updateLogCount() {
        // Seçili bitiş tarihi ayındaki toplam hareket sayısı
        const end = this.filters.endDate || new Date();
        const monthStart = new Date(end.getFullYear(), end.getMonth(), 1);
        const monthEnd = new Date(end.getFullYear(), end.getMonth() + 1, 0, 23, 59, 59, 999);
        const monthlyLogs = this.logs.filter(log => log.timestamp >= monthStart && log.timestamp <= monthEnd);
        document.getElementById('logCount').textContent = `Bu ay: ${monthlyLogs.length} hareket`;
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('timelineContainer').style.display = 'none';
        document.getElementById('emptyState').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('timelineContainer').style.display = 'block';
    }

    refreshLogs() {
        // Backend olmadığı için sadece mevcut logları yeniden yükle
        // Gerçek uygulamada burada API çağrısı yapılacak
        this.loadLogsFromStorage();
        this.applyFilters();
    }

    clearFilters() {
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('actionType').value = '';
        document.getElementById('userFilter').value = '';
        
        this.setDefaultDateRange();
        this.applyFilters();
    }

    exportLogs() {
        // Filtrelenmiş kayıtları Excel (xlsx) olarak indir
        const actionLabelMap = { create: 'Oluşturma', update: 'Güncelleme', delete: 'Silme', cancel: 'İptal', login: 'Giriş', logout: 'Çıkış', export: 'Dışa Aktarım' };
        const rows = this.filteredLogs.map(log => ({
            Tarih: log.timestamp.toLocaleDateString('tr-TR'),
            Saat: log.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            'Hareket Türü': actionLabelMap[log.action] || 'Hareket',
            Hareket: log.title,
            Açıklama: log.description,
            Firma: log.company,
            Proje: log.project
        }));
        if (rows.length === 0) {
            alert('Seçili filtrelere uygun indirilecek kayıt bulunamadı.');
            return;
        }
        this.downloadAsXLSX(rows, `filtreli_sistem_hareketleri_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    exportAllLogs() {
        const actionLabelMap = { create: 'Oluşturma', update: 'Güncelleme', delete: 'Silme', cancel: 'İptal', login: 'Giriş', logout: 'Çıkış', export: 'Dışa Aktarım' };
        const rows = this.logs
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(log => ({
                Tarih: log.timestamp.toLocaleDateString('tr-TR'),
                Saat: log.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                'Hareket Türü': actionLabelMap[log.action] || 'Hareket',
                Hareket: log.title,
                Açıklama: log.description,
                Firma: log.company,
                Proje: log.project
            }));
        if (rows.length === 0) {
            alert('İndirilecek kayıt bulunamadı.');
            return;
        }
        this.downloadAsXLSX(rows, `tum_sistem_hareketleri_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    // XLSX (gerçek Excel dosyası) oluşturma - SheetJS kullanımı
    downloadAsXLSX(rows, filename) {
        try {
            // Buton devre dışı bırak ve loading göster
            const exportButtons = document.querySelectorAll('[onclick*="export"]');
            exportButtons.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.6';
                btn.style.cursor = 'not-allowed';
            });

            // Kısa gecikme ile Excel oluştur (UI donmasını önle)
            setTimeout(() => {
                try {
                    const worksheet = XLSX.utils.json_to_sheet(rows);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hareketler');
                    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    URL.revokeObjectURL(url);
                } catch (e) {
                    console.error('XLSX export error:', e);
                    alert('Excel dosyası oluşturulurken bir hata oluştu.');
                } finally {
                    // Butonları tekrar aktif et
                    exportButtons.forEach(btn => {
                        btn.disabled = false;
                        btn.style.opacity = '1';
                        btn.style.cursor = 'pointer';
                    });
                }
            }, 100);
        } catch (e) {
            console.error('XLSX export error:', e);
            alert('Excel dosyası oluşturulurken bir hata oluştu.');
        }
    }

    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');
        
        return '\ufeff' + csvContent; // UTF-8 BOM for Turkish characters
    }
}

// Global fonksiyonlar
function setSortOrder(order) {
    window.hareketlerManager.setSortOrder(order);
}

function applyFilters() {
    window.hareketlerManager.applyFilters();
}

function refreshLogs() {
    window.hareketlerManager.refreshLogs();
}

function clearFilters() {
    window.hareketlerManager.clearFilters();
}

function exportLogs() {
    window.hareketlerManager.exportLogs();
}

function exportFilteredLogs() {
    window.hareketlerManager.exportLogs();
}

function exportAllLogs() {
    window.hareketlerManager.exportAllLogs();
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    window.hareketlerManager = new HareketlerManager();
    
    // Varsayılan sıralama: yeniden eskiye
    setSortOrder('newest');
});
