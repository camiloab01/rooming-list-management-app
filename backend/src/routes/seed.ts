import { Router } from 'express'
import { seedDatabase } from '../controllers/seedController'
import { jwtAuth } from '../middleware/jwtAuth'

const router = Router()
router.post('/', jwtAuth, seedDatabase)

export default router
