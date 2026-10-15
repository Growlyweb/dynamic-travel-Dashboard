import {
  ArrowRight,
  BriefcaseBusiness,
  Map,
  Plane,
  Stamp,
  Star,
  Trophy,
  Users,
} from 'lucide-react'

const SERVICES_LIST = [
  {
    title: 'Visa Services',
    description:
      'Professional visa processing for China and multiple countries.',
    href: '/visa',
    Icon: Stamp,
    color: 'bg-blue-600',
  },
  {
    title: 'Tour Packages',
    description:
      'Explore curated tour packages for amazing destinations.',
    href: '/tour-packages',
    Icon: Plane,
    color: 'bg-teal-600',
  },
  {
    title: 'Custom Tour Planning',
    description:
      'Plan your perfect trip with personalized itineraries.',
    href: '/custom-tour',
    Icon: Map,
    color: 'bg-indigo-600',
  },
  {
    title: 'Corporate Travel',
    description:
      'Tailored travel solutions for businesses and groups.',
    href: '/corporate-travel',
    Icon: BriefcaseBusiness,
    color: 'bg-orange-500',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden"
    >
      {/* One Shared Background for the Entire Section */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/bangladesh-services-background.png')",
        }}
        aria-hidden="true"
      />

      {/* Soft Shared Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[#061a2b]/40"
        aria-hidden="true"
      />

      {/* Our Services */}
      <div className="relative px-4 pb-12 pt-12 sm:px-6 md:pb-16 md:pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[3px] w-8 rounded-full bg-orange-500" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                  Our Services
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102f50] md:text-4xl">
                More Than Just Travel
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-700 sm:text-base">
                Complete travel solutions for individuals,
                families and businesses.
              </p>
            </div>

            <a
              href="#all-services"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-blue-400/70 bg-white/75 px-6 py-3 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-sm transition hover:bg-blue-600 hover:text-white sm:self-auto"
            >
              View All Services
              <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Service Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES_LIST.map(
              ({ title, description, href, Icon, color }) => (
                <a
                  key={title}
                  href={href}
                  className="group flex min-h-[158px] items-start gap-4 rounded-2xl border border-white/90 bg-white/90 p-5 shadow-[0_8px_30px_rgba(31,78,121,0.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:p-6"
                >
                  <span
                    className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${color} text-white shadow-md transition duration-300 group-hover:scale-105`}
                  >
                    <Icon
                      className="size-7"
                      strokeWidth={1.9}
                    />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-6 text-[#102f50]">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-slate-600">
                      {description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition-all group-hover:gap-3">
                      Learn More
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Discover Bangladesh - Same Background */}
      <div
        id="bangladesh"
        className="relative"
      >
        <div className="mx-auto grid min-h-[420px] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:min-h-[460px] md:grid-cols-2 md:py-16 lg:px-10">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-orange-500" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[white]">
                Discover Bangladesh
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[white] sm:text-4xl md:text-5xl">
              Bringing the World to
              <br />
              Beautiful Bangladesh
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-[white] sm:text-base">
              We also specialize in helping foreigners explore
              Bangladesh with tailored tour packages and local
              experiences.
            </p>

            <a
              href="/destinations/bangladesh"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-white/95 px-6 py-3.5 text-sm font-bold text-[#102f50] shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-50"
            >
              Explore Bangladesh
              <ArrowRight className="size-5" />
            </a>
          </div>

          {/* Statistics Card */}
          <div className="flex items-end justify-center md:justify-end">
            <div className="grid w-full max-w-[590px] grid-cols-3 divide-x divide-slate-200/80 rounded-3xl border border-white/90 bg-white/90 px-3 py-6 shadow-2xl backdrop-blur-md sm:px-5 sm:py-7">
              <div className="flex flex-col items-center px-1 text-center">
                <Users className="size-7 text-amber-500 sm:size-8" />

                <p className="mt-3 text-xl font-extrabold text-[#102f50] sm:text-2xl">
                  10,000+
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:text-sm">
                  Happy Travelers
                </p>
              </div>

              <div className="flex flex-col items-center px-1 text-center">
                <Star className="size-7 fill-amber-400 text-amber-500 sm:size-8" />

                <p className="mt-3 text-xl font-extrabold text-[#102f50] sm:text-2xl">
                  98%
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:text-sm">
                  Success Rate
                </p>
              </div>

              <div className="flex flex-col items-center px-1 text-center">
                <Trophy className="size-7 text-amber-500 sm:size-8" />

                <p className="mt-3 text-xl font-extrabold text-[#102f50] sm:text-2xl">
                  5+ Years
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:text-sm">
                  Industry Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
