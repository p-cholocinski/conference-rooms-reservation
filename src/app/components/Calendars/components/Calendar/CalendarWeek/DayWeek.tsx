import { useMemo } from "react"
import ReservationWeek from "./ReservationWeek"
import { getReservationsByDate } from "@/lib/reservation"
import NewReservationWeekHandler from "./NewReservationWeekHandler"
import { Reservation, ReservationCategory, Room } from "@prisma/client"

type Props = {
  calendarDay: CalendarDay,
  room: {
    id: Room["id"] | null,
    name: Room["name"] | null,
    openFrom: Room["openFrom"],
    openTo: Room["openTo"],
  },
  reservations: ({
    category: ReservationCategory,
  } & Reservation)[],
  calendarHeight: number,
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
}

export default function DayWeek({ calendarDay, room, reservations, calendarHeight, rooms, reservationCategories }: Props) {
  const dayReservations = useMemo(() => {
    return getReservationsByDate(reservations, calendarDay.date) as ({
      category: ReservationCategory,
    } & Reservation)[]
  }, [reservations, calendarDay.date])

  return (
    <div
      className="relative h-full border-l border-neutral-400 select-none hover:bg-neutral-700/20"
    >
      {room.id &&
        dayReservations?.map((dayReservation) => (
          <ReservationWeek
            key={dayReservation.id}
            room={room}
            dayReservation={dayReservation}
            calendarHeight={calendarHeight}
            rooms={rooms}
            reservationCategories={reservationCategories}
          />
        ))}
      {room.id &&
        <NewReservationWeekHandler
          date={calendarDay.date}
          room={room}
          calendarHeight={calendarHeight}
          rooms={rooms}
          reservationCategories={reservationCategories}
        />}
    </div>
  )
}