export default function getReservationsByRoom(reservations: Reservation[], date: Date): Reservation[] {
  const outReservations: Reservation[] = reservations.filter((reservation) => (
    reservation.dateFrom.toLocaleDateString() === date.toLocaleDateString()
  ))

  return outReservations
}