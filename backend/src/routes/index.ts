import { Router } from 'express'
import roomingListsRouter from './roomingLists'
import seedRouter from './seed'
import authRouter from './auth'

const router = Router()
router.use('/rooming-lists', roomingListsRouter)
router.use('/seed', seedRouter)
router.use('/auth', authRouter)

export default router
