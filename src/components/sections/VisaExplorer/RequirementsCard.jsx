import SectionLabel from './SectionLabel'

export default function RequirementsCard({ countryName, type }) {
  const { requirements, terms } = type.details

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
      <SectionLabel>{type.label}</SectionLabel>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-[28px]">
        Visa Requirements
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-body">
        Please prepare the following documents for {countryName} {type.label} application.
      </p>

      <ol className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
        {requirements.map((requirement, index) => (
          <li key={requirement} className="flex items-stretch text-sm">
            <span className="flex w-12 shrink-0 items-center justify-center bg-tint text-xs font-bold text-navy">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="px-4 py-3 leading-snug text-navy/85">{requirement}</span>
          </li>
        ))}
      </ol>

      <div className="mt-9">
        <SectionLabel>Terms &amp; Conditions</SectionLabel>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-[28px]">
          Important Information
        </h3>
        <ul className="mt-4 list-disc space-y-1.5 rounded-xl bg-tint py-4 pl-9 pr-5 text-sm leading-relaxed text-navy/85 marker:text-navy">
          {terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
