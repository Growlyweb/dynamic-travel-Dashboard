import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Header, Footer } from '@/components/layout'
import {
  HomePage,
  LoginPage,
  VisaPage,
  ContactPage,
  PartnerRegisterPage,
  TourPackagePage,
  TourSearchResultsPage,
  TourDetailPage,
} from '@/pages'
import GalleryPage from '@/pages/GalleryPage'
import AuthModal from './components/AuthModal'
import B2BDashboard from './b2b/B2BDashboard'
import { CustomerProfileProvider } from './context/CustomerProfileContext'
import CustomerPortal from './customer/CustomerPortal'
import CustomToursPage from './customer/pages/CustomToursPage'
import OverviewPage from './customer/pages/OverviewPage'
import SavedItemsPage from './customer/pages/SavedItemsPage'
import SettingsPage from './customer/pages/SettingsPage'
import TourPackagesPage from './customer/pages/TourPackagesPage'
import VisaApplicationsPage from './customer/pages/VisaApplicationsPage'

function ProfileRoute({ currentUser, onNavigateToStorefront, onLogout }) {
  if (currentUser?.role === 'B2C') {
    return <Navigate to="/account" replace />
  }

  return (
    <B2BDashboard
      onNavigateToStorefront={onNavigateToStorefront}
      onLogout={onLogout}
      currentUser={currentUser}
      initialTab="profile"
    />
  )
}

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

function GalleryPageView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <GalleryPage />

      <Footer />
    </div>
  )
}

function TourPackagesView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <TourPackagePage />

      <Footer />
    </div>
  )
}

function TourSearchResultsView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <TourSearchResultsPage />

      <Footer />
    </div>
  )
}

function TourDetailPageView({ onOpenLogin, onNavigateToDashboard }) {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Main Storefront Header */}
      <Header
        onOpenLogin={onOpenLogin}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      <TourDetailPage />

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
    closeLoginModal,
  } = useAuth()

  // Handle hash-based deep linking e.g. #/b2b or #b2b
  useEffect(() => {
    if (window.location.hash === '#/b2b' || window.location.hash === '#b2b') {
      navigate('/b2b', { replace: true })
    }
  }, [navigate])

  return (
    <CustomerProfileProvider key={currentUser?.id ?? 'guest'} user={currentUser}>
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

        {/* 2b. Gallery Page (tour moments + successful visa stories) */}
        <Route
          path="/gallery"
          element={
            <GalleryPageView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />

        {/* 2. Dedicated Auth Pages */}
        <Route path="/login" element={<LoginPage initialMode="login" />} />
        <Route path="/register" element={<LoginPage initialMode="register" />} />

        {/* 2c. Dedicated B2B Partner Registration Page */}
        <Route path="/register-partner" element={<PartnerRegisterPage />} />

        {/* 2d. Tour Packages overview + city search results */}
        <Route
          path="/tour-packages"
          element={
            <TourPackagesView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />
        <Route
          path="/tour-packages/search"
          element={
            <TourSearchResultsView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />
        <Route
          path="/tour-packages/delhi-city-tour"
          element={
            <TourDetailPageView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />
        <Route
          path="/tour-packages/:slug"
          element={
            <TourDetailPageView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />
        <Route
          path="/activity/:slug"
          element={
            <TourDetailPageView
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        />

        {/* 3. Customer (B2C) Portal */}
        <Route
          path="/account"
          element={
            <CustomerPortal
              onOpenLogin={() => navigate('/login')}
              onNavigateToDashboard={() => navigate('/b2b')}
            />
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="visa-applications" element={<VisaApplicationsPage />} />
          <Route path="tour-packages" element={<TourPackagesPage />} />
          <Route path="custom-tours" element={<CustomToursPage />} />
          <Route path="saved" element={<SavedItemsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 4. Integrated B2B Partner Dashboard & Profile (customers go to /account) */}
        {['/b2b', '/profile', '/my-profile'].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <ProfileRoute
                currentUser={currentUser}
                onNavigateToStorefront={() => navigate('/')}
                onLogout={() => {
                  logout()
                  navigate('/')
                }}
              />
            }
          />
        ))}

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
    </CustomerProfileProvider>
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