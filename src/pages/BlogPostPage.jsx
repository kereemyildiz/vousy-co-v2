import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { blogService } from '@/services/supabase'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    loadPost()
  }, [slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      // Try to get by slug first, fallback to ID
      let data
      try {
        data = await blogService.getBySlug(slug)
      } catch {
        data = await blogService.getById(slug)
      }
      setPost(data)

      // Load related posts
      const allPosts = await blogService.getAll()
      setRelatedPosts(allPosts.filter(p => p.id !== data.id).slice(0, 3))
    } catch (error) {
      console.error('Error loading post:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link kopyalandı!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="bg-gray-200 h-8 w-32 rounded"></div>
            <div className="bg-gray-200 h-12 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Blog yazısı bulunamadı</h2>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Blog'a Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Blog'a Dön
          </Button>
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category || 'Genel'}</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {post.read_time || 5} dk okuma
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-between text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <time>{formatDate(post.created_at)}</time>
            </div>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </Button>
          </div>

          {post.cover_image && (
            <div className="aspect-video rounded-lg overflow-hidden mb-8 shadow-xl">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-gray max-w-none mb-12"
        >
          <div
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Related Product Link */}
        {post.related_product_id && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-lg mb-2">İlgili Ürün</h3>
            <p className="text-gray-600 mb-4">Bu yazıyla ilgili poster ürünümüzü incelemek ister misiniz?</p>
            <Link to={`/product/${post.related_product_id}`}>
              <Button>
                Ürünü İncele
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
              Benzer Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug || relatedPost.id}`}>
                  <div className="group cursor-pointer">
                    {relatedPost.cover_image && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-gray-100">
                        <img
                          src={relatedPost.cover_image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
