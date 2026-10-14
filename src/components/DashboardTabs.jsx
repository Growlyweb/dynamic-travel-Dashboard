import {
  User,
  FileText,
  Truck,
  ReceiptText,
  Headphones,
} from 'lucide-react'

export default function DashboardTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
    },
    {
      id: 'applications',
      label: 'My Applications',
      icon: FileText,
    },
    {
      id: 'pickup',
      label: 'Passport Pickup',
      icon: Truck,
    },
    {
      id: 'invoices',
      label: 'Invoices & Commission',
      icon: ReceiptText,
    },
    {
      id: 'support',
      label: 'Support',
      icon: Headphones,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/70 border border-slate-100 p-1.5 sm:p-2">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 xl:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0d2b59] text-white shadow-md shadow-navy/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-white' : 'text-slate-500'
                  }`}
                  strokeWidth={isActive ? 2.2 : 2}
                />
                <span className="whitespace-nowrap shrink-0">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
