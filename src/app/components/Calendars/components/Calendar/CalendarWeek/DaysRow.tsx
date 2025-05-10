type Props = {
  calendarDays: CalendarDay[],
}

export default function DaysRow({ calendarDays }: Props) {
  return (
    <div className="grid grid-cols-7 border-b border-neutral-400 text-xl text-center pb-1">
      {calendarDays?.map((weekDay) => (
        <div
          key={"day-row-" + weekDay.date.toISOString()}
        >
          <div
            className={`w-10 h-10 rounded-full mx-auto content-center ${weekDay.currentDay ? 'bg-neutral-950' : ''}`}
          >
            {weekDay.dayNumber}
          </div>
          <div className="absolute h-4 -translate-y-3 border-l border-neutral-400"></div>
        </div>
      ))}
    </div>
  )
}
