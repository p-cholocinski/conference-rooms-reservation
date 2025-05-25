import { useRef, useState } from "react"
import { MdClose, MdEdit } from "react-icons/md"
import { IoMdTrash } from "react-icons/io";
import useClickOutside from "@/hooks/useClickOutside"
import { calculateElementPositionStyle } from "@/lib/reservation";
import { formatDateTimeRange } from "@/lib/dateTimeFormats";
import { Reservation, ReservationCategory } from "@prisma/client";
import { deleteReservation } from "@/app/actions/reservation";
import { useToast } from "@/hooks/useToast";

type Props = {
  reservation: ({
    category: ReservationCategory,
  } & Reservation),
  parentLayout: {
    top: number,
    left: number,
    height: number,
    width: number,
  },
  onClose: () => void,
  setReservationFormData: (data: ReservationFormType | null) => void,
}

export default function ReservationCard({ reservation, parentLayout, onClose, setReservationFormData }: Props) {

  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const reservationCardRef = useRef<HTMLDivElement>(null)

  useClickOutside(reservationCardRef, () => onClose())

  const toast = useToast()

  const formatedDate: string = formatDateTimeRange(reservation.startDate, reservation.endDate)

  const currentLayout = calculateElementPositionStyle(parentLayout)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteReservation(reservation.id)
    if (result?.errors) {
      toast("error", result.errors._form[0])
    } else {
      toast("success", "Usunięto rezerwacje")
      onClose()
    }
    setIsDeleting(false)
  }

  const handleEdit = () => {
    setReservationFormData({
      reservationId: reservation.id,
      roomId: reservation.roomId,
      date: reservation.startDate,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      description: reservation.description,
      categoryId: reservation.categoryId,
      visible: true,
      onClose: () => onClose(),
    })
    onClose()
  }

  return (
    <div
      ref={reservationCardRef}
      className="fixed max-h-64 min-w-96 max-w-96 z-10"
      style={currentLayout}
    >
      <div className="flex flex-col bg-neutral-800 text-sm rounded-lg shadow-[0px_0px_2px_1px] shadow-neutral-200 cursor-default">
        <div className="flex flex-col gap-1 bg-neutral-600 px-4 py-2 font-bold text-base rounded-t-lg">
          <div className="flex justify-end gap-1 text-xl">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`p-1 rounded-full hover:bg-neutral-800/40 hover:cursor-pointer ${isDeleting ? "opacity-50" : "opacity-100"}`}
            >
              <IoMdTrash />
            </button>
            <button
              onClick={handleEdit}
              className="p-1 rounded-full hover:bg-neutral-800/40 hover:cursor-pointer"
            >
              <MdEdit />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-neutral-800/40 hover:cursor-pointer"
            >
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
  )
}
