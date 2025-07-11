import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

interface RequireAuthProps {
  children: ReactNode
}

function isTokenExpired(token: string): boolean {
  try {
    const [, payloadB64] = token.split('.')
    const { exp } = JSON.parse(atob(payloadB64))
    return exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { token } = useAuth()
  const location = useLocation()

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('jwt')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
