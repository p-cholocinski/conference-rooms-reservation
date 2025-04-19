type CalendarDay = {
  date: string,
  dayNumber: number,
  currentMonth: boolean,
  currentDay: boolean,
}

type Calendar = {
  type: "week" | "month",
  name: string,
  dayCount: number,
}