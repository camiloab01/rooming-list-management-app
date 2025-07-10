export interface RoomingList {
  rooming_list_id: number
  rfp_name: string
  agreement_type: 'leisure' | 'staff' | 'artist'
  cut_off_date: string
  date_range: string
  bookingCount: number
  startDate: string
  endDate: string
}

export interface GroupedRoomingLists {
  event_id: number
  event_name: string
  rooming_lists: RoomingList[]
}
