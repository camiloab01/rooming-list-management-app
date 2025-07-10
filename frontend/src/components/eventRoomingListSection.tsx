import type { RoomingList } from '../types/rooming'
import RoomingListCard from './roomingListCard'

interface EventRoomingListSectionProps {
  roomingList: RoomingList[]
  eventName: string
}

export default function EventRoomingListSection(
  props: EventRoomingListSectionProps
) {
  const { roomingList, eventName } = props

  return (
    <section className="space-y-4">
      {/* Divider with pill */}
      <div className="flex items-center">
        <div className="flex-1 h-px bg-gray-300" />
        <div className="px-4 py-1 mx-4 bg-teal-100 text-teal-700 font-medium rounded-full">
          {eventName}
        </div>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Horizontal carousel */}
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {roomingList.map((rl) => (
          <RoomingListCard key={rl.rooming_list_id} rl={rl} />
        ))}
      </div>
    </section>
  )
}
