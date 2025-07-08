import { pool } from '../db/pool'
import { Booking } from '../models/booking'
import { RoomingListGrouped } from '../models/roomingList'

export async function getRoomingListsGroupedByEvent(): Promise<
  RoomingListGrouped[]
> {
  const { rows } = await pool.query<RoomingListGrouped>(`
    SELECT
      event_id,
      event_name,
      json_agg(
        json_build_object(
          'rooming_list_id', rooming_list_id,
          'hotel_id',         hotel_id,
          'rfp_name',         rfp_name,
          'cut_off_date',     cut_off_date,
          'status',           status,
          'agreement_type',   agreement_type
        ) ORDER BY rooming_list_id
      ) AS rooming_lists
    FROM rooming_lists
    GROUP BY event_id, event_name
    ORDER BY event_name;
  `)
  return rows
}

export async function getBookingsByRoomingListId(
  roomingListId: number
): Promise<Booking[]> {
  const { rows } = await pool.query<Booking>(
    `
    SELECT b.booking_id,
           b.hotel_id,
           b.event_id,
           b.guest_name,
           b.guest_phone_number,
           b.check_in_date,
           b.check_out_date
    FROM bookings b
    JOIN rooming_list_bookings rlb
      ON rlb.booking_id = b.booking_id
    WHERE rlb.rooming_list_id = $1
    ORDER BY b.booking_id;
  `,
    [roomingListId]
  )
  return rows
}
