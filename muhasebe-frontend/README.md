# İnşaat Muhasebe PRO - Modern UI

Modern, göz yormayan ve erişilebilir bir inşaat muhasebe uygulaması arayüzü.

## Özellikler

- **Modern Tasarım**: Temiz, sakin ve profesyonel görünüm
- **Responsive**: Mobil ve desktop uyumlu
- **Erişilebilirlik**: WCAG AA standartlarına uygun
- **Klavye Navigasyonu**: Tam klavye desteği
- **Mega Dropdown Menüler**: Hover ve click ile açılan alt menüler
- **FontAwesome İkonları**: Görsel tutarlılık için

## Teknolojiler

- **HTML5**: Semantik markup
- **CSS3**: Modern styling ve animasyonlar
- **Vanilla JavaScript**: Framework bağımsız
- **FontAwesome 6.4.0**: İkonlar için CDN

## Dosya Yapısı

```
muhasebe-frontend/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── app.js             # JavaScript fonksiyonları
├── is.txt             # Proje gereksinimleri
└── README.md          # Bu dosya
```

## Kullanım

1. `index.html` dosyasını bir web tarayıcısında açın
2. Menüler üzerine hover yaparak alt menüleri görüntüleyin
3. Mobil cihazlarda menülere tıklayarak alt menüleri açın
4. Klavye ile `Tab`, `Enter`, `Space`, `Escape` tuşlarını kullanın

## Menü Yapısı

### Ana Menüler
- **Tanımlar**: Şantiye, proje, personel tanımları
- **Hareketler**: Sistem logları (varsayılan aktif)
- **Raporlar**: Çeşitli muhasebe raporları
- **Yardım**: Destek ve chat bot
- **Mesajlar**: Muhasebeciler arası iletişim
- **Bilgiler ve Yönetim**: Sistem ayarları
- **Çıkış**: Güvenli çıkış

### Kısayol Araç Çubuğu
16 farklı hızlı erişim butonu:
- Şantiye & Proje
- Taşeron
- Personel
- Tedarikçi
- Kasa/Banka
- Hareketler
- Puantaj
- Maaş
- Çekler
- Teklif
- İlerleme
- Evrak
- YapSat
- Araçlar
- E-Fatura
- Uzaktan Yardım

## Renk Paleti

- **Yeşil**: `#2E7D32` (ana renk)
- **Gri-50**: `#FCFCFC` (arka plan)
- **Gri-100**: `#EFEFEF` (topbar)
- **Border**: `#E5E7EB` (kenarlıklar)
- **Metin**: `#1F2937` (ana metin)
- **Muted**: `#6B7280` (ikincil metin)

## Responsive Breakpoint'ler

- **≥1280px**: 6 sütunlu mega dropdown
- **≥1024px**: 4 sütunlu mega dropdown
- **≥640px**: 3 sütunlu mega dropdown
- **<640px**: 2 sütunlu mega dropdown, mobil menü

## Erişilebilirlik Özellikleri

- **ARIA Labels**: Screen reader desteği
- **Klavye Navigasyonu**: Tab, Enter, Space, Escape
- **Focus Management**: Otomatik focus yönetimi
- **Skip Links**: Ana içeriğe hızlı erişim
- **Live Regions**: Dinamik içerik duyuruları
- **WCAG AA**: 4.5:1 kontrast oranı

## Tarayıcı Desteği

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Geliştirme

### Yerel Geliştirme
```bash
# Basit HTTP sunucusu başlat
python3 -m http.server 8000
# veya
npx serve .
```

### Özelleştirme
- Renkleri değiştirmek için `styles.css` dosyasındaki CSS değişkenlerini düzenleyin
- Yeni menü öğeleri eklemek için `index.html` dosyasını düzenleyin
- JavaScript fonksiyonlarını `app.js` dosyasında özelleştirin

## Lisans

Bu proje demo amaçlı oluşturulmuştur.

## İletişim

NOA YAZILIM - İnşaat Muhasebe PRO
Versiyon: 19.4.1.1
