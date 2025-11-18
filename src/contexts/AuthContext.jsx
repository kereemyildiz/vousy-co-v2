import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '@/services/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    authService.getCurrentUser().then(user => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email, password) => {
    const { user } = await authService.signIn(email, password)
    setUser(user)
    return user
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
  }

  const value = {
    user,
    signIn,
    signOut,
    loading,
    isAdmin: user?.email === import.meta.env.VITE_ADMIN_EMAIL || false
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
