# İnşaat Muhasebe PRO - Giriş Sistemi

## Giriş Bilgileri

### Demo Hesapları:
1. **Yönetici Hesabı**
   - Kullanıcı Adı: `admin`
   - Şifre: `123456`
   - Rol: Sistem Yöneticisi

2. **Muhasebe Hesabı**
   - Kullanıcı Adı: `muhasebe`
   - Şifre: `123456`
   - Rol: Muhasebe Uzmanı

3. **Demo Hesabı**
   - Kullanıcı Adı: `demo`
   - Şifre: `demo123`
   - Rol: Demo Kullanıcı

## Kullanım

1. Uygulamayı başlatmak için `login.html` dosyasını açın
2. Yukarıdaki demo hesaplarından birini kullanarak giriş yapın
3. "Beni hatırla" seçeneği ile oturum süresini uzatabilirsiniz
4. Başarılı girişten sonra ana uygulamaya yönlendirileceksiniz

## Güvenlik Özellikleri

- **Oturum Yönetimi**: LocalStorage tabanlı güvenli oturum
- **Hesap Kilitleme**: 3 başarısız girişten sonra 5 dakika kilitleme
- **Şifre Gizleme**: Şifre görünürlüğü toggle özelliği
- **Otomatik Çıkış**: Oturum süresi dolduğunda otomatik yönlendirme

## Dosya Yapısı

```
muhasebe-frontend/
├── login.html                 # Giriş sayfası
├── index.html                 # Ana uygulama
├── js/modules/LoginManager.js # Giriş yönetim modülü
└── app.js                     # Ana uygulama başlatıcı
```

## Geliştirme Notları

- Login sistemi modüler yapıda tasarlanmıştır
- Responsive tasarım ile tüm cihazlarda uyumlu
- Modern CSS özellikleri kullanılmıştır
- Güvenlik kontrolleri client-side olarak implementedir
- Production ortamında server-side doğrulama eklenmeli
