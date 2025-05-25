type CalendarDay = {
  date: Date,
  dayNumber: number,
  currentMonth: boolean,
  currentDay: boolean,
}

type Calendar = {
  type: "week" | "month",
  name: string,
  dayCount: number,
}

type ReservationFormType = {
  description?: string,
  date: Date,
  startDate: Date,
  endDate: Date,
  roomId?: number,
  categoryId?: number,
  reservationId?: number,
  visible?: boolean,
  onClose?: () => void,
}