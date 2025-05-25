'use client'

import { useActionState, useRef } from "react"
import { useSession } from "next-auth/react"
import Form from "next/form"
import FormLayout from "../FormLayout"
import TextInput from "@/components/inputs/TextInput"
import SelectInput from "@/components/inputs/SelectInput"
import Button from "@/components/Button"
import { upsertReservation } from "@/app/actions/reservation"
import { withClientCallback } from "@/app/actions/withClientCallback"
import { getTimesAfterRoomChange } from "@/lib/reservation"
import { Reservation, ReservationCategory, Room } from "@prisma/client"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import PeriodChange from "./PeriodChange"

type Props = {
  reservationFormData: ReservationFormType,
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservations: ({
    category: ReservationCategory,
  } & Reservation)[],
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
  setReservationFormData: (data: ReservationFormType | null) => void
}

export default function ReservationForm({ reservationFormData, rooms, reservations, reservationCategories, setReservationFormData }: Props) {

  const [state, formAction, pending] = useActionState(
    withClientCallback(
      upsertReservation,
      reservationFormData.onClose,
      reservationFormData.reservationId,
    )
    , undefined
  )

  const { data: session } = useSession()
  const updateSearchParams = useUpdateSearchParams()

  const { description, startDate, endDate, roomId, categoryId, onClose } = reservationFormData

  const descriptionRef = useRef<string>(description || "") // useRef is used to avoid re-rendering the component on every change
  const room = roomId ? rooms.find(room => room.id === roomId) : undefined

  const roomsList = rooms.map((room) => ({ value: room.id, label: room.name }))

  const categories = reservationCategories.map(reservationCategory => { return { value: reservationCategory.id, label: reservationCategory.name } })

  const categoryName = categoryId ? reservationCategories.find((reservationCategory) => reservationCategory.id === categoryId)?.name : undefined

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
    <FormLayout onClose={onClose}>
      <Form action={formAction} onSubmit={handleSubmit} >
        <div className="flex flex-col gap-4">
          <TextInput
            name="description"
            placeholder="Opis"
            value={descriptionRef.current}
            errorMsg={state?.errors?.description?.[0]}
            onChange={(value: string) => descriptionRef.current = value}
          />
          <PeriodChange
            reservationFormData={reservationFormData}
            room={room}
            dateError={state?.errors?.startDate?.[0]}
            reservations={reservations}
            setReservationFormData={setReservationFormData}
          />
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