export default function getReservationsByRoom(reservations: Reservation[], roomId: Room["id"]): Reservation[] {
  const outReservations: Reservation[] = reservations.filter((reservation) => (
    reservation.roomId === roomId
  ))

  return outReservations
}