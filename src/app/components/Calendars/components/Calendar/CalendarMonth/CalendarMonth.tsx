import DayMonth from "./DayMonth";
import WeekRow from "@/components/WeekRow";
import { Reservation } from "@prisma/client";
import { getReservationsByDate } from "@/lib/reservation";

type Props = {
  calendarDays: CalendarDay[],
  reservations: Reservation[],
}

export default function CalendarMonth({ calendarDays, reservations }: Props) {

  return (
    <div className="my-4 mx-2 h-full pb-16">
      <WeekRow />
      <div className="h-full grid grid-cols-7 grid-rows-6 gap-2">
        {calendarDays
          ? calendarDays.map(calendarDay => (
            <DayMonth
              key={"day-month-" + calendarDay.date.toISOString()}
              calendarDay={calendarDay}
              dayReservations={getReservationsByDate(reservations, calendarDay.date)}
            />
          ))
          : ''}
      </div>
    </div>
  )
}
