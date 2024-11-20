import OneDay from "./OneDay";
import WeekRow from "../../WeekRow";

type Props = {
  calendarDays: CalendarDay[]
}

export default function CalendarMonth({ calendarDays }: Props) {

  return (
    <div className="my-4 mx-2 h-full pb-16">
      <WeekRow />
      <div className="h-full grid grid-cols-7 grid-rows-6 gap-2">
        {calendarDays
          ? calendarDays.map(monthDay => (
            <OneDay key={monthDay.date} dayNumber={monthDay.dayNumber} currentMonth={monthDay.currentMonth} currentDay={monthDay.currentDay} />
          ))
          : ''}
      </div>
    </div>
  )
}
