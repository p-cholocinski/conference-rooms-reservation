import CalendarMonth from "./CalendarMonth/CalendarMonth"
import PeriodChange from "./PeriodChange"
import TypeChange from "./TypeChange"

export default function Calendar() {
  return (
    <div className="md:ml-80 h-full">
      <div className="m-4 p-4 bg-neutral-600 shadow-[0px_0px_4px_1px] shadow-neutral-200 rounded-2xl">
        <div className="flex justify-between">
          <PeriodChange />
          <TypeChange />
        </div>
        <CalendarMonth />
      </div>
    </div>
  )
}
