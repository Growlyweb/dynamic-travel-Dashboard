import { NavLink, useMatch } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Avatar from '@/components/common/Avatar'
import { useCustomerProfile } from '@/context/CustomerProfileContext'
import { PORTAL_NAV } from '../portalNav'
import { useSignOut } from '../useSignOut'

export default function PortalSidebar() {
  const { profile } = useCustomerProfile()
  const handleLogout = useSignOut()
  const isOverview = Boolean(useMatch({ path: '/account', end: true }))

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-[111px] max-h-[calc(100vh-127px)] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
          {!isOverview && (
            <div className="flex items-center gap-3 px-1 pb-5">
              <Avatar name={profile.fullName} src={profile.avatarUrl} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold leading-tight text-ink">{profile.fullName}</p>
                <p className="mt-0.5 truncate text-xs text-body">{profile.email}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-600" />
                  Active Member
                </span>
              </div>
            </div>
          )}

          <nav aria-label="Account" className={isOverview ? '' : 'border-t border-slate-100 pt-3'}>
            <ul className="space-y-1">
              {PORTAL_NAV.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3.5 rounded-xl px-4 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                        isOverview ? 'py-3.5' : 'py-3'
                      } ${
                        isActive
                          ? 'bg-brand-soft font-semibold text-brand-dark before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-full before:bg-brand'
                          : 'font-medium text-ink/85 hover:bg-canvas hover:text-ink'
                      }`
                    }
                  >
                    {!isOverview && (
                      <Icon className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    )}
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 text-left text-[15px] font-medium text-ink/85 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    isOverview ? 'py-3.5' : 'py-3'
                  }`}
                >
                  {!isOverview && (
                    <LogOut className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  )}
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <nav
        aria-label="Account"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:hidden"
      >
        {PORTAL_NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                isActive
                  ? 'border-brand bg-brand text-white shadow-md shadow-brand/25'
                  : 'border-slate-200 bg-white text-ink hover:border-brand'
              }`
            }
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
