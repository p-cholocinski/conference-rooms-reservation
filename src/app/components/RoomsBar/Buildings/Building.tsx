import { MdArrowDropUp } from "react-icons/md";

type Props = {
  buildingName: string,
}

export default function Building({ buildingName }: Props) {
  return (
    <div className="border border-neutral-400 font-bold p-2 flex text-center justify-between items-center rounded-lg hover:shadow-[0px_0px_4px_1px] hover:shadow-neutral-200 hover:cursor-pointer">
      {buildingName}
      <MdArrowDropUp className="text-2xl" />
    </div>
  )
}
