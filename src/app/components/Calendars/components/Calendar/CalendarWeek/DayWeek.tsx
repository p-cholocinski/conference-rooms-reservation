import { getReservationsByDate } from "@/lib/reservation"
import ReservationWeek from "./ReservationWeek"
import { useEffect, useState } from "react"

type Props = {
  calendarDay: CalendarDay,
  reservations: Reservation[],
  roomOpenHours: Room["openHours"],
  calendarHeight: number,
}

export default function DayWeek({ calendarDay, reservations, roomOpenHours, calendarHeight }: Props) {

  const [dayReservations, setDayReservations] = useState<Reservation[] | undefined>(undefined)

  useEffect(() => {
    setDayReservations(getReservationsByDate(reservations, calendarDay.date))
  }, [reservations])

  return (
    <div
      className="relative h-full border-l border-neutral-400 hover:bg-neutral-700/20"
    >
      {dayReservations?.map((dayReservation) => (
        <ReservationWeek key={dayReservation.reservationId} dayReservation={dayReservation} roomOpenHours={roomOpenHours} calendarHeight={calendarHeight} />
      ))}
    </div>
  )
}
