import Image from "next/image"

export default function Room() {
  return (
    <div className="p-2 flex gap-2 rounded-md hover:bg-neutral-800 hover:cursor-pointer">
      <Image
        className="rounded-md shadow-[0px_0px_2px_1px] shadow-neutral-500"
        src="/images/room-1.jpg"
        alt="room-1"
        width={75}
        height={75}
      />
      <div className="content-center text-sm">
        Sala konferencyjna 1
      </div>
    </div>
  )
}
