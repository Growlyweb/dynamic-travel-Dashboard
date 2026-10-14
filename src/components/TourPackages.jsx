import { ArrowRight, Users } from 'lucide-react'
import { DESTINATIONS } from '../data/site'

export default function TourPackages() {
  return (
    <section id="packages" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Popular Destinations
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy md:text-4xl">
              Explore Our Top Tour Packages
            </h2>
            <p className="mt-3 max-w-lg text-[15px] text-body">
              Handpicked itineraries with flights, hotels and guided
              experiences — just pack your bags and go.
            </p>
          </div>
          <a
            href="#all-packages"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-bold text-primary transition-all hover:gap-3"
          >
            View All Packages
            <ArrowRight className="size-4.5" strokeWidth={2.5} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {DESTINATIONS.map((d) => (
            <article
              key={d.name}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="relative h-36 overflow-hidden sm:h-40 md:h-44">
                <img
                  src={d.image}
                  alt={`${d.name} tour package`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="flex items-center justify-between gap-2 p-3.5 sm:p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-bold text-navy">
                    {d.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-body">
                    <Users className="size-3.5 text-primary" />
                    {d.packages} Packages
                  </p>
                </div>
                <span
                  role="button"
                  aria-label={`View ${d.name} packages`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                >
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
