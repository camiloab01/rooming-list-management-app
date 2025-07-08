import { PoolClient } from 'pg'
import { roomStatusMapper } from '../utils/roomStatusMapper'

export async function seedBookings(client: PoolClient, bookings: any[]) {
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
}

export async function seedRoomingLists(
  client: PoolClient,
  roomingLists: any[]
) {
  for (const rl of roomingLists) {
    await client.query(
      `INSERT INTO rooming_lists
        (rooming_list_id, event_id, event_name, hotel_id, rfp_name, cut_off_date, status, agreement_type)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        rl.roomingListId,
        rl.eventId,
        rl.eventName,
        rl.hotelId,
        rl.rfpName,
        rl.cutOffDate,
        roomStatusMapper(rl.status),
        rl.agreement_type,
      ]
    )
  }
}

export async function seedJoins(client: PoolClient, joins: any[]) {
  for (const jb of joins) {
    await client.query(
      `INSERT INTO rooming_list_bookings (rooming_list_id, booking_id)
       VALUES ($1,$2)`,
      [jb.roomingListId, jb.bookingId]
    )
  }
}
