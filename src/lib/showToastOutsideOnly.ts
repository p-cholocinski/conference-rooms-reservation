import { Toast, useToastStore } from "@/stores/toastStore";

/**
 * Show toast outside React (e.g. functions in Client Components).
 * Do not use in React components and server components.
*/

export function showToastOutsideOnly(type: Toast["type"], message: string, duration?: number) {
  if (typeof window !== 'undefined') {
    useToastStore.getState().showToast(type, message, duration);
  }
}