import { Request, Response } from 'express'
import { runSeed } from '../services/seedService'

export async function seedDatabase(req: Request, res: Response) {
  try {
    await runSeed()
    res.json({ success: true, message: 'Database seeded!' })
  } catch (error) {
    console.error('Seeding failed:', error)
    res.status(500).json({ success: false, error: 'Seeding failed' })
  }
}
