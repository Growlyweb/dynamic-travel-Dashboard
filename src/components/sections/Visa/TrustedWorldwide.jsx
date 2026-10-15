import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { goToVisa } from '@/hooks'

// Ultra-crisp Circular Vector Flags
function CircularFlag({ code, className = 'size-6' }) {
  switch (code) {
    case 'CN': // China
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white select-none`}>
          <circle cx="50" cy="50" r="50" fill="#de2910" />
          <polygon
            points="28,16 31,26 41,26 33,32 36,42 28,36 20,42 23,32 15,26 25,26"
            fill="#ffde00"
          />
          <circle cx="48" cy="18" r="3.2" fill="#ffde00" />
          <circle cx="54" cy="28" r="3.2" fill="#ffde00" />
          <circle cx="52" cy="40" r="3.2" fill="#ffde00" />
          <circle cx="44" cy="48" r="3.2" fill="#ffde00" />
        </svg>
      )
    case 'TH': // Thailand
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#ed1c24" />
          <rect y="16.6" width="100" height="66.8" fill="#ffffff" />
          <rect y="33.3" width="100" height="33.4" fill="#241d4f" />
        </svg>
      )
    case 'SG': // Singapore
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#ffffff" />
          <path d="M 0,0 L 100,0 L 100,50 L 0,50 Z" fill="#ed2939" />
          <path d="M 32,18 A 14,14 0 1 0 32,42 A 11,11 0 1 1 32,18 Z" fill="#ffffff" />
          <circle cx="39" cy="24" r="2.2" fill="#ffffff" />
          <circle cx="44" cy="27" r="2.2" fill="#ffffff" />
          <circle cx="43" cy="33" r="2.2" fill="#ffffff" />
          <circle cx="37" cy="35" r="2.2" fill="#ffffff" />
          <circle cx="34" cy="29" r="2.2" fill="#ffffff" />
        </svg>
      )
    case 'MY': // Malaysia
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect width="100" height="100" fill="#ffffff" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={i * 7.14} width="100" height="7.14" fill="#cc0000" />
          ))}
          <rect width="50" height="50" fill="#000066" />
          <path d="M 28,12 A 14,14 0 1 0 28,38 A 11,11 0 1 1 28,12 Z" fill="#ffcc00" />
          <polygon points="34,22 36,25 39,24 37,27 40,29 36,30 36,33 34,31 32,33 32,30 28,29 31,27 29,24 32,25" fill="#ffcc00" />
        </svg>
      )
    case 'AE': // UAE
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect y="0" width="100" height="33.3" fill="#00732f" />
          <rect y="33.3" width="100" height="33.4" fill="#ffffff" />
          <rect y="66.7" width="100" height="33.3" fill="#000000" />
          <rect x="0" y="0" width="30" height="100" fill="#ff0000" />
        </svg>
      )
    case 'TR': // Turkey
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#e30a17" />
          <path d="M 48,24 A 26,26 0 1 0 48,76 A 21,21 0 1 1 48,24 Z" fill="#ffffff" />
          <polygon
            points="60,40 63,47 70,47 65,52 67,59 60,55 53,59 55,52 50,47 57,47"
            fill="#ffffff"
          />
        </svg>
      )
    case 'IN': // India
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect y="0" width="100" height="33.3" fill="#ff9933" />
          <rect y="33.3" width="100" height="33.4" fill="#ffffff" />
          <rect y="66.7" width="100" height="33.3" fill="#128807" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="#000080" strokeWidth="2" />
          <circle cx="50" cy="50" r="3" fill="#000080" />
        </svg>
      )
    case 'GB': // United Kingdom
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#012169" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="#ffffff" strokeWidth="15" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#ffffff" strokeWidth="15" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="#c8102e" strokeWidth="7" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#c8102e" strokeWidth="7" />
          <rect x="38" y="0" width="24" height="100" fill="#ffffff" />
          <rect x="0" y="38" width="100" height="24" fill="#ffffff" />
          <rect x="43" y="0" width="14" height="100" fill="#c8102e" />
          <rect x="0" y="43" width="100" height="14" fill="#c8102e" />
        </svg>
      )
    case 'US': // United States
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect width="100" height="100" fill="#b22234" />
          {[1, 3, 5, 7, 9, 11].map((i) => (
            <rect key={i} y={i * 7.7} width="100" height="7.7" fill="#ffffff" />
          ))}
          <rect width="45" height="52" fill="#3c3b6e" />
          <circle cx="15" cy="14" r="2.5" fill="#ffffff" />
          <circle cx="30" cy="14" r="2.5" fill="#ffffff" />
          <circle cx="22" cy="26" r="2.5" fill="#ffffff" />
          <circle cx="15" cy="38" r="2.5" fill="#ffffff" />
          <circle cx="30" cy="38" r="2.5" fill="#ffffff" />
        </svg>
      )
    case 'JP': // Japan
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#ffffff" />
          <circle cx="50" cy="50" r="26" fill="#bc002d" />
        </svg>
      )
    case 'SA': // Saudi Arabia
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#006c35" />
          <path d="M 28,45 L 72,45 L 68,49 L 28,49 Z" fill="#ffffff" />
          <circle cx="50" cy="34" r="4.5" fill="#ffffff" />
          <path d="M 38,39 Q 50,43 62,39" stroke="#ffffff" strokeWidth="2.5" fill="none" />
        </svg>
      )
    case 'EU': // Schengen
    default:
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#003399" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x = 50 + 30 * Math.cos(angle)
            const y = 50 + 30 * Math.sin(angle)
            return <circle key={i} cx={x} cy={y} r="3" fill="#ffcc00" />
          })}
        </svg>
      )
  }
}

// Country Card Data matching reference image + expanded destinations
const COUNTRIES = [
  {
    name: 'China',
    flagCode: 'CN',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80',
    successRate: 98,
    visasIssued: '2,540',
    color: '#ef4444', // Red
    trackColor: '#fee2e2',
  },
  {
    name: 'Thailand',
    flagCode: 'TH',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80',
    successRate: 96,
    visasIssued: '1,820',
    color: '#0284c7', // Sky blue / cyan
    trackColor: '#e0f2fe',
  },
  {
    name: 'Singapore',
    flagCode: 'SG',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    successRate: 97,
    visasIssued: '1,150',
    color: '#a855f7', // Purple
    trackColor: '#f3e8ff',
  },
  {
    name: 'Malaysia',
    flagCode: 'MY',
    image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=600&q=80',
    successRate: 95,
    visasIssued: '1,430',
    color: '#f59e0b', // Amber / Gold
    trackColor: '#fef3c7',
  },
  {
    name: 'UAE',
    flagCode: 'AE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    successRate: 94,
    visasIssued: '980',
    color: '#10b981', // Emerald / Green
    trackColor: '#d1fae5',
  },
  {
    name: 'Turkey',
    flagCode: 'TR',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80',
    successRate: 93,
    visasIssued: '720',
    color: '#ec4899', // Pink / Magenta
    trackColor: '#fce7f3',
  },
  {
    name: 'India',
    flagCode: 'IN',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    successRate: 92,
    visasIssued: '1,680',
    color: '#0284c7', // Bright Blue
    trackColor: '#e0f2fe',
  },
  {
    name: 'Schengen',
    flagCode: 'EU',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80',
    successRate: 91,
    visasIssued: '1,120',
    color: '#7c3aed', // Violet / Purple
    trackColor: '#ede9fe',
  },
  {
    name: 'United Kingdom',
    flagCode: 'GB',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    successRate: 94,
    visasIssued: '890',
    color: '#1d4ed8', // Royal Blue
    trackColor: '#dbeafe',
  },
  {
    name: 'United States',
    flagCode: 'US',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80',
    successRate: 90,
    visasIssued: '650',
    color: '#b91c1c', // Crimson
    trackColor: '#fee2e2',
  },
  {
    name: 'Japan',
    flagCode: 'JP',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    successRate: 97,
    visasIssued: '1,240',
    color: '#e11d48', // Rose Red
    trackColor: '#ffe4e6',
  },
  {
    name: 'Saudi Arabia',
    flagCode: 'SA',
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=600&q=80',
    successRate: 99,
    visasIssued: '3,100',
    color: '#059669', // Emerald
    trackColor: '#d1fae5',
  },
]

// Open-Arc Gauge with Percentage EXACTLY in the Center of Circle
function ArcGauge({ percent, color, trackColor, flagCode }) {
  // Center is mathematically at (50, 48) with radius 35
  const cx = 50
  const cy = 48
  const radius = 35
  const circumference = 2 * Math.PI * radius
  // 260-degree arc opening downwards for the flag anchor
  const arcLength = circumference * (260 / 360)
  const progressLength = (percent / 100) * arcLength

  return (
    <div className="relative w-22 h-21 mx-auto flex items-center justify-center select-none">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Soft Background Track Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(140 ${cx} ${cy})`}
        />

        {/* Foreground Progress Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${progressLength} ${circumference}`}
          transform={`rotate(140 ${cx} ${cy})`}
          className="transition-all duration-700 ease-out"
        />

        {/* Centered Percentage — Mathematically & visually centered in the middle of the circle */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-black text-[18px] fill-[#0a192f] select-none tracking-tight drop-shadow-2xs"
        >
          {percent}%
        </text>
      </svg>

      {/* National Circular Flag Badge positioned right in the bottom arc gap */}
      <div className="absolute -bottom-1 inset-x-0 flex justify-center z-10 pointer-events-none">
        <CircularFlag code={flagCode} className="size-6 drop-shadow-sm ring-2 ring-white" />
      </div>
    </div>
  )
}

// Single Country Card with Premium Glass & Micro-elevation
function CountryCard({ country, onSelect }) {
  return (
    <div
      data-country-card
      onClick={() => onSelect?.(country.flagCode)}
      className="snap-start shrink-0 w-[175px] sm:w-[190px] md:w-[205px] lg:w-[215px] xl:w-[220px] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_18px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col group select-none cursor-pointer"
    >
      {/* Top Accent Gradient Color Stripe */}
      <div
        className="h-1 w-full shrink-0"
        style={{
          background: `linear-gradient(90deg, ${country.color}, ${country.trackColor} 120%)`,
        }}
      />

      {/* Top Landmark Photo with subtle zoom on hover */}
      <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-100">
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Card Body with Elegant Arch Overlap */}
      <div className="relative -mt-4 bg-white rounded-t-[22px] px-3 pt-3 pb-3.5 flex flex-col items-center text-center flex-1 justify-between shadow-2xs">
        {/* Country Name */}
        <h3 className="text-xs sm:text-[13px] font-bold text-[#0a192f] tracking-tight group-hover:text-amber-600 transition-colors">
          {country.name}
        </h3>

        {/* Circular Progress Gauge with Center Percentage */}
        <div className="my-1.5">
          <ArcGauge
            percent={country.successRate}
            color={country.color}
            trackColor={country.trackColor}
            flagCode={country.flagCode}
          />
        </div>

        {/* Visas Issued Statistics */}
        <div className="mt-2 pt-2 border-t border-slate-100 w-full flex flex-col items-center">
          <div className="flex items-center justify-center gap-1.5">
            <div
              className="size-4.5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${country.color}15`, color: country.color }}
            >
              <Users className="size-3" strokeWidth={2.4} />
            </div>
            <span
              className="text-xs sm:text-[13px] font-black tracking-tight"
              style={{ color: country.color }}
            >
              {country.visasIssued}
            </span>
          </div>
          <span className="block text-[10px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">
            Visas Issued
          </span>
        </div>
      </div>
    </div>
  )
}

export default function TrustedWorldwide() {
  const scrollRef = useRef(null)
  const [activeDot, setActiveDot] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Drag-to-scroll interaction for desktop
  const isDragging = useRef(false)
  const dragDistance = useRef(0)
  const startX = useRef(0)
  const scrollLeftState = useRef(0)
  const totalDots = 5

  const handleSelectCountry = (flagCode) => {
    if (dragDistance.current > 5) return
    goToVisa(flagCode.toLowerCase())
  }

  // Update button states and pagination based on scroll position
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) {
      const progress = scrollLeft / maxScroll
      const dotIndex = Math.min(Math.floor(progress * totalDots), totalDots - 1)
      setActiveDot(dotIndex)
    }
  }, [totalDots])

  useEffect(() => {
    handleScroll()
    const handleResize = () => handleScroll()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleScroll])

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return
    isDragging.current = true
    dragDistance.current = 0
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftState.current = scrollRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const diff = Math.abs(x - startX.current)
    dragDistance.current += diff
    const walk = (x - startX.current) * 1.4 // Speed multiplier for responsive drag
    scrollRef.current.scrollLeft = scrollLeftState.current - walk
  }

  // Smooth scroll buttons
  const scroll = (direction) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollAmount = container.clientWidth * 0.7
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  // Scroll to dot page
  const scrollToDot = (dotIndex) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const maxScroll = container.scrollWidth - container.clientWidth
    const targetScroll = (dotIndex / (totalDots - 1)) * maxScroll
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    })
    setActiveDot(dotIndex)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf7f2] via-[#fdfbf7] to-[#f8f5ee] py-14 sm:py-20 border-b border-amber-100/50">
      {/* Luxury Ambient Radial Glow in the Center */}
      <div
        className="pointer-events-none absolute inset-0 select-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(217,119,6,0.07),transparent)]"
        aria-hidden="true"
      />

      {/* Subtle World Map Dotted Pattern Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] select-none"
        style={{
          backgroundImage: `radial-gradient(circle, #b45309 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* 1. SECTION HEADER: Title, Subtitle, Airplane Trail & CTA */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            {/* Premium Pill Badge: Orange Dot + VISA SUCCESS */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#b45309] text-[11px] font-bold tracking-[0.22em] uppercase shadow-2xs mb-2.5">
              <span className="size-2 rounded-full bg-[#f97316] animate-pulse" />
              <span>VISA SUCCESS</span>
            </div>

            {/* Main Headline with Serif Golden Worldwide */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0a192f] tracking-tight leading-[1.15]">
              Trusted by Thousands{' '}
              <span
                className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#b45309]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Worldwide
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-2.5 max-w-xl leading-relaxed">
              Successfully helping travelers from around the world get their visas with an exceptional success rate.
            </p>
          </div>

          {/* Right Side: Airplane Flight Path + CTA Button */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            {/* Flight Path SVG with Orange Airplane */}
            <div className="hidden sm:flex items-center justify-end w-48 h-8 pointer-events-none -mb-1 mr-4 select-none">
              <svg viewBox="0 0 160 30" className="w-full h-full" fill="none">
                <path
                  d="M 5,22 Q 80,24 140,8"
                  stroke="#f97316"
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                  opacity="0.65"
                />
                <g transform="translate(142, 6) rotate(-22)">
                  <path
                    d="M 0,0 L 12,3.5 L 0,7 L 3,3.5 Z"
                    fill="#f97316"
                  />
                </g>
              </svg>
            </div>

            {/* View All Countries Button */}
            <a
              href="#visa"
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0a192f] border border-slate-200/90 hover:border-amber-400 text-xs sm:text-[13px] font-bold shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View All Countries</span>
              <ArrowRight className="size-3.5 stroke-[2.5] text-amber-600 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Subtext */}
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Real data. Real travelers. Real success.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. SILKY-SMOOTH SCROLLABLE CAROUSEL CONTAINER            */}
        {/* ======================================================== */}
        <div className="relative group/carousel">
          {/* Subtle Left Gradient Edge Fade */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#faf7f2] to-transparent z-10 transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Subtle Right Gradient Edge Fade */}
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#faf7f2] to-transparent z-10 transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'text-slate-800 hover:text-amber-600 hover:border-amber-400 hover:scale-110 active:scale-95 cursor-pointer opacity-100'
                : 'text-slate-300 border-slate-100 cursor-not-allowed opacity-0 pointer-events-none'
            }`}
            aria-label="Previous countries"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Scrollable Horizontal Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1 cursor-grab active:cursor-grabbing select-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {COUNTRIES.map((country) => (
              <CountryCard
                key={country.name}
                country={country}
                onSelect={handleSelectCountry}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('right')}
            className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'text-slate-800 hover:text-amber-600 hover:border-amber-400 hover:scale-110 active:scale-95 cursor-pointer opacity-100'
                : 'text-slate-300 border-slate-100 cursor-not-allowed opacity-0 pointer-events-none'
            }`}
            aria-label="Next countries"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* 3. PAGINATION DOTS (INTERACTIVE & DYNAMIC TO SCROLL)     */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 select-none">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToDot(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeDot === idx
                  ? 'h-2 w-7 bg-gradient-to-r from-[#f97316] to-[#ea580c] shadow-xs'
                  : 'h-2 w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
