import { auth } from "@/auth"
import Link from "next/link"
import { FaUser } from "react-icons/fa"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="bg-neutral-600 sticky top-0 p-4 shadow-[0px_0px_4px_1px] shadow-neutral-200">
      <div className="md:px-6 mx-auto flex justify-between flex-row">
        <h1 className="text-xl font-bold text-neutral-200 flex sm:text-2xl md:text-3xl">
          <Link href="/" className="no-underline flex flex-row gap-3 items-center hover:text-neutral-50">
            Conference Rooms Reservation
          </Link>
        </h1>
        <div className="flex flex-row items-center text-neutral-200">
          {session?.user && (
            <div className="flex h-4/6 translate-x-3 items-center bg-neutral-500 text-base border-1 border-neutral-200 px-5 rounded-l-full select-none">
              {session.user.name}
            </div>
          )}
          <Link href="/api/auth/signout" className="z-10">
            <button className="bg-neutral-500 text-3xl border-2 border-neutral-200 p-2 rounded-full hover:border-neutral-50 hover:cursor-pointer">
              <FaUser />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
