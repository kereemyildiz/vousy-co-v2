import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Package, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { productService } from '@/services/supabase'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      const products = await productService.getAll()
      // Get first 6 products as featured
      setFeaturedProducts(products.slice(0, 6))
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: Star,
      title: 'Yüksek Kalite',
      description: 'Premium malzemelerle üretilmiş posterler'
    },
    {
      icon: Package,
      title: 'Güvenli Paketleme',
      description: 'Ürünleriniz özenle paketlenir'
    },
    {
      icon: Truck,
      title: 'Hızlı Kargo',
      description: 'Türkiye geneline hızlı teslimat'
    },
    {
      icon: Shield,
      title: 'Güvenli Alışveriş',
      description: '100% güvenli ödeme sistemi'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Sevdiğiniz Kitapları
                <br />
                <span className="text-primary-600">Duvarlarınızda Yaşatın</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Klasik ve modern edebiyatın en ikonik eserlerinden tasarlanmış
                özel posterlerle yaşam alanlarınızı kişiselleştirin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="group">
                    Ürünleri İncele
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button size="lg" variant="outline">
                    Blog Yazılarımız
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Posterler
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En çok beğenilen ve satılan posterlerimizden bir seçki
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-96 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Henüz ürün bulunmuyor. Admin panelinden ürün ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/product/${product.id}`}>
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Resim Yok
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary-600">
                            ₺{product.price}
                          </span>
                          <Button size="sm" variant="ghost" className="group-hover:bg-primary-50">
                            İncele
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline">
                Tüm Ürünleri Gör
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Kitap Tutkunları İçin Özel Tasarımlar
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Her poster, kitabın ruhunu ve hikayesini yansıtacak şekilde özenle tasarlanmıştır
            </p>
            <Link to="/products">
              <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100">
                Koleksiyonu Keşfet
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
