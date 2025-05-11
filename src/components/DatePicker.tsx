import { useState, useMemo, RefObject } from "react";
import WeekRow from "@/components/WeekRow";
import PeriodChange from "@/components/PeriodChange";
import useClickOutside from "@/hooks/useClickOutside";
import { getCalendarDays, getCurrentPeriod, getNextPeriod, getPrevPeriod } from "@/lib/calendar";

type Props = {
  selectedDate: Date,
  handleSelectedDate: (date: Date | null) => void,
  parentRef: RefObject<HTMLDivElement | null>,
}

export default function DatePicker({ selectedDate, handleSelectedDate, parentRef }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<Date>(selectedDate)

  useClickOutside(parentRef, () => handleSelectedDate(null))

  const calendarDays: CalendarDay[] = useMemo(() => {
    return getCalendarDays(selectedPeriod, 'month')
  }, [selectedPeriod])

  const handlePrevPeriod = () => {
    setSelectedPeriod(getPrevPeriod(selectedPeriod))
  }

  const handleCurrentPeriod = () => {
    setSelectedPeriod(getCurrentPeriod())
  }

  const handleNextPeriod = () => {
    setSelectedPeriod(getNextPeriod(selectedPeriod))
  }

  return (
    <div
      className="absolute translate-y-1 bg-neutral-600 p-3 rounded-md z-10"
    >
      <PeriodChange
        calendarPeriod={selectedPeriod}
        handlePrevPeriod={handlePrevPeriod}
        handleCurrentPeriod={handleCurrentPeriod}
        handleNextPeriod={handleNextPeriod}
        className="pb-4"
      />
      <WeekRow />
      <div className="grid pt-1 grid-cols-7 grid-rows-6 text-center text-sm">
        {calendarDays.map(calendarDay => (
          <div
            key={'date-picker-' + calendarDay.date.toISOString()}
            className={`w-9 h-9 cursor-pointer content-center rounded-md hover:bg-neutral-800/40 ${!calendarDay.currentMonth ? 'text-neutral-400' : 'text-neutral-50 font-bold'} ${calendarDay.currentDay && 'bg-neutral-800/60'} ${calendarDay.date.getTime() === selectedDate.getTime() && '!bg-neutral-200 !text-neutral-950'}`}
            onClick={() => handleSelectedDate(calendarDay.date)}
          >
            {calendarDay.dayNumber}
          </div>
        ))}
      </div>
    </div>
  )
}