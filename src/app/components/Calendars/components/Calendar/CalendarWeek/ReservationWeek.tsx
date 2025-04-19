import { getReservationWeekBottom, getReservationWeekTop } from "@/lib/reservation"
import { useRef, useState } from "react"
import ReservationCard from "./ReservationCard"
import { formatTimeRange } from "@/lib/dateTimeFormats"
import { Reservation, ReservationCategory, Room } from "@prisma/client"

type Props = {
  room: {
    id: Room["id"] | null,
    name: Room["name"] | null,
    openFrom: Room["openFrom"],
    openTo: Room["openTo"],
  },
  dayReservation: ({
    category: ReservationCategory,
  } & Reservation),
  calendarHeight: number,
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
}

export default function ReservationWeek({ room, dayReservation, calendarHeight, rooms, reservationCategories }: Props) {
  const [reservationCardVisible, setReservationCardVisible] = useState<boolean>(false)

  const reservationWeekRef = useRef<HTMLDivElement>(null)

  const formatedTimeRange = formatTimeRange(dayReservation.startDate, dayReservation.endDate)

  const elementTop: number = getReservationWeekTop(dayReservation.startDate, room, calendarHeight)
  const elementBottom: number = getReservationWeekBottom(dayReservation.endDate, room, calendarHeight)
  const elementHeight: number = calendarHeight - elementTop - elementBottom
  const lineHeight: number = 16
  const lineCount: number = Math.floor((elementHeight - 8) / lineHeight)
  const maxDescHeight: string = ((lineCount - 1) * lineHeight) + 'px'

  return (
    <div
      className={`absolute left-0 right-0 mx-1 text-xs rounded-md overflow-hidden hover:cursor-pointer hover:bg-neutral-700 ${reservationCardVisible ? 'bg-neutral-800' : 'bg-neutral-500'}`}
      style={{ top: elementTop + 'px', bottom: elementBottom + 'px' }}
      ref={reservationWeekRef}
    >
      <div
        className={`flex h-full ${lineCount <= 1 ? 'flex-row gap-1 truncate' : 'flex-col *:overflow-hidden'} ${lineCount === 0 ? 'px-1 text-[11px] items-center' : 'p-1'}`}
        onClick={() => setReservationCardVisible(!reservationCardVisible)}
      >
        <div
          className="font-bold"
          style={{ maxHeight: maxDescHeight }}
        >
          {dayReservation.description}
        </div>
        <div className="whitespace-nowrap">
          {formatedTimeRange}
        </div>
      </div>
      {reservationCardVisible &&
        <ReservationCard
          reservation={dayReservation}
          parentLayout={
            reservationWeekRef.current
              ? reservationWeekRef.current.getBoundingClientRect()
              : { top: 0, left: 0, height: 0, width: 0 }
          }
          rooms={rooms}
          reservationCategories={reservationCategories}
          onClose={() => setReservationCardVisible(false)}
        />}
    </div>
  )
}