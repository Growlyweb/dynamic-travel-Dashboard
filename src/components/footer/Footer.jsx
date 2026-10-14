import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Clock,
  Globe2,
  Headset,
  Mail,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  ThumbsUp,
} from 'lucide-react'
import { FOOTER_LINKS, VALUE_BADGES } from '../../data/site'
import NewsletterBanner from './NewsletterBanner'
import PartnersBar from './PartnersBar'

/* ---------- inline brand icons (lucide no longer ships brand icons) ---------- */

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

const SOCIALS = [
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: YoutubeIcon, label: 'YouTube' },
  { icon: LinkedinIcon, label: 'LinkedIn' },
  { icon: WhatsappIcon, label: 'WhatsApp' },
]

/* ---------- decorative skyline / pagoda wallpaper ---------- */

function SkylineBackdrop() {
  return (
    <>
      {/* pagodas + city silhouette along the bottom */}
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute bottom-0 left-0 w-full text-white opacity-[0.06]"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* pagoda (left) */}
        <g>
          <rect x="70" y="236" width="120" height="8" rx="2" />
          <rect x="100" y="200" width="60" height="36" />
          <path d="M70 200 C 95 210, 165 210, 190 200 L 182 184 C 155 176, 105 176, 78 184 Z" />
          <rect x="110" y="164" width="40" height="22" />
          <path d="M88 164 C 108 172, 152 172, 172 164 L 165 151 C 145 145, 115 145, 95 151 Z" />
          <rect x="118" y="136" width="24" height="17" />
          <path d="M102 136 C 116 143, 144 143, 158 136 L 153 126 C 140 121, 120 121, 107 126 Z" />
          <rect x="128" y="114" width="4" height="12" />
          <circle cx="130" cy="111" r="3" />
        </g>
        {/* gate */}
        <g>
          <rect x="230" y="212" width="8" height="30" />
          <rect x="270" y="212" width="8" height="30" />
          <rect x="222" y="203" width="64" height="8" rx="2" />
          <rect x="230" y="197" width="48" height="5" rx="2" />
        </g>
        {/* skyline (right) */}
        <g>
          <rect x="1150" y="155" width="26" height="90" />
          <rect x="1184" y="124" width="30" height="120" />
          <rect x="1197" y="100" width="3" height="24" />
          <rect x="1222" y="163" width="22" height="82" />
          <rect x="1254" y="105" width="10" height="140" />
          <circle cx="1259" cy="95" r="10" />
          <circle cx="1259" cy="74" r="6" />
          <rect x="1257" y="46" width="4" height="26" />
          <rect x="1276" y="145" width="34" height="95" />
          <rect x="1318" y="130" width="24" height="110" />
          <rect x="1350" y="160" width="30" height="80" />
          <path d="M1350 160 L1365 141 L1380 160 Z" />
          <rect x="1388" y="174" width="26" height="66" />
        </g>
        {/* waterline + reflections */}
        <rect x="0" y="245" width="1440" height="2" opacity="0.5" />
        <rect x="130" y="252" width="44" height="2" opacity="0.4" />
        <rect x="250" y="256" width="26" height="2" opacity="0.3" />
        <rect x="1160" y="252" width="60" height="2" opacity="0.4" />
        <rect x="1290" y="256" width="34" height="2" opacity="0.3" />
      </svg>
      {/* airplane + dashed route */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1040 200 C 1170 165, 1275 120, 1372 62"
          stroke="white"
          strokeOpacity="0.16"
          strokeWidth="2"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        <g transform="translate(1372 62)">
          <path d="M0 0 L15 5.5 L0 11 L3.5 5.5 Z" fill="white" fillOpacity="0.3" />
        </g>
      </svg>
    </>
  )
}

/* ---------- small building blocks ---------- */

const BADGE_ICONS = { ShieldCheck, Headset, ThumbsUp, Globe2, Award }

function ColumnHeading({ children }) {
  return (
    <h4 className="text-[15px] font-bold uppercase tracking-wide text-white">
      {children}
      <span className="mt-2.5 block h-[3px] w-7 rounded-full bg-primary" />
    </h4>
  )
}

function LinkList({ links, withArrows = [] }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {links.map((l) => (
        <li key={l}>
          <a
            href="#"
            className="group inline-flex items-center gap-1 text-sm text-[#a9bfd4] transition-colors hover:text-white"
          >
            {l}
            {withArrows.includes(l) && (
              <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

function PaymentBadges() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-7 items-center rounded bg-white px-2.5 text-[13px] font-black italic tracking-tight text-[#1a1f71]">
        VISA
      </span>
      <span className="flex h-7 items-center rounded bg-white px-2">
        <svg viewBox="0 0 32 16" className="h-4 w-8" aria-label="MasterCard">
          <circle cx="12" cy="8" r="8" fill="#eb001b" />
          <circle cx="20" cy="8" r="8" fill="#f79e1b" fillOpacity="0.85" />
        </svg>
      </span>
      <span className="flex h-7 items-center rounded bg-white px-2.5 text-[11px] font-extrabold text-[#e2136e]">
        bKash
      </span>
      <span className="flex h-7 items-center gap-1 rounded bg-white px-2.5 text-[11px] font-extrabold text-[#f26522]">
        <span className="size-2 rounded-full bg-gradient-to-br from-[#f26522] to-[#f9a02b]" />
        Nagad
      </span>
    </div>
  )
}

/* ---------- main footer ---------- */

export default function Footer() {
  return (
    <footer id="contact" className="relative">
      {/* Floating newsletter card — overlaps the section above */}
      <NewsletterBanner />

      {/* Trusted partners */}
      <PartnersBar />

      {/* Main dark footer */}
      <div className="relative overflow-hidden bg-[#0a1c33]">
        <SkylineBackdrop />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-12 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          {/* Brand */}
          <div className="lg:col-span-3">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-black/30">
                <Plane className="size-5 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-extrabold text-white">
                ABL <span className="text-primary">Travels</span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-[#a9bfd4]">
              Your trusted partner for China visas, curated tour packages and
              custom travel experiences — bringing the world to beautiful
              Bangladesh and Bangladesh to the world.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="font-script text-[30px] leading-tight text-white/90">
                Travel Beyond Borders
              </p>
              <svg
                viewBox="0 0 220 12"
                className="mt-1 w-48 text-accent"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8 C 60 2, 150 2, 217 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <ColumnHeading>Quick Links</ColumnHeading>
            <LinkList
              links={FOOTER_LINKS.quick}
              withArrows={['Visa Services', 'Tour Packages']}
            />
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <ColumnHeading>Our Services</ColumnHeading>
            <LinkList links={FOOTER_LINKS.services} />
          </div>

          {/* Destinations */}
          <div className="lg:col-span-2">
            <ColumnHeading>Popular Destinations</ColumnHeading>
            <LinkList links={FOOTER_LINKS.destinations} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <ColumnHeading>Contact Information</ColumnHeading>
            <ul className="mt-6 space-y-4 text-sm text-[#a9bfd4]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-primary" />
                House #1/B, Road #126, Gulshan 01,
                <br />
                Dhaka 1212, Bangladesh
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                01717-999637&nbsp;·&nbsp;+880 1346-808815
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href="mailto:abltravels.visa@gmail.com"
                  className="break-all transition-colors hover:text-white"
                >
                  abltravels.visa@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 shrink-0 text-primary" />
                Sunday – Thursday, 9:00 AM – 6:00 PM
              </li>
            </ul>
            <a
              href="https://maps.google.com/?q=Gulshan+1,+Dhaka"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-navy"
            >
              View on Map
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Value badges bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-7 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:divide-x lg:divide-white/10 lg:px-8">
            {VALUE_BADGES.map((b) => {
              const Icon = BADGE_ICONS[b.icon]
              return (
                <div
                  key={b.title}
                  className="flex items-center justify-center gap-3.5 lg:px-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <p className="text-[13px] font-semibold leading-snug text-white/90">
                    {b.title}
                    <span className="block text-xs font-normal text-[#8fa8c0]">
                      {b.sub}
                    </span>
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/5 bg-[#081527]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-[#9db3c8] sm:px-6 md:flex-row lg:px-8">
            <p>© 2026 ABL Travels. All rights reserved.</p>
            <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className="transition-colors hover:text-white">
                Terms &amp; Conditions
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className="transition-colors hover:text-white">
                Refund Policy
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className="transition-colors hover:text-white">
                Sitemap
              </a>
            </nav>
            <PaymentBadges />
          </div>
        </div>
      </div>
    </footer>
  )
}
