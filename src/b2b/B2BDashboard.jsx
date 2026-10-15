import { useState } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import DashboardTabs from './components/DashboardTabs'
import ApplicationsView from './components/Applications/ApplicationsView'
import PassportPickupView from './components/PassportPickup/PassportPickupView'
import InvoicesCommissionView from './components/InvoicesCommission/InvoicesCommissionView'
import ProfileView from './components/Profile/ProfileView'
import SupportView from './components/Support/SupportView'

// Modals
import NewApplicationModal from './components/Applications/NewApplicationModal'
import ApplicationDetailModal from './components/Applications/ApplicationDetailModal'
import NewPickupModal from './components/PassportPickup/NewPickupModal'
import PickupDetailModal from './components/PassportPickup/PickupDetailModal'
import CommissionDetailModal from './components/InvoicesCommission/CommissionDetailModal'
import CommissionReportModal from './components/InvoicesCommission/CommissionReportModal'

export default function B2BDashboard({
  onNavigateToStorefront,
  onLogout,
  currentUser,
}) {
  // Navigation State: 'applications' | 'pickup' | 'invoices' | 'profile' | 'support'
  const [activeTab, setActiveTab] = useState('applications')

  // Modals state
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)

  const [isNewPickupModalOpen, setIsNewPickupModalOpen] = useState(false)
  const [selectedPickup, setSelectedPickup] = useState(null)

  const [selectedCommission, setSelectedCommission] = useState(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex flex-col font-sans">
      {/* 1. Global Navigation Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        onNavigateToStorefront={onNavigateToStorefront}
        onLogout={onLogout}
        currentUser={currentUser}
      />

      {/* 2. Panoramic Partner Hero Banner */}
      <HeroBanner activeTab={activeTab} currentUser={currentUser} />

      {/* 3. Floating 5-Tab Dashboard Navigation Bar */}
      <DashboardTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
        }}
      />

      {/* 4. Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'applications' && (
          <div className="animate-fade-in">
            <ApplicationsView
              onOpenNewModal={() => setIsNewAppModalOpen(true)}
              onSelectApplication={(app) => setSelectedApplication(app)}
            />
          </div>
        )}

        {activeTab === 'pickup' && (
          <div className="animate-fade-in">
            <PassportPickupView
              onOpenNewPickupModal={() => setIsNewPickupModalOpen(true)}
              onSelectPickup={(pickup) => setSelectedPickup(pickup)}
            />
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="animate-fade-in">
            <InvoicesCommissionView
              onSelectCommission={(row) => setSelectedCommission(row)}
              onOpenSupportModal={() => setActiveTab('support')}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <ProfileView />
          </div>
        )}

        {activeTab === 'support' && (
          <div className="animate-fade-in">
            <SupportView />
          </div>
        )}
      </main>

      {/* 5. Minimal Partner Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} ABL Travels Ltd. All Rights Reserved. B2B Partner Portal.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            {onNavigateToStorefront && (
              <>
                <button
                  onClick={onNavigateToStorefront}
                  className="hover:text-[#0066cc] font-semibold text-[#0066cc]"
                >
                  ← Return to Storefront
                </button>
                <span>•</span>
              </>
            )}
            <button onClick={() => setActiveTab('support')} className="hover:text-[#0066cc]">
              Partner Helpdesk
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('invoices')} className="hover:text-[#0066cc]">
              Commission Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('profile')} className="hover:text-[#0066cc]">
              Terms of Agency
            </button>
          </div>
        </div>
      </footer>

      {/* 6. Interactive Dialogs & Modals */}
      <NewApplicationModal
        isOpen={isNewAppModalOpen}
        onClose={() => setIsNewAppModalOpen(false)}
        onCreated={() => {}}
      />

      <ApplicationDetailModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />

      <NewPickupModal
        isOpen={isNewPickupModalOpen}
        onClose={() => setIsNewPickupModalOpen(false)}
        onCreated={() => {}}
      />

      <PickupDetailModal
        pickup={selectedPickup}
        onClose={() => setSelectedPickup(null)}
      />

      <CommissionDetailModal
        commission={selectedCommission}
        onClose={() => setSelectedCommission(null)}
      />

      <CommissionReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  )
}
