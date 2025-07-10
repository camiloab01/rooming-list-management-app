import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from './components/requireAuth'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}
