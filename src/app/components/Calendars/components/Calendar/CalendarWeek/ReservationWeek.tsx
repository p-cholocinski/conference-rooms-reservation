import { getReservationWeekHeight, getReservationWeekTop } from "@/lib/getReservationWeekPlacement"
import { useFormatter } from "next-intl"
import { useEffect, useRef } from "react"

type Props = {
  dayReservation: Reservation
}

export default function ReservationWeek({ dayReservation }: Props) {

  const elementRef = useRef<HTMLDivElement>(null)

  const format = useFormatter()

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.top =
        getReservationWeekTop(new Date(dayReservation.dateFrom), 1200) + 'px'
      elementRef.current.style.height =
        getReservationWeekHeight(new Date(dayReservation.dateFrom), new Date(dayReservation.dateTo), 1200) + 'px'
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
      className="absolute left-0 right-0 mx-1 p-1 bg-neutral-500 text-sm rounded-md hover:cursor-pointer hover:bg-neutral-800"
    >
      <div
        className="truncate"
        title={dayReservation.description}
      >
        {dayReservation.description}
      </div>
      <div>
        {getFormatedTime(dayReservation.dateFrom) + ' - ' + getFormatedTime(dayReservation.dateTo)}
      </div>
    </div>
  )
}
