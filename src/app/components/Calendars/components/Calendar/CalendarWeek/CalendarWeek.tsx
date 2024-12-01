import WeekRow from "../../WeekRow";
import Hours from "./Hours";
import DayWeek from "./DayWeek";
import { useRef } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";

type Props = {
  calendarDays: CalendarDay[],
  reservations: Reservation[],
  roomOpenHours: Room["openHours"],
}

export default function CalendarWeek({ calendarDays, reservations, roomOpenHours }: Props) {

  const calendarWeekElement = useRef<HTMLDivElement>(null)

  const calendarHeight = useResizeObserver(calendarWeekElement)

  return (
    <div className="my-4 mx-2 h-full pb-28">
      <div className="w-full flex overflow-y-scroll overflow-x-hidden pr-1">
        <div className="w-full pl-10 *:pl-2">
          <WeekRow />
          <div className="grid grid-cols-7 border-b border-neutral-400 text-xl text-center pb-1">
            {calendarDays?.map((weekDay) => (
              <div
                key={weekDay.date.toLowerCase()}
              >
                <div
                  className={`w-10 h-10 rounded-full mx-auto content-center ${weekDay.currentDay ? 'bg-neutral-950' : ''}`}
                >
                  {weekDay.dayNumber}
                </div>
                <div className="absolute h-4 -translate-y-3 border-l border-neutral-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        <div
          ref={calendarWeekElement}
          className="flex relative min-h-full max-h-[1200px] mr-1"
        >
          <Hours roomOpenHours={roomOpenHours} />
          <div className="grid grid-cols-7 w-full">
            {calendarDays.map((weekDay) => (
              <DayWeek key={weekDay.date} calendarDay={weekDay} reservations={reservations} roomOpenHours={roomOpenHours} calendarHeight={calendarHeight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
