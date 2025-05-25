'use server'

import prisma from "@/lib/prisma"
import { createReservationSchema } from "@/lib/zod"
import { Prisma, Reservation } from "@prisma/client"
import { revalidatePath } from "next/cache"

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

  const validatedFields = createReservationSchema.safeParse({
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    roomId: formData.get("roomId"),
    categoryId: formData.get("categoryId"),
    userId: formData.get("userId"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const reservationId = id ?? -1

  const existingReservations = await prisma.reservation.findFirst({
    where: {
      id: { not: reservationId },
      roomId: validatedFields.data.roomId,
      startDate: { lt: validatedFields.data.endDate },
      endDate: { gt: validatedFields.data.startDate },
    }
  })

  if (existingReservations) {
    return {
      errors: {
        startDate: ["Rezerwacja nakłada się na inną rezerwację"],
      },
    }
  }

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