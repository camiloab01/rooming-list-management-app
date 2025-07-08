import { getRoomingListsGroupedByEvent } from '../repositories/roomingListsRepository'

export async function fetchGroupedRoomingLists() {
  return getRoomingListsGroupedByEvent()
}
