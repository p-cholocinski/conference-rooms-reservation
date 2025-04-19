import { FaCheckDouble, FaInfo } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { MdClose } from "react-icons/md"

type Props = {
  id: string,
  type: "success" | "error" | "info",
  message: string,
  onClose: (id: string) => void,
  isClosing?: boolean
}

export default function Toast({ id, message, type, onClose, isClosing = false }: Props) {
  const toastLayout = {
    success: {
      className: "bg-green-950/80 border-green-400",
      icon: <FaCheckDouble className="w-5 h-5 text-green-500" />,
      title: "Sukces!",
    },
    error: {
      className: "bg-red-950/80 border-red-400",
      icon: <ImCross className="w-5 h-5 text-red-500" />,
      title: "Błąd!",
    },
    info: {
      className: "bg-blue-950/80 border-blue-400",
      icon: <FaInfo className="w-5 h-5 text-blue-500" />,
      title: "Info",
    },
  }[type]

  return (
    <div
      className={`
        ${isClosing ? "animate-toast-slide-out" : "animate-toast-slide-in"}
        flex items-center ${toastLayout.className} 
        rounded-md shadow-lg p-4 mb-2 relative border select-none
      `}
    >
      <button
        className="absolute text-xl top-2 right-2 hover:bg-neutral-900/40 hover:cursor-pointer rounded-full"
        onClick={() => onClose(id)}
      >
        <MdClose />
      </button>

      <div className="flex-shrink-0">{toastLayout.icon}</div>

      <div className="ml-3">
        <p className="text-base font-medium text-neutral-200">{toastLayout.title}</p>
        <p className="mt-1 text-base text-neutral-400">{message}</p>
      </div>
    </div>
  )
}