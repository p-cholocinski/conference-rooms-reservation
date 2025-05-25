import prisma from "@/lib/prisma";
import Location from "./location/Location";

export default async function RoomsBar() {

  const locations = await prisma.location.findMany({
    include: {
      rooms: {
        include: {
          pictures: true,
          parameters: {
            include: {
              parameter: true,
            },
          },
        },
      },
    },
  })

  return (
    <aside className="fixed left-0 w-80 h-full pt-4 pb-24 z-10 select-none transition-transform -translate-x-full md:translate-x-0">
      <div className="bg-neutral-600 h-full py-3 px-1 shadow-none shadow-neutral-200 rounded-r-2xl md:shadow-[0px_0px_4px_1px]">
        <div className="flex flex-col h-full p-1 gap-4 overflow-y-scroll">
          {locations?.map(location => (
            <Location key={"location-id-" + location.id} name={location.name} rooms={location.rooms} />
          ))}
        </div>
      </div>
    </aside>
  )
}
