export interface RoomingListItem {
  rooming_list_id: number
  event_id: number
  event_name: string
  hotel_id: number
  rfp_name: string
  cut_off_date: string
  status: RoomingListStatus
  agreement_type: 'leisure' | 'staff' | 'artist'
  bookingCount: number
  startDate: string
  endDate: string
}

export interface RoomingListGrouped {
  event_id: number
  event_name: string
  rooming_lists: RoomingListItem[]
}

export interface RoomingListFilters {
  eventName?: string
  rfpName?: string
  agreementType?: string
  status?: RoomingListStatus[]
  sortOrder?: 'asc' | 'desc'
}

export type RoomingListStatus = 'Active' | 'Closed' | 'Cancelled'
