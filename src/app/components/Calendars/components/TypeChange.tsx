import { getCalendarTypeById } from "@/lib/typeChange"
import { useCalendarTypeContext } from "../context/CalendarTypeContext"

export default function TypeChange() {
  const { calendarType, setCalendarType } = useCalendarTypeContext()

  const calendarTypes: CalendarTypes[] = [
    {
      id: "week",
      name: "Tygodniowy",
      daysCount: 7,
    },
    {
      id: "month",
      name: "Miesięczny",
      daysCount: 42,
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
