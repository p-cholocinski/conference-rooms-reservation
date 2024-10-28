import { MdArrowDropUp } from "react-icons/md";
import Room from "../Room/Room";

type Props = {
  locationName: string,
}

export default function Location({ locationName }: Props) {
  return (
    <div>
      <div className="border border-neutral-400 font-bold p-2 flex text-center justify-between items-center rounded-l-lg hover:shadow-[0px_0px_4px_1px] hover:shadow-neutral-200 hover:cursor-pointer">
        {locationName}
        <MdArrowDropUp className="text-2xl" />
      </div>
      <div className="ml-1.5 border-x border-b border-neutral-400 rounded-bl-md flex flex-col">
        <Room />
        <Room />
      </div>
    </div>
  )
}
