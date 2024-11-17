import WeekRow from "../WeekRow";
import Hours from "./Hours";
import ReservationArea from "./Reservations";
import WeekDays from "./WeekDays";

export default function CalendarWeek() {
  return (
    <div className="my-4 mx-2 h-full pb-24">
      <div className="w-full flex overflow-y-scroll">
        <div className="w-10"></div>
        <div className="w-full">
          <WeekRow />
          <WeekDays />
        </div>
      </div>
      <div className="h-full overflow-y-scroll py-1">
        <div className="flex h-[1200px]">
          <Hours />
          <ReservationArea />
        </div>
      </div>
    </div>
  )
}
