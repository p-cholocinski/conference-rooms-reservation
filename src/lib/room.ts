import { RoomPicture } from "@prisma/client"

// Get picture

export function getMainPicturePath(pictures: RoomPicture[]): string {
  const mainPictures: RoomPicture[] = pictures.filter((picture) => (
    picture.main === true
  ))

  const mainPicturePath: string = mainPictures[0].url

  return mainPicturePath
}

export function getPrevPicturePath(pictures: RoomPicture[], currentPicturePath: string): string {
  const picturesCount = pictures.length - 1
  const currentPictureNum = pictures.findIndex((picture) => (
    picture.url === currentPicturePath
  ))

  const prevPictureNum =
    currentPictureNum - 1 !== -1
      ? currentPictureNum - 1
      : picturesCount

  return pictures[prevPictureNum].url
}

export function getNextPicturePath(pictures: RoomPicture[], currentPicturePath: string): string {
  const picturesCount = pictures.length - 1
  const currentPictureNum = pictures.findIndex((picture) => (
    picture.url === currentPicturePath
  ))

  const nextPictureNum =
    currentPictureNum + 1 !== picturesCount + 1
      ? currentPictureNum + 1
      : 0

  return pictures[nextPictureNum].url
}

// Get hours

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