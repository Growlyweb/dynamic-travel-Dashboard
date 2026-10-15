import { Clock, FileText, Plane } from 'lucide-react'
import CountryFlag from './CountryFlag'

const ON_REQUEST = 'On request'

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 sm:px-5 sm:first:pl-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-slate-200">
      <Icon className="size-7 shrink-0 text-body" strokeWidth={1.4} />
      <div className="whitespace-nowrap leading-tight">
        <p className="text-xs text-body">{label}</p>
        <p className="mt-1 text-sm font-bold text-navy">{value}</p>
      </div>
    </div>
  )
}

export default function VisaHero({ country, content, type }) {
  const facts = type?.details?.facts
  const title = type ? `${country.name} ${type.label}` : `${country.name} Visa`
  const eyebrow = content ? `${country.name} Visa` : 'Visa Services'
  const summary =
    content?.summary ??
    `Planning to travel to ${country.name}? Our team guides you through the visa process, from documents to submission.`

  return (
    <div className="relative isolate overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
      <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5" aria-hidden="true">
        {content?.heroImage ? (
          <img
            src={content.heroImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-end bg-gradient-to-br from-primary-light via-tint to-white pr-10 md:pr-16">
            <CountryFlag
              key={country.code}
              code={country.code}
              name={country.name}
              width={160}
              className="hidden rounded-md shadow-widget md:block"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-45% to-transparent" />
      </div>

      <div className="px-6 py-8 sm:px-9 sm:py-10">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-8 rounded-full bg-accent" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-navy">{eyebrow}</span>
        </div>

        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[44px]">
          {title}
        </h2>

        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-body sm:text-base">
          {summary}
        </p>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Fact icon={Clock} label="Processing Time" value={facts?.processing ?? ON_REQUEST} />
          <Fact icon={Plane} label="Stay Duration" value={facts?.stay ?? ON_REQUEST} />
          <Fact icon={FileText} label="Entry Type" value={facts?.entry ?? ON_REQUEST} />
        </div>
      </div>
    </div>
  )
}
