import getCalendarDays from "@/lib/getCalendarDays";
import OneDay from "./OneDay";
import WeekRow from "../WeekRow";
import { useCalendarPeriodContext, useCalendarTypeContext } from "../Calendar";
import { useEffect, useState } from "react";

export default function CalendarMonth() {
  const { calendarPeriod } = useCalendarPeriodContext()
  const { calendarType } = useCalendarTypeContext()

  const [monthDays, setMonthDays] = useState<CalendarDay[] | undefined>(undefined)

  useEffect(() => {
    const monthDays = getCalendarDays(calendarPeriod, calendarType)
    setMonthDays(monthDays)
  }, [calendarPeriod])

  return (
    <div className="my-4 mx-2 h-full pb-16">
      <WeekRow />
      <div className="h-full grid grid-cols-7 grid-rows-6 gap-2">
        {monthDays
          ? monthDays.map(monthDay => (
            <OneDay key={monthDay.date} dayNumber={monthDay.dayNumber} currentMonth={monthDay.currentMonth} currentDay={monthDay.currentDay} />
          ))
          : ''}
      </div>
    </div>
  )
}
