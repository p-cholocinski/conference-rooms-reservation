'use client'

import { useState } from "react"
import { getServerDate } from "../actions/serverDate"

export default function TestServerButton() {
  const [serverDate, setServerDate] = useState<Date | null>(null)

  return (
    <div className="flex flex-col text-sm px-5">
      <p className="text-neutral-200">
        Server Date: {serverDate?.toString()}
      </p>
      <button
        className="bg-neutral-500 text-neutral-200 border-2 border-neutral-200 rounded-full hover:border-neutral-50 hover:cursor-pointer"
        onClick={async () => {
          const serverDate = await getServerDate()
          setServerDate(serverDate)
        }}
      >
        Show Server Date
      </button>
    </div>
  )
}