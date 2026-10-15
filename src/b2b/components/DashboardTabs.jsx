import { useRef, useEffect, useState } from 'react'
import {
  User,
  FileText,
  Truck,
  ReceiptText,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export default function DashboardTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
    },
    {
      id: 'applications',
      label: 'My Applications',
      icon: FileText,
    },
    {
      id: 'pickup',
      label: 'Passport Pickup',
      icon: Truck,
    },
    {
      id: 'invoices',
      label: 'Invoices & Commission',
      icon: ReceiptText,
    },
    {
      id: 'support',
      label: 'Support',
      icon: Headphones,
    },
  ]

  const containerRef = useRef(null)
  const activeTabRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Track scroll position to conditionally render edge gradient cues and scroll chevrons
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setCanScrollLeft(scrollLeft > 6)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  // Auto-scroll active tab into view smoothly on mobile/tablet when activeTab changes
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
    const timer = setTimeout(checkScroll, 350)
    return () => clearTimeout(timer)
  }, [activeTab])

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/70 border border-slate-100/90 p-1.5 sm:p-2 relative overflow-hidden">
        {/* Left Scroll Cue & Button (visible only when scrollable on mobile/tablet) */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none rounded-l-2xl z-10 flex items-center pl-1.5 lg:hidden animate-fade-in">
            <button
              onClick={() => handleScroll('left')}
              className="pointer-events-auto w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              aria-label="Scroll tabs left"
              type="button"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right Scroll Cue & Button (visible only when scrollable on mobile/tablet) */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none rounded-r-2xl z-10 flex items-center justify-end pr-1.5 lg:hidden animate-fade-in">
            <button
              onClick={() => handleScroll('right')}
              className="pointer-events-auto w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              aria-label="Scroll tabs right"
              type="button"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 5-Tab List: Touch swipeable with auto-centering on mobile/tablet, full-width 5-column grid on desktop */}
        <div
          ref={containerRef}
          onScroll={checkScroll}
          role="tablist"
          aria-label="Dashboard navigation tabs"
          className="flex lg:grid lg:grid-cols-5 items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-0.5 w-full"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : null}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onTabChange(tab.id)}
                className={`group shrink-0 snap-center lg:shrink w-auto lg:w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 lg:px-4 xl:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-[13px] lg:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#0d2b59] text-white shadow-md shadow-[#0d2b59]/25 ring-1 ring-[#0d2b59]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white scale-105' : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                  strokeWidth={isActive ? 2.2 : 2}
                />
                <span className="whitespace-nowrap shrink-0">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
