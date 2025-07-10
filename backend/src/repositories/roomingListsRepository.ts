import { pool } from '../db/pool'
import { Booking } from '../models/booking'
import {
  RoomingListFilters,
  RoomingListGrouped,
  RoomingListItem,
} from '../models/roomingList'

export async function getRoomingListsGroupedByEvent(
  filters: RoomingListFilters
): Promise<RoomingListGrouped[]> {
  const conditions: string[] = []
  const values: any[] = []
  let idx = 1

  if (filters.eventName) {
    conditions.push(`rl.event_name ILIKE $${idx++}`)
    values.push(`%${filters.eventName}%`)
  }
  if (filters.rfpName) {
    conditions.push(`rl.rfp_name ILIKE $${idx++}`)
    values.push(`%${filters.rfpName}%`)
  }
  if (filters.agreementType) {
    conditions.push(`rl.agreement_type::text ILIKE $${idx++}`)
    values.push(`%${filters.agreementType}%`)
  }
  if (filters.status) {
    conditions.push(`rl.status = $${idx++}`)
    values.push(filters.status)
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(' OR ')}`
    : ''

  const listOrder = filters.sortOrder
    ? `ORDER BY rl.cut_off_date ${filters.sortOrder.toUpperCase()}`
    : `ORDER BY rl.rooming_list_id`

  const { rows } = await pool.query<RoomingListGrouped>(
    `
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
          'bookingCount',     COALESCE(agg.count, 0),
          'startDate',        agg.start_date,
          'endDate',          agg.end_date
        )
        ${listOrder}
      ) AS rooming_lists
    FROM rooming_lists rl

    LEFT JOIN (
      SELECT
        rlb.rooming_list_id,
        COUNT(*)                    AS count,
        MIN(b.check_in_date)::text  AS start_date,
        MAX(b.check_out_date)::text AS end_date
      FROM rooming_list_bookings rlb
      JOIN bookings b
        ON b.booking_id = rlb.booking_id
      GROUP BY rlb.rooming_list_id
    ) agg
      ON agg.rooming_list_id = rl.rooming_list_id

    ${whereClause}
    
    GROUP BY rl.event_id, rl.event_name
    ORDER BY rl.event_name;
  `,
    values
  )

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
      rl.rooming_list_id,
      rl.event_id,
      rl.event_name,
      rl.hotel_id,
      rl.rfp_name,
      rl.cut_off_date,
      rl.status,
      rl.agreement_type,
      COALESCE(bc.count, 0)               AS "bookingCount",
      bc.start_date                      AS "startDate",
      bc.end_date                        AS "endDate"
    FROM rooming_lists rl
    LEFT JOIN (
      SELECT
        rlb.rooming_list_id,
        COUNT(*)                       AS count,
        MIN(b.check_in_date)::text     AS start_date,
        MAX(b.check_out_date)::text    AS end_date
      FROM rooming_list_bookings rlb
      JOIN bookings b
        ON b.booking_id = rlb.booking_id
      GROUP BY rlb.rooming_list_id
    ) bc
      ON bc.rooming_list_id = rl.rooming_list_id
    ${whereClause}
    ${orderClause};
  `,
    values
  )

  return rows
}
