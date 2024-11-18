import { MdArrowLeft, MdArrowRight } from "react-icons/md"
import { useCalendarPeriodContext, useCalendarTypeContext } from "./Calendar"
import { getNextPeriod, getPrevPeriod } from "@/lib/periodChange"
import { useFormatter } from "next-intl"

export default function PeriodChange() {
  const { calendarPeriod, setCalendarPeriod } = useCalendarPeriodContext()
  const { calendarType } = useCalendarTypeContext()

  const format = useFormatter()

  const formatedMonthYear = () => {
    if (!calendarPeriod) return

    let formatedMonth =
      format.dateTime(new Date(calendarPeriod), {
        month: 'long',
        year: 'numeric',
      })

    formatedMonth = formatedMonth[0].toUpperCase() + formatedMonth.slice(1)

    return formatedMonth
  }

  return (
    <div className="bg-neutral-600 w-64 flex flex-row items-center border border-neutral-400 rounded-2xl">
      <button
        className="h-full text-3xl hover:*:scale-125"
        onClick={() => setCalendarPeriod(getPrevPeriod(calendarPeriod, calendarType.id))}>
        <MdArrowLeft />
      </button>
      <div
        className="bg-neutral-500 text-sm font-bold border-x border-neutral-400 w-full h-full flex items-center justify-center hover:cursor-pointer"
        onClick={() => setCalendarPeriod(new Date())}
        title="Dzisiaj">
        {formatedMonthYear()}
      </div>
      <button
        className="h-full text-3xl hover:*:scale-125"
        onClick={() => setCalendarPeriod(getNextPeriod(calendarPeriod, calendarType.id))}>
        <MdArrowRight />
      </button>
    </div>
  )
}
