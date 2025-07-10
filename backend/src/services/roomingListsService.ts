import { RoomingListFilters } from '../models/roomingList'
import {
  getRoomingLists,
  getRoomingListsGroupedByEvent,
} from '../repositories/roomingListsRepository'

export async function fetchGroupedRoomingLists(filters: RoomingListFilters) {
  return getRoomingListsGroupedByEvent(filters)
}

export async function fetchRoomingLists(filters: RoomingListFilters) {
  return getRoomingLists(filters)
}
