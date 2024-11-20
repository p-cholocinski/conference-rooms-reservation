import { createContext, useContext, useState, ReactNode } from "react"

type CalendarTypeContextType = {
  calendarType: CalendarTypes,
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarTypes>>,
}

const CalendarTypeContext = createContext<CalendarTypeContextType | undefined>(undefined)

export const CalendarTypeContextProvider = ({ children }: { children: ReactNode }) => {
  const [calendarType, setCalendarType] = useState({ id: "month", name: "Miesięczny", daysCount: 42 })

  return (
    <CalendarTypeContext.Provider value={{ calendarType, setCalendarType }}>
      {children}
    </CalendarTypeContext.Provider>
  )
}

export const useCalendarTypeContext = () => {
  const context = useContext(CalendarTypeContext)
  if (!context) {
    throw new Error("useCalendarTypeContext must be used within a CalendarTypeContext")
  }
  return context
}