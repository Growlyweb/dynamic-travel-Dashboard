import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const HERO_SLIDES = [
  {
    label: 'China Visa',
    image: '/images/hero-china.webp',
    eyebrow: 'Discover',
    title: 'China & Beyond',
    description:
      'Your trusted travel partner for China visa processing, international tours and unforgettable travel experiences.',
    href: '/visa/china',
  },
  {
    label: 'Tour Packages',
    image: '/images/hero-beach.webp',
    eyebrow: 'Explore',
    title: 'Journeys That Inspire',
    description:
      'Discover beautiful destinations, thoughtfully planned tours and memorable experiences for every kind of traveller.',
    href: '/tour-packages',
  },
  {
    label: 'Explore Bangladesh',
    image: '/images/hero-lake.webp',
    eyebrow: 'Experience',
    title: 'Find Your Somewhere',
    description:
      'From peaceful landscapes to vibrant cultures, let us help you plan your next unforgettable escape.',
    href: '/destinations/bangladesh',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  const slide = HERO_SLIDES[active]

  const previous = () => {
    setActive((current) =>
      current === 0 ? HERO_SLIDES.length - 1 : current - 1
    )
  }

  const next = () => {
    setActive((current) =>
      current === HERO_SLIDES.length - 1 ? 0 : current + 1
    )
  }

  return (
    <section
      id="home"
      className="relative isolate min-h-[590px] overflow-hidden bg-slate-950 md:min-h-[650px]"
    >
      {/* Background Slides */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {HERO_SLIDES.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${index === active ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </div>

      {/* Dark Overlays */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/35 via-slate-950/30 to-slate-950/20"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[590px] w-full max-w-7xl items-center justify-between gap-8 px-5 py-20 sm:px-8 md:min-h-[650px] lg:px-10">
        <div className="max-w-2xl text-white">
          <p className="font-script text-4xl text-white/90 sm:text-5xl">
            {slide.eyebrow}
          </p>

          <h1 className="mt-2 max-w-2xl text-4xl font-extrabold uppercase leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/90 sm:text-base">
            {slide.description}
          </p>

          <a
            href={slide.href}
            className="mt-7 inline-flex items-center gap-3 font-semibold text-white transition hover:text-sky-200"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-white/80 bg-sky-700/80 shadow-lg transition hover:scale-105">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>

            <span>Explore {slide.label}</span>
          </a>

          {/* Slide Indicators */}
          <div
            className="mt-9 flex items-center gap-2"
            aria-label="Choose hero slide"
          >
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${item.label}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={`relative z-20 h-2 rounded-full transition-all ${index === active
                    ? 'w-7 bg-white'
                    : 'w-2 bg-white/55 hover:bg-white/90'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Destination Cards */}
        <div className="hidden w-52 shrink-0 flex-col gap-3 lg:flex xl:w-56">
          {HERO_SLIDES.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${item.label} slide`}
              aria-pressed={index === active}
              className={`group relative h-28 overflow-hidden rounded-2xl border-2 shadow-xl transition ${index === active
                  ? 'border-white'
                  : 'border-white/50 hover:border-white'
                }`}
            >
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                aria-hidden="true"
              />

              <span className="pointer-events-none absolute bottom-3 left-3 right-2 text-left text-sm font-semibold text-white">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Slider Controls */}
      <div className="absolute bottom-6 right-6 z-30 flex gap-3 sm:bottom-8 sm:right-10">
        <button
          type="button"
          aria-label="Previous hero slide"
          onClick={previous}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-slate-950/30 text-white shadow-lg backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Next hero slide"
          onClick={next}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-slate-950/30 text-white shadow-lg backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  )
}