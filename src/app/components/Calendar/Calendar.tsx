'use client'

import { createContext, useContext, useState } from "react"
import CalendarMonth from "./CalendarMonth/CalendarMonth"
import PeriodChange from "./PeriodChange"
import TypeChange from "./TypeChange"
import CalendarWeek from "./CalendarWeek/CalendarWeek"

type CalendarPeriodContextType = {
  calendarPeriod: Date,
  setCalendarPeriod: React.Dispatch<React.SetStateAction<Date>>,
}

type CalendarTypeContextType = {
  calendarType: CalendarTypes,
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarTypes>>,
}

const CalendarPeriodContext = createContext<CalendarPeriodContextType | undefined>(undefined)
const CalendarTypeContext = createContext<CalendarTypeContextType | undefined>(undefined)

export const useCalendarPeriodContext = () => {
  const context = useContext(CalendarPeriodContext)
  if (!context) {
    throw new Error("useCalendarPeriodContext error")
  }
  return context
}

export const useCalendarTypeContext = () => {
  const context = useContext(CalendarTypeContext)
  if (!context) {
    throw new Error("useCalendarTypeContext error")
  }
  return context
}

export default function Calendar() {
  const [calendarPeriod, setCalendarPeriod] = useState(new Date())
  const [calendarType, setCalendarType] = useState({ id: "month", name: "Miesięczny", daysCount: 42 })

  return (
    <CalendarPeriodContext.Provider value={{ calendarPeriod, setCalendarPeriod }}>
      <CalendarTypeContext.Provider value={{ calendarType, setCalendarType }}>
        <div className="md:ml-80 fixed h-full w-full pb-28 md:pr-80 z-0">
          <div className="h-full m-4 p-4 bg-neutral-600 shadow-[0px_0px_4px_1px] shadow-neutral-200 rounded-2xl">
            <div className="flex justify-between">
              <PeriodChange />
              <TypeChange />
            </div>
            {calendarType.id === "week"
              ? <CalendarWeek />
              : calendarType.id === "month"
                ? <CalendarMonth />
                : ''
            }
          </div>
        </div>
      </CalendarTypeContext.Provider>
    </CalendarPeriodContext.Provider>
  )
}
