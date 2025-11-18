import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { blogService, productService } from '@/services/supabase'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingPost, setEditingPost] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    category: '',
    read_time: 5,
    related_product_id: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [postsData, productsData] = await Promise.all([
        blogService.getAll(),
        productService.getAll()
      ])
      setPosts(postsData)
      setProducts(productsData)
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
      // Auto-generate slug from title if not provided
      const slug = formData.slug || formData.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      const postData = { ...formData, slug }

      if (editingPost) {
        await blogService.update(editingPost.id, postData)
        alert('Blog yazısı güncellendi!')
      } else {
        await blogService.create(postData)
        alert('Blog yazısı eklendi!')
      }
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Blog yazısı kaydedilirken hata oluştu')
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      cover_image: post.cover_image || '',
      category: post.category || '',
      read_time: post.read_time || 5,
      related_product_id: post.related_product_id || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return
    try {
      await blogService.delete(id)
      alert('Blog yazısı silindi!')
      loadData()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Blog yazısı silinirken hata oluştu')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      cover_image: '',
      category: '',
      read_time: 5,
      related_product_id: ''
    })
    setEditingPost(null)
    setShowForm(false)
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Blog Yönetimi
            </h1>
            <p className="text-gray-600">{posts.length} yazı</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? 'İptal' : 'Yeni Yazı'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingPost ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Başlık</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Blog yazısı başlığı"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="otomatik oluşturulacak"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Özet</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md"
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Kısa özet (opsiyonel)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">İçerik</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                    rows={12}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    placeholder="Blog içeriği... (HTML destekler)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="örn: Klasikler"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Okuma Süresi (dk)</label>
                    <Input
                      type="number"
                      value={formData.read_time}
                      onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">İlgili Ürün</label>
                    <select
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.related_product_id}
                      onChange={(e) => setFormData({ ...formData, related_product_id: e.target.value })}
                    >
                      <option value="">Seçim yok</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Kapak Resmi URL</label>
                  <Input
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingPost ? 'Güncelle' : 'Yayınla'}</Button>
                  {editingPost && (
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
              placeholder="Yazı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12">Yükleniyor...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Blog yazısı bulunamadı
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {post.cover_image && (
                      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt || post.content?.substring(0, 150) + '...'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {post.category && <span>📂 {post.category}</span>}
                        <span>📅 {formatDate(post.created_at)}</span>
                        <span>⏱️ {post.read_time} dk</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Düzenle
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
