import { MdArrowDropUp } from "react-icons/md";
import Room from "./Room/Room";
import { getRoomsByLocation } from "@/lib/room";
import { useState } from "react";

export default function Location({ id, name }: Place) {

  const [roomsCollapsed, setRoomsCollapsed] = useState(true)

  const filteredRooms: Room[] = getRoomsByLocation(id)

  if (filteredRooms.length === 0) { return }

  return (
    <div>
      <div
        className={`border border-neutral-400 font-bold p-2 flex text-center justify-between items-center rounded-l-lg hover:shadow-[0px_0px_4px_1px] hover:shadow-neutral-200 hover:cursor-pointer${roomsCollapsed ? ' rounded-tr-lg' : ' rounded-r-lg'}`}
        onClick={() => setRoomsCollapsed(prev => !prev)}>
        {name}
        <MdArrowDropUp className={`text-2xl transition-transform duration-300${!roomsCollapsed ? ' rotate-180' : ''}`} />
      </div>
      <div className={`${!roomsCollapsed ? 'hidden ' : ''}ml-1.5 border-x border-b border-neutral-400 rounded-b-md flex flex-col`}>
        {filteredRooms.map(room => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </div>
  )
}
