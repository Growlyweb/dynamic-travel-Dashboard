import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import CountryFlag from './CountryFlag'

function normalizeSearch(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export default function CountrySidebar({ countries, activeCode, status, onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const active = countries.find((country) => country.code === activeCode)

  const results = useMemo(() => {
    const needle = normalizeSearch(query)
    if (!needle) return countries
    return countries.filter((country) => normalizeSearch(country.searchText).includes(needle))
  }, [countries, query])

  const handleSelect = (code) => {
    onSelect(code)
    setOpen(false)
  }

  return (
    <aside
      aria-label="Visa countries"
      className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]"
    >
      <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-card lg:max-h-[inherit]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="visa-country-picker"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-3 text-left lg:hidden"
        >
          <span className="flex min-w-0 items-center gap-3">
            {active && <CountryFlag code={active.code} name={active.name} width={28} />}
            <span className="truncate text-sm font-bold text-navy">
              {active?.name ?? 'Select country'}
            </span>
          </span>
          <ChevronDown
            className={`size-5 shrink-0 text-body transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <h3 className="hidden px-1 text-lg font-bold text-navy lg:block">All Countries</h3>

        <div
          id="visa-country-picker"
          className={`${open ? 'flex' : 'hidden'} mt-4 min-h-0 flex-1 flex-col lg:mt-4 lg:flex`}
        >
          <label className="relative block">
            <span className="sr-only">Search country</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-navy/60" />
            <input
              type="search"
              name="country-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country..."
              autoComplete="off"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>

          <p className="sr-only" aria-live="polite">
            {results.length} {results.length === 1 ? 'country' : 'countries'} found
          </p>

          <ul className="mt-3 max-h-80 min-h-0 flex-1 space-y-0.5 overflow-y-auto pr-1 lg:max-h-none">
            {results.map((country) => {
              const isActive = country.code === activeCode
              return (
                <li key={country.code}>
                  <button
                    type="button"
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => handleSelect(country.code)}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-primary-light font-semibold text-primary'
                        : 'font-medium text-navy hover:bg-tint'
                    }`}
                  >
                    <CountryFlag code={country.code} name={country.name} width={28} />
                    <span className="min-w-0 flex-1 truncate">{country.name}</span>
                    <ChevronRight
                      className={`size-4 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400'}`}
                    />
                  </button>
                </li>
              )
            })}

            {results.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-body">
                No country matches &ldquo;{query}&rdquo;
              </li>
            )}
          </ul>

          {status === 'offline' && (
            <p className="mt-3 text-[11px] leading-4 text-body">
              Showing the saved country list. We could not reach the live list.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
