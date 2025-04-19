import { useRef, useState } from "react"
import { MdClose, MdEdit } from "react-icons/md"
import { IoMdTrash } from "react-icons/io";
import useClickOutside from "@/hooks/useClickOutside"
import ReservationForm from "@/app/components/Forms/ReservationForm"
import { calculateElementPositionStyle } from "@/lib/reservation";
import { formatDateTimeRange } from "@/lib/dateTimeFormats";
import { Reservation, ReservationCategory, Room } from "@prisma/client";

type Props = {
  reservation: ({
    category: ReservationCategory,
  } & Reservation),
  parentLayout: {
    top: number,
    left: number,
    height: number,
    width: number,
  }
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
  onClose: () => void,
}

export default function ReservationCard({ reservation, parentLayout, rooms, reservationCategories, onClose }: Props) {

  const [editReservation, setEditReservation] = useState<boolean>(false)

  const reservationCardRef = useRef<HTMLDivElement>(null)

  useClickOutside(reservationCardRef, () => handleClose())

  const formatedDate: string = formatDateTimeRange(reservation.startDate, reservation.endDate)

  const currentLayout = calculateElementPositionStyle(parentLayout)

  const handleEdit = () => {
    setEditReservation(true)
  }

  const handleClose = () => {
    if (!editReservation) onClose()
  }

  return (
    <>
      <div
        ref={reservationCardRef}
        className="fixed max-h-64 min-w-96 max-w-96 z-10"
        style={currentLayout}
      >
        <div className="flex flex-col bg-neutral-800 text-sm rounded-lg shadow-[0px_0px_2px_1px] shadow-neutral-200 cursor-default">
          <div className="flex flex-col gap-1 bg-neutral-600 px-4 py-2 font-bold text-base rounded-t-lg">
            <div className="flex justify-end gap-1 text-xl">
              <button className="hover:bg-neutral-800/40 p-1 rounded-full">
                <IoMdTrash />
              </button>
              <button onClick={handleEdit} className="hover:bg-neutral-800/40 p-1 rounded-full">
                <MdEdit />
              </button>
              <button onClick={onClose} className="hover:bg-neutral-800/40 p-1 rounded-full">
                <MdClose />
              </button>
            </div>
            <div>
              {reservation.description}
            </div>
          </div>
          <div className="bg-neutral-500 px-2 py-4 flex flex-col gap-4 rounded-b-lg">
            <div>
              {formatedDate}
            </div>
            <div>
              {reservation.category.name}
            </div>
            <div>
              {reservation.userId}
            </div>
          </div>
        </div>
      </div>
      {editReservation && (
        <ReservationForm
          initDescription={reservation.description}
          initDate={reservation.startDate}
          initStartDate={reservation.startDate}
          initEndDate={reservation.endDate}
          initCategoryId={reservation.category.id}
          initRoomId={reservation.roomId}
          rooms={rooms}
          reservationCategories={reservationCategories}
          onClose={() => setEditReservation(false)}
        />
      )}
    </>
  )
}
