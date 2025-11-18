import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { productService, categoryService } from '@/services/supabase'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category')

  useEffect(() => {
    loadData()
  }, [selectedCategory])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        selectedCategory
          ? productService.getByCategory(selectedCategory)
          : productService.getAll(),
        categoryService.getAll()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryFilter = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Kitap Posterler Koleksiyonu
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Edebiyatın başyapıtlarından özel tasarım posterler
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-primary-600" />
                  <h2 className="font-semibold text-lg">Kategoriler</h2>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryFilter(null)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      !selectedCategory
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Tümü
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {selectedCategory
                    ? categories.find(c => c.id === selectedCategory)?.name || 'Ürünler'
                    : 'Tüm Ürünler'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {products.length} ürün bulundu
                </p>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-96 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Bu kategoride henüz ürün bulunmuyor.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
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
                          {product.category && (
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary">
                                {product.category.name}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
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
          </div>
        </div>
      </div>
    </div>
  )
}
