import Link from "next/link"
import { FaUser } from "react-icons/fa"

export default function Navbar() {
  return (
    <nav className="bg-neutral-600 sticky top-0 p-4 shadow-[0px_0px_4px_1px] shadow-neutral-200 z-0">
      <div className="md:px-6 mx-auto flex justify-between flex-row">
        <h1 className="text-xl font-bold text-neutral-200 flex sm:text-2xl md:text-3xl">
          <Link href="/" className="no-underline flex flex-row gap-3 items-center hover:text-neutral-50">
            Conference Rooms Reservation
          </Link>
        </h1>
        <div className="flex flex-row gap-3 text-neutral-200">
          <button className="bg-neutral-500 text-3xl border-2 border-neutral-200 p-2 rounded-full hover:border-neutral-50">
            <Link href="/">
              <FaUser />
            </Link>
          </button>
        </div>
      </div>
    </nav>
  )
}
