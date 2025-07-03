import { Router, Request, Response } from 'express'
import { Pool } from 'pg'
import fs from 'fs/promises'
import path from 'path'
import { roomStatusMapper } from '../utils/roomStatusMapper'

const router = Router()
const pool = new Pool()

router.post('/seed', async (req: Request, res: Response) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    await client.query(`
      TRUNCATE rooming_list_bookings, rooming_lists, bookings
      RESTART IDENTITY CASCADE;
    `)

    // Read the JSON files in parallel
    const dataDir = path.resolve(__dirname, '../../data')
    const [bookingsRaw, listsRaw, joinRaw] = await Promise.all([
      fs.readFile(path.join(dataDir, 'bookings.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'rooming-lists.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'rooming-list-bookings.json'), 'utf-8'),
    ])

    const bookings: Array<{
      bookingId: number
      hotelId: number
      eventId: number
      guestName: string
      guestPhoneNumber: string
      checkInDate: string
      checkOutDate: string
    }> = JSON.parse(bookingsRaw)

    const roomingLists: Array<{
      roomingListId: number
      eventId: number
      hotelId: number
      rfpName: string
      cutOffDate: string
      status: string
      agreement_type: string
    }> = JSON.parse(listsRaw)

    const listBookings: Array<{
      roomingListId: number
      bookingId: number
    }> = JSON.parse(joinRaw)

    // Insert into bookings
    for (const b of bookings) {
      await client.query(
        `INSERT INTO bookings
          (booking_id, hotel_id, event_id, guest_name, guest_phone_number, check_in_date, check_out_date)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          b.bookingId,
          b.hotelId,
          b.eventId,
          b.guestName,
          b.guestPhoneNumber,
          b.checkInDate,
          b.checkOutDate,
        ]
      )
    }

    // Insert into rooming_lists
    //TODO: Ask about status, it was 'Confirmed'? for RoomListId 6. Changed to 'completed'
    for (const rl of roomingLists) {
      console.log('rl', rl)
      await client.query(
        `INSERT INTO rooming_lists
          (rooming_list_id, event_id, hotel_id, rfp_name, cut_off_date, status, agreement_type)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          rl.roomingListId,
          rl.eventId,
          rl.hotelId,
          rl.rfpName,
          rl.cutOffDate,
          roomStatusMapper(rl.status),
          rl.agreement_type,
        ]
      )
    }

    // Insert into join table
    for (const jb of listBookings) {
      await client.query(
        `INSERT INTO rooming_list_bookings (rooming_list_id, booking_id)
         VALUES ($1,$2)`,
        [jb.roomingListId, jb.bookingId]
      )
    }

    // Reset sequences to max(id) so next inserts won’t clash
    await client.query(`
      SELECT setval(pg_get_serial_sequence('bookings','booking_id'), (SELECT MAX(booking_id) FROM bookings));
      SELECT setval(pg_get_serial_sequence('rooming_lists','rooming_list_id'), (SELECT MAX(rooming_list_id) FROM rooming_lists));
    `)

    await client.query('COMMIT')
    res.json({ success: true, message: 'Database seeded!' })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Seeding failed:', error)
    res.status(500).json({ success: false, error: 'Seeding failed' })
  } finally {
    client.release()
  }
})

export default router
