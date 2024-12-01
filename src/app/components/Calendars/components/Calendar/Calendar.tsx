import { useEffect, useState } from "react";
import { useCalendarPeriodContext } from "../../context/CalendarPeriodContext";
import { useCalendarTypeContext } from "../../context/CalendarTypeContext";
import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarWeek from "./CalendarWeek/CalendarWeek";
import { useSelectedRoomContext } from "@/app/context/SelectedRoomContext";
import { getRoomOpenHours } from "@/lib/room";
import { getReservationsByRoom } from "@/lib/reservation";
import { getCalendarDays } from "@/lib/calendar";

export default function Calendar() {

  const { calendarPeriod } = useCalendarPeriodContext()
  const { calendarType } = useCalendarTypeContext()
  const { selectedRoom } = useSelectedRoomContext()

  const [calendarDays, setCalendarDays] = useState<CalendarDay[] | undefined>(undefined)
  const [reservations, setReservations] = useState<Reservation[] | undefined>(undefined)
  const [roomOpenHours, setRoomOpenHours] = useState<Room["openHours"] | undefined>(undefined)

  useEffect(() => {
    const calendarDays = getCalendarDays(calendarPeriod, calendarType)
    const reservations = getReservationsByRoom(selectedRoom)
    const roomOpenHours = getRoomOpenHours(selectedRoom)
    setCalendarDays(calendarDays)
    setReservations(reservations)
    setRoomOpenHours(roomOpenHours)
  }, [calendarPeriod, calendarType, selectedRoom])

  return (
    <>
      {calendarDays && reservations && roomOpenHours ?
        calendarType.id === 'week'
          ? <CalendarWeek calendarDays={calendarDays} reservations={reservations} roomOpenHours={roomOpenHours} />
          : calendarType.id === 'month'
            ? <CalendarMonth calendarDays={calendarDays} reservations={reservations} />
            : ''
        : ''
      }
    </>
  )
}
