import Image from "next/image"
import { useState } from "react"
import { MdArrowLeft, MdArrowRight } from "react-icons/md"
import { getNextPicturePath, getPrevPicturePath } from "@/lib/room"
import { RoomPicture } from "@prisma/client"

type Props = {
  name: string,
  pictures: RoomPicture[],
}

export default function Slider({ name, pictures }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [picturePath, setPicturePath] = useState(pictures[0].url)
  const [pictureZoomVisible, setPictureZoomVisible] = useState(false)

  return (
    <div className="flex-none w-64 place-items-center place-self-center">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className={`${isHovered ? 'absolute ' : 'hidden '} w-full h-full`}>
          <div className="flex h-full justify-between">
            <div
              className="bg-gradient-to-r from-neutral-400/60 to-neutral-400/0 w-1/6 h-full text-3xl content-center place-items-start rounded-md cursor-pointer *:hover:scale-125"
              onClick={() => setPicturePath(getPrevPicturePath(pictures, picturePath))}>
              <MdArrowLeft className="text-neutral-700" />
            </div>
            <div
              className="w-4/6 h-full hover:cursor-zoom-in"
              onClick={() => setPictureZoomVisible(true)}>
            </div>
            <div
              className="bg-gradient-to-l from-neutral-400/80 to-neutral-400/0 w-1/6 h-full text-3xl content-center place-items-end rounded-md cursor-pointer *:hover:scale-125"
              onClick={() => setPicturePath(getNextPicturePath(pictures, picturePath))}>
              <MdArrowRight className="text-neutral-700" />
            </div>
          </div>
        </div>
        <Image
          className={`w-auto h-auto rounded-md shadow-[0px_0px_2px_1px] shadow-neutral-400${pictureZoomVisible ? ' scale-[2.5] cursor-zoom-out' : ''}`}
          onClick={() => setPictureZoomVisible(false)}
          onMouseLeave={() => { if (pictureZoomVisible) setPictureZoomVisible(false) }}
          src={picturePath}
          alt={name}
          width={640}
          height={640}
          priority={true}
        />
      </div>
    </div>
  )
}
