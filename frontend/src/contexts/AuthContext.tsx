import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface User {
  email: string
  name: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = 'docmind_user'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    const mockUser: User = { email, name: email.split('@')[0] }
    setUser(mockUser)
    setLoading(false)
  }, [])

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    const mockUser: User = { email, name }
    setUser(mockUser)
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
