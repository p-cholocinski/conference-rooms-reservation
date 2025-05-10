'use client'

import { MdArrowDropUp } from "react-icons/md"
import Room from "./Room/Room"
import { useState } from "react"
import { Room as RoomType, RoomParameter, RoomPicture, RoomToRoomParameter, Location as LocationType } from "@prisma/client"

type Props = {
  name: LocationType["name"],
  rooms: ({
    pictures: RoomPicture[];
    parameters: ({
      parameter: RoomParameter;
    } & RoomToRoomParameter)[];
  } & RoomType)[]
}

export default function Location({ name, rooms }: Props) {

  const [roomsCollapsed, setRoomsCollapsed] = useState(true)

  return (
    <div>
      <div
        className={`border border-neutral-400 font-bold p-2 flex text-center justify-between items-center rounded-l-lg hover:shadow-[0px_0px_4px_1px] hover:shadow-neutral-200 hover:cursor-pointer${roomsCollapsed ? ' rounded-tr-lg' : ' rounded-r-lg'}`}
        onClick={() => setRoomsCollapsed(prev => !prev)}>
        {name}
        <MdArrowDropUp className={`text-2xl transition-transform duration-300${!roomsCollapsed ? ' rotate-180' : ''}`} />
      </div>
      <div className={`${!roomsCollapsed ? 'hidden ' : ''}ml-1.5 border-x border-b border-neutral-400 rounded-b-md flex flex-col`}>
        {rooms.map(room => (
          <Room key={"room-id-" + room.id} room={room} />
        ))}
      </div>
    </div>
  )
}