import SectionLabel from './SectionLabel'

export default function ProcessingDetails({ facts }) {
  const rows = [
    ['Processing Time', facts.processing],
    ['Stay Duration', facts.stay],
    ['Entry Type', facts.entry],
    ['Validity', facts.validity],
  ]

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <SectionLabel>Processing Details</SectionLabel>

      <dl className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 px-4 py-3">
            <dt className="text-body">{label}</dt>
            <dd className="text-right font-bold text-navy">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
