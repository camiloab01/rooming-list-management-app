import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}
