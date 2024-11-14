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