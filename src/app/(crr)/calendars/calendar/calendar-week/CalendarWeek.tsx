'use client'

import { useRef } from "react";
import WeekRow from "@/components/WeekRow";
import Hours from "./Hours";
import DaysWeek from "./days-week/DaysWeek";
import useResizeObserver from "@/hooks/useResizeObserver";
import DaysRow from "./DaysRow";
import { Reservation, ReservationCategory, Room } from "@prisma/client";

type Props = {
  calendarDays: CalendarDay[],
  room: {
    id: Room["id"] | null,
    name: Room["name"] | null,
    openFrom: Room["openFrom"],
    openTo: Room["openTo"],
  },
  reservations: ({
    category: ReservationCategory,
  } & Reservation)[],
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
}

export default function CalendarWeek({ calendarDays, room, reservations, rooms, reservationCategories }: Props) {

  const calendarWeekElement = useRef<HTMLDivElement>(null)

  const calendarHeight = useResizeObserver(calendarWeekElement)

  return (
    <div className="my-4 mx-2 h-full pb-28">
      <div className="w-full flex overflow-y-scroll overflow-x-hidden pr-1">
        <div className="w-full pl-10 *:pl-2">
          <WeekRow />
          <DaysRow calendarDays={calendarDays} />
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        <div
          ref={calendarWeekElement}
          className="flex relative min-h-full max-h-[1200px] mr-1"
        >
          <Hours openFrom={room.openFrom} openTo={room.openTo} />
          <DaysWeek
            calendarDays={calendarDays}
            room={room}
            reservations={reservations}
            calendarHeight={calendarHeight}
            rooms={rooms}
            reservationCategories={reservationCategories}
          />
        </div>
      </div>
    </div>
  )
}
