process.env.JWT_SECRET = 'test-secret'

import jwt from 'jsonwebtoken'
import request from 'supertest'
import express from 'express'
import roomingListRouter from '../src/routes/roomingLists'
import * as service from '../src/services/roomingListBookingsService'
import type { Booking } from '../src/models/booking'

// 1. Use the real auth middleware, so no jest.mock here
// 2. Set the secret (already above)

const app = express()
app.use(express.json())
app.use('/api/rooming-lists', roomingListRouter)

// Create a token that will pass jwtAuth
const validToken = jwt.sign(
  { user_id: 1, username: 'test' },
  process.env.JWT_SECRET!,
  { expiresIn: '1h' }
)

describe('GET /api/rooming-lists/:id/bookings', () => {
  it('returns 400 on invalid id param', async () => {
    await request(app)
      .get('/api/rooming-lists/abc/bookings')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(400, { error: 'Invalid roomingList id' })
  })

  it('returns bookings array on success', async () => {
    const fake: Booking[] = [
      {
        booking_id: 1,
        hotel_id: 42,
        event_id: 99,
        guest_name: 'Alice',
        guest_phone_number: '555-1234',
        check_in_date: '2025-01-01',
        check_out_date: '2025-01-02',
      },
    ]
    jest.spyOn(service, 'fetchBookingsForRoomingList').mockResolvedValue(fake)

    await request(app)
      .get('/api/rooming-lists/1/bookings')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200, fake)
  })
})
