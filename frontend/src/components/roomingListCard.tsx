import {
  DocumentMagnifyingGlassIcon,
  CalendarDaysIcon,
} from '@heroicons/react/16/solid'
import type { RoomingList } from '../types/rooming'
import DateTag from './dateTag'
import api from '../services/api'

interface RoomingListCardProps {
  rl: RoomingList
}

export default function RoomingListCard(props: RoomingListCardProps) {
  const { rl } = props

  const handleViewBookings = async () => {
    try {
      const { data } = await api.get<RoomingList[]>(
        `/rooming-lists/${rl.rooming_list_id}/bookings`
      )
      console.log('Bookings for list', rl.rooming_list_id, data)
    } catch (err) {
      console.error('Failed to load bookings', err)
    }
  }

  return (
    <div className="flex flex-col justify-between relative flex-shrink-0 w-[400px] h-48 bg-white rounded-lg border-1 border-[#E4ECF2] p-4">
      <DateTag cutOffDate={rl.cut_off_date} />
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
        <CalendarDaysIcon className="w-4 h-4 mr-1" />
        <span>
          {`${new Date(rl.startDate).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          })} - ${new Date(rl.endDate).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          })}, ${new Date(rl.startDate).getFullYear()}`}
        </span>
      </div>
      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={handleViewBookings}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-center font-medium cursor-pointer"
        >
          View Bookings ({rl.bookingCount})
        </button>
        <div className="relative group inline-block">
          <button className="p-1 border border-indigo-700 rounded-md w-10 h-10 flex items-center justify-center cursor-pointer">
            <DocumentMagnifyingGlassIcon className="w-5 h-5 text-indigo-700" />
          </button>
          <span
            className="
              absolute 
              bottom-full 
              left-1/2 
              transform -translate-x-1/2 
              mb-2 
              px-2 py-1 
              text-xs 
              bg-gray-800 
              text-white 
              rounded 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              pointer-events-none
              whitespace-nowrap
              z-10
            "
          >
            Show Agreement as PDF
          </span>
        </div>
      </div>
    </div>
  )
}
