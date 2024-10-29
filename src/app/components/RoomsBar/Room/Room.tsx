import Image from "next/image"

type Props = {
  roomName: string,
  mainPicturePath: string,
}

export default function Room({ roomName, mainPicturePath }: Props) {
  return (
    <div className="p-2 flex gap-2 rounded-md hover:bg-neutral-800 hover:cursor-pointer">
      <Image
        className="rounded-md shadow-[0px_0px_2px_1px] shadow-neutral-500"
        src={mainPicturePath}
        alt={roomName}
        width={75}
        height={75}
      />
      <div className="content-center text-sm">
        {roomName}
      </div>
    </div>
  )
}
