export default function getCalendarDays(date: Date, calendarType: CalendarTypes): CalendarDay[] {
  const data = getData(date, calendarType.id)

  const monthDays: CalendarDay[] = []
  const nextDay: Date = getWeekMonday(data.startDate)

  for (let d: number = 1; d <= calendarType.daysCount; d++) {

    monthDays.push({
      date: new Date(nextDay).toISOString(),
      dayNumber: nextDay.getDate(),
      currentMonth: isCurrentMonth(nextDay, data.year, data.month),
      currentDay: isCurrentDay(nextDay, data.today),
    })

    nextDay.setDate(nextDay.getDate() + 1)
  }

  return monthDays
}

function getData(date: Date, calendarTypeId: CalendarTypes["id"]) {
  const startDate: Date =
    calendarTypeId === "month"
      ? new Date(date.getFullYear(), date.getMonth(), 1)
      : new Date(date)
  const year: number = startDate.getFullYear()
  const month: number = startDate.getMonth()
  const today: Date = new Date()

  const data = { startDate, year, month, today }

  return data
}

function getWeekMonday(date: Date) {
  const dateIn = new Date(date)
  const weekDay = dateIn.getDay()
  const weekMondayNum = dateIn.getDate() - weekDay + (weekDay === 0 ? -6 : 1)
  const weekMondayDate = new Date(dateIn.setDate(weekMondayNum))

  return weekMondayDate
}

function isCurrentMonth(date: Date, year: number, month: number) {
  return date.getFullYear() === year && date.getMonth() === month
    ? true
    : false
}

function isCurrentDay(date: Date, today: Date) {
  return date.toDateString() === today.toDateString()
    ? true
    : false
}