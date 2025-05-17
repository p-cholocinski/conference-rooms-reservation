export function formatDate(date: Date | string | undefined) {
  const format = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const parsedDate = parseDate(date)

  if (!parsedDate) {
    return "Invalid date"
  }

  return format.format(parsedDate)
}

export function formatTime(time: Date | string | undefined) {
  const format = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
  })

  const parsedTime = parseDateTime(time)

  if (!parsedTime) {
    return "Invalid time"
  }

  return format.format(parsedTime)
}

export function formatDateTimeRange(
  dateTimeStart: Date | string | undefined,
  dateTimeEnd: Date | string | undefined,
): string {
  const format = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "UTC",
    weekday: 'long',
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  })

  const start = parseDateTime(dateTimeStart)
  const end = parseDateTime(dateTimeEnd)

  if (!start || !end) {
    return "Invalid date range"
  }

  const formatedDate: string = format.formatRange(start, end)

  return formatedDate
}

export function formatMonthYear(
  date: Date | string | undefined
) {
  const format = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "UTC",
    month: 'long',
    year: 'numeric',
  })

  const parsedDate = parseDate(date)

  if (!parsedDate) {
    return "Invalid date"
  }

  let formatedMonth =
    format.format(parsedDate)

  formatedMonth = formatedMonth[0].toUpperCase() + formatedMonth.slice(1)

  return formatedMonth
}

export function formatTimeRange(
  timeStart: Date | string | undefined,
  timeEnd: Date | string | undefined,
) {
  const format = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
  })

  const start = parseDateTime(timeStart)
  const end = parseDateTime(timeEnd)

  if (!start || !end) {
    return "Invalid time range"
  }

  const formatedTime =
    format.formatRange(start, end)

  return formatedTime
}

export function parseDate(date: Date | string | undefined): Date | null {
  if (!date) return null
  const parsed = typeof date === "string" ? new Date(date) : date
  return parsed
}

export function parseDateTime(date: Date | string | undefined): Date | null {
  if (!date) return null
  const parsed = typeof date === "string" ? new Date(date) : date
  return isNaN(parsed.getTime()) ? null : parsed
}