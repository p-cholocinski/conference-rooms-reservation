import { create } from 'zustand'

interface CalendarTypeState {
  calendarType: string,
  setCalendarType: (type: string) => void,
}

const useCalendarTypeStore = create<CalendarTypeState>((set) => ({
  calendarType: 'month',
  setCalendarType: (type) => set({ calendarType: type }),
}))

export default useCalendarTypeStore