import { MdArrowDropUp } from "react-icons/md";
import Room from "../Room/Room";
import getRoomsByLocation from "@/lib/getRoomsByLocation";
import { useState } from "react";

export default function Location({ id, name }: Place) {

  const rooms: Room[] = [
    {
      id: "room-1",
      name: "Sala konferencyjna 1",
      description: "Na pierwszym piętrze z zadziwiająco dziwną rozetą, która nie do końca przypomina rozetę, ale bardziej coś w rodzaju firany która utożsamia się z obrusem. Ale lepiej się tym nie przemować, ponieważ można urazić tą niewinną duszyczkę. Jeszcze jakiś dodatkowy tekst, żeby sprawdzić czy wszystko się zmieści.",
      pictures: [
        {
          path: "/images/room-1.jpg",
          main: true,
        },
        {
          path: "/images/room-1-a.jpg",
          main: false,
        }
      ],
      params: [
        {
          param: "Liczba miejsc",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: true,
        },
        {
          param: "Jasne pomieszczenie",
          value: true,
        },
        {
          param: "Zatrwarzające światło wewnątrz",
          value: true,
        },
        {
          param: "Wyposażona w doskonałej jakości rzutnik o idealnych parametrach",
          value: true,
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
          param: "Liczba miejsc",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: true,
        }
      ],
      location: "location-1",
    },
    {
      id: "room-3",
      name: "Sala konferencyjna 3",
      description: "Na trzecim piętrze",
      pictures: [
        {
          path: "/images/room-3.jpg",
          main: true,
        }
      ],
      params: [
        {
          param: "Liczba miejsc",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: false,
        }
      ],
      location: "location-2",
    },
    {
      id: "room-4",
      name: "Sala konferencyjna 4",
      description: "Na trzecim piętrze",
      pictures: [
        {
          path: "/images/room-3.jpg",
          main: true,
        }
      ],
      params: [
        {
          param: "Liczba miejsc",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: false,
        }
      ],
      location: "location-2",
    },
    {
      id: "room-5",
      name: "Sala konferencyjna 5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi sed earum sit odit asperiores facere, odio voluptates suscipit ab similique dignissimos alias reiciendis totam eligendi. Vero assumenda harum nam. Alias quod voluptatem, aliquam unde laboriosam maiores. Dignissimos nam inventore recusandae temporibus quibusdam non deserunt a, cumque voluptate mollitia sunt reprehenderit quasi eos delectus illum consequatur perferendis magnam odit unde!",
      pictures: [
        {
          path: "/images/room-3.jpg",
          main: true,
        }
      ],
      params: [
        {
          param: "Liczba miejsc",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: true,
        },
        {
          param: "Jasne pomieszczenie",
          value: true,
        },
        {
          param: "Zatrwarzające światło wewnątrz",
          value: true,
        },
        {
          param: "Wyposażona w doskonałej jakości rzutnik o idealnych parametrach",
          value: true,
        }
      ],
      location: "location-2",
    },
    {
      id: "room-6",
      name: "Sala konferencyjna 6",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi sed earum sit odit asperiores facere, odio voluptates suscipit ab similique dignissimos alias reiciendis totam eligendi. Vero assumenda harum nam. Alias quod voluptatem, aliquam unde laboriosam maiores. Dignissimos nam inventore recusandae temporibus quibusdam non deserunt a, cumque voluptate mollitia sunt reprehenderit quasi eos delectus illum consequatur perferendis magnam odit unde!",
      pictures: [
        {
          path: "/images/room-3.jpg",
          main: true,
        }
      ],
      params: [
        {
          param: "Liczba miejsc",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: true,
        },
        {
          param: "Jasne pomieszczenie",
          value: true,
        },
        {
          param: "Zatrwarzające światło wewnątrz",
          value: true,
        },
        {
          param: "Wyposażona w doskonałej jakości rzutnik o idealnych parametrach",
          value: true,
        }
      ],
      location: "location-2",
    },
    {
      id: "room-7",
      name: "Sala konferencyjna 7",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi sed earum sit odit asperiores facere, odio voluptates suscipit ab similique dignissimos alias reiciendis totam eligendi. Vero assumenda harum nam. Alias quod voluptatem, aliquam unde laboriosam maiores. Dignissimos nam inventore recusandae temporibus quibusdam non deserunt a, cumque voluptate mollitia sunt reprehenderit quasi eos delectus illum consequatur perferendis magnam odit unde!",
      pictures: [
        {
          path: "/images/room-3.jpg",
          main: true,
        }
      ],
      params: [
        {
          param: "Liczba miejsc",
          value: "12",
        },
        {
          param: "Wyposażona w telewizor",
          value: true,
        },
        {
          param: "Jasne pomieszczenie",
          value: true,
        },
        {
          param: "Zatrwarzające światło wewnątrz",
          value: true,
        },
        {
          param: "Wyposażona w doskonałej jakości rzutnik o idealnych parametrach",
          value: true,
        }
      ],
      location: "location-2",
    }
  ]

  const [roomsCollapsed, setRoomsCollapsed] = useState(true)

  const filteredRooms: Room[] = getRoomsByLocation(rooms, id)

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
