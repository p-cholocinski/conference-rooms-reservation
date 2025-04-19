import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  type?: "button" | "submit" | "reset",
  disabled?: boolean,
  className?: string,
  onClick?: () => void,
}

export default function Button({ children, onClick, type, disabled, className }: Props) {
  return (
    <button
      className={`px-4 py-2 text-sm font-semibold text-neutral-800 bg-neutral-400 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-200 focus:ring-opacity-50 hover:text-neutral-900 hover:cursor-pointer ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}