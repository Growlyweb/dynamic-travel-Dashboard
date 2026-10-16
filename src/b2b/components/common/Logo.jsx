export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none shrink-0 whitespace-nowrap ${className}`}>
      <img
        src="/company_logo.png"
        alt="ABL Travels Logo"
        className="size-8 rounded-lg object-contain ring-1 ring-slate-100 shadow-2xs shrink-0"
      />

      {/* Brand Wordmark */}
      <div className="flex items-center shrink-0 whitespace-nowrap">
        <span className="text-xl font-bold italic tracking-tight text-[#0066cc] whitespace-nowrap">
          ABL <span className="font-extrabold text-[#004f9e] not-italic">Travels</span>
        </span>
      </div>
    </div>
  )
}

