import { number, object, string } from "zod"

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
})

export const createReservationSchema = object({
  description: string({ required_error: "Opis jest wymagany" }).min(1, "Opis jest wymagany"),
  startDate: string({ required_error: "Data początkowa jest wymagana" }).datetime({ message: "Data początkowa musi być datą" }),
  endDate: string({ required_error: "Data końcowa jest wymagana" }).datetime({ message: "Data końcowa musi być datą" }),
  roomId: number({ required_error: "Sala konferencyjna jest wymagana", invalid_type_error: "Sala konferencyjna jest wymagana" }),
  categoryId: number({ required_error: "Kategoria jest wymagana", invalid_type_error: "Kategoria jest wymagana" }),
  userId: number({ required_error: "Użytkownik jest wymagany", invalid_type_error: "Użytkownik jest wymagany" }),
})