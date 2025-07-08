import { pool } from '../db/pool'
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
