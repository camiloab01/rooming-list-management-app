import { Router } from 'express'
import { getGroupedRoomingLists } from '../controllers/roomingListsController'

const router = Router()
router.get('/grouped', getGroupedRoomingLists)

export default router
