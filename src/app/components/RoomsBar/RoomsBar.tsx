import Location from "./Location/Location";

export default function RoomsBar() {

  const locations: location[] = [
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
    <aside className="fixed left-0 w-80 pt-4 pb-24 h-full transition-transform -translate-x-full md:translate-x-0">
      <div className="bg-neutral-600 h-full py-4 px-2 flex flex-col gap-4 shadow-none shadow-neutral-200 rounded-r-2xl md:shadow-[0px_0px_4px_1px]">
        {locations.map(location => (
          <Location key={location.id} id={location.id} name={location.name} />
        ))}
      </div>
    </aside>
  )
}
