import { useState, useRef, useEffect } from 'react'
import {
  Globe,
  LogIn,
  LogOut,
  Menu,
  Plane,
  Search,
  X,
  Building2,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  User,
} from 'lucide-react'
import { NAV_LINKS } from '../data/site'
import { useAuth } from '../context/AuthContext'

function Logo() {
  return (
    <a href="#home" className="flex shrink-0 items-center gap-2.5">
      <span className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-primary/30">
        <Plane className="size-5 text-white" strokeWidth={2.2} />
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-accent ring-2 ring-white" />
      </span>

      <span className="leading-none">
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

export default function Header({ onOpenLogin, onNavigateToDashboard }) {
  const [open, setOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const userMenuRef = useRef(null)

  const { currentUser, isAuthenticated, isB2BPartner, logout } = useAuth()

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const headerLinks = NAV_LINKS
    .filter((link) => link.label !== 'Become a Partner')
    .map((link) => ({
      ...link,
      hasDropdown: false,
    }))

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

  // Add Partner Portal link to nav
  headerLinks.push({
    label: 'Partner Portal',
    href: '#partner-portal',
    active: false,
    isPartnerAction: true,
  })

  const handlePartnerClick = (e) => {
    e.preventDefault()
    if (isB2BPartner && onNavigateToDashboard) {
      onNavigateToDashboard()
    } else if (onOpenLogin) {
      onOpenLogin('b2b')
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {headerLinks.map((link) => {
            if (link.isPartnerAction) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={handlePartnerClick}
                  className="flex items-center gap-1.5 text-[15px] font-semibold text-primary transition-colors hover:text-primary-dark cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-accent" />
                  <span>{isB2BPartner ? 'B2B Dashboard' : 'Partner Portal'}</span>
                </button>
              )
            }

            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative flex items-center text-[15px] font-medium transition-colors hover:text-primary ${
                  link.active ? 'text-primary' : 'text-navy/80'
                }`}
              >
                {link.label}

                {link.active && (
                  <span className="absolute -bottom-[29px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full text-navy/70 transition-colors hover:bg-tint hover:text-primary cursor-pointer"
          >
            <Search className="size-[18px]" />
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-navy/70 transition-colors hover:bg-tint hover:text-primary cursor-pointer"
          >
            <Globe className="size-[18px]" />
            EN
          </button>

          {/* Conditional Auth Button / Partner Chip */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <div className="flex items-center gap-2">
                {isB2BPartner && (
                  <button
                    type="button"
                    onClick={onNavigateToDashboard}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:-translate-y-px cursor-pointer"
                  >
                    <LayoutDashboard className="size-4" />
                    <span>B2B Dashboard</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 pl-1.5 pr-2.5 py-1 text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="size-7 rounded-full bg-[#0d2b59] text-white text-xs font-bold flex items-center justify-center">
                    {currentUser?.initials || 'U'}
                  </span>
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {currentUser?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="size-3 text-slate-400" />
                </button>
              </div>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {currentUser?.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {currentUser?.agencyName || currentUser?.email}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                      <ShieldCheck className="size-3" />
                      {currentUser?.role === 'B2B' ? 'Verified B2B Partner' : 'Customer'}
                    </span>
                  </div>

                  {isB2BPartner && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false)
                        if (onNavigateToDashboard) onNavigateToDashboard()
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-primary hover:bg-blue-50 transition-colors text-left cursor-pointer"
                    >
                      <LayoutDashboard className="size-4" />
                      <span>Open B2B Dashboard</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false)
                      logout()
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer border-t border-slate-100"
                  >
                    <LogOut className="size-4 text-rose-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenLogin && onOpenLogin('b2b')}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-px hover:bg-primary-dark cursor-pointer"
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
            {headerLinks.map((link) => {
              if (link.isPartnerAction) {
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={(e) => {
                      setOpen(false)
                      handlePartnerClick(e)
                    }}
                    className="flex items-center gap-2 border-b border-slate-50 py-3.5 text-[15px] font-bold text-primary text-left cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-accent" />
                    <span>{isB2BPartner ? 'Go to B2B Dashboard' : 'Partner Portal Login'}</span>
                  </button>
                )
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center border-b border-slate-50 py-3.5 text-[15px] font-medium ${
                    link.active ? 'text-primary' : 'text-navy/80'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
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
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20"
                  >
                    <LayoutDashboard className="size-4" />
                    <span>Open B2B Dashboard</span>
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
                    className="text-xs font-semibold text-rose-600 hover:underline"
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
                <span>Login / Partner Portal</span>
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