import { Request, Response } from 'express'
import {
  fetchGroupedRoomingLists,
  fetchRoomingLists,
} from '../services/roomingListsService'
import { RoomingListFilters, RoomingListStatus } from '../models/roomingList'

export async function getGroupedRoomingLists(req: Request, res: Response) {
  try {
    let statusFilters: RoomingListStatus[] = []
    const rawStatus = req.query.status
    if (typeof rawStatus === 'string') {
      statusFilters = [rawStatus as RoomingListStatus]
    } else if (Array.isArray(rawStatus)) {
      statusFilters = rawStatus as RoomingListStatus[]
    }
    const filters: RoomingListFilters = {
      eventName: req.query.eventName as string,
      rfpName: req.query.rfpName as string,
      agreementType: req.query.agreementType as string,
      status: statusFilters,
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || undefined,
    }
    const data = await fetchGroupedRoomingLists(filters)
    res.json(data)
  } catch (err) {
    console.error('Error in controller', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getRoomingLists(req: Request, res: Response) {
  try {
    let statusFilters: RoomingListStatus[] = []
    const rawStatus = req.query.status
    if (typeof rawStatus === 'string') {
      statusFilters = [rawStatus as RoomingListStatus]
    } else if (Array.isArray(rawStatus)) {
      statusFilters = rawStatus as RoomingListStatus[]
    }
    const filters: RoomingListFilters = {
      eventName: req.query.eventName as string,
      rfpName: req.query.rfpName as string,
      agreementType: req.query.agreementType as 'leisure' | 'staff' | 'artist',
      status: statusFilters,
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || undefined,
    }
    const lists = await fetchRoomingLists(filters)
    res.json(lists)
  } catch (err) {
    console.error('Error fetching rooming lists', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
