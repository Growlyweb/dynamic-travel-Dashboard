const SIZES = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-16 text-xl',
  xl: 'size-28 text-3xl sm:size-32',
}

function getInitials(name = '') {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U'
  )
}

export default function Avatar({ name, src, size = 'md', className = '' }) {
  const sizeClass = SIZES[size] ?? SIZES.md

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClass} shrink-0 rounded-full object-cover ring-2 ring-white ${className}`}
      />
    )
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={`${sizeClass} flex shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark font-bold text-white ring-2 ring-white ${className}`}
    >
      {getInitials(name)}
    </span>
  )
}
