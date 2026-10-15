import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// Storefront components
import Header from './components/Header'
import Hero from './components/Hero'
import SearchWidget from './components/SearchWidget'
import FeaturesBar from './components/FeaturesBar'
import VisaSection from './components/VisaSection'
import TourPackages from './components/TourPackages'
import ServicesSection from './components/ServicesSection'
import Footer from './components/footer/Footer'
import AuthModal from './components/AuthModal'

// B2B Dashboard
import B2BDashboard from './b2b/B2BDashboard'
import { LayoutDashboard, ArrowRight, ShieldCheck } from 'lucide-react'

function StorefrontView({ onOpenLogin, onNavigateToDashboard }) {
  const { currentUser, isB2BPartner, logout } = useAuth()

  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Active B2B Partner Portal Notification Bar */}
      {isB2BPartner && (
        <aside
          aria-label="Partner Session Active"
          className="bg-gradient-to-r from-[#0d2b59] via-[#1565c0] to-[#0d2b59] text-white px-4 py-2 text-xs font-medium shadow-inner"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="size-4 text-accent" />
              <span>
                Active B2B Partner Session:{' '}
                <strong className="text-white font-bold">{currentUser?.name}</strong>{' '}
                <span className="text-white/70 hidden sm:inline">
                  ({currentUser?.agencyName})
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateToDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-primary hover:bg-tint font-bold text-[11px] shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <LayoutDashboard className="size-3.5 text-primary" />
                <span>Go to B2B Dashboard</span>
                <ArrowRight className="size-3" />
              </button>

              <button
                type="button"
                onClick={logout}
                className="text-white/80 hover:text-white underline text-[11px] cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <main>
        <Hero />
        <SearchWidget />
        <FeaturesBar />
        <VisaSection />
        <TourPackages />
        <ServicesSection />
      </main>

      <Footer />
    </div>
  )
}

function AppContent() {
  const navigate = useNavigate()
  const {
    currentUser,
    logout,
    isAuthModalOpen,
    authModalDefaultTab,
    openLoginModal,
    closeLoginModal,
  } = useAuth()

  // Handle hash-based deep linking e.g. #/b2b or #b2b
  useEffect(() => {
    if (window.location.hash === '#/b2b' || window.location.hash === '#b2b') {
      navigate('/b2b', { replace: true })
    }
  }, [navigate])

  return (
    <>
      <Routes>
        {/* 1. Public Storefront Home */}
        <Route
          path="/"
          element={
            <StorefrontView
              onOpenLogin={openLoginModal}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />

        {/* 2. Integrated B2B Partner Dashboard */}
        <Route
          path="/b2b"
          element={
            <B2BDashboard
              onNavigateToStorefront={() => navigate('/')}
              onLogout={() => {
                logout()
                navigate('/')
              }}
              currentUser={currentUser}
            />
          }
        />

        {/* 3. Backward compatible aliases */}
        <Route path="/b2b-dashboard" element={<Navigate to="/b2b" replace />} />
        <Route path="/dashboard" element={<Navigate to="/b2b" replace />} />

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Interactive Global Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeLoginModal}
        defaultTab={authModalDefaultTab}
        onRedirectToDashboard={() => navigate('/b2b')}
      />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}
