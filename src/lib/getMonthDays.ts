export default function getMonthDays(date: Date): calendarDay[] {
  const dateYear: number = date.getFullYear()
  const dateMonth: number = date.getMonth()
  const todayDate: Date = new Date()
  date = new Date(date.setDate(date.getDate() - date.getDay() + 1))

  let monthDays: calendarDay[] = []
  let currMonth: boolean
  let currDay: boolean

  for (let d: number = 1; d <= 42; d++) {

    currMonth =
      date.getFullYear() === dateYear
        && date.getMonth() === dateMonth
        ? true
        : false

    currDay =
      date.toLocaleDateString() === todayDate.toLocaleDateString()
        ? true
        : false

    monthDays.push({
      date: new Date(date).toLocaleDateString(),
      dayNumber: date.getDate(),
      currentMonth: currMonth,
      currentDay: currDay,
    })

    date = new Date(date.setDate(date.getDate() + 1))
  }

  return monthDays
}