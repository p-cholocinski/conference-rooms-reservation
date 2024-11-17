import { getCalendarTypeById } from "@/lib/calendarType"
import { useCalendarTypeContext } from "./Calendar"

export default function TypeChange() {
  const { calendarType, setCalendarType } = useCalendarTypeContext()

  const calendarTypes: CalendarTypes[] = [
    {
      id: "week",
      name: "Tygodniowy",
    },
    {
      id: "month",
      name: "Miesięczny",
    },
  ]

  return (
    <div className="bg-neutral-500 w-60 p-0.5 text-sm flex text-center border border-neutral-400 rounded-2xl">
      {calendarTypes.map((type) => (
        <button
          key={type.id}
          className={`w-full h-full rounded-2xl${calendarType.id === type.id ? ' bg-neutral-400 font-bold' : ''}`}
          onClick={() => setCalendarType(getCalendarTypeById(calendarTypes, type.id))}>
          {type.name}
        </button>
      ))
      }
    </div>
  )
}
