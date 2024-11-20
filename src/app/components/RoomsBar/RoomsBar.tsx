import Location from "./Location/Location";
import { CardHookedContextProvider } from "./context/CardHookedContext";

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

  return (
    <CardHookedContextProvider>
      <aside className="fixed left-0 w-80 h-full pt-4 pb-24 transition-transform -translate-x-full z-10 md:translate-x-0">
        <div id="rooms-bar" className="bg-neutral-600 h-full py-3 px-1 shadow-none shadow-neutral-200 rounded-r-2xl md:shadow-[0px_0px_4px_1px]">
          <div className="flex flex-col h-full p-1 gap-4 overflow-y-scroll">
            {locations.map(location => (
              <Location key={location.id} id={location.id} name={location.name} />
            ))}
          </div>
        </div>
      </aside>
    </CardHookedContextProvider>
  )
}
