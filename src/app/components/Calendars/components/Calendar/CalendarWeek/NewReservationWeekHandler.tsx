import { MouseEvent, useState } from "react"
import { getDayPartHeight, getNewReservationTimeFrom } from "@/lib/reservation"
import NewReservationWeek from "./NewReservationWeek"
import { Reservation, ReservationCategory, Room } from "@prisma/client"
import { getISODate } from "@/utils/getIsoDate"

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

  const showNewReservationWeek = !reservationFormData?.reservationId
    && reservationFormData && getISODate(reservationFormData?.date) === getISODate(date)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      const mouseY: number = e.nativeEvent.offsetY
      const dayPartHeight: number = getDayPartHeight(room, calendarHeight, 15)
      const initialTime: Date = getNewReservationTimeFrom(date, mouseY, dayPartHeight, room.openFrom as number)

      setInitialTime(initialTime)

      setReservationFormData({
        ...reservationFormData,
        date: date,
        startDate: initialTime,
        endDate: new Date(new Date(initialTime).setUTCMinutes(initialTime.getUTCMinutes() + 15)),
      })
    }
  }

  return (
    <>
      <div
        className={`h-full w-full ${showNewReservationWeek ? 'absolute' : ''}`}
        onMouseDown={(e) => handleMouseDown(e)}
      >
      </div>
      {showNewReservationWeek &&
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