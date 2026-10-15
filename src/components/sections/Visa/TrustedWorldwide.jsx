import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Users } from 'lucide-react'

/* ─── Country data ─── */
const COUNTRIES = [
  {
    name: 'China',
    image: '/images/hero-china.webp',
    successRate: 98,
    visasIssued: 2540,
    flag: '🇨🇳',
    color: '#ef4444',        // red
    track: '#fee2e2',
  },
  {
    name: 'Thailand',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=80',
    successRate: 96,
    visasIssued: 1820,
    flag: '🇹🇭',
    color: '#14b8a6',        // teal
    track: '#ccfbf1',
  },
  {
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=700&q=80',
    successRate: 97,
    visasIssued: 1150,
    flag: '🇸🇬',
    color: '#a855f7',        // purple
    track: '#f3e8ff',
  },
  {
    name: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=700&q=80',
    successRate: 95,
    visasIssued: 1430,
    flag: '🇲🇾',
    color: '#f59e0b',        // amber
    track: '#fef3c7',
  },
  {
    name: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80',
    successRate: 94,
    visasIssued: 980,
    flag: '🇦🇪',
    color: '#06b6d4',        // cyan
    track: '#cffafe',
  },
  {
    name: 'Turkey',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=700&q=80',
    successRate: 93,
    visasIssued: 720,
    flag: '🇹🇷',
    color: '#ec4899',        // pink
    track: '#fce7f3',
  },
  {
    name: 'India',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80',
    successRate: 92,
    visasIssued: 1680,
    flag: '🇮🇳',
    color: '#f97316',        // orange
    track: '#ffedd5',
  },
  {
    name: 'Schengen',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=80',
    successRate: 91,
    visasIssued: 1120,
    flag: '🇪🇺',
    color: '#6366f1',        // indigo
    track: '#e0e7ff',
  },
]

/* ─── Circular progress ring (SVG) ─── */
function RingProgress({ percent, color, track, flag }) {
  const r = 42
  const circumference = 2 * Math.PI * r
  const dash = (percent / 100) * circumference

  return (
    <div className="relative mx-auto flex size-24 items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={track}
          strokeWidth="8"
        />
        {/* Progress */}
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center leading-none">
        <span className="text-[17px] font-black text-[#0d1f36]">{percent}%</span>
        <span className="mt-1 text-[22px] leading-none select-none" aria-label={flag}>
          {flag}
        </span>
      </div>
    </div>
  )
}

/* ─── Single country card ─── */
function CountryCard({ country }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_18px_rgba(20,30,60,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(20,30,60,0.13)]">
      {/* Photo */}
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={country.image}
          alt={country.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center px-3 pb-4 pt-3 text-center">
        <h3 className="text-[14px] font-bold text-[#0d1f36]">{country.name}</h3>

        <div className="mt-2.5">
          <RingProgress
            percent={country.successRate}
            color={country.color}
            track={country.track}
            flag={country.flag}
          />
        </div>

        {/* Visas issued */}
        <div className="mt-3 flex items-center gap-1.5">
          <Users
            className="size-3.5"
            style={{ color: country.color }}
            strokeWidth={2.2}
          />
          <span
            className="text-[15px] font-extrabold"
            style={{ color: country.color }}
          >
            {country.visasIssued.toLocaleString()}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] font-medium text-[#8b9cb0]">Visas Issued</p>
      </div>
    </article>
  )
}

/* ─── Section ─── */
const VISIBLE = 8   // show all 8 on desktop; fewer on mobile via grid

export default function TrustedWorldwide() {
  const [page, setPage] = useState(0)
  const total = COUNTRIES.length
  const pages = Math.ceil(total / VISIBLE)

  const next     = () => setPage((p) => (p + 1) % pages)
  const previous = () => setPage((p) => (p - 1 + pages) % pages)

  // on small screens we slice to show 4 at a time, desktop shows all 8
  const slicedMobile = COUNTRIES.slice(page * 4, page * 4 + 4)

  return (
    <section
      id="trusted"
      className="relative overflow-hidden bg-[#fdf8f2] py-14 sm:py-18 lg:py-20"
    >
      {/* Subtle world-map dot watermark */}
      <div
        className="pointer-events-none absolute inset-0 select-none opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, #c8841a 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* ─── Header ─── */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-[2.5px] w-7 rounded-full bg-[#c8841a]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-[#c8841a]">
                Visa Success
              </span>
            </div>

            <h2 className="mt-3 text-[30px] font-extrabold leading-tight text-[#0d1f36] sm:text-4xl lg:text-[40px]">
              Trusted by Thousands{' '}
              <span className="text-[#c8841a]">Worldwide</span>
            </h2>

            <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-[#6b7a8d]">
              Successfully helping travelers from around the world get their visas
              with a high success rate.
            </p>
          </div>

          {/* Right: CTA + tagline */}
          <div className="flex flex-col items-start gap-2 md:items-end">
            {/* Airplane icon with dashed trail */}
            <div className="mb-1 hidden items-center gap-2 md:flex" aria-hidden="true">
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
                <path
                  d="M10 20 C 35 10, 70 5, 100 8"
                  stroke="#c8841a"
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <g transform="translate(100, 8) rotate(-10)">
                  <path d="M0 0 L11 3.5 L0 7 L2.5 3.5 Z" fill="#c8841a" opacity="0.7" />
                </g>
              </svg>
            </div>

            <a
              href="#visa"
              className="group inline-flex items-center gap-2 rounded-full border border-[#d9c5a2] bg-white px-5 py-2.5 text-[13.5px] font-bold text-[#0d1f36] shadow-sm transition-all hover:border-[#c8841a] hover:shadow-md"
            >
              View All Countries
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <p className="text-[11px] italic text-[#8b9cb0]">
              Real data. Real travelers. Real success.
            </p>
          </div>
        </div>

        {/* ─── Cards grid + nav ─── */}
        <div className="relative">
          {/* Prev arrow */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous countries"
            className="absolute -left-4 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0d1f36] shadow-md transition-all hover:scale-105 hover:shadow-lg sm:-left-6 sm:size-11"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Desktop: all 8 cards */}
          <div className="hidden gap-3 lg:grid lg:grid-cols-8">
            {COUNTRIES.map((c) => (
              <CountryCard key={c.name} country={c} />
            ))}
          </div>

          {/* Mobile / tablet: 4 at a time */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
            {slicedMobile.map((c) => (
              <CountryCard key={c.name} country={c} />
            ))}
          </div>

          {/* Next arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next countries"
            className="absolute -right-4 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0d1f36] shadow-md transition-all hover:scale-105 hover:shadow-lg sm:-right-6 sm:size-11"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* ─── Dots (mobile only) ─── */}
        <div className="mt-7 flex items-center justify-center gap-2 lg:hidden">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={page === i ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 ${
                page === i
                  ? 'h-2.5 w-7 bg-[#c8841a]'
                  : 'h-2.5 w-2.5 bg-[#d6cbbe] hover:bg-[#c8841a]/50'
              }`}
            />
          ))}
        </div>

        {/* ─── Desktop dots (always visible, 5 circles) ─── */}
        <div className="mt-7 hidden items-center justify-center gap-2 lg:flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === 0
                  ? 'h-2.5 w-7 bg-[#c8841a]'
                  : 'h-2.5 w-2.5 bg-[#d6cbbe]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
