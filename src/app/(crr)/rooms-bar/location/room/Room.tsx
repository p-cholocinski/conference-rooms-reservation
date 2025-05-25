import Image from "next/image"
import { getMainPicturePath } from "@/lib/room"
import { RoomParameter, RoomPicture, RoomToRoomParameter, Room as RoomType } from "@prisma/client"
import RoomCard from "./room-card/RoomCard"
import { useState } from "react"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { useSearchParams } from "next/navigation"

type Props = {
  room: ({
    pictures: RoomPicture[];
    parameters: ({
      parameter: RoomParameter;
    } & RoomToRoomParameter)[];
  } & RoomType)
}

export default function Room({ room }: Props) {
  const [cardVisible, setCardVisible] = useState(false)

  const searchParams = useSearchParams()

  const updateSearchParams = useUpdateSearchParams()

  const mainPicturePath = getMainPicturePath(room.pictures)

  const selectedRoom = searchParams.get("r")

  const handleClick = () => {
    if (selectedRoom !== room.id.toString()) {
      updateSearchParams("r", room.id.toString())
      if (cardVisible) setCardVisible(false)
    } else if (!cardVisible) {
      setCardVisible(true)
    } else {
      setCardVisible(false)
    }
  }

  return (
    <div
      className={`h-20 pl-2 items-center flex gap-2 rounded-md hover:cursor-pointer${selectedRoom === room.id.toString() ? ' bg-neutral-800' : ' hover:bg-neutral-700'}`}
    >
      <div
        className="flex items-center gap-2 w-11/12"
        onClick={handleClick}
      >
        <div className="w-4/12">
          <Image
            className="w-auto h-auto rounded-md shadow-[0px_0px_2px_1px] shadow-neutral-500"
            src={mainPicturePath}
            alt={room.name}
            width={640}
            height={640}
          />
        </div>
        <div className="w-7/12 text-sm">
          {room.name}
        </div>
      </div>
      {cardVisible && <RoomCard room={room} setVisible={setCardVisible} />}
    </div>
  )
}