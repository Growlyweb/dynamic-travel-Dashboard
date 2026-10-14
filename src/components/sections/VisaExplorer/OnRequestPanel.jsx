import { ArrowRight, Headset } from 'lucide-react'
import SectionLabel from './SectionLabel'

export default function OnRequestPanel({ subject }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
      <SectionLabel>Details on request</SectionLabel>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
            <Headset className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-navy">
              Get the latest requirements for {subject}
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-body">
              Requirements, fees and processing times change often. Our visa team will confirm the
              current documents, cost and timeline for you, then handle the application from start
              to finish.
            </p>
          </div>
        </div>

        <a
          href="#contact"
          className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-dark px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:shadow-accent/40"
        >
          Talk to our visa team
          <ArrowRight className="size-[18px]" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  )
}
