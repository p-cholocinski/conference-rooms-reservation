import Image from "next/image"
import { FaCheck } from "react-icons/fa"
import { ImCross } from "react-icons/im"
/* import { useEffect, useRef } from "react" */

type Props = {
  visible: boolean,
  room: Room,
}

export default function RoomCard({ visible, room }: Props) {
  const { name, description, pictures, params } = room
  /* 
    const elementRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      const roomCard = elementRef.current
      if (roomCard) {
        if (visible) {
          const roomsBar = document.getElementById("rooms-bar")
          if (roomsBar) {
            const cardTop = roomCard.offsetTop
            const roomsBarTop = roomsBar.offsetTop
            const cardBottom = cardTop + roomCard.offsetHeight
            const roomsBarBottom = roomsBarTop + roomsBar.offsetHeight
            if (cardTop < roomsBarTop) {
              roomCard.style.top = roomsBarTop + 'px'
            } else if (cardBottom > roomsBarBottom) {
              roomCard.style.top = (cardTop - (cardBottom - roomsBarBottom)) + 'px'
            }
          }
        } else {
          roomCard.style.top = ''
        }
      }
    }, [visible]);
   */
  return (
    <div
      /* ref={elementRef} */
      className={`${visible ? 'absolute ' : 'hidden '}top-4 w-[36rem] left-[102%] rounded-lg shadow-[0px_0px_2px_1px] shadow-neutral-200`}>
      <div className="bg-neutral-600 px-4 py-2 font-bold text-2xl rounded-t-lg">
        {name}
      </div>
      <div className="bg-neutral-500 px-2 py-4 flex flex-col gap-4 rounded-b-lg">
        <div className="flex gap-2">
          <div className="flex-none w-64 place-items-center place-self-center">
            <Image
              className="w-auto h-auto rounded-md shadow-[0px_0px_2px_1px] shadow-neutral-400"
              src={pictures[0].path}
              alt={name}
              width={250}
              height={250}
              priority={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div className="font-bold">Opis</div>
              <div className="text-sm">
                {description}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-center border-b-2 border-neutral-400">Parametry</div>
          <table className="w-full justify-center">
            <tbody>
              {params.map(param => (
                <tr key={param.param} className="border-b border-neutral-400 text-sm flex last:border-b-2 hover:bg-neutral-600">
                  <td className="w-5/6">{param.param}</td>
                  <td className="w-1/6 text-center place-items-center place-content-center">
                    {typeof param.value === "string"
                      ? param.value
                      : param.value
                        ? <FaCheck className="text-green-400" />
                        : <ImCross className="text-red-400" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
