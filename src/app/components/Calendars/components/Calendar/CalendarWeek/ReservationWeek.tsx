import { getReservationWeekHeight, getReservationWeekTop } from "@/lib/reservation"
import { useFormatter } from "next-intl"
import { useEffect, useRef, useState } from "react"

type Props = {
  dayReservation: Reservation,
  roomOpenHours: Room["openHours"],
  calendarHeight: number,
}

export default function ReservationWeek({ dayReservation, roomOpenHours, calendarHeight }: Props) {

  const wholeElement = useRef<HTMLDivElement>(null)
  const contentElement = useRef<HTMLDivElement>(null)

  const format = useFormatter()

  const [elementTop, setElementTop] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const [contentLineCount, setContentLineCount] = useState(0)
  const [descMaxHeight, setDescMaxHeight] = useState('')
  const [formatedTimeFrom, setFormatedTimeFrom] = useState('')
  const [formatedTimeTo, setFormatedTimeTo] = useState('')

  useEffect(() => {
    const getFormatedTime = (date: string): string => {

      const formatedTime =
        format.dateTime(new Date(date), {
          hour: "numeric",
          minute: "numeric"
        })

      return formatedTime
    }

    setFormatedTimeFrom(getFormatedTime(dayReservation.dateFrom))
    setFormatedTimeTo(getFormatedTime(dayReservation.dateTo))
  }, [])

  useEffect(() => {
    setElementTop(getReservationWeekTop(new Date(dayReservation.dateFrom), roomOpenHours, calendarHeight))
    setElementHeight(getReservationWeekHeight(new Date(dayReservation.dateFrom), new Date(dayReservation.dateTo), roomOpenHours, calendarHeight))
  }, [calendarHeight])

  useEffect(() => {
    if (contentElement.current && wholeElement.current) {
      const contentHeight = contentElement.current.getBoundingClientRect().height - 8

      const lineHeight = parseFloat(window.getComputedStyle(wholeElement.current).lineHeight)

      const lineCount = Math.floor(contentHeight / lineHeight)
      const descMaxHeight = ((lineCount - 1) * lineHeight) + 'px'

      setContentLineCount(lineCount)
      setDescMaxHeight(descMaxHeight)
    }
  }, [elementHeight])

  return (
    <div
      ref={wholeElement}
      className="absolute left-0 right-0 mx-1 bg-neutral-500 text-xs rounded-md overflow-hidden hover:cursor-pointer hover:bg-neutral-700"
      style={{ top: elementTop + 'px', height: elementHeight + 'px' }}
    >
      <div
        ref={contentElement}
        className={`flex h-full ${contentLineCount <= 1 ? 'flex-row gap-1 truncate' : 'flex-col *:overflow-hidden'} ${contentLineCount === 0 ? 'px-1 text-[11px] items-center' : 'p-1'}`}
      >
        <div
          className="font-bold"
          style={{ maxHeight: descMaxHeight }}
        >
          {dayReservation.description}
        </div>
        <div className="whitespace-nowrap">
          {formatedTimeFrom + ' - ' + formatedTimeTo}
        </div>
      </div>
    </div>
  )
}
