import getReservationsByDate from "@/lib/getReservationsByDate"
import ReservationWeek from "./ReservationWeek"

type Props = {
  calendarDay: CalendarDay
  reservations: Reservation[]
}

export default function DayWeek({ calendarDay, reservations }: Props) {

  const dayReservations = getReservationsByDate(reservations, calendarDay.date)

  return (
    <div className="bg-neutral-700 relative h-full rounded-md hover:shadow-[0px_0px_2px_1px]">
      {dayReservations.map((dayReservation) => (
        <ReservationWeek key={dayReservation.reservationId} dayReservation={dayReservation} />
      ))}
    </div>
  )
}
