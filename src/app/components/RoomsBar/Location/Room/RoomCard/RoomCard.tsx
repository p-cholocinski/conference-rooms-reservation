import Slider from "./Slider"
import Description from "./Description"
import Parameters from "./Parameters"
import useClickOutside from "@/hooks/useClickOutside"
import { Dispatch, SetStateAction, useRef } from "react"
import { Room, RoomParameter, RoomPicture, RoomToRoomParameter } from "@prisma/client"

type Props = {
  room: ({
    pictures: RoomPicture[];
    parameters: ({
      parameter: RoomParameter;
    } & RoomToRoomParameter)[];
  } & Room),
  setVisible: Dispatch<SetStateAction<boolean>>
}

export default function RoomCard({ room, setVisible }: Props) {
  const elementRef = useRef<HTMLDivElement>(null)

  useClickOutside(elementRef, () => setVisible(false))

  const { name, description, pictures, parameters } = room

  return (
    <div
      key={room.id + '-card'}
      ref={elementRef}
      className="absolute top-4 w-[36rem] left-[102%] rounded-lg shadow-[0px_0px_2px_1px] shadow-neutral-200 cursor-default">
      <div className="bg-neutral-600 px-4 py-2 font-bold text-2xl rounded-t-lg">
        {name}
      </div>
      <div className="bg-neutral-500 px-2 py-4 flex flex-col gap-4 rounded-b-lg">
        <div className="flex gap-2">
          <Slider name={name} pictures={pictures} />
          <Description description={description} />
        </div>
        <Parameters parameters={parameters} />
      </div>
    </div>
  )
}
