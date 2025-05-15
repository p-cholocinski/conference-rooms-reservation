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