export function getReservationWeekTop(dateStart: Date, parentElementHeight: number): number {
  const startDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate())
  const endDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate() + 1)

  const totalMillisecondsInDay = endDay.getTime() - startDay.getTime()
  const elapsedMillisecondsInDay = dateStart.getTime() - startDay.getTime()

  const dayProgressPercentage = (elapsedMillisecondsInDay / totalMillisecondsInDay)

  return parentElementHeight * dayProgressPercentage
}

export function getReservationWeekHeight(dateStart: Date, dateEnd: Date, parentElementHeight: number): number {
  const startDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate())
  const endDay = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate() + 1)

  const totalMillisecondsInDay = endDay.getTime() - startDay.getTime()
  const durationMilliseconds = dateEnd.getTime() - dateStart.getTime()

  const dayProgressPercentage = (durationMilliseconds / totalMillisecondsInDay)

  return parentElementHeight * dayProgressPercentage
}