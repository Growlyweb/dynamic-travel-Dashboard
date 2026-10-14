/* Accreditations strip — partner marks rendered as tasteful wordmarks */

function ChinaMark() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-full border-[1.5px] border-current">
        <svg viewBox="0 0 20 20" className="size-3.5" fill="currentColor" aria-hidden="true">
          <path d="M10 2.5 11.6 7.2 16.6 7.2 12.6 10.1 14.1 14.8 10 12 5.9 14.8 7.4 10.1 3.4 7.2 8.4 7.2Z" />
        </svg>
      </span>
      <span className="text-sm font-bold uppercase tracking-[0.14em]">China</span>
    </span>
  )
}

function SingaporeMark() {
  return (
    <span className="rounded-md bg-current px-2.5 py-1.5 text-center leading-[1.15] text-white">
      <span className="block text-[9px] font-bold uppercase tracking-[0.18em]">
        Singapore
      </span>
      <span className="block text-[9px] font-bold uppercase tracking-[0.18em]">
        Tourism Board
      </span>
    </span>
  )
}

function VisitDubaiMark() {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="font-script text-xl leading-none">Visit</span>
      <span className="font-serif text-base font-bold tracking-wide">Dubai</span>
    </span>
  )
}

const PARTNERS = [
  { key: 'china', node: <ChinaMark /> },
  { key: 'iata', node: <span className="text-[15px] font-black tracking-[0.28em]">IATA</span> },
  { key: 'pata', node: <span className="font-serif text-lg font-bold tracking-wide">PATA</span> },
  {
    key: 'malaysia',
    node: <span className="text-sm font-semibold italic tracking-wide">Tourism Malaysia</span>,
  },
  { key: 'stb', node: <SingaporeMark /> },
  {
    key: 'bangladesh',
    node: (
      <span className="text-center leading-[1.2]">
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em]">
          Bangladesh
        </span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.14em] opacity-70">
          Tourism Board
        </span>
      </span>
    ),
  },
  { key: 'dubai', node: <VisitDubaiMark /> },
]

export default function PartnersBar() {
  return (
    <section className="bg-white pb-14 pt-32 sm:pt-36">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 sm:px-6 lg:flex-row lg:gap-10 lg:px-8">
        <div className="shrink-0 text-center lg:text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-body">
            Trusted by
          </p>
          <p className="mt-1 text-sm font-extrabold uppercase tracking-[0.08em] text-navy">
            Businesses &amp; Travelers
          </p>
        </div>
        <span className="hidden h-12 w-px bg-slate-200 lg:block" aria-hidden="true" />
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-5 text-slate-500">
          {PARTNERS.map((p) => (
            <span
              key={p.key}
              className="opacity-75 transition-all duration-300 hover:opacity-100 hover:text-primary"
            >
              {p.node}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
