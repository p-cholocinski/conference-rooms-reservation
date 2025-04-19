import { RefObject, useCallback, useEffect } from "react"

const useMousedownOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callback()
    }
  }, [ref, callback])

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [ref, callback, handleMouseDown])
}

export default useMousedownOutside