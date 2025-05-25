import { formatTime } from "@/lib/dateTimeFormats"
import { getISODate } from "@/utils/getIsoDate"

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
  return getISODate(date) === getISODate(today)
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

export function getUtcNextPeriod(date: Date, calendarType: Calendar["type"] = "month") {
  const nextDate =
    calendarType === "month"
      ? new Date(date).setUTCMonth(date.getUTCMonth() + 1, 1)
      : new Date(date).setUTCDate(date.getUTCDate() + 7)
  return new Date(nextDate)
}

export function getUtcStartDay(date: Date): Date {
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ))
}

// Time

export function getDateTimeList(timeStart: Date, timeEnd: Date) {
  const timeList: { value: string, label: string }[] = []

  while (timeStart <= timeEnd) {
    timeList.push({
      value: timeStart.toISOString(),
      label: formatTime(timeStart),
    })
    timeStart.setUTCMinutes(timeStart.getUTCMinutes() + 15)
  }

  return timeList
}

export function getRoundedToQuarterTime(timeStart: Date): Date {
  const time: Date = new Date(timeStart)
  const timeMinutes: number = time.getUTCMinutes()
  const quarterCount: number = Math.ceil(timeMinutes / 15)

  time.setUTCMinutes(15 * quarterCount, 0, 0)

  return time
}

export function getUtcNextDayStart(date: Date): Date {
  const dayStart: Date = getUtcStartDay(date)
  const nextDayStart: Date = new Date(dayStart.setUTCDate(dayStart.getUTCDate() + 1))

  return nextDayStart
}

// Get hours

export function getHoursRange(startHour: number, endHour: number): string[] {
  if (startHour < 0 || startHour > 24 || endHour < 0 || endHour > 24) {
    throw new Error("Godziny muszą mieścić się w zakresie od 0 do 24.")
  }
  if (startHour >= endHour) {
    throw new Error("Godzina początkowa musi być mniejsza od godziny końcowej.")
  }

  const hours: string[] = []

  for (let hour = startHour; hour < endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, "0") + ":00"
    hours.push(formattedHour)
  }

  return hours;
}

// Others functions

export function isTheSameWeek(date1: Date, date2: Date): boolean {
  const date1Monday = getMondayDate(date1)
  const date2Monday = getMondayDate(date2)

  return getISODate(date1Monday) === getISODate(date2Monday)
}