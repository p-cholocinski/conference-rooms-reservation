import { getReservationsByDate } from "@/lib/reservation"
import ReservationMonth from "./ReservationMonth"

type Props = {
  calendarDay: CalendarDay
  reservations: Reservation[]
}

export default function DayMonth({ calendarDay, reservations }: Props) {

  const { currentMonth, currentDay, dayNumber } = calendarDay

  const dayReservations = getReservationsByDate(reservations, calendarDay.date)

  return (
    <div className="p-[2px] border border-neutral-400 rounded-md hover:shadow-[0px_0px_4px_1px] hover:shadow-neutral-200 hover:cursor-pointer hover:scale-105">
      <div
        className={`${currentMonth ? 'bg-neutral-300 text-neutral-700 font-bold text-sm' : 'bg-neutral-500 text-xs'} ${currentDay ? '!bg-neutral-900 !text-neutral-50' : ''} overflow-hidden text-center justify-center rounded-t-md rounded-b-sm`}
      >
        {dayNumber}
      </div>
      <div className={`${currentMonth ? 'h-[calc(100%-20px)]' : 'h-[calc(100%-16px)]'} pt-1`}>
        <div className="h-full overflow-y-scroll scrollbar-hidden">
          <div className="flex flex-col gap-1">
            {dayReservations.map((dayReservation) => (
              <ReservationMonth key={dayReservation.reservationId} dayReservation={dayReservation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
