'use client'

import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams"
import { calendars } from "@/lib/calendar"

type Props = {
  calendarType: Calendar["type"],
}

export default function TypeChange({ calendarType }: Props) {
  const updateSearchParams = useUpdateSearchParams()

  return (
    <div className="bg-neutral-500 w-60 p-0.5 text-sm flex text-center border border-neutral-400 rounded-2xl">
      {calendars.map((calendar) => (
        <button
          key={calendar.type}
          className={`w-full h-full rounded-2xl hover:cursor-pointer ${calendarType === calendar.type ? 'bg-neutral-400 font-bold' : ''}`}
          onClick={() => { updateSearchParams("ct", calendar.type) }}>
          {calendar.name}
        </button>
      ))
      }
    </div>
  )
}
