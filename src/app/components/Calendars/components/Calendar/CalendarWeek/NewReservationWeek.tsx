import { MouseEvent, useState } from "react"
import useMouseup from "@/hooks/useMouseup"
import {
  getDayPartHeight,
  getNewReservationTime,
  getNewReservationTimeFrom,
  getNewReservationTimeTo,
  getReservationWeekBottom,
  getReservationWeekTop
} from "@/lib/reservation"
import { formatTimeRange } from "@/lib/dateTimeFormats"
import { Reservation, ReservationCategory, Room } from "@prisma/client"
import { useSearchParams } from "next/navigation"

type Props = {
  date: string,
  room: { openFrom: Room["openFrom"], openTo: Room["openTo"] },
  calendarHeight: number,
  initialTime: string,
  dayReservations: ({ category: ReservationCategory } & Reservation)[],
  reservationFormData: ReservationFormType,
  setInitialTime: (initialTime: string) => void,
  setReservationFormData: (data: ReservationFormType | null) => void,
}

export default function NewReservationWeek({ date, room, calendarHeight, initialTime, dayReservations, reservationFormData, setInitialTime, setReservationFormData }: Props) {
  const [overlaps, setOverlaps] = useState<boolean>(false)

  const timeFrom: string = (reservationFormData.startDate as Date).toISOString()
  const timeTo: string = (reservationFormData.endDate as Date).toISOString()

  const roomIdParam = useSearchParams().get("r")
  const roomId = roomIdParam ? parseInt(roomIdParam) : undefined

  useMouseup(() => {
    setReservationFormData({
      ...reservationFormData,
      roomId: roomId,
      visible: true,
    })
    setInitialTime("")
  })

  const dayPartHeight: number = getDayPartHeight(room, calendarHeight, 15)
  const initialTop: number = getReservationWeekTop(new Date(initialTime), room, calendarHeight)
  const elementTop: number = getReservationWeekTop(new Date(timeFrom), room, calendarHeight)
  const elementBottom: number = getReservationWeekBottom(new Date(timeTo), room, calendarHeight)
  const elementHeight: number = calendarHeight - elementTop - elementBottom
  const partsCount: number = Math.round((elementHeight / dayPartHeight))

  const formatedTimeRange = formatTimeRange(timeFrom, timeTo)

  const handleMouseMoveOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (initialTime !== "" && !overlaps) {
      const mouseY = e.nativeEvent.offsetY
      const changeTop: boolean = mouseY < initialTop

      const time: string = changeTop
        ? getNewReservationTimeFrom(date, mouseY, dayPartHeight, room.openFrom as number)
        : getNewReservationTimeTo(date, mouseY, calendarHeight, dayPartHeight, room.openFrom as number)

      const isOverlaps: boolean = changeTop
        ? dayReservations.find((dayReservation) => dayReservation.endDate < new Date(timeTo) && dayReservation.endDate > new Date(time)) !== undefined
        : dayReservations.find((dayReservation) => dayReservation.startDate < new Date(time) && dayReservation.startDate > new Date(timeFrom)) !== undefined

      if (!isOverlaps) {
        if (changeTop) {
          setReservationFormData({
            ...reservationFormData,
            startDate: new Date(time),
            endDate: new Date(new Date(initialTime).getTime() + (15 * 60 * 1000)),
          })
        } else {
          setReservationFormData({
            ...reservationFormData,
            startDate: new Date(initialTime),
            endDate: new Date(time),
          })
        }
      } else {
        setOverlaps(true)
      }
    }
  }

  const handleMouseMoveInside = (e: MouseEvent<HTMLDivElement>) => {
    if (overlaps === true) setOverlaps(false)

    if (initialTime !== "" && Math.round(partsCount) > 1) {
      const changeTop: boolean = initialTop !== elementTop
      const mouseY = e.nativeEvent.offsetY
      const endPartHeight = dayPartHeight / 3

      if (mouseY > endPartHeight && mouseY < (elementHeight - endPartHeight)) {
        const positionY: number = changeTop
          ? elementTop + (Math.floor(mouseY / dayPartHeight) * dayPartHeight)
          : elementBottom + (Math.floor((elementHeight - mouseY) / dayPartHeight) * dayPartHeight)

        const time: string = changeTop
          ? getNewReservationTime(date, positionY, dayPartHeight, room.openFrom as number)
          : getNewReservationTime(date, calendarHeight - positionY, dayPartHeight, room.openFrom as number)

        if (changeTop) {
          if (positionY !== elementTop) setReservationFormData({
            ...reservationFormData,
            startDate: new Date(time),
          })
        } else {
          if (positionY !== elementBottom) setReservationFormData({
            ...reservationFormData,
            endDate: new Date(time),
          })
        }
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
      </div>
    </>
  )
}