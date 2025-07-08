import { getBookingsByRoomingListId } from '../repositories/roomingListsRepository'

export async function fetchBookingsForRoomingList(roomingListId: number) {
  return getBookingsByRoomingListId(roomingListId)
}
