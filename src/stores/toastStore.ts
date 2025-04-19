import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

type Toast = {
  id: string
  type: "success" | "error" | "info"
  message: string
}

type ToastStore = {
  toasts: Toast[]
  showToast: (type: Toast["type"], message: string, duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  showToast: (type, message, duration = 3000) => {
    const id = uuidv4()
    const closingDelay = 300

    set((state) => ({
      toasts: [...state.toasts, { id, type, message, isClosing: false }],
    }))

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, isClosing: true } : toast
        ),
      }))
    }, duration - closingDelay)

    setTimeout(() => {
      get().removeToast(id)
    }, duration)
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  }
}))