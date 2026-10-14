import { useState } from 'react'
import { ArrowRight, CheckCircle2, Lock, Mail } from 'lucide-react'
import { IMAGES } from '../../data/site'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl shadow-widget">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* Image side */}
          <div className="relative order-first h-44 sm:h-56 lg:order-last lg:h-auto lg:min-h-[340px]">
            <img
              src={IMAGES.newsletter}
              alt="Traveler in a sun hat admiring ancient temples and mountains"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/60 lg:bg-gradient-to-r lg:from-[#e6eff8] lg:via-white/10 lg:to-transparent" />
            {/* airplane + dashed route */}
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M50 245 C 150 205, 235 160, 335 62"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="1 10"
                strokeLinecap="round"
                opacity="0.95"
              />
              <circle cx="50" cy="245" r="4" fill="white" opacity="0.9" />
              <circle cx="50" cy="245" r="8" stroke="white" strokeWidth="1.5" opacity="0.6" />
              <g transform="translate(335 62)">
                <path d="M0 0 L17 6 L0 12 L4 6 Z" fill="white" />
              </g>
            </svg>
          </div>

          {/* Content side */}
          <div className="relative bg-gradient-to-r from-white via-[#f5fafd] to-[#e6eff8] p-7 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Stay Connected
              </span>
            </div>
            <h2 className="mt-4 text-[26px] font-extrabold leading-tight text-navy sm:text-3xl lg:text-[34px]">
              Get Travel Updates and{' '}
              <span className="text-primary">Exclusive Offers</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-body">
              Be the first to hear about new visa rules, fresh tour packages,
              seasonal deals and insider travel tips — straight to your inbox.
            </p>

            {subscribed ? (
              <p className="mt-7 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="size-5 shrink-0" />
                Thanks for subscribing! Check your inbox to confirm.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSubscribed(true)
                }}
                className="mt-7 flex max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pl-5 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
              >
                <Mail className="size-[18px] shrink-0 text-body" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full min-w-0 flex-1 bg-transparent text-sm font-medium text-navy outline-none placeholder:text-body/70"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-dark px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-200 transition-all hover:-translate-y-px hover:shadow-lg active:scale-95"
                >
                  Subscribe
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </button>
              </form>
            )}

            <p className="mt-3.5 flex items-center gap-1.5 text-xs text-body/80">
              <Lock className="size-3" />
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
