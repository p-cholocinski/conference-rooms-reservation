export default function getMainPicturePath(pictures: Room["pictures"]): string {
  const mainPictures: Room["pictures"] = pictures.filter((picture) => (
    picture.main === true
  ))

  const mainPicturePath: string = mainPictures[0].path

  return mainPicturePath
}
