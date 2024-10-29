type calendarDay = {
  date?: string,
  dayNumber: number,
  currentMonth: boolean,
  currentDay: boolean,
}

type location = {
  id: string,
  name: string,
}

type room = {
  id: string,
  name: string,
  description: string,
  pictures: {
    path: string,
    main: boolean,
  }[],
  params: {
    param: string,
    value: string,
  }[],
  location: string,
}