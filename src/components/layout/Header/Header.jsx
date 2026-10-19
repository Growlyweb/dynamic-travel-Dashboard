import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Check,
  Copy,
  Headset,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Phone,
  UserRound,
  X,
} from 'lucide-react'
import { NAV_LINKS, NAV_SECTIONS } from '@/constants'
import { useAuth } from '@/context/AuthContext'
import { useScrollSpy } from '@/hooks'
import AccountMenu from './AccountMenu'

/*
  ABL Travels — brand tokens (taken from the logo):
  blue   #0d81f0 (dark #0a5ec0, soft #eaf3fd)
  orange #ff9a00 (dark #b45f00 for small text)
  navy   #0b2a4a (text)
*/

// TODO: replace with the real ABL Travels helpline details
const SUPPORT_CONTACT = {
  phone: '+880 1XXX-XXXXXX',
  email: 'support@abltravel.com',
}

const SPY_IDS = NAV_SECTIONS?.map((section) => section.id) ?? []

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d81f0] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

// One shared premium CTA style — every primary button looks and behaves the same
const primaryCta =
  'flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#0d81f0] to-[#0a5ec0] font-semibold text-white shadow-lg shadow-[#0d81f0]/30 transition-all duration-300 hover:-translate-y-px hover:shadow-xl hover:shadow-[#0d81f0]/40 active:translate-y-0'

function Logo({ onClick }) {
  return (
    <a
      href="/"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      className={`group flex shrink-0 cursor-pointer items-center gap-3 whitespace-nowrap rounded-xl ${focusRing}`}
    >
      {/* width/height prevent layout shift while the logo loads */}
      <img
        src="/company_logo.png"
        alt="ABL Travels"
        width={48}
        height={48}
        draggable={false}
        className="size-12 shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
      />

      {/* Navy + brand blue reads more premium than two near-identical blues */}
      <span className="whitespace-nowrap text-xl font-extrabold italic leading-none tracking-tight">
        <span className="text-[#0b2a4a]">ABL</span>{' '}
        <span className="text-[#0d81f0]">Travels</span>
      </span>
    </a>
  )
}

// One row in the help popup: icon, label, value (link) and a copy button
function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  copyLabel,
  copied,
  onCopy,
  onNavigate,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#0b2a4a]/10 bg-white p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf3fd] text-[#0a5ec0]">
        <Icon className="size-[18px]" strokeWidth={2} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <a
          href={href}
          onClick={onNavigate}
          className={`block truncate rounded text-[15px] font-semibold text-[#0b2a4a] transition-colors hover:text-[#0a5ec0] ${focusRing}`}
        >
          {value}
        </a>
      </div>

      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${copyLabel}`}
        className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-[#eaf3fd] hover:text-[#0a5ec0] ${focusRing}`}
      >
        {copied ? (
          <Check className="size-4 text-emerald-600" strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

// Headset button + popup with the helpline details
function HelpMenu() {
  const [open, setOpen] = useState(false)
  const [copiedKey, setCopiedKey] = useState(null)
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)
  const copyTimer = useRef(null)
  const location = useLocation()

  // Close on outside click / tap and on Escape (focus returns to the trigger)
  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Any route change should collapse the popup
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  const copy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Fallback for browsers or pages without clipboard permission
      const field = document.createElement('textarea')
      field.value = value
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand('copy')
      } catch {
        /* nothing else to try */
      }
      field.remove()
    }
    setCopiedKey(key)
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopiedKey(null), 1800)
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Help and contact"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="help-popup"
        onClick={() => setOpen((value) => !value)}
        className={`flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${focusRing} ${open
          ? 'border-[#0d81f0]/40 bg-[#eaf3fd] text-[#0a5ec0]'
          : 'border-[#0b2a4a]/15 text-[#0b2a4a]/80 hover:bg-[#eaf3fd] hover:text-[#0a5ec0]'
          }`}
      >
        <Headset className="size-[18px]" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="help-popup"
          role="dialog"
          aria-label="Help and contact"
          className="fixed inset-x-4 top-[5.5rem] z-50 overflow-hidden rounded-2xl border border-[#0b2a4a]/10 bg-white shadow-[0_24px_60px_-20px_rgba(11,42,74,0.45)] animate-fade-in sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[21rem]"
        >
          {/* Top: who we are */}
          <div className="flex items-center gap-4 bg-gradient-to-b from-[#eaf3fd] to-white p-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d81f0] to-[#0a5ec0] text-white shadow-lg shadow-[#0d81f0]/30">
              <Headset className="size-7" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="font-serif text-xl font-semibold leading-tight text-[#0b2a4a]">
                We&rsquo;re here to help
              </p>
              <p className="mt-1 text-sm leading-snug text-slate-600">
                Speak with a real travel expert — anytime, day or night.
              </p>
            </div>
          </div>

          <div className="space-y-3 p-4 pt-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600">
                Dedicated 24/7 helpline
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span
                  className="size-1.5 animate-pulse rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                Always open
              </span>
            </div>

            <ContactRow
              icon={Phone}
              label="Call us"
              value={SUPPORT_CONTACT.phone}
              href={`tel:${SUPPORT_CONTACT.phone.replace(/[^\d+]/g, '')}`}
              copyLabel="phone number"
              copied={copiedKey === 'phone'}
              onCopy={() => copy('phone', SUPPORT_CONTACT.phone)}
              onNavigate={() => setOpen(false)}
            />

            <ContactRow
              icon={Mail}
              label="Email us"
              value={SUPPORT_CONTACT.email}
              href={`mailto:${SUPPORT_CONTACT.email}`}
              copyLabel="email address"
              copied={copiedKey === 'email'}
              onCopy={() => copy('email', SUPPORT_CONTACT.email)}
              onNavigate={() => setOpen(false)}
            />

            <p className="sr-only" aria-live="polite">
              {copiedKey ? 'Copied to clipboard' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header({
  onOpenLogin,
  onNavigateToDashboard,
  onNavigateToStorefront,
  isDashboardView = false,
  onLogout,
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuToggleRef = useRef(null)
  const location = useLocation()
  const isVisaPage = location?.pathname === '/visa'
  const isHomePage = location?.pathname === '/'
  const isContactPage = location?.pathname === '/contact'

  const { currentUser, isAuthenticated, isB2BPartner, logout } = useAuth()
  const currentSection = useScrollSpy(SPY_IDS)
  const activeHref = isHomePage
    ? NAV_SECTIONS?.find((section) => section.id === currentSection)?.navHref
    : null

  // Premium detail: the header shadow only appears once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the mobile menu and returns focus to the burger button
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Any navigation should collapse the mobile menu (e.g. browser back button)
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // App-like feel: lock the background while the mobile menu is open
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      logout()
    }
  }

  const headerLinks = NAV_LINKS
    .filter((link) => link.label !== 'Become a Partner')
    .map((link) => {
      let href = link.href
      let active = false

      if (link.label === 'Visa') {
        href = '/visa'
        active = isVisaPage
      } else if (link.label === 'Contact Us') {
        href = '/contact'
        active = isContactPage
      } else if (link.label === 'Home') {
        href = '/'
        active = isHomePage && (!activeHref || activeHref === '/' || activeHref === '#home')
      } else {
        // For section anchors like #packages, #about, #contact
        href = !isHomePage && link.href.startsWith('#') ? `/${link.href}` : link.href
        active = isHomePage && (link.href === activeHref || `/${link.href}` === activeHref)
      }

      if (isDashboardView) {
        active = false
      }

      return {
        ...link,
        href,
        active,
        hasDropdown: false,
      }
    })

  if (!headerLinks.some((link) => link.label === 'Gallery')) {
    const galleryLink = {
      label: 'Gallery',
      href: '/gallery',
      active: false,
      hasDropdown: false,
    }

    const aboutIndex = headerLinks.findIndex((link) => link.label === 'About Us')

    headerLinks.splice(
      aboutIndex === -1 ? headerLinks.length : aboutIndex,
      0,
      galleryLink
    )
  }

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80 ${scrolled
        ? 'shadow-[0_8px_30px_-18px_rgba(11,42,74,0.35)]'
        : 'shadow-none'
        }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl flex-nowrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:gap-8">
        <Logo onClick={onNavigateToStorefront} />

        {/* Desktop Navigation - strictly one line */}
        <nav
          aria-label="Main"
          className="hidden shrink-0 flex-nowrap items-center gap-5 whitespace-nowrap lg:flex xl:gap-7"
        >
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={`group relative flex items-center whitespace-nowrap rounded py-2 text-[14px] font-medium tracking-wide transition-colors xl:text-[15px] ${focusRing} ${link.active
                ? 'text-[#0a5ec0]'
                : 'text-[#0b2a4a]/80 hover:text-[#0a5ec0]'
                }`}
            >
              {link.label}

              <span
                aria-hidden="true"
                className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-[#ff9a00] transition-transform duration-300 ${link.active
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
                  }`}
              />
            </a>
          ))}
        </nav>

        {/* Desktop Actions - strictly one line */}
        <div className="hidden shrink-0 flex-nowrap items-center gap-2 whitespace-nowrap lg:flex xl:gap-3">
          <HelpMenu />

          <span aria-hidden="true" className="mx-1 h-6 w-px bg-[#0b2a4a]/15" />

          {/* Conditional auth: unified in storefront and B2B dashboard */}
          {isAuthenticated ? (
            <div className="flex shrink-0 flex-nowrap items-center gap-2 whitespace-nowrap">
              {isB2BPartner && (
                isDashboardView ? (
                  <button
                    type="button"
                    onClick={onNavigateToStorefront}
                    className={`flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-[#0b2a4a]/20 px-5 py-2.5 text-sm font-semibold text-[#0b2a4a] transition-all hover:border-[#0d81f0] hover:text-[#0a5ec0] ${focusRing}`}
                  >
                    <span>Storefront</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onNavigateToDashboard}
                    className={`${primaryCta} px-5 py-2.5 text-sm ${focusRing}`}
                  >
                    <LayoutDashboard className="size-4" aria-hidden="true" />
                    <span>B2B Dashboard</span>
                  </button>
                )
              )}

              {isB2BPartner ? (
                <>
                  {/* User name */}
                  <span className="px-2 text-sm font-semibold text-[#0b2a4a]">
                    {currentUser?.name?.split(' ')[0] || 'Partner'}
                  </span>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Log Out"
                    aria-label="Log out"
                    className={`flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#0b2a4a]/15 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 ${focusRing}`}
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <AccountMenu />
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenLogin && onOpenLogin('b2b')}
              className={`${primaryCta} px-6 py-2.5 text-sm ${focusRing}`}
            >
              <LogIn className="size-4" aria-hidden="true" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile: help + menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <HelpMenu />

          <button
            ref={menuToggleRef}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={`flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#0b2a4a]/15 text-[#0b2a4a] transition-colors hover:bg-[#eaf3fd] ${focusRing}`}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Brand line: blue to orange, taken from the logo */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#0d81f0] via-[#0d81f0] to-[#ff9a00]"
      />

      {/* Mobile Navigation */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5.25rem)] overflow-y-auto border-t border-[#0b2a4a]/10 bg-white px-4 pb-6 pt-2 animate-fade-in lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {headerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={link.active ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#0b2a4a]/10 py-4 text-base font-medium ${link.active ? 'text-[#0a5ec0]' : 'text-[#0b2a4a]'
                  }`}
              >
                {link.label}
                {link.active && (
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-[#ff9a00]"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            {isAuthenticated ? (
              <div className="space-y-3">
                {isB2BPartner && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      if (onNavigateToDashboard) onNavigateToDashboard()
                    }}
                    className={`${primaryCta} w-full px-5 py-3.5 text-sm ${focusRing}`}
                  >
                    <LayoutDashboard className="size-4" aria-hidden="true" />
                    <span>Go to B2B Dashboard</span>
                  </button>
                )}

                {!isB2BPartner && (
                  <Link
                    to="/account"
                    onClick={() => setOpen(false)}
                    className={`${primaryCta} w-full px-5 py-3.5 text-sm ${focusRing}`}
                  >
                    <UserRound className="size-4" aria-hidden="true" />
                    <span>My Account</span>
                  </Link>
                )}

                <div className="flex items-center justify-between rounded-2xl border border-[#0b2a4a]/10 bg-[#f5f9fe] p-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-full bg-[#0b2a4a] text-xs font-bold text-white">
                      {currentUser?.initials || 'U'}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0b2a4a]">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-slate-600">
                        {currentUser?.role === 'B2B' ? 'B2B Partner' : 'Customer'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      logout()
                    }}
                    className="cursor-pointer text-sm font-semibold text-rose-600 hover:underline"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  if (onOpenLogin) onOpenLogin('b2b')
                }}
                className={`${primaryCta} w-full px-5 py-3.5 text-sm ${focusRing}`}
              >
                <LogIn className="size-4" aria-hidden="true" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Quiet brand signature closes the menu */}
          <p className="mt-6 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
            ABL Travels · Journeys crafted with care
          </p>
        </div>
      )}
    </header>
  )
}