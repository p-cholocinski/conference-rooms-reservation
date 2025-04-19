import { MouseEvent, useState } from "react"
import { getDayPartHeight, getNewReservationTimeFrom } from "@/lib/reservation"
import NewReservationWeek from "./NewReservationWeek"
import { ReservationCategory, Room } from "@prisma/client"

type Props = {
  date: string,
  room: { openFrom: Room["openFrom"], openTo: Room["openTo"] },
  calendarHeight: number,
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
}

export default function NewReservationWeekHandler({ date, room, calendarHeight, rooms, reservationCategories }: Props) {
  const [initialTime, setInitialTime] = useState<string>("")

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      const mouseY: number = e.nativeEvent.offsetY
      const dayPartHeight: number = getDayPartHeight(room, calendarHeight, 15)
      const initialTime: string = getNewReservationTimeFrom(date, mouseY, dayPartHeight, room.openFrom as number)

      setInitialTime(initialTime)
    }
  }

  return (
    <>
      <div
        className={`h-full w-full ${initialTime !== "" ? 'absolute' : ''}`}
        onMouseDown={(e) => handleMouseDown(e)}
      >
      </div>
      {initialTime !== "" &&
        <NewReservationWeek
          date={date}
          calendarHeight={calendarHeight}
          room={room}
          initialTime={initialTime}
          setInitialTime={setInitialTime}
          rooms={rooms}
          reservationCategories={reservationCategories}
        />
      }
    </>
  )
}