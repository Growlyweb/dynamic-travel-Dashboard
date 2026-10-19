import { CUSTOM_STATUS_TONES, TOUR_STATUS_TONES, VISA_STATUS_TONES } from '../data/customerData'

const TONES = {
  amber: { pill: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  blue: { pill: 'bg-blue-50 text-blue-700', dot: 'bg-blue-600' },
  green: { pill: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-600' },
  red: { pill: 'bg-red-50 text-red-600', dot: 'bg-red-500' },
  gray: { pill: 'bg-slate-100 text-slate-600', dot: 'bg-slate-500' },
}

const SIZES = {
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-[13px]',
}

export default function StatusBadge({ label, tone = 'gray', dot = false, size = 'md' }) {
  const style = TONES[tone] ?? TONES.gray

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md font-medium ${SIZES[size]} ${style.pill}`}
    >
      {dot && <span aria-hidden="true" className={`size-1.5 rounded-full ${style.dot}`} />}
      {label}
    </span>
  )
}

export function VisaStatusBadge({ status, dot = true, size }) {
  return <StatusBadge label={status} tone={VISA_STATUS_TONES[status]} dot={dot} size={size} />
}

export function TourStatusBadge({ status, size }) {
  return <StatusBadge label={status} tone={TOUR_STATUS_TONES[status]} size={size} />
}

export function CustomTourStatusBadge({ status, dot = true, size }) {
  return <StatusBadge label={status} tone={CUSTOM_STATUS_TONES[status]} dot={dot} size={size} />
}
