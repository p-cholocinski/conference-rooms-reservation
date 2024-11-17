export function getCalendarTypeById(calendarTypes: CalendarTypes[], typeId: CalendarTypes["id"]) {
  const calendarType = calendarTypes.find((type) => (
    type.id === typeId
  ))

  if (!calendarType) {
    return calendarTypes[0]
  } else {
    return calendarType
  }
}