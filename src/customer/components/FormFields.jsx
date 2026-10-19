import { useId, useState } from 'react'
import { CalendarDays, ChevronDown, Eye, EyeOff } from 'lucide-react'
import CountryFlag from '@/components/sections/VisaExplorer/CountryFlag'
import { DIAL_CODES } from '@/constants/dialCodes'

const inputClass =
  'h-11 w-full rounded-lg border bg-white text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-600'

function Field({ label, error, htmlFor, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

const borderFor = (error) => (error ? 'border-red-400' : 'border-slate-200')

export function TextField({ label, error, className = '', ...props }) {
  const id = useId()

  return (
    <Field label={label} error={error} htmlFor={id}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className={`${inputClass} ${borderFor(error)} px-3 ${className}`}
        {...props}
      />
    </Field>
  )
}

export function TextAreaField({ label, error, ...props }) {
  const id = useId()

  return (
    <Field label={label} error={error} htmlFor={id}>
      <textarea
        id={id}
        rows={3}
        aria-invalid={Boolean(error)}
        className={`w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm leading-relaxed text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 ${borderFor(error)}`}
        {...props}
      />
    </Field>
  )
}

export function DateField({ label, error, ...props }) {
  const id = useId()

  return (
    <Field label={label} error={error} htmlFor={id}>
      <div className="relative">
        <CalendarDays
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink"
          aria-hidden="true"
        />
        <input
          id={id}
          type="date"
          aria-invalid={Boolean(error)}
          className={`${inputClass} ${borderFor(error)} pl-10 pr-3`}
          {...props}
        />
      </div>
    </Field>
  )
}

export function PasswordField({ label, error, ...props }) {
  const id = useId()
  const [visible, setVisible] = useState(false)

  return (
    <Field label={label} error={error} htmlFor={id}>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          className={`${inputClass} ${borderFor(error)} pl-3 pr-11`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-ink transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {visible ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
        </button>
      </div>
    </Field>
  )
}

export function PhoneField({ label, error, dialCode, onDialCodeChange, value, onChange }) {
  const id = useId()
  const selected = DIAL_CODES.find((entry) => entry.dial === dialCode) ?? DIAL_CODES[0]

  return (
    <Field label={label} error={error} htmlFor={id}>
      <div className="flex gap-2.5">
        <label className="relative flex h-11 w-[112px] shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
          <CountryFlag key={selected.code} code={selected.code} name={selected.label} width={24} />
          <span>{selected.dial}</span>
          <ChevronDown className="ml-auto size-4 shrink-0" aria-hidden="true" />
          <select
            aria-label="Country dial code"
            value={dialCode}
            onChange={(event) => onDialCodeChange(event.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {DIAL_CODES.map((entry) => (
              <option key={entry.code} value={entry.dial}>
                {entry.label} ({entry.dial})
              </option>
            ))}
          </select>
        </label>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className={`${inputClass} ${borderFor(error)} min-w-0 flex-1 px-3`}
        />
      </div>
    </Field>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        checked ? 'bg-brand' : 'bg-slate-300'
      }`}
    >
      <span
        className={`absolute left-1 top-1 size-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
