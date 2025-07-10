export interface RoomingList {
  rooming_list_id: number
  rfp_name: string
  agreement_type: 'leisure' | 'staff' | 'artist'
  cut_off_date: string // ISO date string
  date_range: string // e.g. "Jan 31 – Feb 2, 2025"
  bookingCount: number
}

export interface GroupedRoomingLists {
  event_id: number
  event_name: string
  rooming_lists: RoomingList[]
}
