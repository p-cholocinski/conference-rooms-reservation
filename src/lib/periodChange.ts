export function getPrevPeriod(currentPeriod: Date, calendarTypeId: CalendarTypes["id"]) {
  const prevPeriod =
    calendarTypeId === "month"
      ? new Date(currentPeriod.getFullYear(), currentPeriod.getMonth() - 1, 1)
      : new Date(currentPeriod.getFullYear(), currentPeriod.getMonth(), currentPeriod.getDate() - 7)

  return prevPeriod
}

export function getNextPeriod(currentPeriod: Date, calendarTypeId: CalendarTypes["id"]) {
  const nextPeriod =
    calendarTypeId === "month"
      ? new Date(currentPeriod.getFullYear(), currentPeriod.getMonth() + 1, 1)
      : new Date(currentPeriod.getFullYear(), currentPeriod.getMonth(), currentPeriod.getDate() + 7)

  return nextPeriod
}