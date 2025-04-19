import { Dispatch, MouseEvent, SetStateAction, useState } from "react"
import useMouseup from "@/hooks/useMouseup"
import {
  getDayPartHeight,
  getNewReservationTime,
  getNewReservationTimeFrom,
  getNewReservationTimeTo,
  getReservationWeekBottom,
  getReservationWeekTop
} from "@/lib/reservation"
import ReservationForm from "@/app/components/Forms/ReservationForm"
import { formatTimeRange } from "@/lib/dateTimeFormats"
import { ReservationCategory, Room } from "@prisma/client"
import { useSearchParams } from "next/navigation"

type Props = {
  date: string,
  room: { openFrom: Room["openFrom"], openTo: Room["openTo"] },
  calendarHeight: number,
  initialTime: string,
  setInitialTime: Dispatch<SetStateAction<string>>
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
}

export default function NewReservationWeek({ date, room, calendarHeight, initialTime, setInitialTime, rooms, reservationCategories }: Props) {
  const [timeFrom, setTimeFrom] = useState<string>(initialTime)
  const [timeTo, setTimeTo] = useState<string>(new Date(new Date(initialTime).getTime() + (15 * 60 * 1000)).toISOString())
  const [stopChanging, setStopChanging] = useState<boolean>(false)

  const roomIdParam = useSearchParams().get("r")
  const roomId = roomIdParam ? parseInt(roomIdParam) : undefined

  useMouseup(() => setStopChanging(true))

  const dayPartHeight: number = getDayPartHeight(room, calendarHeight, 15)
  const initialTop: number = getReservationWeekTop(new Date(initialTime), room, calendarHeight)
  const elementTop: number = getReservationWeekTop(new Date(timeFrom), room, calendarHeight)
  const elementBottom: number = getReservationWeekBottom(new Date(timeTo), room, calendarHeight)
  const elementHeight: number = calendarHeight - elementTop - elementBottom
  const partsCount: number = (elementHeight / dayPartHeight)

  const formatedTimeRange = formatTimeRange(timeFrom, timeTo)

  const restartStates = () => {
    setInitialTime("")
    setTimeFrom("")
    setTimeTo("")
    setStopChanging(false)
  }

  const handleMouseMoveOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (!stopChanging && initialTime !== "") {
      const mouseY = e.nativeEvent.offsetY
      const changeTop: boolean = mouseY < initialTop
      const time: string = changeTop
        ? getNewReservationTimeFrom(date, mouseY, dayPartHeight, room.openFrom as number)
        : getNewReservationTimeTo(date, mouseY, calendarHeight, dayPartHeight, room.openFrom as number)

      if (changeTop) { setTimeFrom(time) } else { setTimeTo(time) }
    }
  }

  const handleMouseMoveInside = (e: MouseEvent<HTMLDivElement>) => {
    if (!stopChanging && partsCount > 1) {
      const changeTop: boolean = initialTop !== elementTop
      const mouseY = e.nativeEvent.offsetY
      const positionY: number = changeTop
        ? elementTop + (Math.floor(mouseY / dayPartHeight) * dayPartHeight)
        : elementBottom + (Math.floor((elementHeight - mouseY) / dayPartHeight) * dayPartHeight)
      const time: string = changeTop
        ? getNewReservationTime(date, positionY, dayPartHeight, room.openFrom as number)
        : getNewReservationTime(date, calendarHeight - positionY, dayPartHeight, room.openFrom as number)

      if (changeTop) {
        if (positionY !== elementTop) setTimeFrom(time)
      } else {
        if (positionY !== elementBottom) setTimeTo(time)
      }
    }
  }

  return (
    <>
      <div
        className="h-full w-full absolute"
        onMouseMove={(e) => handleMouseMoveOutside(e)}
      >
      </div>
      <div
        className={`absolute left-0 right-0 rounded-md overflow-hidden bg-neutral-800 ${partsCount <= 2 ? "px-1 text-xs/3" : "p-1 text-xs"}`}
        style={{ top: elementTop + 'px', bottom: elementBottom + 'px' }}
        onMouseMove={(e) => handleMouseMoveInside(e)}
      >
        <div
          className={`${partsCount <= 3 && "whitespace-nowrap"}`}
        >
          {formatedTimeRange}
        </div>
        {stopChanging &&
          <ReservationForm
            initRoomId={roomId}
            initDate={new Date(date)}
            initStartDate={new Date(timeFrom)}
            initEndDate={new Date(timeTo)}
            onClose={restartStates}
            rooms={rooms}
            reservationCategories={reservationCategories}
          />}
      </div>
    </>
  )
}