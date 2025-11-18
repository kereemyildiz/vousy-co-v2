# Supabase Kurulum Rehberi

Bu dosya, Vousy.co projesi için Supabase veritabanı kurulumunu içerir.

## 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) web sitesine gidin
2. Yeni bir proje oluşturun
3. Proje URL'si ve Anon Key'i alın
4. `.env` dosyasına ekleyin:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAIL=admin@vousy.co
```

## 2. Veritabanı Tabloları

Supabase Dashboard > SQL Editor'a gidin ve aşağıdaki SQL komutlarını çalıştırın:

### Categories Tablosu

```sql
-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Categories are insertable by authenticated users"
  ON categories FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users"
  ON categories FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Categories are deletable by authenticated users"
  ON categories FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Products Tablosu

```sql
-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  shopier_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  specifications JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products are insertable by authenticated users"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products are updatable by authenticated users"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Products are deletable by authenticated users"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Blog Posts Tablosu

```sql
-- Blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT,
  read_time INTEGER DEFAULT 5,
  related_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for blog_posts
CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (true);

CREATE POLICY "Blog posts are insertable by authenticated users"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Blog posts are updatable by authenticated users"
  ON blog_posts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Blog posts are deletable by authenticated users"
  ON blog_posts FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Updated_at Trigger Function

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 3. Örnek Veri Ekleme

```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Klasikler', 'klasikler', 'Edebiyatın klasik eserleri'),
('Roman', 'roman', 'Modern ve klasik romanlar'),
('Bilim Kurgu', 'bilim-kurgu', 'Bilim kurgu kitapları'),
('Felsefe', 'felsefe', 'Felsefe kitapları');

-- Insert sample products (category_id'leri yukarıda oluşan UUID'lerle değiştirin)
INSERT INTO products (name, slug, description, price, category_id, specifications) VALUES
(
  '1984 - George Orwell',
  '1984-george-orwell',
  'Distopik bir gelecekte totaliter bir rejimin baskısı altında yaşayan Winston Smith''in hikayesi.',
  299.00,
  (SELECT id FROM categories WHERE slug = 'klasikler' LIMIT 1),
  '{"size": "50x70 cm", "paper": "300gsm Mat Kağıt", "frame": "Çerçevesiz"}'
);

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, content, excerpt, category, read_time) VALUES
(
  '1984: Distopyanın걸작ı',
  '1984-distopyanin-걸작ı',
  '<p>George Orwell''ın걸작ı 1984, modern distopik edebiyatın temel taşlarından biridir...</p>',
  'George Orwell''ın걸작ı 1984 hakkında derinlemesine bir inceleme',
  'Klasikler',
  8
);
```

## 4. Authentication Kurulumu

1. Supabase Dashboard > Authentication > Providers'a gidin
2. Email provider'ı etkinleştirin
3. Admin kullanıcısı oluşturun:
   - Dashboard > Authentication > Users > "Add user"
   - Email ve şifre girin
   - Bu email'i `.env` dosyasındaki `VITE_ADMIN_EMAIL` ile eşleştirin

## 5. Storage Kurulumu (Opsiyonel)

Resim yüklemek için Supabase Storage kullanabilirsiniz:

1. Dashboard > Storage > "New bucket"
2. Bucket adı: `product-images`
3. Public bucket olarak işaretleyin
4. Policies ekleyin (herkes okuyabilir, sadece authenticated users yükleyebilir)

## 6. Test

`.env` dosyasını oluşturduktan sonra:

```bash
npm run dev
```

Tarayıcıda açın ve:
- Ana sayfa çalışıyor mu kontrol edin
- `/login` sayfasından admin olarak giriş yapın
- `/admin` panelinden ürün ve blog yazısı ekleyin

## Notlar

- RLS (Row Level Security) politikaları herkese okuma, authenticated kullanıcılara yazma izni verir
- Admin kontrolü uygulama seviyesinde `VITE_ADMIN_EMAIL` ile yapılır
- Daha güvenli bir sistem için Supabase fonksiyonları ve roller kullanabilirsiniz
