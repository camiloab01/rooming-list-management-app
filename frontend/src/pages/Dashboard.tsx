import { useState, useEffect } from 'react'
import api from '../services/api'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import type { GroupedRoomingLists, RoomingListFilters } from '../types/rooming'
import EventRoomingListSection from '../components/eventRoomingListSection'
import FilterPopup, { type Filters } from '../components/filterPopup'

export default function Dashboard() {
  const [data, setData] = useState<GroupedRoomingLists[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState<Filters>({ status: [] })
  const [isFilterOpen, setFilterOpen] = useState(false)

  // sortOrder: undefined = default (by id), 'asc' or 'desc' for cut-off date
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    undefined
  )

  // whenever search or filters change, re-fetch
  useEffect(() => {
    setLoading(true)

    const params: RoomingListFilters = {}
    if (search) {
      params.eventName = search
      params.rfpName = search
      params.agreementType = search
    }
    if (filters.status.length > 0) {
      params.status = filters.status
      console.log('Setting status filter:', filters.status)
    }

    if (sortOrder) {
      params.sortOrder = sortOrder
    }

    api
      .get<GroupedRoomingLists[]>('/rooming-lists/grouped', { params })
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [search, filters, sortOrder])

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col items-left justify-between space-y-8">
        <h1 className="text-3xl font-bold">Rooming List Management: Events</h1>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative w-72 md:w-auto inline-flex items-center h-12">
            <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full w-72 pl-12 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm font-normal placeholder:text-sm placeholder:font-normal"
            />
          </div>
          {/* Filters */}
          <div className="relative inline-flex items-center h-12">
            <button
              onClick={() => setFilterOpen((o) => !o)}
              className="w-28 inline-flex items-center justify-center h-full px-4 space-x-2 bg-white border rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-teal-500" />
              <span>Filters</span>
            </button>
            <FilterPopup
              open={isFilterOpen}
              filters={filters}
              onSave={setFilters}
              onClose={() => setFilterOpen(false)}
            />
          </div>
          {/* Sort */}
          <div className="relative inline-flex items-center h-12 group w-20">
            <button
              onClick={() =>
                setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
              }
              className="w-full inline-flex items-center justify-center h-full px-4 space-x-2 bg-white border rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              <span>Sort</span>
              {sortOrder === 'asc' ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
              ) : sortOrder === 'desc' ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              ) : null}
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap">
                Toggle sort by cut-off date
                <br />
                (currently {sortOrder ?? 'ID'})
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <div className="text-center">Loading…</div>}

      {/* Event groups */}
      {data.map((group) => (
        <EventRoomingListSection
          key={group.event_id}
          eventName={group.event_name}
          roomingList={group.rooming_lists}
        />
      ))}
    </div>
  )
}
