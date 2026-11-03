import { useEffect, useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { outlineButton, primaryButton } from './PageHeader'

const TIMELINE_STYLES = {
  done: 'border-emerald-500 bg-emerald-500 text-white',
  current: 'border-brand bg-white text-brand ring-4 ring-brand/15',
  failed: 'border-red-500 bg-red-500 text-white',
  pending: 'border-slate-200 bg-white text-slate-300',
}

function Timeline({ steps }) {
  return (
    <ol className="mt-6">
      {steps.map((step, index) => (
        <li key={step.label} className="relative flex gap-3 pb-5 last:pb-0">
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute left-[11px] top-6 h-full w-px ${
                step.state === 'done' ? 'bg-emerald-300' : 'bg-slate-200'
              }`}
            />
          )}
          <span
            className={`relative flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${TIMELINE_STYLES[step.state]}`}
          >
            {step.state === 'done' && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
            {step.state === 'failed' && <X className="size-3.5" strokeWidth={3} aria-hidden="true" />}
            {step.state === 'current' && <span className="size-2 rounded-full bg-brand" />}
          </span>
          <div className="pt-px">
            <p
              className={`text-sm font-semibold ${
                step.state === 'pending' ? 'text-slate-400' : 'text-ink'
              }`}
            >
              {step.state === 'failed' ? `${step.label} - rejected` : step.label}
            </p>
            {step.state === 'current' && <p className="text-xs text-brand">In progress</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function DetailsModal({ title, subtitle, badge, rows, timeline, onClose }) {
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm animate-fade-in"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-xl font-extrabold tracking-tight text-ink">
              {title}
            </h2>
            <p className="mt-1 text-sm text-body">{subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close details"
            onClick={onClose}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {badge && <div className="mt-4">{badge}</div>}

        <dl className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-100 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-4 px-4 py-3">
              <dt className="text-body">{label}</dt>
              <dd className="text-right font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        {timeline && <Timeline steps={timeline} />}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className={`${outlineButton} px-5 py-2.5`}>
            Close
          </button>
          <Link to="/contact" className={`${primaryButton} px-5 py-2.5`}>
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}
