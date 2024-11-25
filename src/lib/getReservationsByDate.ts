export default function getReservationsByDate(reservations: Reservation[], date: string | Date): Reservation[] {
  const dateIn = new Date(date).toDateString()
  const outReservations: Reservation[] = reservations.filter((reservation) => (
    new Date(reservation.dateFrom).toDateString() === dateIn
  ))

  return outReservations
}