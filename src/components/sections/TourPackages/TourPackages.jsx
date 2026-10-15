import { useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mountain,
  Building2,
  Leaf,
  Umbrella,
} from 'lucide-react'
import { DESTINATIONS } from '@/constants'

const CATEGORY_STYLES = [
  { label: 'Beach & Islands',     icon: Umbrella },
  { label: 'City & Culture',      icon: Building2 },
  { label: 'Modern & Nature',     icon: Leaf },
  { label: 'Luxury & City',       icon: Building2 },
  { label: 'Nature & Relaxation', icon: Mountain },
]

export default function TourPackages() {
  const [activePage, setActivePage] = useState(0)

  const destinations = DESTINATIONS
  const total = destinations.length

  const next = () =>
    setActivePage((p) => (p + 1) % Math.max(total, 1))

  const previous = () =>
    setActivePage((p) => (p - 1 + Math.max(total, 1)) % Math.max(total, 1))

  const visibleDestinations =
    total > 0
      ? destinations.map((_, i) => destinations[(i + activePage) % total])
      : []

  return (
    <section
      id="packages"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: '#fdf7ef' }}
    >
      {/* ─── Background image (tour-packages-background1.png) ─── */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none">
        <img
          src="/images/tour-packages-background1.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
        />
        {/* very light cream veil so text always pops */}
        <div className="absolute inset-0 bg-[#fdf7ef]/40" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">

        {/* Section heading row */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-center md:justify-between">
          {/* Left: label + h2 + sub */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-[3px] w-8 rounded-full bg-[#c8841a]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#8b6f3a]">
                Popular Destinations
              </span>
            </div>

            <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[#0d1f36] sm:text-4xl lg:text-[42px]">
              Explore Our Top{' '}
              <span className="text-[#c8841a]">Tour Packages</span>
            </h2>

            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#6b7a8d] sm:text-[15px]">
              Handpicked itineraries with flights, hotels and guided
              experiences - just pack your bags and go.
            </p>
          </div>

          {/* Right: View All Packages button */}
          <a
            href="#all-packages"
            className="group inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-[#d9c5a2] bg-white px-6 py-3 text-[14px] font-bold text-[#1a2639] shadow-sm transition-all duration-300 hover:border-[#c8841a] hover:bg-[#fffbf5] hover:shadow-md"
          >
            View All Packages
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* ─── Cards + Carousel controls ─── */}
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous destinations"
            className="absolute -left-4 top-[38%] z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1a2639] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl sm:-left-6 sm:size-12 lg:-left-8"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* 5-card grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {visibleDestinations.map((destination, index) => {
              const cat = CATEGORY_STYLES[(index + activePage) % CATEGORY_STYLES.length]
              const CatIcon = cat.icon

              return (
                <article
                  key={`${destination.name}-${index}`}
                  className="group overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_6px_22px_rgba(30,40,65,0.09)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(30,40,65,0.16)]"
                >
                  {/* Photo */}
                  <a
                    href={`/tour-packages/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="relative block h-56 overflow-hidden sm:h-52 lg:h-[230px]"
                    aria-label={`Explore ${destination.name} tour packages`}
                  >
                    <img
                      src={destination.image}
                      alt={`${destination.name} travel destination`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* subtle dark vignette at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* Category badge - glass pill at top-left */}
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/75 px-2.5 py-1.5 text-[11px] font-semibold text-[#1a2639] shadow-sm backdrop-blur-md">
                      <CatIcon className="size-3 shrink-0 text-[#5d7a9e]" strokeWidth={2.2} />
                      <span className="truncate">{cat.label}</span>
                    </span>
                  </a>

                  {/* Info row */}
                  <div className="flex items-center justify-between gap-2 px-4 py-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-[17px] font-bold text-[#0d1f36]">
                        {destination.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-[#7a8a9a]">
                        <MapPin className="size-3.5 shrink-0 fill-[#e9a044] text-[#c07830]" strokeWidth={1.5} />
                        {destination.packages}{' '}
                        {destination.packages === 1 ? 'Package' : 'Packages'}
                      </p>
                    </div>

                    {/* Arrow button */}
                    <a
                      href={`/tour-packages/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                      aria-label={`View ${destination.name} packages`}
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#edd9b8] bg-[#fdf3e6] text-[#1a2639] shadow-sm transition-all duration-300 hover:border-[#c8841a] hover:bg-[#c8841a] hover:text-white"
                    >
                      <ArrowRight className="size-4.5" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next destinations"
            className="absolute -right-4 top-[38%] z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1a2639] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl sm:-right-6 sm:size-12 lg:-right-8"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Dot pagination */}
        <div className="mt-9 flex items-center justify-center gap-2.5">
          {destinations.map((dest, index) => (
            <button
              key={dest.name}
              type="button"
              onClick={() => setActivePage(index)}
              aria-label={`Go to page ${index + 1}`}
              aria-current={activePage === index ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 ${
                activePage === index
                  ? 'h-3 w-8 bg-[#c8841a]'
                  : 'h-3 w-3 bg-[#d6cbbe] hover:bg-[#c8841a]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
