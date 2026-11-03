export default function TourCell({ image, name, caption, thumbClass = 'h-16 w-24' }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt=""
        loading="lazy"
        className={`${thumbClass} shrink-0 rounded-xl bg-slate-100 object-cover`}
      />
      <div className="min-w-0">
        <p className="font-bold leading-snug text-ink">{name}</p>
        {caption && <p className="mt-0.5 text-[13px] text-body">{caption}</p>}
      </div>
    </div>
  )
}

export function DateRange({ start, end, format }) {
  return (
    <span className="block leading-snug">
      {format(start)}
      <span className="block">{`- ${format(end)}`}</span>
    </span>
  )
}
