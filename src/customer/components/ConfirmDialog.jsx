import { useEffect, useId, useRef } from 'react'
import { TriangleAlert } from 'lucide-react'
import { outlineButton } from './PageHeader'

export default function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  const titleId = useId()
  const cancelRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cancelRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus?.()
    }
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm animate-fade-in"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <TriangleAlert className="size-6" aria-hidden="true" />
        </span>
        <h2 id={titleId} className="mt-4 text-xl font-extrabold tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-body">{message}</p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button ref={cancelRef} type="button" onClick={onCancel} className={`${outlineButton} px-5 py-2.5`}>
            Keep my account
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
