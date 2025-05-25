import Navbar from "./(crr)/Navbar"
import RoomsBar from "./(crr)/rooms-bar/RoomsBar"
import Calendars from "./(crr)/calendars/Calendars"
import { SessionProvider } from "next-auth/react"
import { getUtcStartDay } from "@/lib/calendar"

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
    ? getUtcStartDay(new Date(parseInt(searchParams.cp)))
    : getUtcStartDay(new Date())

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
