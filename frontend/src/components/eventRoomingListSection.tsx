import type { RoomingList } from '../types/rooming'
import EventDivider from './eventDivider'
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
      <EventDivider eventName={eventName} />

      {/* Horizontal carousel */}
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {roomingList.map((rl) => (
          <RoomingListCard key={rl.rooming_list_id} rl={rl} />
        ))}
      </div>
    </section>
  )
}
