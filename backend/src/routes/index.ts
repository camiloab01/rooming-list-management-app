import { Router } from 'express'
import roomingListsRouter from './roomingLists'
import seedRouter from './seed'

const router = Router()
router.use('/rooming-lists', roomingListsRouter)
router.use('/seed', seedRouter)

export default router
