import { useState } from "react"
import DayWeek from "./DayWeek"
import { Reservation, ReservationCategory, Room } from "@prisma/client"
import ReservationForm from "@/components/forms/reservation-form/ReservationForm"

type Props = {
  calendarDays: CalendarDay[],
  room: {
    id: Room["id"] | null,
    name: Room["name"] | null,
    openFrom: Room["openFrom"],
    openTo: Room["openTo"],
  },
  reservations: ({
    category: ReservationCategory,
  } & Reservation)[],
  calendarHeight: number,
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
}

export default function DaysWeek({ calendarDays, room, reservations, calendarHeight, rooms, reservationCategories }: Props) {
  const [reservationFormData, setReservationFormData] = useState<ReservationFormType | null>(null)

  return (
    <>
      <div className="grid grid-cols-7 w-full">
        {calendarDays.map((calendarDay) => (
          <DayWeek
            key={"day-week-" + calendarDay.date.toISOString()}
            calendarDay={calendarDay}
            room={room}
            reservations={reservations}
            calendarHeight={calendarHeight}
            reservationFormData={reservationFormData}
            setReservationFormData={setReservationFormData}
          />
        ))}
      </div>
      {reservationFormData?.visible && (
        <ReservationForm
          reservationFormData={{
            ...reservationFormData,
            onClose: () => {
              if (reservationFormData.onClose) reservationFormData.onClose()
              setReservationFormData(null)
            },
          }}
          rooms={rooms}
          reservations={reservations}
          reservationCategories={reservationCategories}
          setReservationFormData={setReservationFormData}
        />
      )}
    </>
  )
}