import getReservationsByDate from "@/lib/getReservationsByDate"
import ReservationWeek from "./ReservationWeek"

type Props = {
  calendarDay: CalendarDay
  reservations: Reservation[]
}

export default function DayWeek({ calendarDay, reservations }: Props) {

  const dayReservations = getReservationsByDate(reservations, calendarDay.date)

  return (
    <div className="relative h-full border border-neutral-400 rounded-md hover:shadow-[0px_0px_2px_1px]">
      {dayReservations.map((dayReservation) => (
        <ReservationWeek key={dayReservation.reservationId} dayReservation={dayReservation} />
      ))}
    </div>
  )
}
