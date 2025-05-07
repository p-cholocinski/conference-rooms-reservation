import { showToastOutsideOnly } from "@/lib/showToastOutsideOnly"

export function withClientCallback<T>(
  action: (prevState: any, formData: FormData, id?: any) => Promise<T>,
  onSuccess?: () => void,
  id?: any,
): (prevState: any, formData: FormData) => Promise<T> {
  return async (prevState: any, formData: FormData) => {
    const result = await action(prevState, formData, id)

    if ((result as any)?.errors?._form) {
      showToastOutsideOnly("error", (result as any)?.errors?._form)
    } else if (!(result as any)?.errors && onSuccess) {
      onSuccess()
    }

    return result
  }
}