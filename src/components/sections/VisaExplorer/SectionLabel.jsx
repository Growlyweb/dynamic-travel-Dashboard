export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[3px] w-8 rounded-full bg-accent" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy">{children}</span>
    </div>
  )
}
