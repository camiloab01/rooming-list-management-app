import { pool } from '../src/db/pool'
import { getBookingsByRoomingListId } from '../src/repositories/roomingListsRepository'

jest.mock('../src/db/pool', () => ({
  pool: { query: jest.fn() },
}))

describe('getBookingsByRoomingListId', () => {
  it('should query the bookings join table and return rows', async () => {
    const fakeRows = [
      {
        booking_id: 1,
        hotel_id: 2,
        event_id: 3,
        guest_name: 'Alice',
        guest_phone_number: '555',
        check_in_date: '2025-01-01',
        check_out_date: '2025-01-02',
      },
    ]
    ;(pool.query as jest.Mock).mockResolvedValue({ rows: fakeRows })

    const result = await getBookingsByRoomingListId(123)
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('FROM bookings b'),
      [123]
    )
    expect(result).toEqual(fakeRows)
  })
})
