import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findUserByUsername } from '../repositories/userRepository'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = '2h'

export async function authenticate(username: string, password: string) {
  const user = await findUserByUsername(username)
  console.log(`Searching for user: ${username}`)
  if (!user) return null
  console.log(`Authenticating user: ${user.username}`)
  const matches = await bcrypt.compare(password, user.password_hash)
  console.log(`Password matches: ${matches}`)
  if (!matches) return null

  const payload = { user_id: user.user_id, username: user.username }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  console.log('token generated successfully', JWT_SECRET)
  return token
}
