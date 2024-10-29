import { MdArrowDropUp } from "react-icons/md";
import Room from "../Room/Room";
import getRoomsByLocation from "@/lib/getRoomsByLocation";

export default function Location({ id, name }: location) {

  const rooms: room[] = [
    {
      id: "room-1",
      name: "Sala konferencyjna 1",
      description: "Na pierwszym piętrze",
      pictures: [
        {
          path: "/images/room-1.jpg",
          main: true,
        }
      ],
      params: [
        {
          param: "Ilość krzeseł",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: "Tak",
        }
      ],
      location: "location-1",
    },
    {
      id: "room-2",
      name: "Sala konferencyjna 2",
      description: "Na drugim piętrze",
      pictures: [
        {
          path: "/images/room-2.jpg",
          main: true,
        }
      ],
      params: [
        {
          param: "Ilość krzeseł",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: "Tak",
        }
      ],
      location: "location-1",
    }
  ]

  const filteredRooms: room[] = getRoomsByLocation(rooms, id)

  return (
    <div>
      <div className="border border-neutral-400 font-bold p-2 flex text-center justify-between items-center rounded-l-lg hover:shadow-[0px_0px_4px_1px] hover:shadow-neutral-200 hover:cursor-pointer">
        {name}
        <MdArrowDropUp className="text-2xl" />
      </div>
      <div className="ml-1.5 border-x border-b border-neutral-400 rounded-bl-md flex flex-col">
        {filteredRooms.map(room => (
          <Room key={room.id} roomName={room.name} mainPicturePath={room.pictures[0].path} />
        ))}
      </div>
    </div>
  )
}
