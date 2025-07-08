export interface Booking {
  booking_id: number
  hotel_id: number
  event_id: number
  guest_name: string
  guest_phone_number?: string
  check_in_date: string
  check_out_date: string
}
