import { useEffect, useState } from "react";
import WeekRow from "../WeekRow";
import Hours from "./Hours";
import ReservationArea from "./Reservations";
import { useCalendarPeriodContext, useCalendarTypeContext } from "../Calendar";
import getCalendarDays from "@/lib/getCalendarDays";

export default function CalendarWeek() {
  const { calendarPeriod } = useCalendarPeriodContext()
  const { calendarType } = useCalendarTypeContext()

  const [weekDays, setWeekDays] = useState<CalendarDay[] | undefined>(undefined)

  useEffect(() => {
    const weekDays = getCalendarDays(calendarPeriod, calendarType)
    setWeekDays(weekDays)
  }, [calendarPeriod])

  return (
    <div className="my-4 mx-2 h-full pb-24">
      <div className="w-full flex overflow-y-scroll">
        <div className="w-10"></div>
        <div className="w-full">
          <WeekRow />
          <div className="grid grid-cols-7 text-center">
            {weekDays?.map((weekDay) => (
              <div key={weekDay.date}>{weekDay.dayNumber}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-scroll py-1">
        <div className="flex h-[1200px]">
          <Hours />
          <ReservationArea />
        </div>
      </div>
    </div>
  )
}
