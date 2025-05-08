import { showToastOutsideOnly } from "@/lib/showToastOutsideOnly"

export function withClientCallback<T>(
  action: (prevState: unknown, formData: FormData, id?: number) => Promise<T>,
  onSuccess?: () => void,
  id?: number,
): (prevState: unknown, formData: FormData) => Promise<T> {
  return async (prevState: unknown, formData: FormData) => {
    const result = await action(prevState, formData, id)

    const maybeWithError = result as T & { errors?: { _form?: string } }

    if (maybeWithError?.errors?._form) {
      showToastOutsideOnly("error", maybeWithError.errors._form)
    } else if (!maybeWithError?.errors && onSuccess) {
      onSuccess()
    }

    return result
  }
}