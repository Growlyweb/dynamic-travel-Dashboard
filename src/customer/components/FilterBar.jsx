import { useId } from 'react'
import { ChevronDown, Search } from 'lucide-react'

const fieldClass =
  'h-11 w-full rounded-lg border border-slate-200 bg-white text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10'

function SelectField({ label, value, onChange, options, allLabel }) {
  const id = useId()

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} cursor-pointer appearance-none pl-3 pr-9`}
        >
          <option value="">{allLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default function FilterBar({ search, filters, onReset }) {
  const searchId = useId()

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2.4fr)_repeat(3,minmax(0,1fr))_auto] lg:items-end">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <label
            htmlFor={searchId}
            className={search.label ? 'mb-1.5 block text-sm font-semibold text-ink' : 'sr-only'}
          >
            {search.label ?? 'Search'}
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink"
              aria-hidden="true"
            />
            <input
              id={searchId}
              type="search"
              name="search"
              value={search.value}
              onChange={(event) => search.onChange(event.target.value)}
              placeholder={search.placeholder}
              autoComplete="off"
              className={`${fieldClass} pl-10 pr-3`}
            />
          </div>
        </div>

        {filters.map((filter) => (
          <SelectField key={filter.id} {...filter} />
        ))}

        <button
          type="button"
          onClick={onReset}
          className="h-11 cursor-pointer rounded-lg border border-slate-200 bg-white px-7 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:col-span-2 lg:col-span-1"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
