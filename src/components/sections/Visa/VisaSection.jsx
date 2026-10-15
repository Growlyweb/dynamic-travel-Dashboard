import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { VISA_POINTS } from '@/constants'

export default function VisaSection() {
  return (
    <section
      id="china-visa"
      className="relative isolate overflow-hidden py-16 md:py-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/china-visa-background.webp')",
        }}
        aria-hidden="true"
      />

      {/* Soft background overlay for readable text */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-white/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-0 lg:px-8">
        {/* Left: Text */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-8 rounded-full bg-[#ff890b]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#245078]">
              Our Speciality
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#102f50] md:text-4xl">
            China Visa
            <br />
            Made Simple
          </h2>

          <p className="mt-4 max-w-md text-[15px] font-medium leading-relaxed text-[#29445f]">
            Fast, reliable and hassle-free processing
            with expert guidance at every step.
          </p>

          <a
            href="/visa#visa/cn/tourist"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#ff890b] px-7 py-4 text-[15px] font-bold text-white shadow-lg shadow-orange-200/50 transition hover:-translate-y-0.5 hover:bg-[#f47b00] active:scale-[0.98]"
          >
            Apply for China Visa
            <ArrowRight className="size-[18px]" strokeWidth={2.5} />
          </a>
        </div>

        {/* Center: Empty space for background scenery */}
        <div
          className="hidden lg:col-span-4 lg:block"
          aria-hidden="true"
        />

        {/* Right: Wider Why Choose Us card */}
        <div className="mt-8 lg:col-span-4 lg:mt-0 lg:translate-x-8">
          <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg sm:p-7">
            <h3 className="text-base font-bold leading-snug text-[#102f50]">
              Why Choose Us for China Visa?
            </h3>

            <ul className="mt-4 space-y-3">
              {VISA_POINTS.map((point) => (
                <li
                  key={point.title}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-[#2786d8]" />

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-5 text-[#29445f]">
                      {point.title}
                    </p>

                    {point.sub && (
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {point.sub}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
