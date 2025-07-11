import { Request, Response } from 'express'
import { fetchBookingsForRoomingList } from '../services/roomingListBookingsService'

export async function getRoomingListBookings(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid roomingList id' })
    return
  }

  try {
    const bookings = await fetchBookingsForRoomingList(id)
    res.json(bookings)
  } catch (err) {
    console.error('Error fetching bookings', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
