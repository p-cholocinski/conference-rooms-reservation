import InputError from "@/components/InputError"
import DateInput from "@/components/inputs/DateInput"
import TimeInput from "@/components/inputs/TimeInput"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { getUtcNextDayStart, isTheSameWeek } from "@/lib/calendar"
import { isReservationOverlaps } from "@/lib/reservation"
import { Reservation, ReservationCategory, Room } from "@prisma/client"
import { useSearchParams } from "next/navigation"

type Props = {
  reservationFormData: ReservationFormType,
  room: { id: Room["id"]; name: Room["name"]; openFrom: Room["openFrom"]; openTo: Room["openTo"] } | undefined
  dateError: string | undefined,
  reservations: ({
    category: ReservationCategory,
  } & Reservation)[],
  setReservationFormData: (data: ReservationFormType | null) => void,
}

export default function PeriodChange({ reservationFormData, room, dateError, reservations, setReservationFormData }: Props) {

  const updateSearchParams = useUpdateSearchParams()
  const searchParams = useSearchParams()

  const { date, startDate, endDate, reservationId } = reservationFormData

  const timeMin = new Date(new Date(date).setUTCHours(room?.openFrom || 0, 0, 0, 0))
  const timeMinEndDate = new Date(new Date(startDate).setUTCMinutes(startDate.getUTCMinutes() + 15))
  const timeMax = room ? new Date(new Date(date).setUTCHours(room?.openTo, 0, 0, 0)) : getUtcNextDayStart(timeMin)
  const timeMaxStartDate = new Date(new Date(timeMax).setUTCMinutes(timeMax.getUTCMinutes() - 15))

  const overlapsError = isReservationOverlaps(startDate, endDate, reservationId, reservations)
    ? "Rezerwacja nakłada się na inną rezerwację"
    : undefined

  const handleChangeDate = (date: Date) => {
    const newStartDate = new Date(new Date(startDate).setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    const newEndDate = new Date(new Date(endDate).setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    const cp = searchParams.get("cp")

    setReservationFormData({
      ...reservationFormData,
      date: date,
      startDate: newStartDate,
      endDate: newEndDate,
    })

    if (!cp || !isTheSameWeek(new Date(parseInt(cp)), date)) {
      updateSearchParams("cp", date.valueOf().toString())
    }
  }

  const handleChangeStartDate = (time: Date) => {
    const timeDiff = endDate.getTime() - startDate.getTime()
    const tempEndDate = new Date(time.getTime() + timeDiff)

    setReservationFormData({
      ...reservationFormData,
      startDate: time,
      endDate: tempEndDate < timeMax ? tempEndDate : timeMax,
    })
  }

  const handleChangeEndDate = (time: Date) => {
    setReservationFormData({
      ...reservationFormData,
      endDate: time,
    })
  }

  return (
    <div>
      <div className="flex gap-2">
        <DateInput
          name="date"
          placeholder="Data"
          date={date}
          errorMsg={overlapsError ? " " : undefined}
          onChange={handleChangeDate}
        />
        <TimeInput
          name="startDate"
          placeholder="Od"
          time={startDate}
          timeMin={timeMin}
          timeMax={timeMaxStartDate}
          errorMsg={overlapsError ? " " : undefined}
          onChange={handleChangeStartDate}
        />
        <TimeInput
          name="endDate"
          placeholder="Do"
          time={endDate}
          timeMin={timeMinEndDate}
          timeMax={timeMax}
          errorMsg={overlapsError ? " " : undefined}
          onChange={handleChangeEndDate}
        />
      </div>
      <InputError
        errorMsg={dateError ?? overlapsError}
      />
    </div>
  )
}