import { useCallback, useEffect } from "react"

const useMouseup = (
  callback: () => void
) => {
  const handleMouseUp = useCallback(() => {
    callback()
  }, [callback])

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [callback, handleMouseUp])
}

export default useMouseup