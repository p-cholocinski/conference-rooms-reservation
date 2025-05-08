'use client'

import { MdArrowLeft, MdArrowRight } from "react-icons/md"
import { formatMonthYear } from "@/lib/dateTimeFormats"
import { getCurrentPeriod, getNextPeriod, getPrevPeriod } from "@/lib/calendar"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"

type Props = {
  calendarPeriod: string,
  calendarType: Calendar["type"],
  className?: string,
}

export default function PeriodChange({ calendarPeriod, calendarType, className }: Props) {
  const updateSearchParams = useUpdateSearchParams()

  const formatedMonthYear = formatMonthYear(calendarPeriod)

  const handlePrevPeriod = () => {
    updateSearchParams("cp", getPrevPeriod(new Date(calendarPeriod), calendarType).valueOf().toString())
  }

  const handleCurrentPeriod = () => {
    updateSearchParams("cp", getCurrentPeriod(new Date()).valueOf().toString())
  }

  const handleNextPeriod = () => {
    updateSearchParams("cp", getNextPeriod(new Date(calendarPeriod), calendarType).valueOf().toString())
  }

  return (
    <div className={`flex ${className}`}>
      <div className="bg-neutral-600 w-64 flex flex-row items-center border border-neutral-400 rounded-2xl">
        <button
          type="button"
          className="h-full text-3xl hover:cursor-pointer"
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
          className="h-full text-3xl hover:cursor-pointer"
          onClick={handleNextPeriod}>
          <MdArrowRight className="hover:scale-125" />
        </button>
      </div>
    </div>
  )
}
