import { Reservation, Room } from "@prisma/client"
import { getUtcNextDayStart, getUtcStartDay } from "./calendar"
import { getISODate } from "@/utils/getIsoDate"

// Get Reservations

export function getReservationsByDate(reservations: Reservation[], date: Date) {
  const outReservations = reservations.filter((reservation) => (
    getISODate(reservation.startDate) === getISODate(date)
  ))
  outReservations.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0))

  return outReservations
}

// Reservation WeekCalendar Position

export function getReservationWeekTop(dateStart: Date, room: { openFrom: Room["openFrom"], openTo: Room["openTo"] }, parentElementHeight: number): number {
  const startDay = new Date(new Date(dateStart).setUTCHours((room.openFrom as number), 0, 0, 0))
  const endDay = new Date(new Date(dateStart).setUTCHours((room.openTo as number), 0, 0, 0))

  const totalMillisecondsInDay = endDay.getTime() - startDay.getTime()
  const elapsedMillisecondsInDay = dateStart.getTime() - startDay.getTime()

  const dayProgressPercentage = (elapsedMillisecondsInDay / totalMillisecondsInDay)

  return parentElementHeight * dayProgressPercentage
}

export function getReservationWeekBottom(dateEnd: Date, room: { openFrom: Room["openFrom"], openTo: Room["openTo"] }, parentElementHeight: number): number {
  const startDay = new Date(new Date(dateEnd).setUTCHours((room.openFrom as number), 0, 0, 0))
  const endDay = new Date(new Date(dateEnd).setUTCHours((room.openTo as number), 0, 0, 0))

  const totalMillisecondsInDay = endDay.getTime() - startDay.getTime()
  const leftMillisecondsInDay = endDay.getTime() - dateEnd.getTime()

  const dayProgressPercentage = (leftMillisecondsInDay / totalMillisecondsInDay)

  return parentElementHeight * dayProgressPercentage
}

export function calculateElementPositionStyle(parentLayout: { top: number, left: number, height: number, width: number }) {
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0

  const positionX =
    (windowHeight / 2) >= parentLayout.top
      ? `"top":${parentLayout.top}`
      : `"bottom":${windowHeight - parentLayout.top - parentLayout.height}`

  const positionY =
    (windowWidth / 2) >= parentLayout.left
      ? `"left":${parentLayout.left + parentLayout.width + 10}`
      : `"right":${windowWidth - parentLayout.left + 10}`

  const position = JSON.parse(`{${positionX},${positionY}}`)

  return position
}

// New Reservation WeekCalendar

export function getDayPartHeight(room: { openFrom: Room["openFrom"], openTo: Room["openTo"] }, parentElementHeight: number, minutesInterval: number): number {
  const hoursDiff: number = ((room.openTo as number) - (room.openFrom as number))
  const hourParts: number = 60 / minutesInterval
  const dayParts: number = hoursDiff * hourParts
  const dayPartHeight: number = parentElementHeight / dayParts

  return dayPartHeight
}

export function getNewReservationWeekTop(mouseY: number, dayPartHeight: number): number {
  const newReservationWeekPart: number = Math.floor(mouseY / dayPartHeight)
  const newReservationWeekTop: number = newReservationWeekPart * dayPartHeight

  return newReservationWeekTop
}

export function getNewReservationWeekBottom(mouseY: number, calendarHeight: number, dayPartHeight: number): number {
  const newReservationWeekPart: number = Math.floor((calendarHeight - mouseY) / dayPartHeight)
  const newReservationWeekBottom: number = newReservationWeekPart * dayPartHeight

  return newReservationWeekBottom
}

export function getNewReservationTimeFrom(date: Date, mouseY: number, dayPartHeight: number, roomOpenFrom: Room["openFrom"]): Date {
  const top: number = getNewReservationWeekTop(mouseY, dayPartHeight)
  const timeFrom: Date = getNewReservationTime(date, top, dayPartHeight, roomOpenFrom as number)

  return timeFrom
}

export function getNewReservationTimeTo(date: Date, mouseY: number, calendarHeight: number, dayPartHeight: number, roomOpenFrom: Room["openFrom"]): Date {
  const bottom: number = getNewReservationWeekBottom(mouseY, calendarHeight, dayPartHeight)
  const timeTo: Date = getNewReservationTime(date, calendarHeight - bottom, dayPartHeight, roomOpenFrom as number)

  return timeTo
}

export function getNewReservationTime(date: Date, top: number, dayPartHeight: number, roomOpenFrom: Room["openFrom"]): Date {
  const dayPart: number = top > 0 ? top / dayPartHeight : 0
  const hoursFromOpen: number = dayPart * (15 / 60)
  const hoursFromDayStart: number = (roomOpenFrom as number) + hoursFromOpen
  const millisecondsFromDayStart: number = hoursFromDayStart * 60 * 60 * 1000

  const newReservationTime: Date = getUtcStartDay(date)
  newReservationTime.setUTCMilliseconds(newReservationTime.getUTCMilliseconds() + millisecondsFromDayStart)

  return newReservationTime
}

// Reservation Form

export function getTimesAfterRoomChange(startDate: Date, endDate: Date, roomOpenFrom: Room["openFrom"], roomOpenTo: Room["openTo"]) {
  const timeMin = new Date(
    new Date(startDate).setUTCHours(roomOpenFrom || 0, 0, 0, 0)
  )
  const timeMax = roomOpenTo
    ? new Date(new Date(endDate).setUTCHours(roomOpenTo, 0, 0, 0))
    : getUtcNextDayStart(timeMin)
  const timeDiff = endDate.getTime() - startDate.getTime()

  if (startDate < timeMin) {
    const tempEndDate = new Date(timeMin.getTime() + timeDiff)
    return {
      startDate: timeMin,
      endDate: tempEndDate < timeMax ? tempEndDate : timeMax
    }
  } else if (endDate > timeMax) {
    const tempStartDate = new Date(timeMax.getTime() - timeDiff)
    return {
      startDate: tempStartDate > timeMin ? tempStartDate : timeMin,
      endDate: timeMax
    }
  }
}

export function isReservationOverlaps(startDate: Date, endDate: Date, reservationId: Reservation["id"] | undefined, reservations: Reservation[]) {
  return reservations.some((reservation) => {
    const rStartDate = reservation.startDate
    const rEndDate = reservation.endDate

    return (
      (reservationId !== reservation.id) &&
      (
        (startDate > rStartDate && startDate < rEndDate) ||
        (endDate > rStartDate && endDate < rEndDate) ||
        (startDate <= rStartDate && endDate >= rEndDate)
      )
    )
  })
}