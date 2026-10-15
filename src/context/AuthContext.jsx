import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Default demo partner data matching the B2B Dashboard
export const DEMO_B2B_PARTNER = {
  id: 'usr_b2b_1089',
  name: 'Abdur Rahman',
  email: 'partner@abltravels.com',
  role: 'B2B',
  initials: 'AR',
  agencyName: 'Green Bengal Tours & Travels Ltd.',
  partnerId: 'ABL-B2B-1089',
  badge: 'Platinum Partner',
  phone: '+880 1711-234567',
  commissionRate: '12%',
  ledgerBalance: '$4,850.00',
  city: 'Dhaka, Bangladesh',
}

export const DEMO_B2C_CUSTOMER = {
  id: 'usr_b2c_2045',
  name: 'Tanvir Hossain',
  email: 'traveler@gmail.com',
  role: 'B2C',
  initials: 'TH',
  phone: '+880 1812-345678',
}

const STORAGE_KEY = 'abl_travels_auth_session'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState('b2b') // 'b2b' | 'customer'

  // Persist session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (e) {
      console.warn('Failed to persist auth to localStorage', e)
    }
  }, [currentUser])

  /**
   * Login method
   * Handles B2B partner login, customer login, and optional backend API authentication
   */
  const login = async ({ email, password, role = 'B2B', isDemo = false }) => {
    // If backend endpoint is available, we try it first
    if (!isDemo && email && password) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        if (res.ok) {
          const data = await res.json()
          const backendUser = data.data?.user || data.user
          const mappedRole = (backendUser?.role || role).toUpperCase()
          const userSession = {
            id: backendUser?._id || backendUser?.id || 'usr_' + Date.now(),
            name: backendUser?.name || (mappedRole === 'B2B' ? DEMO_B2B_PARTNER.name : 'User'),
            email: backendUser?.email || email,
            role: mappedRole,
            agencyName: backendUser?.partner?.companyName || DEMO_B2B_PARTNER.agencyName,
            partnerId: backendUser?.partner?.partnerCode || DEMO_B2B_PARTNER.partnerId,
            initials: (backendUser?.name || 'AR')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
            badge: mappedRole === 'B2B' ? 'Verified B2B Partner' : 'Customer',
            token: data.data?.session?.accessToken || data.token,
          }
          setCurrentUser(userSession)
          return { success: true, user: userSession, role: mappedRole }
        }
      } catch {
        // Backend not running; gracefully fall back to local authenticated state
      }
    }

    // Client-side authentication / Demo simulation
    let userSession
    if (role === 'B2B') {
      userSession = {
        ...DEMO_B2B_PARTNER,
        email: email || DEMO_B2B_PARTNER.email,
        name: email && email.includes('@') ? (email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())) : DEMO_B2B_PARTNER.name,
      }
    } else {
      userSession = {
        ...DEMO_B2C_CUSTOMER,
        email: email || DEMO_B2C_CUSTOMER.email,
      }
    }

    setCurrentUser(userSession)
    return { success: true, user: userSession, role }
  }

  const logout = () => {
    setCurrentUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const openLoginModal = (tab = 'b2b') => {
    setAuthModalDefaultTab(tab)
    setIsAuthModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsAuthModalOpen(false)
  }

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isB2BPartner: currentUser?.role === 'B2B',
    login,
    logout,
    isAuthModalOpen,
    authModalDefaultTab,
    openLoginModal,
    closeLoginModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
