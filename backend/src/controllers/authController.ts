import { RequestHandler } from 'express'
import { authenticate } from '../services/authService'

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const token = await authenticate(username, password)

    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }
    res.json({ token })
  } catch (err) {
    next(err)
  }
}
