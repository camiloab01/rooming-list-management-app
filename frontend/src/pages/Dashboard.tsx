import { useState, useEffect } from 'react'
import api from '../services/api'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import type { GroupedRoomingLists } from '../types/rooming'
import EventRoomingListSection from '../components/eventRoomingListSection'

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
      <div className="flex flex-col items-left justify-between space-y-8">
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
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
          {/* Filters (stub) */}
          <button className="flex items-center space-x-1 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <span className="font-normal">Filters</span>
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-teal-500" />
          </button>
        </div>
      </div>

      {loading && <div className="text-center">Loading…</div>}

      {/* Event groups */}
      {filtered.map((group) => (
        <EventRoomingListSection
          key={group.event_id}
          eventName={group.event_name}
          roomingList={group.rooming_lists}
        />
      ))}
    </div>
  )
}
