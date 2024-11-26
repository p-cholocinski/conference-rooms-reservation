import { useEffect, useState } from "react";
import { useCalendarPeriodContext } from "../../context/CalendarPeriodContext";
import { useCalendarTypeContext } from "../../context/CalendarTypeContext";
import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarWeek from "./CalendarWeek/CalendarWeek";
import getCalendarDays from "@/lib/getCalendarDays";
import { useSelectedRoomContext } from "@/app/context/SelectedRoomContext";
import getReservationsByRoom from "@/lib/getReservationsByRoom";

export default function Calendar() {

  const reservationsObj: Reservation[] = [
    {
      reservationId: 'reservation-1',
      dateFrom: new Date('2024-11-20T09:00:00').toISOString(),
      dateTo: new Date('2024-11-20T10:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Plan Kontrli Jakości Systemów - Pobieranie oprogramowania',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-2',
      dateFrom: new Date('2024-11-20T11:00:00').toISOString(),
      dateTo: new Date('2024-11-20T12:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Arrow K',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-3',
      dateFrom: new Date('2024-11-20T07:00:00').toISOString(),
      dateTo: new Date('2024-11-20T08:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 1',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-4',
      dateFrom: new Date('2024-11-20T14:00:00').toISOString(),
      dateTo: new Date('2024-11-20T15:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-5',
      dateFrom: new Date('2024-11-20T16:00:00').toISOString(),
      dateTo: new Date('2024-11-20T18:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-6',
      dateFrom: new Date('2024-11-20T21:00:00').toISOString(),
      dateTo: new Date('2024-11-20T22:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-13',
      dateFrom: new Date('2024-11-20T03:00:00').toISOString(),
      dateTo: new Date('2024-11-20T03:30:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-14',
      dateFrom: new Date('2024-11-20T04:00:00').toISOString(),
      dateTo: new Date('2024-11-20T04:15:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-7',
      dateFrom: new Date('2024-11-29T09:00:00').toISOString(),
      dateTo: new Date('2024-11-29T10:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Plan Kontrli Jakości Systemów - Pobieranie oprogramowania',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-8',
      dateFrom: new Date('2024-11-29T11:00:00').toISOString(),
      dateTo: new Date('2024-11-29T12:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Arrow K',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-9',
      dateFrom: new Date('2024-11-29T07:00:00').toISOString(),
      dateTo: new Date('2024-11-29T08:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 1',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-10',
      dateFrom: new Date('2024-11-29T14:00:00').toISOString(),
      dateTo: new Date('2024-11-29T15:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-11',
      dateFrom: new Date('2024-11-29T17:00:00').toISOString(),
      dateTo: new Date('2024-11-29T18:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    },
    {
      reservationId: 'reservation-12',
      dateFrom: new Date('2024-11-29T19:00:00').toISOString(),
      dateTo: new Date('2024-11-29T21:00:00').toISOString(),
      category: 'spotkanie',
      description: 'Testowe 2',
      roomId: 'room-1',
      userId: 'user-1',
    }
  ]

  const { calendarPeriod } = useCalendarPeriodContext()
  const { calendarType } = useCalendarTypeContext()
  const { selectedRoom } = useSelectedRoomContext()

  const [calendarDays, setCalendarDays] = useState<CalendarDay[] | undefined>(undefined)
  const [reservations, setReservations] = useState<Reservation[] | undefined>(undefined)

  useEffect(() => {
    const calendarDays = getCalendarDays(calendarPeriod, calendarType)
    const reservations = getReservationsByRoom(reservationsObj, selectedRoom)
    setCalendarDays(calendarDays)
    setReservations(reservations)
  }, [calendarPeriod, calendarType, selectedRoom])

  return (
    <>
      {calendarDays && reservations ?
        calendarType.id === 'week'
          ? <CalendarWeek calendarDays={calendarDays} reservations={reservations} />
          : calendarType.id === 'month'
            ? <CalendarMonth calendarDays={calendarDays} reservations={reservations} />
            : ''
        : ''
      }
    </>
  )
}
