import { Link } from 'react-router-dom'
import { ShoppingBag, Instagram, Twitter, Facebook, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary-400" />
              <span className="font-serif text-2xl font-bold text-white">Vousy</span>
            </Link>
            <p className="text-sm text-gray-400">
              Kitap posterlerinde uzman. Sevdiğiniz kitapları duvarlarınızda yaşatın.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary-400 transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-primary-400 transition-colors">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary-400 transition-colors">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=klasik" className="text-sm hover:text-primary-400 transition-colors">
                  Klasikler
                </Link>
              </li>
              <li>
                <Link to="/products?category=roman" className="text-sm hover:text-primary-400 transition-colors">
                  Roman
                </Link>
              </li>
              <li>
                <Link to="/products?category=bilim-kurgu" className="text-sm hover:text-primary-400 transition-colors">
                  Bilim Kurgu
                </Link>
              </li>
              <li>
                <Link to="/products?category=felsefe" className="text-sm hover:text-primary-400 transition-colors">
                  Felsefe
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@vousy.co" className="hover:text-primary-400 transition-colors">
                  info@vousy.co
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Sorularınız için bize ulaşın
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Vousy. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
