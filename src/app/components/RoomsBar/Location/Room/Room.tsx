import Image from "next/image"
import RoomCard from "./RoomCard/RoomCard"
import { useState } from "react"
import { MdArrowRight } from "react-icons/md"
import { useCardHookedContext } from "../../context/CardHookedContext"
import { useSelectedRoomContext } from "@/app/context/SelectedRoomContext"
import { getMainPicturePath } from "@/lib/room"

type Props = {
  room: Room
}

export default function Room({ room }: Props) {
  const { name, pictures } = room

  const { isAnyCardHooked, setIsAnyCardHooked } = useCardHookedContext()
  const { selectedRoom, setSelectedRoom } = useSelectedRoomContext()

  const [isHovered, setIsHovered] = useState(false)
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [isCardHooked, setIsCardHooked] = useState(false)

  const toogleArrowClicked = () => {
    setIsCardHooked((prev) => !prev)
    setIsAnyCardHooked((prev) => !prev)
  }

  const mainPicturePath = getMainPicturePath(pictures)

  return (
    <div
      className={`h-20 pl-2 items-center flex gap-2 rounded-md hover:cursor-pointer${selectedRoom === room.id ? ' bg-neutral-800' : ' hover:bg-neutral-700'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div
        className="flex items-center gap-2 w-11/12"
        onClick={() => setSelectedRoom(room.id)}>
        <div className="w-4/12">
          <Image
            className="w-auto h-auto rounded-md shadow-[0px_0px_2px_1px] shadow-neutral-500"
            src={mainPicturePath}
            alt={name}
            width={640}
            height={640}
            priority={true}
          />
        </div>
        <div className="w-7/12 text-sm">
          {name}
        </div>
      </div>
      <div
        className={`${isAnyCardHooked && !isCardHooked ? 'invisible ' : ''}w-1/12 h-full text-xl content-center rounded-r-md${isCardVisible || isCardHooked ? ' bg-neutral-900 *:scale-125 ' : ''}${!isCardHooked ? ' scale-90' : ''}`}
        onMouseEnter={() => setIsCardVisible(true)}
        onMouseLeave={() => setIsCardVisible(false)}
        onClick={toogleArrowClicked}>
        <MdArrowRight className={`${isHovered || isCardHooked ? '' : 'hidden '}`} />
      </div>
      {
        <RoomCard visible={(isCardVisible || isCardHooked)} room={room} />
      }
    </div>
  )
}
