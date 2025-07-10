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
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative inline-block">
            <div className="w-10 h-10 rounded bg-gray-100 absolute left-1 top-[4px] p-2 border border-[#E4ECF2]">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-72 h-12 
                pl-12
                pr-4 py-2 
                border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-teal-400
                text-sm font-normal
                placeholder:text-sm placeholder:font-normal
              "
            />
          </div>
          {/* Filters */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((o) => !o)}
              className="flex items-center space-x-1 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 h-12 w-28 items-center cursor-pointer"
            >
              <span className="text-sm font-medium">Filters</span>
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-teal-500" />
            </button>
            <FilterPopup
              open={isFilterOpen}
              filters={filters}
              onSave={setFilters}
              onClose={() => setFilterOpen(false)}
            />
          </div>
          {/* Sort toggle */}
          <button
            onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
            className="flex items-center space-x-1 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 h-12 cursor-pointer"
          >
            <span className="text-sm font-medium">Sort</span>
            {sortOrder ? (
              sortOrder === 'asc' ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500 text-teal-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500 text-teal-500" />
              )
            ) : (
              <></>
            )}
          </button>
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
