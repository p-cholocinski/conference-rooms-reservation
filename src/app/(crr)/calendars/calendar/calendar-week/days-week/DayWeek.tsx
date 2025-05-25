import ReservationWeek from "./reservation-week/ReservationWeek"
import NewReservationWeekHandler from "./new-reservation-week/NewReservationWeekHandler"
import { getReservationsByDate } from "@/lib/reservation"
import { Reservation, ReservationCategory, Room } from "@prisma/client"

type Props = {
  calendarDay: CalendarDay,
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
  reservationFormData: ReservationFormType | null,
  setReservationFormData: (data: ReservationFormType | null) => void,
}

export default function DayWeek({ calendarDay, room, reservations, calendarHeight, reservationFormData, setReservationFormData }: Props) {
  const dayReservations = getReservationsByDate(reservations, calendarDay.date) as ({ category: ReservationCategory } & Reservation)[]

  return (
    <div
      className="relative h-full border-l border-neutral-400 select-none hover:bg-neutral-700/20"
    >
      {room.id &&
        dayReservations?.map((dayReservation) => (
          <ReservationWeek
            key={"reservation-id-" + dayReservation.id}
            room={room}
            dayReservation={dayReservation}
            calendarHeight={calendarHeight}
            reservationFormData={reservationFormData}
            setReservationFormData={setReservationFormData}
          />
        ))}
      {room.id &&
        <NewReservationWeekHandler
          date={calendarDay.date}
          room={room}
          calendarHeight={calendarHeight}
          dayReservations={dayReservations}
          reservationFormData={reservationFormData}
          setReservationFormData={setReservationFormData}
        />}
    </div>
  )
}