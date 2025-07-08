import { Request, Response } from 'express'
import { fetchBookingsForRoomingList } from '../services/roomingListBookingsService'

export async function getRoomingListBookings(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    const bookings = await fetchBookingsForRoomingList(id)
    res.json(bookings)
  } catch (err) {
    console.error('Error fetching bookings for rooming list', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
