'use client'

import RoomsBar from "./components/RoomsBar/RoomsBar"
import Calendar from "./components/Calendars/Calendars"
import { SelectedRoomContextProvider } from "./context/SelectedRoomContext"

export default function Home() {

  return (
    <>
      <SelectedRoomContextProvider>
        <RoomsBar />
        <Calendar />
      </SelectedRoomContextProvider>
    </>
  )
}
