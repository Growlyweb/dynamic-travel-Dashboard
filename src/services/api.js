/**
 * api.js — Centralized API client for dynamic-travel-backend
 *
 * All requests go through /api (proxied to http://localhost:5000 in dev).
 * The backend sets the refresh token as an httpOnly cookie on login/refresh,
 * so we always pass credentials: 'include'.
 */

const BASE = '/api'

class ApiError extends Error {
  constructor(status, message, data = {}) {
    super(message)
    this.status = status
    this.data = data
    this.code = data?.code || null
  }
}

async function request(path, options = {}) {
  const url = `${BASE}${path}`

  const res = await fetch(url, {
    credentials: 'include', // always send/receive the httpOnly refresh cookie
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  let body
  try {
    body = await res.json()
  } catch {
    body = {}
  }

  if (!res.ok) {
    throw new ApiError(res.status, body?.message || `HTTP ${res.status}`, body?.data || {})
  }

  return body
}

// ---- Helpers ----
const get = (path, headers) => request(path, { method: 'GET', headers })
const post = (path, payload, headers) =>
  request(path, { method: 'POST', body: JSON.stringify(payload), headers })
const del = (path, headers) => request(path, { method: 'DELETE', headers })

// Attach the access token to protected requests
function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ============================================================
// AUTH ENDPOINTS
// ============================================================

/** POST /api/auth/login → { success, message, data: { accessToken, expiresIn, user } } */
export const apiLogin = (email, password) => post('/auth/login', { email, password })

/** POST /api/auth/register  (B2C customer) */
export const apiRegisterB2C = (payload) => post('/auth/register', payload)

/** POST /api/auth/b2b/register  (multipart — partner + documents) */
export async function apiRegisterB2B(payload, files = {}) {
  const form = new FormData()
  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null) form.append(k, v)
  })
  if (files.tradeLicense) form.append('tradeLicense', files.tradeLicense)
  if (files.businessCard) form.append('businessCard', files.businessCard)
  if (files.otherDocuments) form.append('otherDocuments', files.otherDocuments)

  const res = await fetch(`${BASE}/auth/b2b/register`, {
    method: 'POST',
    credentials: 'include',
    body: form,
    // Do NOT set Content-Type — browser adds the boundary automatically for multipart
  })

  let body
  try {
    body = await res.json()
  } catch {
    body = {}
  }
  if (!res.ok) throw new ApiError(res.status, body?.message || `HTTP ${res.status}`, body?.data || {})
  return body
}

/** POST /api/auth/verify-otp */
export const apiVerifyOtp = (email, otp) => post('/auth/verify-otp', { email, otp })

/** POST /api/auth/resend-otp */
export const apiResendOtp = (email) => post('/auth/resend-otp', { email })

/** POST /api/auth/firebase  (B2C Google sign-in) */
export const apiFirebaseLogin = (idToken, role = 'B2C') =>
  post('/auth/firebase', { idToken, role })

/** POST /api/auth/refresh  (no body needed — refresh token is the httpOnly cookie) */
export const apiRefresh = () => post('/auth/refresh', {})

/** POST /api/auth/logout */
export const apiLogout = (token, allDevices = false) =>
  post('/auth/logout', { allDevices }, authHeaders(token))

/** GET /api/auth/me */
export const apiMe = (token) => get('/auth/me', authHeaders(token))

/** POST /api/auth/forgot-password */
export const apiForgotPassword = (email) => post('/auth/forgot-password', { email })

/** POST /api/auth/verify-reset-token */
export const apiVerifyResetToken = (email, token) =>
  post('/auth/verify-reset-token', { email, token })

/** POST /api/auth/reset-password */
export const apiResetPassword = (email, token, newPassword) =>
  post('/auth/reset-password', { email, token, newPassword })

/** POST /api/auth/change-password */
export const apiChangePassword = (currentPassword, newPassword, token) =>
  post('/auth/change-password', { currentPassword, newPassword }, authHeaders(token))

export { ApiError }

