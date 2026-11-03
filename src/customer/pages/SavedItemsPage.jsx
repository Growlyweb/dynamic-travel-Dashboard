import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Clock, FileText, Heart, Plane, Search, Trash2, Users } from 'lucide-react'
import CountryFlag from '@/components/sections/VisaExplorer/CountryFlag'
import PageHeader, { outlineButton, primaryButton } from '../components/PageHeader'
import { SAVED_ITEMS } from '../data/customerData'

const META_ICONS = { entry: Plane, time: Clock, date: CalendarDays, people: Users }

const KIND_STYLES = {
  visa: { label: 'Visa', tag: 'bg-blue-50 text-blue-700', cta: 'Apply Now' },
  tour: { label: 'Tour Package', tag: 'bg-amber-50 text-amber-700', cta: 'Book Now' },
}

function SavedCard({ item, onRemove }) {
  const kind = KIND_STYLES[item.kind]

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:flex-row sm:gap-5">
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className="h-44 w-full shrink-0 rounded-xl bg-slate-100 object-cover sm:h-auto sm:min-h-[170px] sm:w-44"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${kind.tag}`}>{kind.label}</span>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title} from saved items`}
            className="-mr-1 -mt-1 flex size-9 cursor-pointer items-center justify-center rounded-full text-brand transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Trash2 className="size-[18px]" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2.5">
          {item.countryCode && <CountryFlag code={item.countryCode} name={item.place} width={32} />}
          <h2 className="text-lg font-bold leading-snug text-ink">{item.title}</h2>
        </div>
        <p className="mt-1 text-[15px] text-body">{item.place}</p>

        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-body">
          {item.meta.map(({ icon, text }) => {
            const Icon = META_ICONS[icon]
            return (
              <li key={text} className="flex items-center gap-1.5">
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {text}
              </li>
            )
          })}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
          <Link to={item.href} className={`${outlineButton} py-2.5`}>
            View Details
          </Link>
          <Link to={item.href} className={`${primaryButton} rounded-lg px-4 py-2.5`}>
            {kind.cta}
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function SavedItemsPage() {
  const [items, setItems] = useState(SAVED_ITEMS)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(
    () => ({
      all: items.length,
      visa: items.filter((item) => item.kind === 'visa').length,
      tour: items.filter((item) => item.kind === 'tour').length,
    }),
    [items],
  )

  const visible = items.filter((item) => {
    if (filter !== 'all' && item.kind !== filter) return false
    const needle = query.trim().toLowerCase()
    return !needle || `${item.title} ${item.place}`.toLowerCase().includes(needle)
  })

  const chips = [
    { id: 'all', label: `All Items (${counts.all})`, icon: Heart },
    { id: 'visa', label: `Visa (${counts.visa})`, icon: FileText },
    { id: 'tour', label: `Tour Packages (${counts.tour})`, icon: Plane },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        crumb="Saved Items"
        title="Saved Items"
        subtitle="Here are the visa requirements, tour packages and destinations you have saved for later."
      >
        <label className="relative block w-full sm:w-72 lg:w-80">
          <span className="sr-only">Search your saved items</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink"
            aria-hidden="true"
          />
          <input
            type="search"
            name="saved-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your saved items..."
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>
      </PageHeader>

      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter saved items">
        {chips.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              filter === id
                ? 'border-brand bg-brand text-white shadow-md shadow-brand/25'
                : 'border-slate-200 bg-white text-ink hover:border-brand'
            }`}
          >
            <Icon className="size-[18px]" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {visible.map((item) => (
            <SavedCard
              key={item.id}
              item={item}
              onRemove={(id) => setItems((current) => current.filter((entry) => entry.id !== id))}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
          <p className="text-base font-semibold text-ink">
            {items.length === 0 ? 'You have not saved anything yet' : 'No saved items match your search'}
          </p>
          <p className="mt-1 text-sm text-body">
            Items you save from visas and tour packages will appear here.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/visa" className={outlineButton}>
              Explore visas
            </Link>
            <Link to="/tour-packages" className={outlineButton}>
              Explore tour packages
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
