const reservationsObj: Reservation[] = [
  {
    reservationId: 'reservation-1',
    dateFrom: new Date('2024-12-02T07:00:00').toISOString(),
    dateTo: new Date('2024-12-02T08:00:00').toISOString(),
    category: 'spotkanie',
    description: 'Plan Kontrli Jakości Systemów - Pobieranie oprogramowania',
    roomId: 'room-1',
    userId: 'user-1',
  },
  {
    reservationId: 'reservation-2',
    dateFrom: new Date('2024-12-02T08:00:00').toISOString(),
    dateTo: new Date('2024-12-02T08:30:00').toISOString(),
    category: 'spotkanie',
    description: 'Arrow K',
    roomId: 'room-1',
    userId: 'user-1',
  },
  {
    reservationId: 'reservation-3',
    dateFrom: new Date('2024-12-02T09:00:00').toISOString(),
    dateTo: new Date('2024-12-02T09:15:00').toISOString(),
    category: 'spotkanie',
    description: 'Jakiś tam testowy długi tekst tak żeby sprawdzić czy wszystko mi się zmieści',
    roomId: 'room-1',
    userId: 'user-1',
  },
  {
    reservationId: 'reservation-4',
    dateFrom: new Date('2024-12-02T09:30:00').toISOString(),
    dateTo: new Date('2024-12-02T10:00:00').toISOString(),
    category: 'spotkanie',
    description: 'Testowe 2',
    roomId: 'room-1',
    userId: 'user-1',
  },
  {
    reservationId: 'reservation-5',
    dateFrom: new Date('2024-12-02T11:00:00').toISOString(),
    dateTo: new Date('2024-12-02T13:00:00').toISOString(),
    category: 'spotkanie',
    description: 'Testowe 2',
    roomId: 'room-1',
    userId: 'user-1',
  },
  {
    reservationId: 'reservation-6',
    dateFrom: new Date('2024-12-02T13:15:00').toISOString(),
    dateTo: new Date('2024-12-02T14:00:00').toISOString(),
    category: 'spotkanie',
    description: 'Testowe 2',
    roomId: 'room-1',
    userId: 'user-1',
  },
  {
    reservationId: 'reservation-7',
    dateFrom: new Date('2024-12-02T14:30:00').toISOString(),
    dateTo: new Date('2024-12-02T15:00:00').toISOString(),
    category: 'spotkanie',
    description: 'Testowe 2',
    roomId: 'room-1',
    userId: 'user-1',
  },
  {
    reservationId: 'reservation-8',
    dateFrom: new Date('2024-12-02T09:00:00').toISOString(),
    dateTo: new Date('2024-12-02T14:00:00').toISOString(),
    category: 'spotkanie',
    description: 'Testowe 2',
    roomId: 'room-3',
    userId: 'user-1',
  }
]

// Get Reservations

export function getReservationsByRoom(roomId: Room["id"]): Reservation[] {
  const outReservations: Reservation[] = reservationsObj.filter((reservation) => (
    reservation.roomId === roomId
  ))

  return outReservations
}

export function getReservationsByDate(reservations: Reservation[], date: string | Date): Reservation[] {
  const dateIn = new Date(date).toDateString()
  const outReservations: Reservation[] = reservations.filter((reservation) => (
    new Date(reservation.dateFrom).toDateString() === dateIn
  ))
  outReservations.sort((a, b) => (a.dateFrom > b.dateFrom) ? 1 : ((b.dateFrom > a.dateFrom) ? -1 : 0))

  return outReservations
}

// Reservation WeekCalendar Position

export function getReservationWeekTop(dateStart: Date, roomOpenHours: Room["openHours"], parentElementHeight: number): number {
  const startDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), roomOpenHours.from)
  const endDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), roomOpenHours.to + 1)

  const totalMillisecondsInDay = endDay.getTime() - startDay.getTime()
  const elapsedMillisecondsInDay = dateStart.getTime() - startDay.getTime()

  const dayProgressPercentage = (elapsedMillisecondsInDay / totalMillisecondsInDay)

  return parentElementHeight * dayProgressPercentage
}

export function getReservationWeekHeight(dateStart: Date, dateEnd: Date, roomOpenHours: Room["openHours"], parentElementHeight: number): number {
  const startDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), roomOpenHours.from)
  const endDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), roomOpenHours.to + 1)

  const totalMillisecondsInDay = endDay.getTime() - startDay.getTime()
  const durationMilliseconds = dateEnd.getTime() - dateStart.getTime()

  const dayProgressPercentage = (durationMilliseconds / totalMillisecondsInDay)

  return parentElementHeight * dayProgressPercentage
}