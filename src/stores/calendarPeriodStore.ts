import { create } from 'zustand'

interface CalendarPeriodState {
  calendarPeriod: Date,
  setCalendarPeriod: (period: Date) => void,
}

const useCalendarPeriodStore = create<CalendarPeriodState>((set) => ({
  calendarPeriod: new Date(),
  setCalendarPeriod: (period) => set({ calendarPeriod: period }),
}))

export default useCalendarPeriodStore