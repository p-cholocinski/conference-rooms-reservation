import { MdArrowLeft, MdArrowRight } from "react-icons/md"
import { formatMonthYear } from "@/lib/dateTimeFormats"

type Props = {
  calendarPeriod: Date,
  handlePrevPeriod: () => void,
  handleCurrentPeriod: () => void,
  handleNextPeriod: () => void,
  className?: string,
}

export default function PeriodChange(
  {
    calendarPeriod,
    handlePrevPeriod,
    handleCurrentPeriod,
    handleNextPeriod,
    className
  }: Props
) {

  const formatedMonthYear = formatMonthYear(calendarPeriod)

  return (
    <div className={`flex ${className}`}>
      <div className="bg-neutral-600 w-64 flex flex-row items-center border border-neutral-400 rounded-2xl">
        <button
          type="button"
          className="h-full text-3xl"
          onClick={handlePrevPeriod}>
          <MdArrowLeft className="hover:scale-125" />
        </button>
        <div
          className="flex bg-neutral-500 text-sm font-bold border-x border-neutral-400 w-full h-full items-center justify-center hover:cursor-pointer"
          onClick={handleCurrentPeriod}
          title="Dzisiaj"
        >
          {formatedMonthYear}
        </div>
        <button
          type="button"
          className="h-full text-3xl"
          onClick={handleNextPeriod}>
          <MdArrowRight className="hover:scale-125" />
        </button>
      </div>
    </div>
  )
}
