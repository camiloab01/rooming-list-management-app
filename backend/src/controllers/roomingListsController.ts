import { Request, Response } from 'express'
import { fetchGroupedRoomingLists } from '../services/roomingListsService'

export async function getGroupedRoomingLists(req: Request, res: Response) {
  try {
    const data = await fetchGroupedRoomingLists()
    res.json(data)
  } catch (err) {
    console.error('Error in controller', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
