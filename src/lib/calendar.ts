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
  const { startDate, year, month, today } = getData(date, calendarType)
  const calendar = getCalendarByType(calendarType)

  const calendarDays: CalendarDay[] = []
  const nextDay: Date = getMondayDate(startDate)

  for (let d: number = 1; d <= calendar.dayCount; d++) {

    calendarDays.push({
      date: new Date(nextDay),
      dayNumber: nextDay.getUTCDate(),
      currentMonth: isCurrentMonth(nextDay, year, month),
      currentDay: isCurrentDay(nextDay, today),
    })

    nextDay.setUTCDate(nextDay.getUTCDate() + 1)
  }

  return calendarDays
}

function getData(date: Date, calendarType: Calendar["type"]) {
  const utcDate: Date = getUtcStartDay(date)

  const startDate: Date = calendarType === "month"
    ? new Date(utcDate.setUTCDate(1))
    : utcDate
  const year: number = startDate.getUTCFullYear()
  const month: number = startDate.getUTCMonth()
  const today: Date = getUtcStartDay(new Date())

  return { startDate, year, month, today }
}

function getMondayDate(date: Date) {
  const dateIn = getUtcStartDay(date)
  const weekDay = dateIn.getUTCDay()
  const mondayNum = dateIn.getUTCDate() - weekDay + (weekDay === 0 ? -6 : 1)
  const mondayDate = new Date(dateIn.setUTCDate(mondayNum))

  return mondayDate
}

function isCurrentMonth(date: Date, year: number, month: number) {
  return date.getUTCFullYear() === year && date.getUTCMonth() === month
}

function isCurrentDay(date: Date, today: Date) {
  return date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)
}

// CalendarTypes

export function getCalendarByType(calendarType: Calendar["type"]) {
  return calendars.find(calendar => calendar.type === calendarType) as Calendar
}

// CalendarPeriod

export function getUtcPrevPeriod(date: Date, calendarType: Calendar["type"] = "month") {
  const prevDate = calendarType === "month"
    ? new Date(date).setUTCMonth(date.getUTCMonth() - 1, 1)
    : new Date(date).setUTCDate(date.getUTCDate() - 7)
  return new Date(prevDate)
}

export function getUtcStartDay(date: Date): Date {
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ))
}

export function getUtcNextPeriod(date: Date, calendarType: Calendar["type"] = "month") {
  const nextDate =
    calendarType === "month"
      ? new Date(date).setUTCMonth(date.getUTCMonth() + 1, 1)
      : new Date(date).setUTCDate(date.getUTCDate() + 7)
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

export function getUtcNextDayStart(date: Date): Date {
  const dayStart: Date = getUtcStartDay(date)
  const nextDayStart: Date = new Date(dayStart.setUTCDate(dayStart.getUTCDate() + 1))

  return nextDayStart
}