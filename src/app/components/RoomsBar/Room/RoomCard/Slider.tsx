import Image from "next/image"
import { useState } from "react"
import { MdArrowLeft, MdArrowRight } from "react-icons/md"

type Props = {
  name: string,
  pictures: Room["pictures"],
}

export default function Slider({ name, pictures }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex-none w-64 place-items-center place-self-center">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className={`${isHovered ? 'absolute ' : 'hidden '} w-full h-full`}>
          <div className="flex h-full justify-between">
            <div className="bg-gradient-to-r from-neutral-400/80 to-neutral-400/0 w-1/6 h-full text-3xl content-center place-items-start rounded-md cursor-pointer *:hover:scale-125">
              <MdArrowLeft />
            </div>
            <div className="w-4/6 h-full hover:cursor-zoom-in">

            </div>
            <div className="bg-gradient-to-l from-neutral-400/80 to-neutral-400/0 w-1/6 h-full text-3xl content-center place-items-end rounded-md cursor-pointer *:hover:scale-125">
              <MdArrowRight />
            </div>
          </div>
        </div>
        <Image
          className="w-auto h-auto rounded-md shadow-[0px_0px_2px_1px] shadow-neutral-400"
          src={pictures[0].path}
          alt={name}
          width={250}
          height={250}
          priority={true}
        />
      </div>
    </div>
  )
}
