import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, ShoppingBag, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { isMockMode } from '@/services/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (error) {
      setError(error.message || 'Giriş yapılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="font-serif text-3xl font-bold text-gray-900">Vousy</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            Admin Girişi
          </h1>
          <p className="text-gray-600">
            Yönetim paneline erişmek için giriş yapın
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Giriş Yap</CardTitle>
            <CardDescription>
              E-posta ve şifrenizi girin
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isMockMode && (
              <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md text-sm">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block mb-1">DEMO MOD - Test Giriş Bilgileri:</strong>
                    <p className="text-xs">
                      <strong>E-posta:</strong> herhangi bir email (örn: admin@test.com)<br />
                      <strong>Şifre:</strong> en az 6 karakter (örn: 123456)
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-posta
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@vousy.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Şifre
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  'Giriş yapılıyor...'
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Giriş Yap
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-primary-600 hover:text-primary-700">
                Ana sayfaya dön
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
