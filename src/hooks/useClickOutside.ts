import { RefObject, useCallback, useEffect } from "react"

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  const handleClick = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callback()
    }
  }, [ref, callback])

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback, handleClick])
}

export default useClickOutside