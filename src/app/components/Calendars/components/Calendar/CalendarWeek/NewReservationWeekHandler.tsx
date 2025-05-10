import { MouseEvent, useState } from "react"
import { getDayPartHeight, getNewReservationTimeFrom } from "@/lib/reservation"
import NewReservationWeek from "./NewReservationWeek"
import { Reservation, ReservationCategory, Room } from "@prisma/client"

type Props = {
  date: Date,
  room: { openFrom: Room["openFrom"], openTo: Room["openTo"] },
  calendarHeight: number,
  dayReservations: ({ category: ReservationCategory } & Reservation)[],
  reservationFormData: ReservationFormType | null,
  setReservationFormData: (data: ReservationFormType | null) => void,
}

export default function NewReservationWeekHandler({ date, room, calendarHeight, dayReservations, reservationFormData, setReservationFormData }: Props) {
  const [initialTime, setInitialTime] = useState<Date | null>(null)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      const mouseY: number = e.nativeEvent.offsetY
      const dayPartHeight: number = getDayPartHeight(room, calendarHeight, 15)
      const initialTime: Date = getNewReservationTimeFrom(date, mouseY, dayPartHeight, room.openFrom as number)

      setInitialTime(initialTime)

      setReservationFormData({
        ...reservationFormData,
        date: date,
        startDate: new Date(initialTime),
        endDate: new Date(new Date(initialTime).getTime() + (15 * 60 * 1000)),
      })
    }
  }

  return (
    <>
      <div
        className={`h-full w-full ${reservationFormData?.date ? 'absolute' : ''}`}
        onMouseDown={(e) => handleMouseDown(e)}
      >
      </div>
      {(!reservationFormData?.reservationId && reservationFormData?.date === date) &&
        <NewReservationWeek
          date={date}
          calendarHeight={calendarHeight}
          room={room}
          initialTime={initialTime}
          dayReservations={dayReservations}
          reservationFormData={reservationFormData}
          setInitialTime={setInitialTime}
          setReservationFormData={setReservationFormData}
        />
      }
    </>
  )
}