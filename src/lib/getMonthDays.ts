export default function getMonthDays(date: Date): CalendarDay[] {
  const data = getData(date)

  const monthDays: CalendarDay[] = []
  const nextDay: Date = getWeekMonday(data.firstMonthDay)

  for (let d: number = 1; d <= 42; d++) {

    monthDays.push({
      date: new Date(nextDay).toLocaleDateString(),
      dayNumber: nextDay.getDate(),
      currentMonth: isCurrentMonth(nextDay, data.year, data.month),
      currentDay: isCurrentDay(nextDay, data.today),
    })

    nextDay.setDate(nextDay.getDate() + 1)
  }

  return monthDays
}

function getData(date: Date) {
  const firstMonthDay: Date = new Date(date.getFullYear(), date.getMonth(), 1)
  const year: number = firstMonthDay.getFullYear()
  const month: number = firstMonthDay.getMonth()
  const today: Date = new Date()

  const data = { firstMonthDay, year, month, today }

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
  return date.toLocaleDateString() === today.toLocaleDateString()
    ? true
    : false
}