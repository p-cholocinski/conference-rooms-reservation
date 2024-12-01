import { getHoursRange } from "@/lib/room"
import { useEffect, useState } from "react"

type Props = {
  roomOpenHours: Room["openHours"]
}

export default function Hours({ roomOpenHours }: Props) {

  const [hours, setHours] = useState<string[]>([])

  useEffect(() => {
    setHours(getHoursRange(roomOpenHours.from, roomOpenHours.to))
  }, [roomOpenHours])

  return (
    <div
      className="flex flex-col min-w-12 justify-between text-xs"
    >
      {hours?.map((hour) => (
        <div
          key={hour}
          className="h-full min-h-12 first:invisible"
        >
          <div
            className="relative -top-2"
          >
            {hour}
          </div>
          <div
            className="absolute w-[calc(100%-40px)] -translate-y-4 ml-10 border-t border-neutral-400/20"
          />
        </div>
      ))}
    </div>
  )
}
