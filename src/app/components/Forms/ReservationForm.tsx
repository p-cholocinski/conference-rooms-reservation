'use client'

import { useActionState, useRef } from "react"
import { useSession } from "next-auth/react"
import Form from "next/form"
import FormLayout from "./FormLayout"
import DateInput from "@/components/inputs/DateInput"
import TextInput from "@/components/inputs/TextInput"
import TimeInput from "@/components/inputs/TimeInput"
import SelectInput from "@/components/inputs/SelectInput"
import Button from "@/components/Button"
import { upsertReservation } from "@/app/actions/reservation"
import { withClientCallback } from "@/app/actions/withClientCallback"
import { getRoundedToQuarterTime, getUtcStartDay, getUtcNextDayStart } from "@/lib/calendar"
import { getTimesAfterRoomChange } from "@/lib/reservation"
import { ReservationCategory, Room } from "@prisma/client"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"

type Props = {
  reservationFormData: ReservationFormType,
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
  setReservationFormData: (data: ReservationFormType | null) => void
}

export default function ReservationForm({ reservationFormData, rooms, reservationCategories, setReservationFormData }: Props) {

  const [state, formAction, pending] = useActionState(
    withClientCallback(
      upsertReservation,
      reservationFormData.onClose,
      reservationFormData.reservationId,
    )
    , undefined
  )

  const descriptionRef = useRef<string>(reservationFormData.description || "") // useRef is used to avoid re-rendering the component on every change
  const date = reservationFormData.date ? getUtcStartDay(reservationFormData.date) : getUtcStartDay(new Date())
  const startDate = reservationFormData.startDate ? getRoundedToQuarterTime(reservationFormData.startDate) : getRoundedToQuarterTime(new Date())
  const endDate = reservationFormData.endDate ? getRoundedToQuarterTime(reservationFormData.endDate) : new Date(startDate.setUTCMinutes(startDate.getUTCMinutes() + 15))
  const room = reservationFormData.roomId ? rooms.find(room => room.id === reservationFormData.roomId) : undefined
  const categoryId = reservationFormData.categoryId

  const { data: session } = useSession()
  const updateSearchParams = useUpdateSearchParams()

  const timeMin = new Date(new Date(date).setUTCHours(room?.openFrom || 0, 0, 0, 0))

  const timeMinEndDate = new Date(new Date(startDate).setUTCMinutes(startDate.getUTCMinutes() + 15))

  const timeMax = room ? new Date(new Date(date).setUTCHours(room?.openTo, 0, 0, 0)) : getUtcNextDayStart(timeMin)

  const roomsList = rooms.map((room) => ({ value: room.id, label: room.name }))

  const categories = reservationCategories.map(reservationCategory => { return { value: reservationCategory.id, label: reservationCategory.name } })

  const categoryName = categoryId ? reservationCategories.find((reservationCategory) => reservationCategory.id === categoryId)?.name : undefined

  const handleChangeDate = (date: Date) => {
    const newStartDate = new Date(new Date(startDate).setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    const newEndDate = new Date(new Date(endDate).setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))

    setReservationFormData({
      ...reservationFormData,
      date: date,
      startDate: newStartDate,
      endDate: newEndDate,
    })

    updateSearchParams("cp", date.valueOf().toString())
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

  const handleChangeRoom = (roomId: Room["id"] | string) => {
    const room = rooms.find(room => room.id === roomId)

    if (room) {
      const times = getTimesAfterRoomChange(startDate, endDate, room?.openFrom, room?.openTo)

      setReservationFormData({
        ...reservationFormData,
        startDate: times?.startDate ?? startDate,
        endDate: times?.endDate ?? endDate,
        roomId: room.id,
      })

      updateSearchParams("r", room.id.toString())
    }
  }

  const handleSubmit = () => {
    setReservationFormData({
      ...reservationFormData,
      description: descriptionRef.current,
    })
  }

  return (
    <FormLayout onClose={reservationFormData.onClose}>
      <Form action={formAction} onSubmit={handleSubmit} >
        <div className="flex flex-col gap-4">
          <TextInput
            name="description"
            placeholder="Opis"
            value={descriptionRef.current}
            errorMsg={state?.errors?.description?.[0]}
            onChange={(value: string) => descriptionRef.current = value}
          />
          <div className="flex gap-2">
            <DateInput
              name="date"
              placeholder="Data"
              date={date}
              onChange={handleChangeDate}
            />
            <TimeInput
              name="startDate"
              placeholder="Od"
              time={startDate}
              timeMin={timeMin}
              timeMax={timeMax}
              errorMsg={state?.errors?.startDate?.[0]}
              onChange={handleChangeStartDate}
            />
            <TimeInput
              name="endDate"
              placeholder="Do"
              time={endDate}
              timeMin={timeMinEndDate}
              timeMax={timeMax}
              errorMsg={state?.errors?.endDate?.[0]}
              onChange={(time: Date) => {
                setReservationFormData({
                  ...reservationFormData,
                  endDate: time,
                })
              }}
            />
          </div>
          <SelectInput
            name="roomId"
            placeholder="Sala konferencyjna"
            options={roomsList}
            value={room?.id}
            displayValue={room?.name}
            errorMsg={state?.errors?.roomId?.[0]}
            onChange={handleChangeRoom}
          />
          <SelectInput
            name="categoryId"
            placeholder="Kategoria"
            options={categories}
            value={categoryId}
            displayValue={categoryName}
            errorMsg={state?.errors?.categoryId?.[0]}
            onChange={(value: ReservationCategory["id"] | string) => {
              setReservationFormData({
                ...reservationFormData,
                categoryId: value as number,
              })
            }}
          />
          <TextInput
            name="userId"
            placeholder="Użytkownik"
            value={session?.user?.id}
            displayValue={session?.user?.name as string}
            errorMsg={state?.errors?.userId?.[0]}
            readOnly={true}
          />
          <Button
            className="w-1/4 self-end"
            type="submit"
            disabled={pending}
          >
            {pending ? "..." : "Zapisz"}
          </Button>
        </div>
      </Form>
    </FormLayout>
  )
}