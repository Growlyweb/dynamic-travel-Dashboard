import { ArrowRight, Briefcase, Plane, Route, Stamp } from 'lucide-react'
import { SERVICES } from '../data/site'

const ICONS = { Stamp, Plane, Route, Briefcase }

export default function ServicesSection() {
  return (
    <section id="services" className="bg-tint py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Our Services
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy md:text-4xl">
              More Than Just Travel
            </h2>
            <p className="mt-3 max-w-lg text-[15px] text-body">
              Everything you need for your journey — visas, tours, planning and
              corporate travel under one roof.
            </p>
          </div>
          <a
            href="#all-services"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            View All Services
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon]
            return (
              <article
                key={s.title}
                className="group cursor-pointer rounded-2xl border border-white bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
              >
                <span
                  className={`flex size-13 items-center justify-center rounded-xl ${s.tile}`}
                >
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-all group-hover:gap-3">
                  Learn More
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
