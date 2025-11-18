import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Star, Package, Truck, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { productService } from '@/services/supabase'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await productService.getById(id)
      setProduct(data)

      // Load related products from same category
      if (data.category_id) {
        const related = await productService.getByCategory(data.category_id)
        setRelatedProducts(related.filter(p => p.id !== id).slice(0, 4))
      }
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBuyNow = () => {
    if (product?.shopier_url) {
      window.open(product.shopier_url, '_blank')
    } else {
      alert('Bu ürün için satın alma linki henüz eklenmemiş.')
    }
  }

  const features = [
    {
      icon: Package,
      title: 'Kaliteli Malzeme',
      description: 'Premium mat veya parlak kağıt seçenekleri'
    },
    {
      icon: Truck,
      title: 'Hızlı Kargo',
      description: '2-3 iş günü içinde kapınızda'
    },
    {
      icon: RotateCcw,
      title: 'Kolay İade',
      description: '14 gün içinde koşulsuz iade'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-32 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-96 lg:h-[600px] rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
                <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
                <div className="bg-gray-200 h-32 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ürün bulunamadı</h2>
          <Link to="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ürünlere Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link to="/products">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ürünlere Dön
          </Button>
        </Link>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-xl sticky top-20">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Resim Yok
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {product.category && (
              <Badge variant="secondary" className="text-sm">
                {product.category.name}
              </Badge>
            )}

            <div>
              <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8 - 124 değerlendirme)</span>
              </div>
              <p className="text-4xl font-bold text-primary-600 mb-6">
                ₺{product.price}
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Ürün Özellikleri</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Boyut:</span>
                      <span className="font-medium">{product.specifications.size || '50x70 cm'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Kağıt Tipi:</span>
                      <span className="font-medium">{product.specifications.paper || '300gsm Mat Kağıt'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Çerçeve:</span>
                      <span className="font-medium">{product.specifications.frame || 'Çerçevesiz'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Buy Button */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full text-lg h-14"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Hemen Satın Al
              </Button>
              <p className="text-sm text-gray-600 text-center">
                Güvenli ödeme için Shopier üzerinden yönlendirileceksiniz
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-2">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8">
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      {relatedProduct.image_url ? (
                        <img
                          src={relatedProduct.image_url}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Resim Yok
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-lg font-bold text-primary-600">
                        ₺{relatedProduct.price}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
