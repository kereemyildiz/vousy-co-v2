import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { productService, categoryService } from '@/services/supabase'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    shopier_url: '',
    specifications: { size: '50x70 cm', paper: '300gsm Mat Kağıt', frame: 'Çerçevesiz' }
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error loading data:', error)
      alert('Veri yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, formData)
        alert('Ürün güncellendi!')
      } else {
        await productService.create(formData)
        alert('Ürün eklendi!')
      }
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Ürün kaydedilirken hata oluştu')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      image_url: product.image_url || '',
      shopier_url: product.shopier_url || '',
      specifications: product.specifications || { size: '50x70 cm', paper: '300gsm Mat Kağıt', frame: 'Çerçevesiz' }
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return
    try {
      await productService.delete(id)
      alert('Ürün silindi!')
      loadData()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Ürün silinirken hata oluştu')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category_id: '',
      image_url: '',
      shopier_url: '',
      specifications: { size: '50x70 cm', paper: '300gsm Mat Kağıt', frame: 'Çerçevesiz' }
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Ürün Yönetimi
            </h1>
            <p className="text-gray-600">{products.length} ürün</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? 'İptal' : 'Yeni Ürün'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ürün Adı</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="örn: 1984 - George Orwell"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Fiyat (₺)</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="örn: 299"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Ürün açıklaması..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <select
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      required
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Resim URL</label>
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Shopier Satın Alma Linki</label>
                  <Input
                    value={formData.shopier_url}
                    onChange={(e) => setFormData({ ...formData, shopier_url: e.target.value })}
                    placeholder="https://shopier.com/..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingProduct ? 'Güncelle' : 'Ekle'}</Button>
                  {editingProduct && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      İptal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12">Yükleniyor...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Ürün bulunamadı
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-[3/4] bg-gray-100">
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
                <CardContent className="p-4">
                  <div className="mb-2">
                    {product.category && (
                      <Badge variant="secondary" className="text-xs">
                        {product.category.name}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-primary-600 mb-4">
                    ₺{product.price}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Düzenle
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
