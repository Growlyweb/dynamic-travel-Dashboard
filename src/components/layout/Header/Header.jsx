import { useState } from 'react'
import {
  Globe,
  LogIn,
  Menu,
  Search,
  X,
} from 'lucide-react'
import { NAV_LINKS, NAV_SECTIONS } from '@/constants'
import { useScrollSpy } from '@/hooks'

const SPY_IDS = NAV_SECTIONS.map((section) => section.id)

function Logo() {
  return (
    <a href="#home" className="group flex shrink-0 items-center gap-2.5">
      <img
        src="/company_logo.png"
        alt="ABL Travels Logo"
        className="size-11 rounded-xl object-contain ring-1 ring-slate-100 shadow-sm transition-transform duration-200 group-hover:scale-105"
      />

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

export default function Header() {
  const [open, setOpen] = useState(false)
  const currentSection = useScrollSpy(SPY_IDS)
  const activeHref = NAV_SECTIONS.find((section) => section.id === currentSection)?.navHref

  const headerLinks = NAV_LINKS
    .filter((link) => link.label !== 'Become a Partner')
    .map((link) => ({
      ...link,
      active: link.href === activeHref,
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {headerLinks.map((link) => (
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
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full text-navy/70 transition-colors hover:bg-tint hover:text-primary"
          >
            <Search className="size-[18px]" />
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-navy/70 transition-colors hover:bg-tint hover:text-primary"
          >
            <Globe className="size-[18px]" />
            EN
          </button>

          <a
            href="#login"
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-px hover:bg-primary-dark"
          >
            <LogIn className="size-4" />
            Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-tint lg:hidden"
        >
          {open ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {headerLinks.map((link) => (
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
            ))}
          </nav>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="#login"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              <LogIn className="size-4" />
              Login
            </a>

            <button
              type="button"
              aria-label="Search"
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 text-navy/70"
            >
              <Search className="size-[18px]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-navy/70"
            >
              <Globe className="size-4" />
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
