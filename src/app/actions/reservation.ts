'use server'

import prisma from "@/lib/prisma"
import { createReservationSchema } from "@/lib/zod"
import { Prisma, Reservation } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { parseNumber } from "@/utils/parseNumber"

type CreateReservationType = {
  errors: Partial<{
    roomId: string[]
    categoryId: string[]
    userId: string[]
    description: string[]
    startDate: string[]
    endDate: string[]
    _form: string[]
  }>
} | undefined

export async function upsertReservation(_prevState: unknown, formData: FormData, id?: Reservation["id"]): Promise<CreateReservationType> {
  const roomId = parseNumber(formData.get("roomId"))
  const categoryId = parseNumber(formData.get("categoryId"))
  const userId = parseNumber(formData.get("userId"))

  const validatedFields = createReservationSchema.safeParse({
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    roomId: roomId,
    categoryId: categoryId,
    userId: userId,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const reservationId = id ?? -1

  const reservationData = {
    description: validatedFields.data.description,
    startDate: validatedFields.data.startDate,
    endDate: validatedFields.data.endDate,
    room: { connect: { id: validatedFields.data.roomId } },
    category: { connect: { id: validatedFields.data.categoryId } },
    user: { connect: { id: validatedFields.data.userId } }
  }

  const upsertData: Prisma.ReservationUpsertArgs = {
    where: { id: reservationId },
    create: reservationData,
    update: reservationData,
  }

  try {
    await prisma.reservation.upsert(upsertData)
  } catch (error) {
    console.error("Reservation upsert error:", error instanceof Error ? error.message : error)
    return {
      errors: {
        _form: ["Błąd podczas dodawania"]
      },
    }
  }

  revalidatePath("/")

  return undefined
}

export async function deleteReservation(id: Reservation["id"]) {
  try {
    await prisma.reservation.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    console.error("Reservation delete error:", error instanceof Error ? error.message : error)
    return { errors: { _form: ["Błąd podczas usunięcia"] } }
  }

  revalidatePath("/")

  return undefined
}