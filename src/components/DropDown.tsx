import { RefObject, useRef } from "react"
import useClickOutside from "@/hooks/useClickOutside"

type Props = {
  options: {
    value: string | number,
    label: string,
  }[],
  isOpen: boolean,
  scrollToValue?: string | number,
  minWidht?: number,
  onClick: (value: string | number) => void,
  parentRef: RefObject<HTMLDivElement | null>,
}

export default function DropDown({ options, isOpen, scrollToValue, minWidht, onClick, parentRef }: Props) {
  const selectedRef = useRef<HTMLOptionElement | null>(null)

  useClickOutside(parentRef, () => onClick(""))

  if (isOpen && scrollToValue) {
    requestAnimationFrame(() => {
      selectedRef.current?.scrollIntoView({ behavior: "instant", block: "center" })
    });
  }

  return (
    <div
      className="absolute bg-neutral-600 min-w-28 max-h-44 z-10 translate-y-1 rounded-md text-sm overflow-y-scroll"
      style={{ minWidth: minWidht }}
    >
      {options.map(option => (
        <option
          key={option.value}
          ref={option.value === scrollToValue ? selectedRef : null}
          className={`p-2 cursor-pointer rounded-sm hover:bg-neutral-800/40 ${scrollToValue === option.value && "bg-neutral-800/50"}`}
          value={option.value}
          onClick={() => onClick(option.value)}
        >
          {option.label}
        </option>
      ))
      }
    </div >
  )
}