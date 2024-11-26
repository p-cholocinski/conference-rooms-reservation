import { getReservationWeekHeight, getReservationWeekTop } from "@/lib/getReservationWeekPlacement"
import { useFormatter } from "next-intl"
import { useEffect, useRef, useState } from "react"

type Props = {
  dayReservation: Reservation
}

export default function ReservationWeek({ dayReservation }: Props) {

  const elementRef = useRef<HTMLDivElement>(null)
  const format = useFormatter()

  const [elementTop, setElementTop] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)

  useEffect(() => {
    if (elementRef.current) {
      setElementTop(getReservationWeekTop(new Date(dayReservation.dateFrom), 1200))
      setElementHeight(getReservationWeekHeight(new Date(dayReservation.dateFrom), new Date(dayReservation.dateTo), 1200))
    }
  }, [])

  const getFormatedTime = (date: string): string => {

    const formatedTime =
      format.dateTime(new Date(date), {
        hour: "numeric",
        minute: "numeric"
      })

    return formatedTime
  }

  return (
    <div
      ref={elementRef}
      className="absolute left-0 right-0 mx-1 bg-neutral-500 text-xs rounded-md overflow-hidden hover:cursor-pointer hover:bg-neutral-700"
      style={{ top: elementTop + 'px', height: elementHeight + 'px' }}
    >
      <div className={`flex ${elementHeight > 30 ? 'flex-col *:truncate p-1' : 'flex-row gap-1 truncate px-1'}`}>
        <div
          className="font-bold"
          title={dayReservation.description}
        >
          {dayReservation.description}
        </div>
        <div>
          {getFormatedTime(dayReservation.dateFrom) + ' - ' + getFormatedTime(dayReservation.dateTo)}
        </div>
      </div>
    </div>
  )
}
