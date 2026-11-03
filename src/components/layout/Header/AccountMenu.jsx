import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, LogOut } from 'lucide-react'
import Avatar from '@/components/common/Avatar'
import { useCustomerProfile } from '@/context/CustomerProfileContext'
import { PORTAL_NAV } from '@/customer/portalNav'
import { useSignOut } from '@/customer/useSignOut'

export default function AccountMenu() {
  const { profile } = useCustomerProfile()
  const signOut = useSignOut()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  if (!profile) return null

  const displayName = profile.fullName.replace(/^(md|mr|mrs|ms)\.?\s+/i, '')

  const handleLogout = () => {
    setOpen(false)
    signOut()
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-[#eaf3fd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d81f0] focus-visible:ring-offset-2"
      >
        <Avatar name={profile.fullName} src={profile.avatarUrl} size="sm" />
        <span className="max-w-[140px] truncate text-sm font-semibold text-[#0b2a4a]">{displayName}</span>
        <ChevronDown
          className={`size-4 text-[#0b2a4a] transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-[#0b2a4a]/10 bg-white shadow-[0_24px_48px_-16px_rgba(11,42,74,0.35)] animate-fade-in"
        >
          <div className="flex items-center gap-3 border-b border-[#0b2a4a]/10 bg-[#f5f9fe] px-4 py-3.5">
            <Avatar name={profile.fullName} src={profile.avatarUrl} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#0b2a4a]">{profile.fullName}</p>
              <p className="truncate text-xs text-slate-500">{profile.email}</p>
            </div>
          </div>

          <div className="p-2">
            {PORTAL_NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#0b2a4a]/90 transition-colors hover:bg-[#eaf3fd] hover:text-[#0a5ec0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d81f0]"
              >
                <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
                {label}
              </Link>
            ))}
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl border-t border-[#0b2a4a]/10 px-3 pb-2.5 pt-3 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <LogOut className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
