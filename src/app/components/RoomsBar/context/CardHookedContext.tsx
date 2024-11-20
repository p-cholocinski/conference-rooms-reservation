import { createContext, useContext, useState, ReactNode } from "react";

type CardHookedContextType = {
  isAnyCardHooked: boolean,
  setIsAnyCardHooked: React.Dispatch<React.SetStateAction<boolean>>,
}

const CardHookedContext = createContext<CardHookedContextType | undefined>(undefined)

export const CardHookedContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAnyCardHooked, setIsAnyCardHooked] = useState(false)

  return (
    <CardHookedContext.Provider value={{ isAnyCardHooked, setIsAnyCardHooked }}>
      {children}
    </CardHookedContext.Provider>
  )
}

export const useCardHookedContext = () => {
  const context = useContext(CardHookedContext)
  if (!context) {
    throw new Error("useCardHookedContext must be used within a CardHookedContext")
  }
  return context
}