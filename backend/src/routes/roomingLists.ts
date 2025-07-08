import { Router } from 'express'
import {
  getGroupedRoomingLists,
  getRoomingLists,
} from '../controllers/roomingListsController'
import { getRoomingListBookings } from '../controllers/roomingListBookingsController'

const router = Router()

// GET /api/rooming-lists
router.get('/', getRoomingLists)

// GET /api/rooming-lists/grouped
router.get('/grouped', getGroupedRoomingLists)

// GET /api/rooming-lists/:id/bookings
router.get('/:id/bookings', getRoomingListBookings)

export default router
