import { ArrowRight, CalendarClock, Trophy, Users } from 'lucide-react'
import { IMAGES, STATS } from '@/constants'

const ICONS = { Users, Trophy, CalendarClock }

export default function BangladeshSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-navy py-20 md:py-28"
    >
      {/* Background */}
      <img
        src={IMAGES.bgBangladesh}
        alt="Heritage architecture and river in Bangladesh at sunset"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-navy/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-10 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Discover Bangladesh
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[42px]">
            Bringing the World to Beautiful Bangladesh
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75">
            From the Sundarbans to the hills of Bandarban - we showcase the
            best of our country to travelers around the globe, and bring the
            world home to explore it.
          </p>
          <a
            href="#bangladesh"
            className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:bg-white hover:text-primary"
          >
            Explore Bangladesh
            <ArrowRight className="size-[18px]" strokeWidth={2.5} />
          </a>
        </div>

        {/* Stats card */}
        <div className="mt-14 flex md:justify-end">
          <div className="grid w-full max-w-2xl grid-cols-1 divide-y divide-slate-100 rounded-2xl bg-white p-2 shadow-widget sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {STATS.map((stat) => {
              const Icon = ICONS[stat.icon]
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 px-6 py-5"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full ${stat.tile}`}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-xl font-extrabold text-navy md:text-2xl">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-body">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
