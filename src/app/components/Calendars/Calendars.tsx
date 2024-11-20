import PeriodChange from "./components/PeriodChange"
import TypeChange from "./components/TypeChange"
import Calendar from "./components/Calendar/Calendar"
import { CalendarPeriodContextProvider } from "./context/CalendarPeriodContext"
import { CalendarTypeContextProvider } from "./context/CalendarTypeContext"

export default function Calendars() {

  return (
    <CalendarPeriodContextProvider>
      <CalendarTypeContextProvider>
        <div className="md:ml-80 fixed h-full w-full pb-28 md:pr-80 z-0">
          <div className="h-full m-4 p-4 bg-neutral-600 shadow-[0px_0px_4px_1px] shadow-neutral-200 rounded-2xl">
            <div className="flex justify-between">
              <PeriodChange />
              <TypeChange />
            </div>
            <Calendar />
          </div>
        </div>
      </CalendarTypeContextProvider>
    </CalendarPeriodContextProvider>
  )
}