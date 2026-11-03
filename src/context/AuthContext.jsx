import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import {
  apiLogin,
  apiRegisterB2C,
  apiRegisterB2B,
  apiVerifyOtp,
  apiResendOtp,
  apiRefresh,
  apiLogout,
  apiMe,
  apiForgotPassword,
  apiResetPassword,
  ApiError,
} from '../services/api'

const AuthContext = createContext(null)

// Default demo partner data matching the B2B Dashboard
export const DEMO_B2B_PARTNER = {
  id: 'usr_b2b_1089',
  name: 'Ajmal Travel Agency',
  email: 'ajmaltravel@gmail.com',
  role: 'B2B',
  initials: 'A',
  agencyName: 'Ajmal Travel Agency',
  partnerId: 'ABL-B2B-1089',
  badge: 'B2B Partner',
  phone: '+880 1711-234567',
  commissionRate: '12%',
  ledgerBalance: '$4,850.00',
  city: 'Dhaka, Bangladesh',
}

export const DEMO_B2C_CUSTOMER = {
  id: 'usr_b2c_2045',
  name: 'Md. Sajjad Hossen',
  email: 'sajjad.hossen@gmail.com',
  role: 'B2C',
  initials: 'SH',
  avatar: '/images/users/sajjad-avatar.jpg',
  phone: '+880 1812-345678',
}

// ── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = 'abl_travels_auth_session'

/**
 * Check if a string looks like a valid, unexpired JWT.
 */
function isValidJwt(token) {
  if (typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  try {
    const payload = JSON.parse(atob(parts[1]))
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false // Token is already expired
    }
    return true
  } catch {
    return false
  }
}

function saveSession(user, token) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
  } catch { /* ignore quota errors */ }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Backward compatibility for legacy session format
    if (parsed && !parsed.user && parsed.email) {
      const valid = isValidJwt(parsed.token) ? parsed.token : null
      return { user: parsed, token: valid }
    }
    if (parsed?.token && !isValidJwt(parsed.token)) {
      // Clear out fake or legacy non-JWT tokens so they don't cause 401s on mount
      parsed.token = null
    }
    return parsed
  } catch {
    return null
  }
}

function clearSession() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
}

// ── User shape helpers ───────────────────────────────────────────────────────
function mapUser(backendUser, partner = null) {
  const name = backendUser?.name || backendUser?.email || 'User'
  const role = (backendUser?.role || 'B2C').toUpperCase()
  return {
    id: backendUser?._id || backendUser?.id,
    name,
    email: backendUser?.email,
    role,
    phone: backendUser?.phone || null,
    avatar: backendUser?.avatar || null,
    isEmailVerified: backendUser?.isEmailVerified ?? backendUser?.emailVerified ?? false,
    initials: name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
    badge: role === 'B2B' ? 'B2B Partner' : role === 'ADMIN' ? 'Admin' : 'Customer',
    agencyName: partner?.companyName || (role === 'B2B' ? DEMO_B2B_PARTNER.agencyName : null),
    partnerId: partner?.licenseNo || partner?.partnerCode || (role === 'B2B' ? DEMO_B2B_PARTNER.partnerId : null),
    commissionRate: partner?.commissionRate ? `${partner.commissionRate}%` : (role === 'B2B' ? '12%' : null),
    partnerStatus: partner?.approvalStatus || partner?.status || null,
  }
}

// ── Refresh token timer ──────────────────────────────────────────────────────
const REFRESH_BEFORE_MS = 2 * 60 * 1000

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      // Refresh cookie expired or absent — cleanly reset auth state without logging errors
      setCurrentUser(null)
      setAccessToken(null)
      clearSession()
      return null
    }
  }, [applySession])

  // ── Schedule the next token refresh ───────────────────────────────────────
  const scheduleRefresh = useCallback((expiresInSeconds) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
    const delay = Math.max((expiresInSeconds * 1000) - REFRESH_BEFORE_MS, 5000)
    refreshTimerRef.current = setTimeout(() => refresh(), delay)
  }, [refresh])

  // ── On mount: validate stored session ─────────────────────────────────────
  useEffect(() => {
    if (!accessToken || !isValidJwt(accessToken)) {
      if (accessToken && !isValidJwt(accessToken)) {
        setAccessToken(null)
        clearSession()
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
        // Fallback to local demo session if backend is momentarily offline
        const localUser = role === 'B2B' ? DEMO_B2B_PARTNER : DEMO_B2C_CUSTOMER
        applySession(localUser, null)
        return { success: true, user: localUser, role: localUser.role }
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
    setAccessToken(null)
    clearSession()
  }, [accessToken])

  // ── FORGOT PASSWORD ───────────────────────────────────────────────────────
  const forgotPassword = useCallback(async (email) => {
    try {
      await apiForgotPassword(email)
      return { success: true }
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Network error.' }
    }
  }, [])

  // ── RESET PASSWORD ────────────────────────────────────────────────────────
  const resetPassword = useCallback(async (email, token, newPassword) => {
    try {
      await apiResetPassword(email, token, newPassword)
      return { success: true }
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Network error.' }
    }
  }, [])

  // ── MODAL HELPERS ─────────────────────────────────────────────────────────
  const openLoginModal = useCallback((tab = 'b2b') => {
    setAuthModalDefaultTab(tab)
    setIsAuthModalOpen(true)
  }, [])

  const closeLoginModal = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])

  const value = {
    currentUser,
    accessToken,
    isAuthenticated: Boolean(currentUser),
    isB2BPartner: currentUser?.role === 'B2B',
    isAdmin: currentUser?.role === 'ADMIN',
    login,
    logout,
    refresh,
    forgotPassword,
    resetPassword,
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
