# 📚 Vousy.co - Kitap Poster E-Ticaret Platformu

Edebiyatın başyapıtlarından tasarlanmış özel posterler satan modern, elegant bir e-ticaret web uygulaması.

## ✨ Özellikler

### Kullanıcı Özellikleri
- 🎨 **Elegant Tasarım**: Framer Motion animasyonları ve özel tasarım
- 🖼️ **Ürün Kataloğu**: Kategorilere göre filtrelenebilir poster galerisi
- 📱 **Responsive**: Tüm cihazlarda mükemmel görünüm
- 🛒 **Shopier Entegrasyonu**: Güvenli ödeme için Shopier yönlendirmesi
- 📝 **Blog**: Kitaplar ve posterler hakkında içerik
- 🔍 **SEO Optimizasyonu**: Arama motorları için optimize edilmiş
- 🇹🇷 **Türkçe**: Tam Türkçe dil desteği

### Admin Özellikleri
- 👨‍💼 **Admin Panel**: Ürün ve blog yönetimi
- ➕ **CRUD İşlemleri**: Ürün ekleme, düzenleme, silme
- 📰 **Blog Yönetimi**: Blog yazıları oluşturma ve yönetme
- 📂 **Kategori Sistemi**: Ürünleri kategorilere ayırma
- 🔐 **Güvenli Giriş**: Supabase Authentication

## 🛠️ Teknoloji Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Payment**: Shopier Integration

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd vousy-co-v2
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables oluşturun**
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAIL=admin@vousy.co
```

4. **Supabase kurulumu**

`SUPABASE_SETUP.md` dosyasındaki talimatları takip ederek:
- Supabase projesi oluşturun
- Veritabanı tablolarını oluşturun
- Admin kullanıcısı ekleyin

5. **Uygulamayı başlatın**
```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

## 📁 Proje Yapısı

```
vousy-co-v2/
├── public/              # Static dosyalar
├── src/
│   ├── assets/         # Resimler, posterler
│   ├── components/     # React bileşenleri
│   │   ├── ui/        # Shadcn/ui bileşenleri
│   │   ├── layout/    # Header, Footer
│   │   └── common/    # Ortak bileşenler
│   ├── contexts/      # React contexts (Auth)
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Sayfa bileşenleri
│   │   ├── admin/    # Admin panel sayfaları
│   │   └── ...       # Genel sayfalar
│   ├── services/      # API servisleri (Supabase)
│   ├── App.jsx        # Ana uygulama
│   ├── main.jsx       # Entry point
│   └── index.css      # Global stiller
├── .env.example       # Environment variables örneği
├── SUPABASE_SETUP.md  # Supabase kurulum rehberi
└── README.md          # Bu dosya
```

## 📱 Sayfalar

### Genel Sayfalar
- `/` - Ana sayfa (Hero, öne çıkan ürünler)
- `/products` - Ürün listesi (filtreleme ile)
- `/product/:id` - Ürün detay sayfası
- `/blog` - Blog yazıları listesi
- `/blog/:slug` - Blog yazısı detayı
- `/about` - Hakkımızda

### Admin Sayfaları (Korumalı)
- `/login` - Admin girişi
- `/admin` - Dashboard
- `/admin/products` - Ürün yönetimi
- `/admin/blog` - Blog yönetimi

## 🎨 Özelleştirme

### Renkler
`tailwind.config.js` ve `src/index.css` dosyalarında renk paletini değiştirebilirsiniz.

### Fontlar
Google Fonts'tan Inter (sans) ve Playfair Display (serif) kullanılıyor.

### Logo
`src/components/layout/Header.jsx` ve `Footer.jsx` dosyalarında logoyu özelleştirebilirsiniz.

## 🔒 Güvenlik

- Supabase Row Level Security (RLS) politikaları
- Authentication için Supabase Auth
- Admin kontrolü email bazlı
- XSS koruması için React'ın built-in escape mekanizması

## 📦 Build

Production build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

## 🚀 Deployment

### Vercel (Önerilen)
1. GitHub'a push yapın
2. Vercel'de yeni proje oluşturun
3. Environment variables ekleyin
4. Deploy edin

### Netlify
1. `npm run build`
2. `dist/` klasörünü deploy edin
3. Environment variables ekleyin

## 📝 Lisans

Bu proje MIT lisansı altındadır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📧 İletişim

Sorularınız için: info@vousy.co

---

**Vousy.co** - Sevdiğiniz kitapları duvarlarınızda yaşatın 📚✨
