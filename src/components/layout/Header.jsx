import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAdmin } = useAuth()

  const navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Ürünler', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Hakkımızda', path: '/about' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary-600" />
            <span className="font-serif text-2xl font-bold text-gray-900">Vousy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive(item.path)
                    ? 'text-primary-600'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Admin Panel
                </Button>
              </Link>
            )}
            {user ? (
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm">
                  Giriş Yap
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Admin Panel
              </Link>
            )}
            <div className="px-4 pt-2">
              {user ? (
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </Button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Giriş Yap
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
