type CalendarDay = {
  date: string,
  dayNumber: number,
  currentMonth: boolean,
  currentDay: boolean,
}

type Place = {
  id: string,
  name: string,
}

type Room = {
  id: string,
  name: string,
  description: string,
  pictures: {
    path: string,
    main: boolean,
  }[],
  params: {
    param: string,
    value: string | boolean,
  }[],
  location: string,
  openHours: {
    from: number,
    to: number,
  }
}

type CalendarTypes = {
  id: string,
  name: string,
  daysCount: number,
}

type Reservation = {
  reservationId: string,
  dateFrom: string,
  dateTo: string,
  category: string,
  roomId: string,
  description: string,
  userId: string,
}