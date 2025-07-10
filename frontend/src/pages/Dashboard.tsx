import { useState, useEffect } from 'react'
import api from '../services/api'
import {
  FunnelIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import type { GroupedRoomingLists } from '../types/rooming'

export default function Dashboard() {
  const [data, setData] = useState<GroupedRoomingLists[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .get<GroupedRoomingLists[]>('/rooming-lists/grouped')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  // simple client-side search on event_name or rfp_name
  const filtered = data
    .map((group) => ({
      ...group,
      rooming_lists: group.rooming_lists.filter((rl) =>
        rl.rfp_name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.rooming_lists.length > 0)

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Rooming List Management: Events</h1>
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
          {/* Filters (stub) */}
          <button className="flex items-center space-x-1 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <FunnelIcon className="w-5 h-5 text-teal-500" />
            <span className="text-teal-500 font-medium">Filters</span>
          </button>
        </div>
      </div>

      {loading && <div className="text-center">Loading…</div>}

      {/* Event groups */}
      {filtered.map((group) => (
        <section key={group.event_id} className="space-y-4">
          {/* Divider with pill */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-300" />
            <div className="px-4 py-1 mx-4 bg-teal-100 text-teal-700 font-medium rounded-full">
              {group.event_name}
            </div>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Horizontal carousel */}
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {group.rooming_lists.map((rl) => (
              <div
                key={rl.rooming_list_id}
                className="relative flex-shrink-0 w-72 bg-white rounded-lg shadow p-4"
              >
                {/* cut-off date badge */}
                <div className="absolute top-4 right-4 bg-blue-50 text-blue-700 text-sm font-semibold px-2 py-1 rounded">
                  {new Date(rl.cut_off_date).toLocaleString('default', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>

                {/* RFP name */}
                <h2 className="font-semibold mb-1">[{rl.rfp_name}]</h2>

                {/* Agreement */}
                <p className="text-sm text-gray-600 mb-3">
                  Agreement:{' '}
                  <span className="font-medium">
                    {rl.agreement_type.charAt(0).toUpperCase() +
                      rl.agreement_type.slice(1)}
                  </span>
                </p>

                {/* Date range */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>{rl.date_range}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-center font-medium">
                    View Bookings ({rl.bookingCount})
                  </button>
                  <button className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-md">
                    <ArrowRightIcon className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
