import { createContext, useContext, useState, ReactNode } from "react"

type CalendarPeriodContextType = {
  calendarPeriod: Date,
  setCalendarPeriod: React.Dispatch<React.SetStateAction<Date>>,
}

const CalendarPeriodContext = createContext<CalendarPeriodContextType | undefined>(undefined)

export const CalendarPeriodContextProvider = ({ children }: { children: ReactNode }) => {
  const [calendarPeriod, setCalendarPeriod] = useState(new Date())

  return (
    <CalendarPeriodContext.Provider value={{ calendarPeriod, setCalendarPeriod }}>
      {children}
    </CalendarPeriodContext.Provider>
  )
}

export const useCalendarPeriodContext = () => {
  const context = useContext(CalendarPeriodContext)
  if (!context) {
    throw new Error("useCalendarPeriodContext must be used within a CalendarPeriodContext")
  }
  return context
}