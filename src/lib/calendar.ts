import { formatTime } from "@/lib/dateTimeFormats"

export const calendars: Calendar[] = [
  {
    type: "week",
    name: "Tygodniowy",
    dayCount: 7
  },
  {
    type: "month",
    name: "Miesięczny",
    dayCount: 42
  },
]

// CalendarDays

export function getCalendarDays(date: Date, calendarType: Calendar["type"]): CalendarDay[] {
  const data = getData(date, calendarType)
  const calendar = getCalendarByType(calendarType)

  const monthDays: CalendarDay[] = []
  const nextDay: Date = getWeekMonday(data.startDate)

  for (let d: number = 1; d <= calendar.dayCount; d++) {

    monthDays.push({
      date: new Date(nextDay),
      dayNumber: nextDay.getDate(),
      currentMonth: isCurrentMonth(nextDay, data.year, data.month),
      currentDay: isCurrentDay(nextDay, data.today),
    })

    nextDay.setDate(nextDay.getDate() + 1)
  }

  return monthDays
}

function getData(date: Date, calendarType: Calendar["type"]) {
  const startDate: Date =
    calendarType === "month"
      ? new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
      : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
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

// CalendarTypes

export function getCalendarByType(calendarType: Calendar["type"]) {
  return calendars.find(calendar => calendar.type === calendarType) as Calendar
}

// CalendarPeriod

export function getPrevPeriod(date: Date, calendarType: Calendar["type"] = "month") {
  const prevDate =
    calendarType === "month"
      ? new Date(date).setMonth(date.getMonth() - 1, 1)
      : new Date(date).setDate(date.getDate() - 7)
  return new Date(prevDate)
}

export function getCurrentPeriod(): Date {
  const currentDate = new Date(new Date()).setHours(0, 0, 0, 0)
  return new Date(currentDate)
}

export function getNextPeriod(date: Date, calendarType: Calendar["type"] = "month") {
  const nextDate =
    calendarType === "month"
      ? new Date(date).setMonth(date.getMonth() + 1, 1)
      : new Date(date).setDate(date.getDate() + 7)
  return new Date(nextDate)
}

// Time

export function getDateTimeList(timeStart: Date, timeEnd: Date) {
  const timeList: { value: string, label: string }[] = []

  while (timeStart <= timeEnd) {
    timeList.push({
      value: timeStart.toISOString(),
      label: formatTime(timeStart),
    })
    timeStart.setMinutes(timeStart.getMinutes() + 15)
  }

  return timeList
}

export function getRoundedToQuarterTime(timeStart: Date): Date {
  const time: Date = new Date(timeStart)
  const timeMinutes: number = time.getMinutes()
  const quarterCount: number = Math.ceil(timeMinutes / 15)

  time.setMinutes(15 * quarterCount, 0, 0)

  return time
}

export function getDayStart(date: Date): Date {
  const dayDate: Date = new Date(date)
  const dayStart: Date = new Date(dayDate.setHours(0, 0, 0, 0))

  return dayStart
}

export function getNextDayStart(date: Date): Date {
  const dayDate: Date = new Date(date)
  const nextDay: Date = new Date(dayDate.setDate(dayDate.getDate() + 1))
  const nextDayStart: Date = new Date(nextDay.setHours(0, 0, 0, 0))

  return nextDayStart
}