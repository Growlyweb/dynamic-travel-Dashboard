import { useState } from 'react'
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Globe2,
  MapPin,
  Plane,
  SlidersHorizontal,
  Stamp,
  Users,
} from 'lucide-react'

function ChinaFlag() {
  return (
    <svg
      viewBox="0 0 20 14"
      className="h-3.5 w-5 shrink-0 rounded-sm"
      aria-label="China"
    >
      <rect width="20" height="14" fill="#de2910" />
      <path
        d="M5 2.2 5.92 4.75 3.11 4.75 5.38 6.29 4.51 8.84 5 8.46 5.49 8.84 4.62 6.29 6.89 4.75 4.08 4.75Z"
        fill="#ffde00"
      />
    </svg>
  )
}

const TABS = [
  { id: 'visa', label: 'Visa', icon: Stamp },
  { id: 'tours', label: 'Tour Packages', icon: Plane },
  { id: 'custom', label: 'Custom Tour', icon: SlidersHorizontal },
]

const FIELDS = {
  visa: [
    {
      label: 'I want to',
      icon: Stamp,
      options: ['Apply for Visa', 'Renew My Visa', 'Visa Consultation'],
    },
    {
      label: 'Country',
      flag: true,
      options: ['China', 'Thailand', 'Malaysia', 'Dubai (UAE)'],
    },
    {
      label: 'Travel Date',
      icon: Calendar,
      type: 'date',
    },
  ],
  tours: [
    {
      label: 'Destination',
      icon: MapPin,
      options: ['Thailand', 'Malaysia', 'Singapore', 'Dubai', 'Bali'],
    },
    {
      label: 'Travel Month',
      icon: Calendar,
      options: ['November 2026', 'December 2026', 'January 2027'],
    },
    {
      label: 'Travelers',
      icon: Users,
      options: ['1 Traveler', '2 Travelers', 'Family (4+)', 'Group (10+)'],
    },
  ],
  custom: [
    {
      label: 'Destination',
      icon: Globe2,
      options: ['China', 'Multi-country Asia', 'Middle East', 'Anywhere!'],
    },
    {
      label: 'Travel Date',
      icon: Calendar,
      type: 'date',
    },
    {
      label: 'Budget',
      icon: SlidersHorizontal,
      options: ['Standard', 'Comfort', 'Premium'],
    },
  ],
}

function Field({ field }) {
  const Icon = field.icon

  return (
    <div className="min-w-0">
      <label className="mb-2 block pl-1 text-xs font-medium text-slate-500">
        {field.label}
      </label>

      <div className="flex h-[46px] min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3.5 shadow-sm transition-colors focus-within:border-blue-400">
        {Icon && (
          <Icon className="size-[18px] shrink-0 text-[#245078]" />
        )}

        {field.flag && <ChinaFlag />}

        {field.type === 'date' ? (
          <input
            type="date"
            aria-label={field.label}
            className="min-w-0 w-full flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none"
          />
        ) : (
          <div className="relative min-w-0 flex-1">
            <select
              aria-label={field.label}
              className="w-full appearance-none truncate bg-transparent pr-6 text-sm font-semibold text-slate-700 outline-none"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchWidget() {
  const [tab, setTab] = useState('visa')

  return (
    <section className="relative z-30 -mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Curved Tabs */}
        <div className="relative z-10 ml-0 w-full sm:ml-2 sm:w-fit">
          <div className="flex w-full flex-wrap items-center gap-1.5 rounded-t-[26px] bg-white px-3 pb-0 pt-3 shadow-[0_-8px_28px_rgba(15,70,120,0.06)] sm:w-fit sm:gap-2 sm:px-5 sm:pt-3.5">
            {TABS.map((item) => {
              const Icon = item.icon
              const isActive = tab === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  aria-pressed={isActive}
                  className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl px-2 py-3 text-xs font-bold transition-colors sm:min-w-[155px] sm:flex-none sm:px-5 sm:text-sm ${
                    isActive
                      ? 'bg-[#0875d1] text-white shadow-md shadow-blue-200/60'
                      : 'bg-[#f1f5fa] text-[#173858] hover:bg-blue-50'
                  }`}
                >
                  <Icon className="size-[18px] shrink-0" />
                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Search Card */}
        <div className="relative -mt-px rounded-[26px] rounded-tl-none border border-white bg-white p-4 shadow-[0_12px_40px_rgba(30,100,160,0.13)] sm:p-5 md:p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:gap-3.5 lg:gap-4">
            {FIELDS[tab].map((field) => (
              <Field key={field.label} field={field} />
            ))}

            <button
              type="button"
              className="flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#ff890b] px-7 text-sm font-bold text-white shadow-[0_8px_22px_rgba(255,137,11,0.24)] transition-colors hover:bg-[#f47b00] active:scale-[0.98] md:min-w-[170px]"
            >
              Get Started
              <ArrowRight
                className="size-[18px]"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}