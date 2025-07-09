import { Router } from 'express'
import {
  getGroupedRoomingLists,
  getRoomingLists,
} from '../controllers/roomingListsController'
import { getRoomingListBookings } from '../controllers/roomingListBookingsController'
import { jwtAuth } from '../middleware/jwtAuth'

const router = Router()

// GET /api/rooming-lists
router.get('/', jwtAuth, getRoomingLists)

// GET /api/rooming-lists/grouped
router.get('/grouped', jwtAuth, getGroupedRoomingLists)

// GET /api/rooming-lists/:id/bookings
router.get('/:id/bookings', jwtAuth, getRoomingListBookings)

export default router
