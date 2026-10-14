import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { VISA_POINTS } from '../data/site'
import PagodaIllustration from './PagodaIllustration'

export default function VisaSection() {
  return (
    <section
      id="visa"
      className="relative overflow-hidden bg-gradient-to-b from-[#eaf2fc] via-[#f2f7fd] to-white py-16 md:py-24"
    >
      {/* soft decorative circles */}
      <div className="pointer-events-none absolute -left-24 top-16 size-64 rounded-full bg-white/60" />
      <div className="pointer-events-none absolute -right-16 bottom-10 size-40 rounded-full bg-primary-light/70" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-10 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Our Speciality
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-navy md:text-4xl">
            China Visa <span className="text-primary">Made Simple</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-body">
            As China visa specialists, we handle the paperwork so you can focus
            on the journey. Our team prepares, reviews and submits your
            application — with a process refined over thousands of successful
            visas.
          </p>
          <a
            href="#visa-form"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-dark px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-px hover:shadow-xl hover:shadow-orange-300/50 active:scale-[0.98]"
          >
            Apply for China Visa
            <ArrowRight className="size-[18px]" strokeWidth={2.5} />
          </a>
        </div>

        {/* Center: illustration */}
        <div className="lg:col-span-4">
          <PagodaIllustration />
        </div>

        {/* Right: why choose us card */}
        <div className="lg:col-span-4">
          <div className="relative overflow-hidden rounded-2xl border border-white bg-white p-7 shadow-card">
            <h3 className="text-lg font-bold text-navy">
              Why Choose Us for China Visa?
            </h3>
            <ul className="mt-5 space-y-4">
              {VISA_POINTS.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {point.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-body">
                      {point.sub}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {/* watermark */}
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute -bottom-7 -right-7 size-36 text-primary/[0.05]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="5.5" />
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
