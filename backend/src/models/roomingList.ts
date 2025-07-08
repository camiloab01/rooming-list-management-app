export interface RoomingListItem {
  rooming_list_id: number
  hotel_id: number
  rfp_name: string
  cut_off_date: string
  status: 'Active' | 'Closed' | 'Cancelled'
  agreement_type: 'leisure' | 'staff' | 'artist'
}

export interface RoomingListGrouped {
  event_id: number
  event_name: string
  rooming_lists: RoomingListItem[]
}
