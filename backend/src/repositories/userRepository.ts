import { pool } from '../db/pool'
import { User } from '../models/user'

export async function findUserByUsername(
  username: string
): Promise<User | undefined> {
  const { rows } = await pool.query<User>(
    `SELECT user_id, username, password_hash FROM users WHERE username = $1`,
    [username]
  )
  return rows[0]
}
