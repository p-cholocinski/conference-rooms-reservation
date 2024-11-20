import { createContext, useContext, useState, ReactNode } from "react";

type SelectedRoomContextType = {
  selectedRoom: string,
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>,
}

const SelectedRoomContext = createContext<SelectedRoomContextType | undefined>(undefined)

export const SelectedRoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState('')

  return (
    <SelectedRoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
      {children}
    </SelectedRoomContext.Provider>
  )
}

export const useSelectedRoomContext = () => {
  const context = useContext(SelectedRoomContext)
  if (!context) {
    throw new Error("useSelectedRoomContext must be used within a SelectedRoomContext")
  }
  return context
}