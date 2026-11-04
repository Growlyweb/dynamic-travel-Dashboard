import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import {
  apiLogin,
  apiFirebaseLogin,
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

// ── Default demo accounts ────────────────────────────────────────────────────
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
  const authProvider = backendUser?.authProvider || (backendUser?.firebaseUid ? 'firebase' : 'local')
  const hasPassword =
    typeof backendUser?.hasPassword === 'boolean'
      ? backendUser.hasPassword
      : authProvider !== 'firebase'

  return {
    id: backendUser?._id || backendUser?.id,
    name,
    email: backendUser?.email,
    role,
    phone: backendUser?.phone || null,
    avatar: backendUser?.avatar || null,
    isEmailVerified: backendUser?.isEmailVerified ?? backendUser?.emailVerified ?? false,
    authProvider,
    hasPassword,
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
  const saved = loadSession()
  const [currentUser, setCurrentUser] = useState(saved?.user || null)
  const [accessToken, setAccessToken] = useState(saved?.token || null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState('b2b')

  const refreshTimerRef = useRef(null)

  const applySession = useCallback((user, token) => {
    setCurrentUser(user)
    setAccessToken(token)
    saveSession(user, token)
  }, [])

  const updateCurrentUser = useCallback((patch) => {
    setCurrentUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...patch }
      saveSession(updated, accessToken)
      return updated
    })
  }, [accessToken])

  // ── Refresh access token using the httpOnly cookie ─────────────────────────
  const refresh = useCallback(async () => {
    try {
      const body = await apiRefresh()
      const user = mapUser(body.data?.user, body.data?.partner)
      const token = body.data?.accessToken
      if (token) applySession(user, token)
      return { user, token }
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
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const body = await apiMe(accessToken)
        if (cancelled) return
        const user = mapUser(body.data?.user, body.data?.partner)
        applySession(user, accessToken)
        scheduleRefresh(13 * 60)
      } catch (err) {
        if (cancelled) return
        // Stale token — clear it out cleanly
        setCurrentUser(null)
        setAccessToken(null)
        clearSession()
      }
    })()

    return () => { cancelled = true }
  }, [accessToken, applySession, scheduleRefresh])

  useEffect(() => () => { if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current) }, [])

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password, role = 'B2B', isDemo = false }) => {
    // 1-Click Quick Demo Login
    if (isDemo) {
      const demoCreds = role === 'B2B'
        ? { email: 'ajmaltravel@gmail.com', password: 'PartnerPass2025!' }
        : { email: 'sajjad.hossen@gmail.com', password: 'CustomerPass2025!' }

      try {
        const body = await apiLogin(demoCreds.email, demoCreds.password)
        const user = mapUser(body.data?.user, body.data?.partner)
        const token = body.data?.accessToken
        applySession(user, token)
        scheduleRefresh(body.data?.expiresIn ?? 900)
        return { success: true, user, role: user.role }
      } catch {
        // Fallback to local demo session if backend is momentarily offline
        const localUser = role === 'B2B' ? DEMO_B2B_PARTNER : DEMO_B2C_CUSTOMER
        applySession(localUser, null)
        return { success: true, user: localUser, role: localUser.role }
      }
    }

    // Standard Login
    try {
      const body = await apiLogin(email, password)
      const user = mapUser(body.data?.user, body.data?.partner)
      const token = body.data?.accessToken
      const expiresIn = body.data?.expiresIn ?? 900

      applySession(user, token)
      scheduleRefresh(expiresIn)

      return { success: true, user, role: user.role, needsVerification: false }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 403 && err.code === 'EMAIL_NOT_VERIFIED') {
          return { success: false, needsVerification: true, email, message: err.message }
        }
        return { success: false, message: err.message || 'Invalid email or password.', code: err.code }
      }
      return { success: false, message: 'Unable to connect to the authentication service.' }
    }
  }, [applySession, scheduleRefresh])

  const loginAsB2B = useCallback(() => login({ role: 'B2B', isDemo: true }), [login])
  const loginAsB2C = useCallback(() => login({ role: 'B2C', isDemo: true }), [login])

  // ── FIREBASE GOOGLE LOGIN (B2C) ──────────────────────────────────────────
  const loginWithFirebase = useCallback(async (idToken) => {
    try {
      const body = await apiFirebaseLogin(idToken)
      const user = mapUser(body.data?.user, body.data?.partner)
      const token = body.data?.accessToken
      if (token) {
        applySession(user, token)
        scheduleRefresh(body.data?.expiresIn || 13 * 60)
      }
      return { success: true, user, token }
    } catch (err) {
      if (err instanceof ApiError) {
        return { success: false, message: err.message, code: err.code }
      }
      return { success: false, message: err?.message || 'Firebase authentication failed.' }
    }
  }, [applySession, scheduleRefresh])

  // ── REGISTER (B2C) ─────────────────────────────────────────────────────────
  const register = useCallback(async ({ name, email, password, phone }) => {
    try {
      const body = await apiRegisterB2C({ name, email, password, ...(phone ? { phone } : {}) })
      return { success: true, needsVerification: true, email, message: body.message }
    } catch (err) {
      if (err instanceof ApiError) {
        return { success: false, message: err.message, code: err.code }
      }
      return { success: false, message: 'Network error. Please check your connection.' }
    }
  }, [])

  // ── REGISTER B2B ──────────────────────────────────────────────────────────
  const registerB2B = useCallback(async (fields, files = {}) => {
    try {
      const body = await apiRegisterB2B(fields, files)
      return { success: true, needsVerification: true, email: fields.email, message: body.message }
    } catch (err) {
      if (err instanceof ApiError) {
        return { success: false, message: err.message, code: err.code }
      }
      return { success: false, message: 'Network error. Please check your connection.' }
    }
  }, [])

  // ── VERIFY OTP ────────────────────────────────────────────────────────────
  const verifyOtp = useCallback(async (email, otp) => {
    try {
      const body = await apiVerifyOtp(email, otp)
      const user = mapUser(body.data?.user, body.data?.partner)
      const token = body.data?.accessToken
      const expiresIn = body.data?.expiresIn ?? 900
      applySession(user, token)
      scheduleRefresh(expiresIn)
      return { success: true, user }
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Network error.' }
    }
  }, [applySession, scheduleRefresh])

  // ── RESEND OTP ────────────────────────────────────────────────────────────
  const resendOtp = useCallback(async (email) => {
    try {
      await apiResendOtp(email)
      return { success: true }
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? err.message : 'Network error.' }
    }
  }, [])

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = useCallback(async (allDevices = false) => {
    try {
      if (accessToken) await apiLogout(accessToken, allDevices)
    } catch { /* ignore errors */ }
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current)
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
    updateCurrentUser,
    isAuthenticated: Boolean(currentUser),
    isB2BPartner: currentUser?.role === 'B2B',
    isAdmin: currentUser?.role === 'ADMIN',
    login,
    loginWithFirebase,
    loginAsB2B,
    loginAsB2C,
    register,
    registerB2B,
    verifyOtp,
    resendOtp,
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
