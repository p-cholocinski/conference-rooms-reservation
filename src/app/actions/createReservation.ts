'use server'

import prisma from "@/lib/prisma"
import { createReservationSchema } from "@/lib/zod"
import { Prisma } from "@prisma/client"

export async function createReservation(formData: FormData) {
  const roomId = formData.get("roomId") ? parseInt(formData.get("roomId")?.toString() as string) : null
  const categoryId = formData.get("categoryId") ? parseInt(formData.get("categoryId")?.toString() as string) : null
  const userId = formData.get("userId") ? parseInt(formData.get("userId")?.toString() as string) : null

  const validatedFields = await createReservationSchema.safeParseAsync({
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    roomId: roomId,
    categoryId: categoryId,
    userId: userId,
  })

  if (validatedFields.success) {
    const reservationData: Prisma.ReservationCreateInput = {
      description: validatedFields.data.description,
      startDate: validatedFields.data.startDate,
      endDate: validatedFields.data.endDate,
      room: {
        connect: {
          id: validatedFields.data.roomId
        }
      },
      category: {
        connect: {
          id: validatedFields.data.categoryId
        }
      },
      user: {
        connect: {
          id: validatedFields.data.userId
        }
      }
    }

    const reservation = await prisma.reservation.create({ data: reservationData })

    console.log("Utworzono rezerwacje " + reservation.id)
  } else {
    throw new Error(JSON.stringify({ errors: validatedFields.error.flatten().fieldErrors }))
  }
}