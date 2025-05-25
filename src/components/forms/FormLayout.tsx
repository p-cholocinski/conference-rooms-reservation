import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

type Props = {
  children: ReactNode,
  withCreatePortalBody?: boolean
  onClose?: () => void,
}

export default function FormLayout({ children, withCreatePortalBody = true, onClose }: Props) {
  const formLayout = (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 grid content-center place-items-center bg-neutral-950/30">
      <div className="flex flex-col gap-3 bg-neutral-800/100 w-96 p-3 rounded-xl">
        {onClose && (
          <div className="flex justify-end gap-1 text-xl">
            <button
              className="p-1 rounded-full hover:bg-neutral-900/40 hover:cursor-pointer"
              onClick={onClose}
            >
              <MdClose />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )

  if (!withCreatePortalBody) return formLayout

  return createPortal(formLayout, document.body)
}