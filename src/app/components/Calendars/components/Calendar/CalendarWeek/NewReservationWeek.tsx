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
  date: Date,
  room: { openFrom: Room["openFrom"], openTo: Room["openTo"] },
  calendarHeight: number,
  initialTime: Date | null,
  dayReservations: ({ category: ReservationCategory } & Reservation)[],
  reservationFormData: ReservationFormType,
  setInitialTime: (initialTime: Date | null) => void,
  setReservationFormData: (data: ReservationFormType | null) => void,
}

export default function NewReservationWeek({ date, room, calendarHeight, initialTime, dayReservations, reservationFormData, setInitialTime, setReservationFormData }: Props) {
  const [overlaps, setOverlaps] = useState<boolean>(false)

  const timeFrom: Date = reservationFormData.startDate as Date
  const timeTo: Date = reservationFormData.endDate as Date

  const roomIdParam = useSearchParams().get("r")
  const roomId = roomIdParam ? parseInt(roomIdParam) : undefined

  useMouseup(() => {
    setReservationFormData({
      ...reservationFormData,
      roomId: roomId,
      visible: true,
    })
    setInitialTime(null)
  })

  const dayPartHeight: number = getDayPartHeight(room, calendarHeight, 15)
  const initialTop: number | null = initialTime && getReservationWeekTop(initialTime, room, calendarHeight)
  const elementTop: number = getReservationWeekTop(timeFrom, room, calendarHeight)
  const elementBottom: number = getReservationWeekBottom(timeTo, room, calendarHeight)
  const elementHeight: number = calendarHeight - elementTop - elementBottom
  const partsCount: number = Math.round((elementHeight / dayPartHeight))

  const formatedTimeRange = formatTimeRange(timeFrom, timeTo)

  const handleMouseMoveOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (initialTime && (initialTop !== null) && !overlaps) {
      const mouseY: number = e.nativeEvent.offsetY
      const changeTop: boolean = mouseY < initialTop

      const time: Date = changeTop
        ? getNewReservationTimeFrom(date, mouseY, dayPartHeight, room.openFrom as number)
        : getNewReservationTimeTo(date, mouseY, calendarHeight, dayPartHeight, room.openFrom as number)

      const isOverlaps: boolean = changeTop
        ? dayReservations.find((dayReservation) => dayReservation.endDate < timeTo && dayReservation.endDate > time) !== undefined
        : dayReservations.find((dayReservation) => dayReservation.startDate < time && dayReservation.startDate > timeFrom) !== undefined

      if (!isOverlaps) {
        if (changeTop) {
          setReservationFormData({
            ...reservationFormData,
            startDate: time,
            endDate: new Date(new Date(initialTime).setUTCMinutes(initialTime.getUTCMinutes() + 15)),
          })
        } else {
          setReservationFormData({
            ...reservationFormData,
            startDate: initialTime,
            endDate: time,
          })
        }
      } else {
        setOverlaps(true)
      }
    }
  }

  const handleMouseMoveInside = (e: MouseEvent<HTMLDivElement>) => {
    if (overlaps === true) setOverlaps(false)

    if (initialTime && Math.round(partsCount) > 1) {
      const changeTop: boolean = initialTop !== elementTop
      const mouseY = e.nativeEvent.offsetY
      const endPartHeight = dayPartHeight / 3

      if (mouseY > endPartHeight && mouseY < (elementHeight - endPartHeight)) {
        const positionY: number = changeTop
          ? elementTop + (Math.floor(mouseY / dayPartHeight) * dayPartHeight)
          : elementBottom + (Math.floor((elementHeight - mouseY) / dayPartHeight) * dayPartHeight)

        const time: Date = changeTop
          ? getNewReservationTime(date, positionY, dayPartHeight, room.openFrom as number)
          : getNewReservationTime(date, calendarHeight - positionY, dayPartHeight, room.openFrom as number)

        if (changeTop) {
          if (positionY !== elementTop) setReservationFormData({
            ...reservationFormData,
            startDate: time,
          })
        } else {
          if (positionY !== elementBottom) setReservationFormData({
            ...reservationFormData,
            endDate: time,
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