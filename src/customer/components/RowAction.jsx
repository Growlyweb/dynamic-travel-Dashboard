import { ChevronRight } from 'lucide-react'
import { outlineButton } from './PageHeader'

export default function RowAction({ label, subject, onOpen, showChevron = true }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${label}: ${subject}`}
        className={`${outlineButton} min-w-[112px] py-2`}
      >
        {label}
      </button>
      {showChevron && <ChevronRight className="size-4 shrink-0 text-brand" aria-hidden="true" />}
    </div>
  )
}
