import PeriodChange from "./components/PeriodChange"
import TypeChange from "./components/TypeChange"
import Calendar from "./components/Calendar/Calendar"
import { Room } from "@prisma/client"
import { getCalendarByType } from "@/lib/calendar"

type Props = {
  roomId?: Room["id"],
  calendarType: Calendar["type"],
  calendarPeriod: Date,
}

export default async function Calendars({ roomId, calendarType, calendarPeriod }: Props) {

  const calendar = getCalendarByType(calendarType)

  return (
    <div className="md:ml-80 fixed h-full w-full pb-28 md:pr-80">
      <div className="h-full m-4 p-4 bg-neutral-600 shadow-[0px_0px_4px_1px] shadow-neutral-200 rounded-2xl">
        <div className="flex justify-between">
          <PeriodChange calendarPeriod={calendarPeriod} calendarType={calendarType} />
          <TypeChange calendarType={calendarType} />
        </div>
        <Calendar roomId={roomId} calendar={calendar} calendarPeriod={calendarPeriod} />
      </div>
    </div>
  )
}