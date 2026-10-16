import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Globe,
  LogIn,
  LogOut,
  Menu,
  Search,
  X,
  LayoutDashboard,
} from 'lucide-react'
import { NAV_LINKS, NAV_SECTIONS } from '@/constants'
import { useAuth } from '@/context/AuthContext'
import { useScrollSpy } from '@/hooks'

const SPY_IDS = NAV_SECTIONS?.map((section) => section.id) ?? []

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
      className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap cursor-pointer"
    >
      <img
        src="/company_logo.png"
        alt="ABL Travels Logo"
        className="size-11 rounded-xl object-contain ring-1 ring-slate-100 shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0"
      />

      <span className="leading-none whitespace-nowrap">
        <span className="block text-lg font-extrabold tracking-tight text-navy">
          ABL <span className="text-primary">Travels</span>
        </span>
        <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-body">
          China &amp; Beyond
        </span>
      </span>
    </a>
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
  const navigate = useNavigate()
  const location = useLocation()
  const isVisaPage = location?.pathname === '/visa'
  const isContactPage = location?.pathname === '/contact'
  const isHomePage = location?.pathname === '/'

  const { currentUser, isAuthenticated, isB2BPartner, logout } = useAuth()
  const currentSection = useScrollSpy(SPY_IDS)
  const activeHref = isHomePage ? NAV_SECTIONS?.find((section) => section.id === currentSection)?.navHref : null

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
        // For section anchors like #packages, #about
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

    const aboutIndex = headerLinks.findIndex(
      (link) => link.label === 'About Us'
    )

    headerLinks.splice(
      aboutIndex === -1 ? headerLinks.length : aboutIndex,
      0,
      galleryLink
    )
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 xl:gap-8 px-4 sm:px-6 lg:px-8 flex-nowrap">
        <Logo onClick={onNavigateToStorefront} />

        {/* Desktop Navigation - Strictly One Line */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0 whitespace-nowrap flex-nowrap">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith('/') && !link.href.includes('#')) {
                  e.preventDefault()
                  navigate(link.href)
                }
              }}
              className={`relative flex items-center text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors hover:text-primary ${
                link.active ? 'text-primary' : 'text-navy/80'
              }`}
            >
              {link.label}

              {link.active && (
                <span className="absolute -bottom-[29px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Actions - Strictly One Line */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 whitespace-nowrap flex-nowrap">
          <button
            type="button"
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full text-navy/70 transition-colors hover:bg-tint hover:text-primary cursor-pointer shrink-0"
          >
            <Search className="size-[18px]" />
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-navy/70 transition-colors hover:bg-tint hover:text-primary cursor-pointer shrink-0"
          >
            <Globe className="size-[18px]" />
            EN
          </button>

          {/* Conditional Auth: Unified in Storefront & B2B Dashboard */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap flex-nowrap">
              {isB2BPartner && (
                isDashboardView ? (
                  <button
                    type="button"
                    onClick={onNavigateToStorefront}
                    className="flex items-center gap-2 rounded-full border border-slate-200 hover:border-primary hover:text-primary px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    <span>Storefront</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onNavigateToDashboard}
                    className="flex items-center gap-2 rounded-full bg-primary hover:bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-px cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    <LayoutDashboard className="size-4" />
                    <span>B2B Dashboard</span>
                  </button>
                )
              )}

              {/* User badge */}
              <span className="text-xs font-semibold text-slate-700 px-2">
                {currentUser?.name?.split(' ')[0] || 'Partner'}
              </span>

              {/* Logout button */}
              <button
                type="button"
                onClick={handleLogout}
                title="Log Out"
                className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenLogin && onOpenLogin('b2b')}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-px hover:bg-primary-dark cursor-pointer shrink-0 whitespace-nowrap"
            >
              <LogIn className="size-4" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-tint lg:hidden cursor-pointer"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 lg:hidden animate-fade-in">
          <nav className="flex flex-col">
            {headerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setOpen(false)
                  if (link.href.startsWith('/') && !link.href.includes('#')) {
                    e.preventDefault()
                    navigate(link.href)
                  }
                }}
                className={`flex items-center border-b border-slate-50 py-3.5 text-[15px] font-medium ${
                  link.active ? 'text-primary' : 'text-navy/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                {isB2BPartner && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      if (onNavigateToDashboard) onNavigateToDashboard()
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 cursor-pointer"
                  >
                    <LayoutDashboard className="size-4" />
                    <span>Go to B2B Dashboard</span>
                  </button>
                )}

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="size-8 rounded-full bg-[#0d2b59] text-white text-xs font-bold flex items-center justify-center">
                      {currentUser?.initials || 'U'}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser?.role === 'B2B' ? 'B2B Partner' : 'Customer'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      logout()
                    }}
                    className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
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
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 cursor-pointer"
              >
                <LogIn className="size-4" />
                <span>Login</span>
              </button>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Search"
                className="flex size-11 flex-1 items-center justify-center rounded-full border border-slate-200 text-navy/70"
              >
                <Search className="size-[18px]" />
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-navy/70"
              >
                <Globe className="size-4" />
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
