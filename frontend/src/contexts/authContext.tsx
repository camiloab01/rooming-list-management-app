import { jwtDecode } from 'jwt-decode'
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from 'react'

interface JwtPayload {
  user_id: number
  username: string
}

interface AuthContextType {
  token: string | null
  userId: number | null
  username: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  // on mount, load token from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jwt')
    if (saved) {
      try {
        const { user_id, username } = jwtDecode<JwtPayload>(saved)
        setToken(saved)
        setUserId(user_id)
        setUsername(username)
      } catch {
        localStorage.removeItem('jwt')
      }
    }
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem('jwt', newToken)
    const { user_id, username } = jwtDecode<JwtPayload>(newToken)
    setToken(newToken)
    setUserId(user_id)
    setUsername(username)
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    setToken(null)
    setUserId(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ token, userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
