import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import axios from 'axios'
import { useAuth } from '../contexts/authContext'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data } = await api.post('/auth/login', { username, password })
      login(data.token)
      navigate('/dashboard')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMsg = (err.response?.data as { error?: string })?.error
        setError(serverMsg ?? err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Login failed')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Log In
        </h1>

        {error && (
          <div className="mb-4 text-center text-red-600 text-sm">{error}</div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white
                     font-medium rounded-md disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
