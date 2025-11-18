import { createClient } from '@supabase/supabase-js'
import { mockProducts, mockCategories, mockBlogPosts } from './mockData'

// Check if using real Supabase or mock data
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'
const USE_MOCK_DATA = supabaseUrl.includes('your-project') || supabaseUrl === 'https://your-project.supabase.co'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to simulate async delay for mock data
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 300))

// Product operations
export const productService = {
  // Get all products
  async getAll() {
    if (USE_MOCK_DATA) {
      await mockDelay()
      return mockProducts
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get product by ID
  async getById(id) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const product = mockProducts.find(p => p.id === id)
      if (!product) throw new Error('Product not found')
      return product
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Get products by category
  async getByCategory(categoryId) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      return mockProducts.filter(p => p.category_id === categoryId)
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Create product (admin only)
  async create(product) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const newProduct = {
        ...product,
        id: String(mockProducts.length + 1),
        created_at: new Date().toISOString(),
        category: mockCategories.find(c => c.id === product.category_id)
      }
      mockProducts.unshift(newProduct)
      return newProduct
    }

    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()

    if (error) throw error
    return data[0]
  },

  // Update product (admin only)
  async update(id, updates) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const index = mockProducts.findIndex(p => p.id === id)
      if (index === -1) throw new Error('Product not found')
      mockProducts[index] = {
        ...mockProducts[index],
        ...updates,
        category: mockCategories.find(c => c.id === (updates.category_id || mockProducts[index].category_id))
      }
      return mockProducts[index]
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Delete product (admin only)
  async delete(id) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const index = mockProducts.findIndex(p => p.id === id)
      if (index !== -1) {
        mockProducts.splice(index, 1)
      }
      return
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Category operations
export const categoryService = {
  async getAll() {
    if (USE_MOCK_DATA) {
      await mockDelay()
      return mockCategories
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  },

  async create(category) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const newCategory = {
        ...category,
        id: String(mockCategories.length + 1),
        created_at: new Date().toISOString()
      }
      mockCategories.push(newCategory)
      return newCategory
    }

    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()

    if (error) throw error
    return data[0]
  },

  async update(id, updates) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const index = mockCategories.findIndex(c => c.id === id)
      if (index === -1) throw new Error('Category not found')
      mockCategories[index] = { ...mockCategories[index], ...updates }
      return mockCategories[index]
    }

    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  async delete(id) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const index = mockCategories.findIndex(c => c.id === id)
      if (index !== -1) {
        mockCategories.splice(index, 1)
      }
      return
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Blog operations
export const blogService = {
  async getAll() {
    if (USE_MOCK_DATA) {
      await mockDelay()
      return mockBlogPosts
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const post = mockBlogPosts.find(p => p.id === id)
      if (!post) throw new Error('Post not found')
      return post
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async getBySlug(slug) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const post = mockBlogPosts.find(p => p.slug === slug)
      if (!post) throw new Error('Post not found')
      return post
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  async create(post) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const newPost = {
        ...post,
        id: String(mockBlogPosts.length + 1),
        created_at: new Date().toISOString()
      }
      mockBlogPosts.unshift(newPost)
      return newPost
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()

    if (error) throw error
    return data[0]
  },

  async update(id, updates) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const index = mockBlogPosts.findIndex(p => p.id === id)
      if (index === -1) throw new Error('Post not found')
      mockBlogPosts[index] = { ...mockBlogPosts[index], ...updates }
      return mockBlogPosts[index]
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  async delete(id) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      const index = mockBlogPosts.findIndex(p => p.id === id)
      if (index !== -1) {
        mockBlogPosts.splice(index, 1)
      }
      return
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Mock auth for demo
const mockUser = {
  id: 'mock-user-id',
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@vousy.co',
  user_metadata: {}
}

let currentMockUser = null

// Auth operations
export const authService = {
  async signIn(email, password) {
    if (USE_MOCK_DATA) {
      await mockDelay()
      // Simple mock auth - any email/password works for demo
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      currentMockUser = { ...mockUser, email }
      return { user: currentMockUser }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  async signOut() {
    if (USE_MOCK_DATA) {
      await mockDelay()
      currentMockUser = null
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    if (USE_MOCK_DATA) {
      return currentMockUser
    }

    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  onAuthStateChange(callback) {
    if (USE_MOCK_DATA) {
      // Mock implementation
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      }
    }

    return supabase.auth.onAuthStateChange(callback)
  }
}

// Export mock data status for UI display
export const isMockMode = USE_MOCK_DATA
