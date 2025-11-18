import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, FileText, FolderOpen, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { productService, blogService, categoryService } from '@/services/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    blogPosts: 0,
    categories: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [products, posts, categories] = await Promise.all([
        productService.getAll(),
        blogService.getAll(),
        categoryService.getAll()
      ])
      setStats({
        products: products.length,
        blogPosts: posts.length,
        categories: categories.length
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const statCards = [
    {
      title: 'Toplam Ürün',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Blog Yazıları',
      value: stats.blogPosts,
      icon: FileText,
      color: 'bg-green-500',
      link: '/admin/blog'
    },
    {
      title: 'Kategoriler',
      value: stats.categories,
      icon: FolderOpen,
      color: 'bg-purple-500',
      link: '/admin/categories'
    }
  ]

  const quickActions = [
    {
      title: 'Yeni Ürün Ekle',
      description: 'Yeni bir poster ürünü ekleyin',
      icon: Plus,
      link: '/admin/products/new',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Blog Yazısı Yaz',
      description: 'Yeni bir blog yazısı oluşturun',
      icon: Plus,
      link: '/admin/blog/new',
      color: 'text-green-600 bg-green-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
              Yönetim Paneli
            </h1>
            <p className="text-gray-600">
              Vousy.co içerik yönetimi
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={stat.link}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Hızlı İşlemler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link to={action.link}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`${action.color} p-3 rounded-lg`}>
                            <action.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {action.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Management Links */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Yönetim Menüsü
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/products">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <Package className="mr-3 h-5 w-5" />
                  Ürün Yönetimi
                </Button>
              </Link>
              <Link to="/admin/blog">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <FileText className="mr-3 h-5 w-5" />
                  Blog Yönetimi
                </Button>
              </Link>
              <Link to="/admin/categories">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <FolderOpen className="mr-3 h-5 w-5" />
                  Kategori Yönetimi
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
