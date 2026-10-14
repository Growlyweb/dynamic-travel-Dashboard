/* Accreditations strip matching sample reference design */

function ChinaMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-9 items-center justify-center rounded-full border-[1.5px] border-slate-700 p-1">
        <svg viewBox="0 0 24 24" className="size-5 text-slate-800" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 4 L13.5 8.5 L18 8.5 L14.5 11 L16 15.5 L12 13 L8 15.5 L9.5 11 L6 8.5 L10.5 8.5 Z" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="block text-sm font-extrabold tracking-[0.18em] text-slate-800">
          CHINA
        </span>
        <span className="block text-[9px] font-medium tracking-[0.12em] text-slate-500">
          华夏旅游
        </span>
      </div>
    </div>
  )
}

function IataMark() {
  return (
    <div className="flex items-center gap-1.5">
      <svg viewBox="0 0 32 24" className="h-6 w-8 text-slate-800" fill="currentColor">
        <ellipse cx="16" cy="12" rx="7" ry="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="9" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 6 C14 8, 14 16, 12 18 M20 6 C18 8, 18 16, 20 18" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M2 10 L8 12 L2 14 Z M30 10 L24 12 L30 14 Z" />
      </svg>
      <span className="text-[15px] font-black tracking-[0.25em] text-slate-800">
        IATA
      </span>
    </div>
  )
}

function PataMark() {
  return (
    <div className="text-center leading-none">
      <span className="block font-serif text-[19px] font-black tracking-[0.06em] text-slate-800">
        PATA
      </span>
      <span className="block text-[7.5px] font-semibold uppercase tracking-[0.12em] text-slate-500">
        Pacific Asia Travel Association
      </span>
    </div>
  )
}

function TourismMalaysiaMark() {
  return (
    <div className="flex items-center gap-1 leading-tight text-slate-800">
      <span className="text-xs font-semibold italic text-slate-600">TOURISM</span>
      <span className="font-serif text-base font-bold italic tracking-wide text-slate-900">
        MALAYSIA.
      </span>
    </div>
  )
}

function SingaporeMark() {
  return (
    <div className="rounded-md bg-slate-800 px-2.5 py-1.5 text-center leading-[1.1] text-white">
      <span className="block text-[8.5px] font-bold uppercase tracking-[0.16em]">
        Singapore
      </span>
      <span className="block text-[7.5px] font-semibold uppercase tracking-[0.14em] text-slate-200">
        Tourism Board
      </span>
    </div>
  )
}

function BangladeshTourismMark() {
  return (
    <div className="text-center leading-[1.15]">
      <span className="block font-serif text-[13px] font-bold text-slate-800 tracking-wide">
        Bangladesh
      </span>
      <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Tourism Board
      </span>
    </div>
  )
}

function VisitDubaiMark() {
  return (
    <div className="flex items-baseline gap-1">
      <span className="font-script text-xl leading-none text-slate-700">Visit</span>
      <span className="font-serif text-[17px] font-bold tracking-tight text-slate-900">Dubai</span>
    </div>
  )
}

const PARTNERS = [
  { key: 'china', node: <ChinaMark /> },
  { key: 'iata', node: <IataMark /> },
  { key: 'pata', node: <PataMark /> },
  { key: 'malaysia', node: <TourismMalaysiaMark /> },
  { key: 'stb', node: <SingaporeMark /> },
  { key: 'bangladesh', node: <BangladeshTourismMark /> },
  { key: 'dubai', node: <VisitDubaiMark /> },
]

export default function PartnersBar() {
  return (
    <section className="border-b border-slate-100 bg-white py-9">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        <div className="shrink-0 text-center lg:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#637286]">
            Trusted by
          </p>
          <p className="mt-0.5 text-xs font-extrabold uppercase tracking-[0.1em] text-[#14263f]">
            Businesses &amp; Travelers
          </p>
        </div>

        <span className="hidden h-9 w-px bg-slate-200 lg:block" aria-hidden="true" />

        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-between">
          {PARTNERS.map((p) => (
            <div
              key={p.key}
              className="opacity-80 transition-all duration-200 hover:opacity-100"
            >
              {p.node}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
