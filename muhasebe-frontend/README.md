# İnşaat Muhasebe PRO - Modern UI

Modern, göz yormayan ve erişilebilir bir inşaat muhasebe uygulaması arayüzü.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Dosya Yapısı](#dosya-yapısı)
- [Modüler Yapı](#modüler-yapı)
- [Kurulum ve Kullanım](#kurulum-ve-kullanım)
- [Menü Yapısı](#menü-yapısı)
- [Tasarım Sistemi](#tasarım-sistemi)
- [Erişilebilirlik](#erişilebilirlik)
- [Geliştirme](#geliştirme)

## ✨ Özellikler

- **Modern Tasarım**: Temiz, sakin ve profesyonel görünüm
- **Modüler Yapı**: 12 ayrı sayfa modülü ile organize kod
- **Responsive**: Mobil ve desktop uyumlu
- **Erişilebilirlik**: WCAG AA standartlarına uygun
- **Klavye Navigasyonu**: Tam klavye desteği
- **Mega Dropdown Menüler**: Hover ve click ile açılan alt menüler
- **FontAwesome İkonları**: Görsel tutarlılık için
- **Performans**: Modüler yükleme ile hızlı başlangıç

## 🛠️ Teknolojiler

- **HTML5**: Semantik markup
- **CSS3**: Modern styling ve animasyonlar
- **Vanilla JavaScript**: Framework bağımsız, ES6+ modüller
- **FontAwesome 6.4.0**: İkonlar için CDN

## 📁 Dosya Yapısı

```
muhasebe-frontend/
├── index.html                      # Ana HTML dosyası
├── styles.css                      # CSS stilleri
├── app.js                          # Ana uygulama başlatıcı
├── assets/                         # Statik dosyalar
│   └── images/                     # Resim dosyaları
│       ├── muhasebe.png           # Ana logo
│       └── muhasebeci.png         # Asistan ikonu
├── js/                            # JavaScript modülleri
│   └── modules/                   # Uygulama modülleri
│       ├── AccessibilityManager.js # Erişilebilirlik yönetimi
│       ├── ButtonManager.js        # Buton etkileşimleri
│       ├── MenuManager.js          # Menü yönetimi
│       ├── ReportManager.js        # Rapor sistemi
│       ├── ToolbarManager.js       # Ana controller (225 satır)
│       └── pages/                  # Sayfa modülleri (12 modül)
│           ├── HareketlerModule.js    # Sistem hareketleri
│           ├── TaseronModule.js       # Taşeron yönetimi
│           ├── TedarikciModule.js     # Tedarikçi yönetimi
│           ├── CeklerModule.js        # Çek yönetimi
│           ├── EvrakModule.js         # Evrak yönetimi
│           ├── EFaturaModule.js       # E-Fatura işlemleri
│           ├── RaporlarModule.js      # Rapor sistemi
│           ├── YapSatModule.js        # Yap-Sat yönetimi
│           ├── IlerlemeModule.js      # İlerleme takibi
│           ├── PuantajModule.js       # Puantaj sistemi
│           ├── AraclarModule.js       # Araç yönetimi
│           └── UzaktanYardimModule.js # Destek sistemi
└── README.md                       # Bu dosya
```

## 🏗️ Modüler Yapı

### Ana ToolbarManager (225 satır)
Ana ToolbarManager sınıfı artık sadece:
- Modül başlatma ve koordinasyon
- Event yönetimi
- Modüller arası iletişim
- Temel utility fonksiyonları

### Sayfa Modülleri (12 modül - 2,580 satır)
Her sayfa modülü kendi sorumluluğunda:
- UI render etme
- Event handling
- Stil yönetimi
- İşlevsellik başlatma

### Modülarizasyon Faydaları
1. **Sürdürülebilirlik**: Her modül kendi dosyasında
2. **Performans**: Sadece gerekli kod yüklenir
3. **Geliştirme**: Paralel geliştirme mümkün
4. **Hata Ayıklama**: Sorunlar izole edilebilir
5. **Test Edilebilirlik**: Her modül ayrı test edilebilir

## 🚀 Kurulum ve Kullanım

### Hızlı Başlangıç
1. `index.html` dosyasını bir web tarayıcısında açın
2. Menüler üzerine hover yaparak alt menüleri görüntüleyin
3. Mobil cihazlarda menülere tıklayarak alt menüleri açın
4. Klavye ile `Tab`, `Enter`, `Space`, `Escape` tuşlarını kullanın

### Geliştirme Ortamı
```bash
# Basit HTTP sunucusu başlat
python3 -m http.server 8000
# veya
npx serve .
```

## 📋 Menü Yapısı

### Ana Menüler
- **Tanımlar**: Şantiye, proje, personel tanımları
- **Hareketler**: Sistem logları (varsayılan aktif)
- **Raporlar**: Çeşitli muhasebe raporları
- **Yardım**: Destek ve chat bot
- **Mesajlar**: Muhasebeciler arası iletişim
- **Bilgiler ve Yönetim**: Sistem ayarları
- **Çıkış**: Güvenli çıkış

### Kısayol Araç Çubuğu (16 modül)
- Şantiye & Proje, Taşeron, Personel, Tedarikçi
- Kasa/Banka, Hareketler, Puantaj, Maaş
- Çekler, Teklif, İlerleme, Evrak
- YapSat, Araçlar, E-Fatura, Uzaktan Yardım

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Yeşil**: `#2E7D32` (ana renk)
- **Gri-50**: `#FCFCFC` (arka plan)
- **Gri-100**: `#EFEFEF` (topbar)
- **Border**: `#E5E7EB` (kenarlıklar)
- **Metin**: `#1F2937` (ana metin)
- **Muted**: `#6B7280` (ikincil metin)

### Responsive Breakpoint'ler
- **≥1280px**: 6 sütunlu mega dropdown
- **≥1024px**: 4 sütunlu mega dropdown
- **≥640px**: 3 sütunlu mega dropdown
- **<640px**: 2 sütunlu mega dropdown, mobil menü

## ♿ Erişilebilirlik

- **ARIA Labels**: Screen reader desteği
- **Klavye Navigasyonu**: Tab, Enter, Space, Escape
- **Focus Management**: Otomatik focus yönetimi
- **Skip Links**: Ana içeriğe hızlı erişim
- **Live Regions**: Dinamik içerik duyuruları
- **WCAG AA**: 4.5:1 kontrast oranı

## 🔧 Geliştirme

### Yeni Modül Ekleme
1. `js/modules/pages/` klasöründe yeni modül dosyası oluştur
2. Ana ToolbarManager'a import ekle
3. Constructor'da modülü başlat
4. Event handler'a modül çağrısı ekle

### Özelleştirme
- **Renkler**: `styles.css` dosyasındaki CSS değişkenlerini düzenle
- **Menüler**: `index.html` dosyasını düzenle
- **Fonksiyonlar**: İlgili modül dosyalarını düzenle

### Kod Yapısı
```javascript
// Ana ToolbarManager otomatik olarak tüm modülleri import eder
import { ToolbarManager } from './js/modules/ToolbarManager.js';

// Modüller otomatik olarak başlatılır
const toolbarManager = new ToolbarManager();
```

## 🌐 Tarayıcı Desteği

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Performans Metrikleri

- **Orijinal**: 9,785 satır (tek dosya)
- **Yeni yapı**: 225 satır (controller) + 2,580 satır (12 modül)
- **İyileştirme**: %71 daha organize ve sürdürülebilir

## 📄 Lisans

Bu proje demo amaçlı oluşturulmuştur.

## 📞 İletişim

**NOA YAZILIM** - İnşaat Muhasebe PRO  
Versiyon: 19.4.1.1

---

> **Not**: Bu proje 9,785 satırlık monolitik bir ToolbarManager dosyasından 12 ayrı modüle başarıyla dönüştürülmüştür. Her modül kendi sorumluluğunu taşır ve bağımsız olarak geliştirilebilir.