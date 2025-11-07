import { createContext, useContext, useState, useEffect } from 'react'
import { authHelpers } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Check active session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = authHelpers.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const { session } = await authHelpers.getSession()
      setSession(session)
      setUser(session?.user ?? null)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, userData = {}) => {
    try {
      const { data, error } = await authHelpers.signUp(email, password, {
        ...userData,
        email_confirm: true
      })
      
      if (error) throw error
      
      return { data, error: null }
    } catch (error) {
      console.error('Error signing up:', error)
      return { data: null, error }
    }
  }

  const signIn = async (email, password) => {
    try {
      console.log('AuthContext: Signing in...')
      const { data, error } = await authHelpers.signIn(email, password)
      
      console.log('AuthContext: Sign in response:', { data, error })
      
      if (error) throw error
      
      // Check if user needs email confirmation
      if (data.user && !data.user.email_confirmed_at && data.user.confirmation_sent_at) {
        throw new Error('Por favor confirma tu email antes de iniciar sesión')
      }
      
      setSession(data.session)
      setUser(data.user)
      
      console.log('AuthContext: User set successfully')
      
      return { data, error: null }
    } catch (error) {
      console.error('AuthContext: Error signing in:', error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await authHelpers.signOut()
      
      if (error) throw error
      
      setSession(null)
      setUser(null)
      
      return { error: null }
    } catch (error) {
      console.error('Error signing out:', error)
      return { error }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
