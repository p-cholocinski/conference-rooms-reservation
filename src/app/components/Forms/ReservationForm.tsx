'use client'

import { useState } from "react"
import Form from "next/form"
import FormLayout from "./FormLayout"
import DateInput from "@/components/inputs/DateInput"
import TextInput from "@/components/inputs/TextInput"
import TimeInput from "@/components/inputs/TimeInput"
import SelectInput from "@/components/inputs/SelectInput"
import Button from "@/components/Button"
import { createReservation } from "@/app/actions/createReservation"
import { getDayStart, getNextDayStart, getRoundedToQuarterTime } from "@/lib/calendar"
import { getTimesAfterRoomChange } from "@/lib/reservation"
import { useSession } from "next-auth/react"
import { Reservation, ReservationCategory, Room } from "@prisma/client"

type Props = {
  initDescription?: Reservation["description"],
  initDate?: Reservation["startDate"],
  initStartDate?: Reservation["startDate"],
  initEndDate?: Reservation["endDate"],
  initRoomId?: Room["id"],
  initCategoryId?: ReservationCategory["id"],
  rooms: { id: Room["id"], name: Room["name"], openFrom: Room["openFrom"], openTo: Room["openTo"] }[]
  reservationCategories: { id: ReservationCategory["id"], name: ReservationCategory["name"] }[]
  onClose: () => void,
}

export default function ReservationForm({ initDescription, initDate, initStartDate, initEndDate, initRoomId, initCategoryId, rooms, reservationCategories, onClose }: Props) {

  const [room, setRoom] = useState(() => initRoomId ? rooms.find(room => room.id === initRoomId) : undefined)
  const [startDate, setStartDate] = useState<Date>(initStartDate ? getRoundedToQuarterTime(new Date(initStartDate)) : getRoundedToQuarterTime(new Date()))
  const [endDate, setEndDate] = useState<Date>(initEndDate ? getRoundedToQuarterTime(new Date(initEndDate)) : new Date(startDate.getTime() + 30 * 60 * 1000))
  const [categoryId, setCategoryId] = useState<ReservationCategory["id"] | string | undefined>(initCategoryId)

  const { data: session } = useSession()

  const date = initDate ? getDayStart(new Date(initDate)) : getDayStart(new Date())

  const timeMin = new Date(new Date(date).setHours(room?.openFrom || 0, 0, 0, 0))

  const timeMax = room ? new Date(new Date(date).setHours(room?.openTo, 0, 0, 0)) : getNextDayStart(timeMin)

  const roomsList = rooms.map((room) => ({ value: room.id, label: room.name }))

  const categories = reservationCategories.map(reservationCategory => { return { value: reservationCategory.id, label: reservationCategory.name } })

  const categoryName = categoryId ? reservationCategories.find((reservationCategory) => reservationCategory.id === categoryId)?.name : undefined

  const handleChangeStartDate = (time: Date) => {
    const timeDiff = endDate.getTime() - startDate.getTime()
    const tempEndDate = new Date(time.getTime() + timeDiff)

    setStartDate(time)
    setEndDate(tempEndDate < timeMax ? tempEndDate : timeMax)
  }

  const handleChangeRoom = (roomId: Room["id"] | string) => {
    const room = rooms.find(room => room.id === roomId)

    if (room) {
      const times = getTimesAfterRoomChange(startDate, endDate, room?.openFrom, room?.openTo)

      if (times) {
        setStartDate(times.startDate)
        setEndDate(times.endDate)
      }

      setRoom(room)
    }
  }

  return (
    <FormLayout onClose={onClose}>
      <Form action={createReservation} >
        <div className="flex flex-col gap-4">
          <TextInput
            name="description"
            placeholder="Opis"
            value={initDescription}
          />
          <div className="flex gap-2">
            <DateInput
              name="date"
              placeholder="Data"
              date={date}
            />
            <TimeInput
              name="startDate"
              placeholder="Od"
              time={startDate}
              timeMin={timeMin}
              timeMax={timeMax}
              onChange={handleChangeStartDate}
            />
            <TimeInput
              name="endDate"
              placeholder="Do"
              time={endDate}
              timeMin={startDate}
              timeMax={timeMax}
              onChange={setEndDate}
            />
          </div>
          <SelectInput
            name="roomId"
            placeholder="Sala konferencyjna"
            options={roomsList}
            value={room?.id}
            displayValue={room?.name}
            onChange={handleChangeRoom}
          />
          <SelectInput
            name="categoryId"
            placeholder="Kategoria"
            options={categories}
            value={categoryId}
            displayValue={categoryName}
            onChange={setCategoryId}
          />
          <TextInput
            name="userId"
            placeholder="Użytkownik"
            value={session?.user?.id}
            displayValue={session?.user?.name as string}
            readOnly={true}
          />
          <Button
            className="w-1/4 self-end"
            type="submit"
          >
            Zapisz
          </Button>
        </div>
      </Form>
    </FormLayout>
  )
}