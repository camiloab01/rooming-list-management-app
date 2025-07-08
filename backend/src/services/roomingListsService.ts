import { RoomingListFilters } from '../models/roomingList'
import {
  getRoomingLists,
  getRoomingListsGroupedByEvent,
} from '../repositories/roomingListsRepository'

export async function fetchGroupedRoomingLists() {
  return getRoomingListsGroupedByEvent()
}

export async function fetchRoomingLists(filters: RoomingListFilters) {
  return getRoomingLists(filters)
}
