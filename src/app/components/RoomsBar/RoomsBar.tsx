'use client'

import { createContext, useContext, useState } from "react";
import Location from "./Location/Location";

type CardHookedContextType = {
  isAnyCardHooked: boolean,
  setIsAnyCardHooked: React.Dispatch<React.SetStateAction<boolean>>,
}

const CardHookedContext = createContext<CardHookedContextType | undefined>(undefined)

export const useCardHookedContext = () => {
  const context = useContext(CardHookedContext)
  if (!context) {
    throw new Error("useCardHookedContext error")
  }
  return context
}

export default function RoomsBar() {

  const locations: Place[] = [
    {
      id: "location-1",
      name: "Budynek 1",
    },
    {
      id: "location-2",
      name: "Budynek 2",
    }
  ]

  const [isAnyCardHooked, setIsAnyCardHooked] = useState(false)

  return (
    <CardHookedContext.Provider value={{ isAnyCardHooked, setIsAnyCardHooked }}>
      <aside className="fixed left-0 w-80 pt-4 pb-24 h-full transition-transform -translate-x-full z-10 md:translate-x-0">
        <div id="rooms-bar" className="bg-neutral-600 h-full py-4 px-2 flex flex-col gap-4 shadow-none shadow-neutral-200 rounded-r-2xl md:shadow-[0px_0px_4px_1px]">
          {locations.map(location => (
            <Location key={location.id} id={location.id} name={location.name} />
          ))}
        </div>
      </aside>
    </CardHookedContext.Provider>
  )
}
