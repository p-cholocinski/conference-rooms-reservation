import { getHoursRange } from "@/lib/calendar"
import { Room } from "@prisma/client"

type Props = {
  openFrom: Room["openFrom"],
  openTo: Room["openTo"],
}

export default function Hours({ openFrom, openTo }: Props) {

  const hours: string[] = getHoursRange(openFrom, openTo)

  return (
    <div
      className="flex flex-col min-w-12 justify-between text-xs"
    >
      {hours?.map((hour) => (
        <div
          key={"hour-" + hour}
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
