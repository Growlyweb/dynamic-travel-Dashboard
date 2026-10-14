import { useState } from 'react'
import { flagImage } from '@/services/countries'

export default function CountryFlag({ code, name, width = 28, className = '' }) {
  const [failed, setFailed] = useState(false)
  const height = Math.round(width * 0.72)
  const sizeStyle = { width, height }

  if (failed) {
    return (
      <span
        role="img"
        aria-label={name}
        style={sizeStyle}
        className={`flex shrink-0 items-center justify-center rounded-[3px] bg-slate-200 text-[9px] font-bold uppercase text-body ${className}`}
      >
        {code}
      </span>
    )
  }

  const { src, srcSet } = flagImage(code, width)

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      onError={() => setFailed(true)}
      style={sizeStyle}
      className={`shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgb(15_23_42/0.08)] ${className}`}
    />
  )
}
