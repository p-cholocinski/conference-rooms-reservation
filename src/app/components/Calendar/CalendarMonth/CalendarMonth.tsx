import getMonthDays from "@/lib/getMonthDays";
import OneDay from "./OneDay";
import WeekRow from "./WeekRow";

export default function CalendarMonth() {
  const monthDays: CalendarDay[] = getMonthDays(new Date("2024-11-01"))

  return (
    <div className="my-4 mx-2 h-full pb-16">
      <WeekRow />
      <div className="h-full grid grid-cols-7 grid-rows-6 gap-2">
        {monthDays.map(monthDay => (
          <OneDay key={monthDay.date} dayNumber={monthDay.dayNumber} currentMonth={monthDay.currentMonth} currentDay={monthDay.currentDay} />
        ))}
      </div>
    </div>
  )
}
