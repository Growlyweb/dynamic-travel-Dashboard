import { useState } from 'react'
import { Sparkles, Camera, MapPin } from 'lucide-react'
import { PARTNER_INFO } from '../data/partnerData'

export default function HeroBanner({ activeTab }) {
  // Scenic backgrounds matching the images
  const bannerConfigs = {
    applications: {
      // Image 1: Tropical limestone island & turquoise bay (Thailand)
      bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
      fallbackGradient: 'from-[#033b5c]/80 via-[#095982]/60 to-[#02283e]/80',
      cursiveText: 'Explore the World With ABL Travels',
      location: 'Phang Nga Bay, Thailand',
    },
    pickup: {
      // Image 2: Mediterranean coastal mountain & sea
      bgImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80',
      fallbackGradient: 'from-[#19324d]/85 via-[#23486a]/60 to-[#0f2134]/85',
      cursiveText: 'Explore the World With ABL Travels',
      location: 'Amalfi Coast, Italy',
    },
    invoices: {
      // Image 3: Santorini white cliff village overlooking sunset sea
      bgImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=80',
      fallbackGradient: 'from-[#1e2f47]/85 via-[#314a6e]/60 to-[#121c2c]/85',
      cursiveText: 'Together We Explore More',
      location: 'Oia, Santorini',
    },
    profile: {
      bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
      fallbackGradient: 'from-[#033b5c]/80 via-[#095982]/60 to-[#02283e]/80',
      cursiveText: 'Partner Excellence & Trust',
      location: 'ABL Partner Network',
    },
    support: {
      bgImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80',
      fallbackGradient: 'from-[#19324d]/85 via-[#23486a]/60 to-[#0f2134]/85',
      cursiveText: 'Dedicated 24/7 Agent Support',
      location: 'Dhaka Headquarters',
    },
  }

  const current = bannerConfigs[activeTab] || bannerConfigs.applications

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] select-none transition-all duration-700">
      {/* Background Image with Fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-100"
        style={{
          backgroundImage: `url('${current.bgImage}')`,
        }}
      />

      {/* Atmospheric Scenic Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-r ${current.fallbackGradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Subtle vignette border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

      {/* Banner Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14 pb-10 sm:pb-12 lg:pb-14 h-full flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Partner Profile Card */}
        <div className="flex items-center gap-3.5 sm:gap-6">
          {/* Avatar Circle: Large White Circle with Bold Navy AR */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full bg-white text-[#0d2b59] font-black text-xl sm:text-2xl lg:text-3xl flex items-center justify-center shadow-2xl ring-3 sm:ring-4 ring-white/30 tracking-tight">
              {PARTNER_INFO.initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* Welcome Text & Partner Details */}
          <div className="text-white space-y-0.5 sm:space-y-1">
            <span className="text-xs sm:text-sm font-normal text-white/90 tracking-wide block">
              Welcome back,
            </span>

            {/* Name + B2B Partner Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight drop-shadow-md">
                {PARTNER_INFO.name}
              </h1>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#0072f5] text-white shadow-sm ring-1 ring-white/20">
                {PARTNER_INFO.badge}
              </span>
            </div>

            {/* Agency Name */}
            <p className="text-xs sm:text-sm text-white/95 font-medium drop-shadow-xs">
              {PARTNER_INFO.agencyName}
            </p>

            {/* Partner ID */}
            <p className="text-[11px] sm:text-xs text-white/80 font-mono tracking-wider">
              Partner ID: {PARTNER_INFO.partnerId}
            </p>
          </div>
        </div>

        {/* Right Side: Flowing Cursive Script Text */}
        <div className="hidden lg:flex flex-col items-end justify-center pr-2">
          <div className="text-right">
            <p
              className="text-3xl xl:text-4xl 2xl:text-5xl text-white font-script tracking-wide transform -rotate-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none opacity-95 transition-all duration-500"
              style={{
                fontFamily: "'Great Vibes', cursive",
                textShadow: '0 2px 10px rgba(0,0,0,0.45)',
              }}
            >
              {current.cursiveText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
