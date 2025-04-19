import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUpdateSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (!params.has(name, value)) {
        params.set(name, value)

        router.push(pathname + '?' + params.toString())
      }
    },
    [router, pathname, searchParams]
  )

  return updateSearchParams
}