import { useFormatter } from "next-intl"

type Props = {
  dayReservation: Reservation
}

export default function ReservationMonth({ dayReservation }: Props) {

  const format = useFormatter()

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
      className="bg-neutral-500 h-5 px-1 content-center text-xs rounded-sm truncate hover:bg-neutral-700"
      title={dayReservation.description}>
      {getFormatedTime(dayReservation.dateFrom)
        + ' - ' + getFormatedTime(dayReservation.dateTo)
        + ' ' + dayReservation.description}
    </div>
  )
}
