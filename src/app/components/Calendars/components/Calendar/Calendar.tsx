import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarWeek from "./CalendarWeek/CalendarWeek";
import { getCalendarDays, getNextDayStart } from "@/lib/calendar";
import { Room } from "@prisma/client";
import prisma from "@/lib/prisma";

type Props = {
  roomId?: Room["id"],
  calendar: Calendar,
  calendarPeriod: string,
}

export default async function Calendar({ roomId, calendar, calendarPeriod }: Props) {
  const calendarDays = getCalendarDays(new Date(calendarPeriod), calendar.type)

  const rooms = await prisma.room.findMany({
    select: {
      id: true,
      name: true,
      openFrom: true,
      openTo: true,
    }
  })

  const room: {
    id: Room["id"] | null,
    name: Room["name"] | null,
    openFrom: Room["openFrom"],
    openTo: Room["openTo"],
  } = roomId
      ? rooms.find(room => room.id === roomId)
      ?? { id: null, name: null, openFrom: 0, openTo: 23 }
      : { id: null, name: null, openFrom: 0, openTo: 23 }

  const reservations = roomId
    ? await prisma.reservation.findMany({
      include: {
        category: true,
      },
      where: {
        roomId: roomId,
        startDate: { gte: calendarDays[0].date },
        endDate: { lt: getNextDayStart(new Date(calendarDays[calendarDays.length - 1].date)) }
      }
    })
    : []

  const reservationCategories = await prisma.reservationCategory.findMany({
    select: {
      id: true,
      name: true,
    }
  })

  return (
    <>
      {calendarDays && reservations ?
        calendar.type === 'week'
          ? <CalendarWeek
            calendarDays={calendarDays}
            room={room}
            reservations={reservations}
            rooms={rooms}
            reservationCategories={reservationCategories}
          />
          : calendar.type === 'month'
            ? <CalendarMonth
              calendarDays={calendarDays}
              reservations={reservations}
            />
            : ''
        : ''
      }
    </>
  )
}
