import { useState } from 'react'
import { ArrowRight, CheckCircle2, Lock, Mail } from 'lucide-react'
import { IMAGES } from '@/constants'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[26px] border border-sky-100/70 bg-gradient-to-r from-white via-[#f3f7fb] to-[#e4eff8] shadow-[0_16px_45px_-12px_rgba(10,35,70,0.14)]">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          {/* Content side (Left) */}
          <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:py-11 lg:pl-12 lg:pr-8">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-6 rounded-full bg-[#1565c0]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1565c0]">
                Stay Connected
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#0d223a] sm:text-3xl lg:text-[32px]">
              Get Travel Updates<br className="hidden sm:inline" /> and Exclusive Offers
            </h2>

            <p className="mt-2.5 max-w-md text-[13.5px] leading-relaxed text-[#596d83]">
              Be the first to know about new visa updates, tour packages,
              special offers and travel insights.
            </p>

            {subscribed ? (
              <p className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                Thanks for subscribing! Check your inbox to confirm.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSubscribed(true)
                }}
                className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-slate-200/90 bg-white p-1.5 pl-4 shadow-sm transition-all focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10"
              >
                <Mail className="size-4 shrink-0 text-[#8b9cb0]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full min-w-0 flex-1 bg-transparent text-sm font-medium text-navy outline-none placeholder:text-[#95a5b8]"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#f55200] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-orange-500/35 hover:-translate-y-px active:scale-95"
                >
                  Subscribe
                  <ArrowRight className="size-3.5" strokeWidth={2.5} />
                </button>
              </form>
            )}

            <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-[#7a8d9f]">
              <Lock className="size-3 shrink-0" />
              We respect your privacy. No spam, ever.
            </p>
          </div>

          {/* Image side (Right) */}
          <div className="relative order-first h-44 sm:h-56 lg:order-last lg:h-auto lg:min-h-[290px]">
            <img
              src={IMAGES.newsletter}
              alt="Traveler exploring ancient pagodas and temples"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Soft gradient blend into the card */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#e4eff8] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#f3f7fb] lg:via-transparent lg:to-transparent" />

            {/* Airplane with dashed curved flight path */}
            <svg
              viewBox="0 0 360 220"
              className="pointer-events-none absolute inset-0 h-full w-full select-none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 50 175 C 130 150, 210 115, 290 40"
                stroke="white"
                strokeWidth="1.8"
                strokeDasharray="3 7"
                strokeLinecap="round"
                opacity="0.9"
              />
              <circle cx="50" cy="175" r="3.5" fill="white" opacity="0.9" />
              <g transform="translate(290, 40) rotate(-22)">
                <path d="M0 0 L15 5 L0 10 L3.5 5 Z" fill="white" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
