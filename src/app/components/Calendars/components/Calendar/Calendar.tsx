import { useEffect, useState } from "react";
import { useCalendarPeriodContext } from "../../context/CalendarPeriodContext";
import { useCalendarTypeContext } from "../../context/CalendarTypeContext";
import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarWeek from "./CalendarWeek/CalendarWeek";
import getCalendarDays from "@/lib/getCalendarDays";

export default function Calendar() {

  /*   const reservationsObj: Reservation[] = [
      {
        dateFrom: new Date('20.11.2024 09:00'),
        dateTo: new Date('20.11.2024 10:00'),
        category: 'spotkanie',
        description: 'Plan Kontrli Jakości Systemów - Pobieranie oprogramowania',
        roomId: 'room-1',
        userId: 'user-1',
      },
      {
        dateFrom: new Date('20.11.2024 11:00'),
        dateTo: new Date('20.11.2024 12:00'),
        category: 'spotkanie',
        description: 'Arrow K',
        roomId: 'room-1',
        userId: 'user-1',
      }
    ] */

  const { calendarPeriod } = useCalendarPeriodContext()
  const { calendarType } = useCalendarTypeContext()

  const [calendarDays, setCalendarDays] = useState<CalendarDay[] | undefined>(undefined)

  useEffect(() => {
    const calendarDays = getCalendarDays(calendarPeriod, calendarType)
    setCalendarDays(calendarDays)
  }, [calendarPeriod, calendarType])

  return (
    <>
      {calendarDays ?
        calendarType.id === 'week'
          ? <CalendarWeek calendarDays={calendarDays} />
          : calendarType.id === 'month'
            ? <CalendarMonth calendarDays={calendarDays} />
            : ''
        : ''
      }
    </>
  )
}
