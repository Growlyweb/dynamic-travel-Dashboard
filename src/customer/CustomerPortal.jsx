import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { useAuth } from '@/context/AuthContext'
import PortalSidebar from './components/PortalSidebar'

export default function CustomerPortal({ onOpenLogin, onNavigateToDashboard }) {
  const { currentUser } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: pathname }} />
  }

  if (currentUser.role === 'B2B') {
    return <Navigate to="/b2b" replace />
  }

  return (
    <div className="min-h-screen bg-canvas font-sans text-ink">
      <Header onOpenLogin={onOpenLogin} onNavigateToDashboard={onNavigateToDashboard} />

      <div className="mx-auto grid max-w-[1680px] gap-5 px-4 pt-6 sm:px-6 lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-6 lg:pt-7">
        <PortalSidebar />
        <main className="min-w-0 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
