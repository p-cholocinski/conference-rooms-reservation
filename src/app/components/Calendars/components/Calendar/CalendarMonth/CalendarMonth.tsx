import DayMonth from "./DayMonth";
import WeekRow from "../../WeekRow";

type Props = {
  calendarDays: CalendarDay[]
  reservations: Reservation[]
}

export default function CalendarMonth({ calendarDays, reservations }: Props) {

  return (
    <div className="my-4 mx-2 h-full pb-16">
      <WeekRow />
      <div className="h-full grid grid-cols-7 grid-rows-6 gap-2">
        {calendarDays
          ? calendarDays.map(monthDay => (
            <DayMonth key={monthDay.date} calendarDay={monthDay} reservations={reservations} />
          ))
          : ''}
      </div>
    </div>
  )
}
