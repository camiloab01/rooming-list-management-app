import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/16/solid'
import type { RoomingList } from '../types/rooming'
import DateTag from './dateTag'

interface RoomingListCardProps {
  rl: RoomingList
}

export default function RoomingListCard(props: RoomingListCardProps) {
  const { rl } = props

  return (
    <div className="relative flex-shrink-0 w-72 bg-white rounded-lg shadow p-4">
      {/* cut-off date tag */}
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
  )
}
