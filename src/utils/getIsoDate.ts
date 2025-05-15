export function getISODate(date: Date | undefined): string | undefined {
  if (!date) return undefined
  const isoDate: string = date.toISOString().slice(0, 10)
  return isoDate
}