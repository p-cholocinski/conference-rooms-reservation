export function getPrevPeriod(currentPeriod: Date) {
  const prevPeriod =
    new Date(
      currentPeriod.getFullYear(),
      currentPeriod.getMonth() - 1,
      1
    )

  return prevPeriod
}

export function getNextPeriod(currentPeriod: Date) {
  const nextPeriod =
    new Date(
      currentPeriod.getFullYear(),
      currentPeriod.getMonth() + 1,
      1
    )

  return nextPeriod
}