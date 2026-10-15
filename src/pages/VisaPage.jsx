import { useEffect } from 'react'
import {
  Globe,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  FileCheck2,
  ChevronRight,
  HelpCircle,
  Award,
} from 'lucide-react'
import { VisaExplorer, TrustedWorldwide } from '@/components/sections'
import { goToVisa } from '@/hooks'

export default function VisaPage() {
  // Ensure page scrolls to top or hash target when opened
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1)) || document.getElementById('visa')
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="bg-white">
      {/* ======================================================== */}
      {/* 1. HERO BANNER: Elegant Breadcrumb, Title & Key Metrics   */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a192f] via-[#0d2b59] to-[#0f3460] text-white pt-8 pb-16 sm:pb-20">
        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/15 via-blue-500/10 to-transparent blur-3xl select-none"
          aria-hidden="true"
        />

        {/* Dotted Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] select-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium">
            <a href="/" className="hover:text-amber-400 transition-colors">
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-amber-400 font-semibold">Visa Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white/85">Visa Explorer &amp; Requirements</span>
          </nav>

          {/* Headline & Subtitle */}
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>GLOBAL VISA DIRECTORY • 200+ DESTINATIONS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
              World Visa Requirements{' '}
              <span
                className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Made Simple
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Find complete visa checklists, official embassy fees, processing timelines, and required documents for Bangladeshi passport holders traveling abroad.
            </p>
          </div>

          {/* 4 Feature Stats Badges */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/30 transition-colors">
              <div className="flex items-center gap-2.5 text-amber-400 mb-1.5">
                <Globe className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black">200+</span>
              </div>
              <p className="text-xs text-white/70 font-medium">Countries &amp; Territories</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/30 transition-colors">
              <div className="flex items-center gap-2.5 text-emerald-400 mb-1.5">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black">98.4%</span>
              </div>
              <p className="text-xs text-white/70 font-medium">Application Success Rate</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/30 transition-colors">
              <div className="flex items-center gap-2.5 text-sky-400 mb-1.5">
                <Clock className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black">24-48h</span>
              </div>
              <p className="text-xs text-white/70 font-medium">Document Pre-Check Time</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/30 transition-colors">
              <div className="flex items-center gap-2.5 text-purple-400 mb-1.5">
                <Award className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black">100%</span>
              </div>
              <p className="text-xs text-white/70 font-medium">Transparent Fee Structure</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. TRUSTED WORLDWIDE CAROUSEL (INSPIRATION & TOP PICKS)   */}
      {/* ======================================================== */}
      <TrustedWorldwide />

      {/* ======================================================== */}
      {/* 3. INTERACTIVE VISA EXPLORER SECTION                      */}
      {/* ======================================================== */}
      <VisaExplorer />

      {/* ======================================================== */}
      {/* 4. EXPEDITED CHINA VISA SPOTLIGHT BANNER                  */}
      {/* ======================================================== */}
      <section className="py-12 bg-gradient-to-r from-[#0d2b59] to-[#071933] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold tracking-widest uppercase mb-3">
                <span>ABL EXCLUSIVE SPECIALITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Need Fast-Track China Visa Processing?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                As the leading China travel specialist in Dhaka, ABL Travels provides expedited appointment booking, invitation letter endorsement, and same-week submission.
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToVisa('cn', 'tourist')}
              className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore China Visa Details
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. VISA ASSISTANCE FAQ & HELPDESK                        */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-16 bg-[#f8fafc] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              Got Questions About Your Visa?
            </h2>
            <p className="text-xs sm:text-sm text-body mt-2">
              Everything you need to know about processing timelines, documents, and embassy requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">What passport validity is required?</h4>
                  <p className="text-xs text-body mt-1 leading-relaxed">
                    Most embassies require your passport to have at least 6 months of remaining validity from your planned departure date, with at least 2 blank pages.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">How long do bank statements need to be?</h4>
                  <p className="text-xs text-body mt-1 leading-relaxed">
                    Generally, the last 6 months of bank statements showing regular cash flow and sufficient closing balance, endorsed with an official bank stamp and solvency certificate.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">Does ABL Travels guarantee visa approval?</h4>
                  <p className="text-xs text-body mt-1 leading-relaxed">
                    Final visa decisions are solely made by the respective embassy/consulate. However, our 98.4% success rate comes from meticulous document verification that eliminates rejection causes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy">Can I track my application status?</h4>
                  <p className="text-xs text-body mt-1 leading-relaxed">
                    Yes! B2B partners and registered travelers can monitor passport submission, embassy processing, and pickup readiness live inside the partner dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Helpline Callout */}
          <div className="mt-10 text-center">
            <p className="text-xs text-body">
              Need personalized advice for complex or group visa files?{' '}
              <a
                href="tel:+8801911223344"
                className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline ml-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call our Senior Visa Team (+880 1911-223344)</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
