import { useEffect, useState } from "react";

const useResizeObserver = (ref: React.RefObject<HTMLElement>) => {
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { height } = entry.contentRect
      setHeight(height)
    });

    resizeObserver.observe(element)

    return () => resizeObserver.disconnect()
  }, [ref])

  return height
};

export default useResizeObserver