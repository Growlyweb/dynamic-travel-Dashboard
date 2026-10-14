
import { useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mountain,
  Building2,
  Leaf,
  Plane,
} from 'lucide-react'
import { DESTINATIONS } from '../data/site'

const CATEGORY_STYLES = [
  { label: 'Beach & Islands', icon: Mountain },
  { label: 'City & Culture', icon: Building2 },
  { label: 'Modern & Nature', icon: Leaf },
  { label: 'Luxury & City', icon: Building2 },
  { label: 'Nature & Relaxation', icon: Leaf },
]

export default function TourPackages() {
  const [activePage, setActivePage] = useState(0)

  const destinations = DESTINATIONS
  const total = destinations.length

  const next = () => {
    setActivePage((page) => (page + 1) % Math.max(total, 1))
  }

  const previous = () => {
    setActivePage((page) => (page - 1 + Math.max(total, 1)) % Math.max(total, 1))
  }

  // Rotate the cards when the carousel arrows are clicked.
  const visibleDestinations =
    total > 0
      ? destinations.map((_, index) => destinations[(index + activePage) % total])
      : []

  return (
    <section
      id="packages"
      className="relative isolate overflow-hidden bg-[#fbf8f4] py-16 sm:py-20 lg:py-24"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/tour-packages-background.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />

        {/* Soft overlay keeps text readable */}
        <div className="absolute inset-0 bg-white/35" />

        {/* Extra subtle fade behind the content */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/10 to-[#fffaf4]/35" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <div className="mb-9 flex flex-col gap-6 sm:mb-11 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 rounded-full bg-[#e99a24]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#273750]">
                Popular Destinations
              </span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-[#101d3b] sm:text-4xl lg:text-5xl">
              Explore Our Top{' '}
              <span className="text-[#b77b2d]">Tour Packages</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#647184] sm:text-base">
              Handpicked itineraries with flights, hotels and guided
              experiences — just pack your bags and go.
            </p>
          </div>

          <a
            href="#all-packages"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-[#ead8c2] bg-white/70 px-6 py-3.5 font-serif text-sm font-bold text-[#17223d] shadow-sm transition-all duration-300 hover:border-[#d9a45e] hover:bg-white hover:shadow-md"
          >
            View All Packages
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Destination cards and carousel arrows */}
        <div className="relative">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous destinations"
            className="absolute -left-3 top-[35%] z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-[#14213d] shadow-lg transition hover:scale-105 hover:bg-[#fff8ed] sm:-left-5 sm:size-14 lg:-left-7"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {visibleDestinations.map((destination, index) => {
              const category = CATEGORY_STYLES[
                (index + activePage) % CATEGORY_STYLES.length
              ]
              const CategoryIcon = category.icon

              return (
                <article
                  key={`${destination.name}-${index}`}
                  className="group min-w-0 overflow-hidden rounded-[22px] border border-white/90 bg-white shadow-[0_8px_24px_rgba(35,44,60,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(35,44,60,0.14)]"
                >
                  {/* Destination image */}
                  <a
                    href={`/tour-packages/${destination.name
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                    className="relative block h-56 overflow-hidden sm:h-52 lg:h-60"
                    aria-label={`Explore ${destination.name} tour packages`}
                  >
                    <img
                      src={destination.image}
                      alt={`${destination.name} travel destination`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b31]/35 via-transparent to-[#101b31]/5" />

                    <span className="absolute left-3 top-4 inline-flex max-w-[calc(100%-24px)] items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-[10px] font-bold text-[#17223d] shadow-sm backdrop-blur-md sm:text-[11px]">
                      <CategoryIcon className="size-3.5 shrink-0" />
                      <span className="truncate">{category.label}</span>
                    </span>
                  </a>

                  {/* White information panel */}
                  <div className="flex min-h-[84px] items-center justify-between gap-2 px-4 py-3.5 sm:px-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-serif text-xl font-bold text-[#111d39]">
                        {destination.name}
                      </h3>

                      <p className="mt-1.5 flex items-center gap-2 text-xs font-medium text-[#657184]">
                        <MapPin className="size-4 shrink-0 fill-[#e9a044] text-[#a66e27]" />
                        {destination.packages}{' '}
                        {destination.packages === 1 ? 'Package' : 'Packages'}
                      </p>
                    </div>

                    <a
                      href={`/tour-packages/${destination.name
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                      aria-label={`View ${destination.name} packages`}
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#f0dfca] bg-[#fff8ef] text-[#15213a] shadow-sm transition-all duration-300 hover:border-[#e7a54e] hover:bg-[#f5a33b] hover:text-white"
                    >
                      <ArrowRight className="size-5" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next destinations"
            className="absolute -right-3 top-[35%] z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-[#14213d] shadow-lg transition hover:scale-105 hover:bg-[#fff8ed] sm:-right-5 sm:size-14 lg:-right-7"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Carousel pagination */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {destinations.map((destination, index) => (
            <button
              key={destination.name}
              type="button"
              onClick={() => setActivePage(index)}
              aria-label={`Show destinations starting at ${destination.name}`}
              aria-current={activePage === index ? 'true' : undefined}
              className={`h-3 rounded-full transition-all duration-300 ${activePage === index
                ? 'w-7 bg-[#e99a24]'
                : 'w-3 bg-[#dce0e4] hover:bg-[#c3cbd4]'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
