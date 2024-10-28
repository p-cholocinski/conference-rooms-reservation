import Location from "./Location/Location";

export default function RoomsBar() {
  return (
    <aside className="fixed left-0 w-80 pt-4 pb-24 h-full transition-transform -translate-x-full md:translate-x-0">
      <div className="bg-neutral-600 h-full py-4 px-2 flex flex-col gap-4 shadow-none shadow-neutral-200 rounded-r-2xl md:shadow-[0px_0px_4px_1px]">
        <Location locationName="Budynek 1" />
        <Location locationName="Budynek 2" />
      </div>
    </aside>
  )
}
