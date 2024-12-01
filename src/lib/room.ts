const rooms: Room[] = [
  {
    id: "room-1",
    name: "Sala konferencyjna 1",
    description: "Na pierwszym piętrze z zadziwiająco dziwną rozetą, która nie do końca przypomina rozetę, ale bardziej coś w rodzaju firany która utożsamia się z obrusem. Ale lepiej się tym nie przemować, ponieważ można urazić tą niewinną duszyczkę. Jeszcze jakiś dodatkowy tekst, żeby sprawdzić czy wszystko się zmieści.",
    pictures: [
      {
        path: "/images/room-1.jpg",
        main: true,
      },
      {
        path: "/images/room-1-a.jpg",
        main: false,
      }
    ],
    params: [
      {
        param: "Liczba miejsc",
        value: "12",
      },
      {
        param: "Wyposażona w telewizor",
        value: true,
      },
      {
        param: "Jasne pomieszczenie",
        value: true,
      },
      {
        param: "Zatrwarzające światło wewnątrz",
        value: true,
      },
      {
        param: "Wyposażona w doskonałej jakości rzutnik o idealnych parametrach",
        value: true,
      }
    ],
    location: "location-1",
    openHours: {
      from: 7,
      to: 14,
    }
  },
  {
    id: "room-2",
    name: "Sala konferencyjna 2",
    description: "Na drugim piętrze",
    pictures: [
      {
        path: "/images/room-2.jpg",
        main: true,
      }
    ],
    params: [
      {
        param: "Liczba miejsc",
        value: "12",
      },
      {
        param: "Wyposażona w telewizor",
        value: true,
      }
    ],
    location: "location-1",
    openHours: {
      from: 7,
      to: 14,
    }
  },
  {
    id: "room-3",
    name: "Sala konferencyjna 3",
    description: "Na trzecim piętrze",
    pictures: [
      {
        path: "/images/room-3.jpg",
        main: true,
      }
    ],
    params: [
      {
        param: "Liczba miejsc",
        value: "12",
      },
      {
        param: "Wyposażona w telewizor",
        value: false,
      }
    ],
    location: "location-2",
    openHours: {
      from: 8,
      to: 17,
    }
  }
]

const locations: Place[] = [
  {
    id: "location-1",
    name: "Budynek 1",
  },
  {
    id: "location-2",
    name: "Budynek 2",
  }
]

// Get location

export function getLocations(): Place[] {
  return locations
}

// Get room

export function getRoomsByLocation(locationId: string): Room[] {
  const outRooms: Room[] = rooms.filter((room) => (
    room.location === locationId
  ))

  return outRooms
}

export function getRoomById(roomId: Room["id"]): Room | undefined {
  const outRoom: Room | undefined = rooms.find((room) => (
    room.id === roomId
  ))

  return outRoom
}

// Get picture

export function getMainPicturePath(pictures: Room["pictures"]): string {
  const mainPictures: Room["pictures"] = pictures.filter((picture) => (
    picture.main === true
  ))

  const mainPicturePath: string = mainPictures[0].path

  return mainPicturePath
}

export function getPrevPicturePath(pictures: Room["pictures"], currentPicturePath: string): string {
  const picturesCount = pictures.length - 1
  const currentPictureNum = pictures.findIndex((picture) => (
    picture.path === currentPicturePath
  ))

  const prevPictureNum =
    currentPictureNum - 1 !== -1
      ? currentPictureNum - 1
      : picturesCount

  return pictures[prevPictureNum].path
}

export function getNextPicturePath(pictures: Room["pictures"], currentPicturePath: string): string {
  const picturesCount = pictures.length - 1
  const currentPictureNum = pictures.findIndex((picture) => (
    picture.path === currentPicturePath
  ))

  const nextPictureNum =
    currentPictureNum + 1 !== picturesCount + 1
      ? currentPictureNum + 1
      : 0

  return pictures[nextPictureNum].path
}

// Get hours

export function getRoomOpenHours(roomId: Room["id"]): Room["openHours"] {
  const room = getRoomById(roomId)
  const openHours =
    room
      ? room.openHours
      : { from: 0, to: 23 }

  return openHours
}

export function getHoursRange(startHour: number, endHour: number): string[] {
  if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
    throw new Error("Godziny muszą mieścić się w zakresie od 0 do 23.")
  }
  if (startHour >= endHour) {
    throw new Error("Godzina początkowa musi być mniejsza od godziny końcowej.")
  }

  const hours: string[] = []

  for (let hour = startHour; hour <= endHour; hour++) {
    const formattedHour = hour.toString().padStart(2, "0") + ":00"
    hours.push(formattedHour)
  }

  return hours;
}