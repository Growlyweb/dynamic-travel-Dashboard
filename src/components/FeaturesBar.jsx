import {
  Briefcase,
  Globe2,
  Headset,
  Route,
  ShieldCheck,
  Stamp,
} from 'lucide-react'
import { FEATURES } from '../data/site'

const ICONS = { Stamp, ShieldCheck, Globe2, Route, Briefcase, Headset }

export default function FeaturesBar() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-slate-100">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon]
            return (
              <div
                key={f.title}
                className="group flex flex-col items-center gap-2.5 text-center lg:px-4"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[13px] font-bold leading-snug text-navy">
                    {f.title}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-body">
                    {f.sub}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
