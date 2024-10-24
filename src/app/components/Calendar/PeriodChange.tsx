import { MdArrowLeft, MdArrowRight } from "react-icons/md"

export default function PeriodChange() {
  return (
    <div className="bg-neutral-600 w-64 flex flex-row items-center border rounded-2xl">
      <button className="h-full border-r text-3xl hover:*:scale-125">
        <MdArrowLeft />
      </button>
      <div className="bg-neutral-500 w-full h-full flex items-center justify-center">
        Styczeń
      </div>
      <button className="h-full border-l text-3xl hover:*:scale-125">
        <MdArrowRight />
      </button>
    </div>
  )
}
