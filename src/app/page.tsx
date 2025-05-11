import Navbar from "./components/Navbar"
import RoomsBar from "./components/RoomsBar/RoomsBar"
import Calendars from "./components/Calendars/Calendars"
import { SessionProvider } from "next-auth/react"
import { getCurrentPeriod } from "@/lib/calendar"

export default async function Home(props: {
  searchParams?: Promise<{
    r?: string,
    ct?: string,
    cp?: string,
  }>
}) {
  const searchParams = await props.searchParams

  const roomId = searchParams?.r
    ? parseInt(searchParams.r)
    : undefined

  const calendarType: Calendar["type"] = searchParams?.ct
    ? (searchParams.ct === "month" || searchParams.ct === "week")
      ? searchParams.ct
      : "month"
    : "month"

  const calendarPeriod = searchParams?.cp
    ? new Date(parseInt(searchParams.cp))
    : getCurrentPeriod()

  return (
    <>
      <Navbar />
      <SessionProvider>
        <RoomsBar />
        <Calendars
          roomId={roomId}
          calendarType={calendarType}
          calendarPeriod={calendarPeriod}
        />
      </SessionProvider>
    </>
  )
}
