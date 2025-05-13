import { formatTimeRange } from "@/lib/dateTimeFormats"
import { Reservation } from "@prisma/client"

type Props = {
  dayReservation: Reservation
}

export default function ReservationMonth({ dayReservation }: Props) {

  const { startDate, endDate, description } = dayReservation

  const formatedTimeRange = formatTimeRange(startDate, endDate)

  return (
    <div
      className="bg-neutral-500 h-5 px-1 content-center text-xs rounded-sm truncate hover:bg-neutral-700"
      title={description}>
      {formatedTimeRange + ' ' + description}
    </div>
  )
}
