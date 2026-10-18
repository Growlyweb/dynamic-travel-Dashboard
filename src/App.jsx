import { Suspense, lazy, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Header, Footer } from '@/components/layout'
import { HomePage, LoginPage, VisaPage, ContactPage } from '@/pages'
import AuthModal from './components/AuthModal'
import RequireAuth from './components/auth/RequireAuth'
import B2BDashboard from './b2b/B2BDashboard'

// Opened only from the SMS link, so it stays out of the main bundle
const VisaStatusPage = lazy(() => import('@/pages/VisaStatusPage'))

function StorefrontView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <HomePage />

      <Footer />
    </div>
  )
}

function VisaPageView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <VisaPage />

      <Footer />
    </div>
  )
}

function ContactPageView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <ContactPage />
    </div>
  )
}

function VisaStatusView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <Suspense fallback={null}>
        <VisaStatusPage />
      </Suspense>
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
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />

        {/* 2. Dedicated Visa Explorer Page */}
        <Route
          path="/visa"
          element={
            <VisaPageView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />

        {/* 3. Dedicated Contact Us Page */}
        <Route
          path="/contact"
          element={
            <ContactPageView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />

        {/* Visa status tracking: login required, reached only from the SMS link, never linked on the site */}
        <Route
          path="/visa-status/:linkRef"
          element={
            <RequireAuth>
              <VisaStatusView
                onOpenLogin={() => navigate('/login')}
                onNavigateToDashboard={() => navigate('/b2b')}
              />
            </RequireAuth>
          }
        />

        {/* 2. Dedicated Auth Pages */}
        <Route path="/login" element={<LoginPage initialMode="login" />} />
        <Route path="/register" element={<LoginPage initialMode="register" />} />

        {/* 3. Integrated B2B Partner Dashboard & Profile */}
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
              initialTab="profile"
            />
          }
        />

        <Route
          path="/profile"
          element={
            <B2BDashboard
              onNavigateToStorefront={() => navigate('/')}
              onLogout={() => {
                logout()
                navigate('/')
              }}
              currentUser={currentUser}
              initialTab="profile"
            />
          }
        />

        <Route
          path="/my-profile"
          element={
            <B2BDashboard
              onNavigateToStorefront={() => navigate('/')}
              onLogout={() => {
                logout()
                navigate('/')
              }}
              currentUser={currentUser}
              initialTab="profile"
            />
          }
        />

        {/* 4. Backward compatible aliases */}
        <Route path="/b2b-dashboard" element={<Navigate to="/profile" replace />} />
        <Route path="/dashboard" element={<Navigate to="/profile" replace />} />

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
