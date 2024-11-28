import WeekRow from "../../WeekRow";
import Hours from "./Hours";
import DayWeek from "./DayWeek";

type Props = {
  calendarDays: CalendarDay[],
  reservations: Reservation[],
}

export default function CalendarWeek({ calendarDays, reservations }: Props) {

  return (
    <div className="my-4 mx-2 h-full pb-24">
      <div className="w-full flex overflow-y-scroll">
        <div className="w-10"></div>
        <div className="w-full">
          <WeekRow />
          <div className="grid grid-cols-7 text-xl text-center">
            {calendarDays?.map((weekDay) => (
              <div
                key={weekDay.date.toLowerCase()}
                className={`w-10 h-10 rounded-full mx-auto content-center ${weekDay.currentDay ? 'bg-neutral-950' : ''}`}
              >
                {weekDay.dayNumber}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-scroll py-1">
        <div className="flex h-[1200px]">
          <Hours />
          <div className="grid grid-cols-7 w-full gap-1 px-1">
            {calendarDays.map((weekDay) => (
              <DayWeek key={weekDay.date} calendarDay={weekDay} reservations={reservations} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
