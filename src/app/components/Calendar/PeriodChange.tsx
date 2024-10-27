import { MdArrowLeft, MdArrowRight } from "react-icons/md"

export default function PeriodChange() {
  return (
    <div className="bg-neutral-600 w-64 flex flex-row items-center border border-neutral-400 rounded-2xl">
      <button className="h-full text-3xl hover:*:scale-125">
        <MdArrowLeft />
      </button>
      <div className="bg-neutral-500 text-sm font-bold border-x border-neutral-400 w-full h-full flex items-center justify-center">
        Październik 2024
      </div>
      <button className="h-full text-3xl hover:*:scale-125">
        <MdArrowRight />
      </button>
    </div>
  )
}
