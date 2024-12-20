const calendarTypes: CalendarTypes[] = [
  {
    id: "week",
    name: "Tygodniowy",
    daysCount: 7,
  },
  {
    id: "month",
    name: "Miesięczny",
    daysCount: 42,
  },
]

// CalendarDays

export function getCalendarDays(date: Date, calendarType: CalendarTypes): CalendarDay[] {
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

// CalendarPeriod

export function getPrevPeriod(currentPeriod: Date, calendarTypeId: CalendarTypes["id"]) {
  const prevPeriod =
    calendarTypeId === "month"
      ? new Date(currentPeriod.getFullYear(), currentPeriod.getMonth() - 1, 1)
      : new Date(currentPeriod.getFullYear(), currentPeriod.getMonth(), currentPeriod.getDate() - 7)

  return prevPeriod
}

export function getNextPeriod(currentPeriod: Date, calendarTypeId: CalendarTypes["id"]) {
  const nextPeriod =
    calendarTypeId === "month"
      ? new Date(currentPeriod.getFullYear(), currentPeriod.getMonth() + 1, 1)
      : new Date(currentPeriod.getFullYear(), currentPeriod.getMonth(), currentPeriod.getDate() + 7)

  return nextPeriod
}

// CalendarType

export function getCalendarTypes(): CalendarTypes[] {
  return calendarTypes
}

export function getCalendarTypeById(typeId: CalendarTypes["id"]) {
  const calendarType = calendarTypes.find((type) => (
    type.id === typeId
  ))

  if (!calendarType) {
    return calendarTypes[0]
  } else {
    return calendarType
  }
}