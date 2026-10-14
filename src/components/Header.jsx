import { useState, useRef, useEffect } from 'react'
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  ShieldCheck,
  Building,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock,
  DollarSign,
} from 'lucide-react'
import Logo from './common/Logo'
import { PARTNER_INFO, TOP_NAV_ITEMS } from '../data/partnerData'

export default function Header({ onTabChange, activeTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const notifRef = useRef(null)
  const profileRef = useRef(null)

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const notifications = [
    {
      id: 1,
      title: 'Visa Application Approved',
      desc: 'Tanvir Ahmed (Malaysia Business Visa) has been approved by embassy.',
      time: '15 mins ago',
      unread: true,
      icon: CheckCircle2,
      iconColor: 'text-emerald-500 bg-emerald-50',
    },
    {
      id: 2,
      title: 'Passport Courier Scheduled',
      desc: 'Pickup #PKP-2025-018 rider Tariqul Islam is on the way to Gulshan-2.',
      time: '1 hour ago',
      unread: true,
      icon: Clock,
      iconColor: 'text-blue-500 bg-blue-50',
    },
    {
      id: 3,
      title: 'New Commission Credited',
      desc: '$320.00 commission for PKP-2025-0789 credited to your ledger.',
      time: '3 hours ago',
      unread: true,
      icon: DollarSign,
      iconColor: 'text-amber-500 bg-amber-50',
    },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 xl:gap-6 flex-nowrap">
          {/* Logo and Nav Items Container */}
          <div className="flex items-center gap-3 lg:gap-5 xl:gap-8 flex-nowrap shrink-0 min-w-0">
            <button
              onClick={() => onTabChange('applications')}
              className="focus:outline-none cursor-pointer shrink-0"
            >
              <Logo />
            </button>

            {/* Desktop Navigation - Always in ONE line */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 text-[13px] xl:text-[14px] font-medium text-slate-700 whitespace-nowrap shrink-0 flex-nowrap">
              {TOP_NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative group shrink-0"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-colors hover:text-[#0066cc] hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0 ${
                      activeDropdown === item.label ? 'text-[#0066cc]' : ''
                    }`}
                  >
                    <span className="whitespace-nowrap shrink-0">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066cc] transition-transform duration-200 group-hover:rotate-180 shrink-0" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-1.5 w-56 animate-fade-in z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                        {item.items.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setActiveDropdown(null)
                              if (sub.includes('Commission')) onTabChange('invoices')
                              else if (sub.includes('Tracking') || sub.includes('Visa')) onTabChange('applications')
                              else if (sub.includes('Agent Guidelines') || sub.includes('Portal')) onTabChange('profile')
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] transition-colors flex items-center justify-between whitespace-nowrap"
                          >
                            <span className="whitespace-nowrap">{sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 whitespace-nowrap flex-nowrap">
            {/* Quick Search */}
            <div className="relative shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-[#0066cc] hover:bg-slate-100 transition-colors shrink-0"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>


              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-50 animate-fade-in">
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:border-[#0066cc]">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search passports, visas, invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative shrink-0" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-[#0066cc] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="absolute 1 top-1 sm:top-1.5 right-1 sm:right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                      <span className="px-2 py-0.5 text-xs bg-rose-100 text-rose-700 rounded-full font-medium">3 unread</span>
                    </div>
                    <button className="text-xs text-[#0066cc] hover:underline font-medium">Mark all read</button>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((n) => {
                      const Icon = n.icon
                      return (
                        <div key={n.id} className="p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3">
                          <div className={`p-2 rounded-xl shrink-0 ${n.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setNotificationsOpen(false)
                        onTabChange('applications')
                      }}
                      className="text-xs text-[#0066cc] font-medium hover:underline"
                    >
                      View all partner activity →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative shrink-0" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 sm:gap-2.5 pl-1 sm:pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer select-none whitespace-nowrap shrink-0"
              >
                {/* Circular Navy Badge with AR */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0d2b59] text-white font-semibold text-xs sm:text-sm flex items-center justify-center shadow-xs shrink-0">
                  {PARTNER_INFO.initials}
                </div>
                {/* Name & Role - Always on one line */}
                <div className="hidden sm:flex flex-col text-left whitespace-nowrap shrink-0">
                  <span className="text-xs font-bold text-slate-800 leading-tight whitespace-nowrap">
                    {PARTNER_INFO.name}
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight whitespace-nowrap">
                    Partner
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-800">{PARTNER_INFO.name}</p>
                    <p className="text-[11px] text-slate-500">{PARTNER_INFO.agencyName}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      {PARTNER_INFO.partnerId}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false)
                      onTabChange('profile')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile & Agency</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false)
                      onTabChange('invoices')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
                  >
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span>Invoices & Commission</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false)
                      onTabChange('support')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
                  >
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>Partner Support Desk</span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => setProfileMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-3 space-y-1 animate-fade-in">
            {TOP_NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (item.label === 'Support') onTabChange('support')
                    else if (item.label === 'B2B Partner') onTabChange('profile')
                    else onTabChange('applications')
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0066cc] rounded-lg"
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
