import { pool } from '../db/pool'
import { Booking } from '../models/booking'
import {
  RoomingListFilters,
  RoomingListGrouped,
  RoomingListItem,
} from '../models/roomingList'

export async function getRoomingListsGroupedByEvent(): Promise<
  RoomingListGrouped[]
> {
  const { rows } = await pool.query<RoomingListGrouped>(`
    SELECT
        rl.event_id,
        rl.event_name,
        json_agg(
          json_build_object(
            'rooming_list_id', rl.rooming_list_id,
            'hotel_id',         rl.hotel_id,
            'rfp_name',         rl.rfp_name,
            'cut_off_date',     rl.cut_off_date,
            'status',           rl.status,
            'agreement_type',   rl.agreement_type,
            'bookingCount',     COALESCE(bc.count, 0)
          )
          ORDER BY rl.rooming_list_id
        ) AS rooming_lists
      FROM rooming_lists rl
      LEFT JOIN (
        SELECT rooming_list_id, COUNT(*) AS count
        FROM rooming_list_bookings
        GROUP BY rooming_list_id
      ) bc
        ON bc.rooming_list_id = rl.rooming_list_id
      GROUP BY rl.event_id, rl.event_name
      ORDER BY rl.event_name;
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

export async function getRoomingLists(
  filters: RoomingListFilters
): Promise<RoomingListItem[]> {
  const conditions: string[] = []
  const values: any[] = []
  let idx = 1

  if (filters.eventName) {
    conditions.push(`event_name ILIKE $${idx++}`)
    values.push(`%${filters.eventName}%`)
  }
  if (filters.rfpName) {
    conditions.push(`rfp_name ILIKE $${idx++}`)
    values.push(`%${filters.rfpName}%`)
  }
  if (filters.agreementType) {
    conditions.push(`agreement_type = $${idx++}`)
    values.push(filters.agreementType)
  }
  if (filters.status) {
    conditions.push(`status = $${idx++}`)
    values.push(filters.status)
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(' AND ')}`
    : ''

  let orderClause = 'ORDER BY rooming_list_id'
  if (filters.sortOrder) {
    const direction = filters.sortOrder.toUpperCase()
    orderClause = `ORDER BY cut_off_date ${direction}`
  }

  const { rows } = await pool.query<RoomingListItem>(
    `
    SELECT
      rooming_list_id,
      event_id,
      event_name,
      hotel_id,
      rfp_name,
      cut_off_date,
      status,
      agreement_type
    FROM rooming_lists
    ${whereClause}
    ${orderClause};
  `,
    values
  )

  return rows
}
