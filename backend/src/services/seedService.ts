import fs from 'fs/promises'
import path from 'path'
import { pool } from '../db/pool'
import {
  seedBookings,
  seedRoomingLists,
  seedJoins,
} from '../repositories/seedRepository'

export async function runSeed() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(`
      TRUNCATE rooming_list_bookings, rooming_lists, bookings
      RESTART IDENTITY CASCADE;
    `)

    const dataDir = path.resolve(__dirname, '../../data')
    const [bookingsRaw, listsRaw, joinRaw] = await Promise.all([
      fs.readFile(path.join(dataDir, 'bookings.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'rooming-lists.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'rooming-list-bookings.json'), 'utf-8'),
    ])

    const bookings = JSON.parse(bookingsRaw)
    const roomingLists = JSON.parse(listsRaw)
    const listBookings = JSON.parse(joinRaw)

    await seedBookings(client, bookings)
    await seedRoomingLists(client, roomingLists)
    await seedJoins(client, listBookings)

    await client.query(`
      SELECT setval(pg_get_serial_sequence('bookings','booking_id'), (SELECT MAX(booking_id) FROM bookings));
      SELECT setval(pg_get_serial_sequence('rooming_lists','rooming_list_id'), (SELECT MAX(rooming_list_id) FROM rooming_lists));
    `)

    await client.query('COMMIT')
  } catch {
    await client.query('ROLLBACK')
    throw new Error('Seeding transaction failed')
  } finally {
    client.release()
  }
}
