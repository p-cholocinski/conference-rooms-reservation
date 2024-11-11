export default function OneDay({ dayNumber, currentMonth, currentDay }: CalendarDay) {
  return (
    <div className="p-[2px] border border-neutral-400 rounded-md hover:shadow-[0px_0px_4px_1px] hover:shadow-neutral-200 hover:cursor-pointer hover:scale-105">
      <div
        className={`${currentMonth ? 'bg-neutral-300 text-neutral-700 font-bold text-sm' : 'bg-neutral-500 text-xs'} ${currentDay ? 'bg-neutral-900 !text-neutral-50' : ''} text-center justify-center rounded-t-md rounded-b-sm`}
      >
        {dayNumber}
      </div>
    </div>
  )
}
