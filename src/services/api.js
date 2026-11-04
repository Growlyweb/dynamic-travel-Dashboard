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
  const { headers, ...restOptions } = options

  const res = await fetch(url, {
    credentials: 'include', // always send/receive the httpOnly refresh cookie
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
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
const patch = (path, payload, headers) =>
  request(path, { method: 'PATCH', body: JSON.stringify(payload), headers })
const del = (path, headers) => request(path, { method: 'DELETE', headers })

// Attach the access token to protected requests
function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const toQueryString = (params = {}) => {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.append(k, v)
  })
  const s = q.toString()
  return s ? `?${s}` : ''
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
export const apiFirebaseLogin = (idToken) =>
  post('/auth/firebase', { idToken })

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
  post(
    '/auth/change-password',
    { ...(currentPassword ? { currentPassword } : {}), newPassword },
    authHeaders(token)
  )

// ============================================================
// B2B PARTNER ENDPOINTS
// ============================================================

/** GET /api/b2b/overview */
export const apiGetB2BOverview = (token) => get('/b2b/overview', authHeaders(token))

/** GET /api/b2b/profile */
export const apiGetB2BProfile = (token) => get('/b2b/profile', authHeaders(token))

/** PATCH /api/b2b/profile */
export const apiUpdateB2BProfile = (payload, token) =>
  patch('/b2b/profile', payload, authHeaders(token))

/** GET /api/b2b/applications */
export const apiGetB2BApplications = (query, token) =>
  get(`/b2b/applications${toQueryString(query)}`, authHeaders(token))

/** POST /api/b2b/applications */
export const apiCreateB2BApplication = (payload, token) =>
  post('/b2b/applications', payload, authHeaders(token))

/** GET /api/b2b/applications/:id */
export const apiGetB2BApplication = (id, token) =>
  get(`/b2b/applications/${id}`, authHeaders(token))

/** GET /api/b2b/pickups */
export const apiGetB2BPickups = (query, token) =>
  get(`/b2b/pickups${toQueryString(query)}`, authHeaders(token))

/** POST /api/b2b/pickups */
export const apiCreateB2BPickup = (payload, token) =>
  post('/b2b/pickups', payload, authHeaders(token))

/** GET /api/b2b/commissions */
export const apiGetB2BCommissions = (token) =>
  get('/b2b/commissions', authHeaders(token))

/** GET /api/b2b/withdrawals */
export const apiGetB2BWithdrawals = (query, token) =>
  get(`/b2b/withdrawals${toQueryString(query)}`, authHeaders(token))

/** POST /api/b2b/withdrawals */
export const apiCreateB2BWithdrawal = (payload, token) =>
  post('/b2b/withdrawals', payload, authHeaders(token))

/** GET /api/b2b/documents */
export const apiGetB2BDocuments = (token) =>
  get('/b2b/documents', authHeaders(token))

// ============================================================
// B2C CUSTOMER ENDPOINTS
// ============================================================

/** GET /api/b2c/overview */
export const apiGetB2COverview = (token) =>
  get('/b2c/overview', authHeaders(token))

/** GET /api/b2c/profile */
export const apiGetB2CProfile = (token) =>
  get('/b2c/profile', authHeaders(token))

/** PATCH /api/b2c/profile */
export const apiUpdateB2CProfile = (payload, token) =>
  patch('/b2c/profile', payload, authHeaders(token))

/** GET /api/b2c/visa-applications */
export const apiGetB2CVisaApplications = (query, token) =>
  get(`/b2c/visa-applications${toQueryString(query)}`, authHeaders(token))

/** POST /api/b2c/visa-applications */
export const apiCreateB2CVisaApplication = (payload, token) =>
  post('/b2c/visa-applications', payload, authHeaders(token))

/** GET /api/b2c/tours/bookings */
export const apiGetB2CTourBookings = (token) =>
  get('/b2c/tours/bookings', authHeaders(token))

/** POST /api/b2c/tours/bookings */
export const apiCreateB2CTourBooking = (payload, token) =>
  post('/b2c/tours/bookings', payload, authHeaders(token))

/** GET /api/tours/custom-requests (Customer's own custom tours) */
export const apiGetB2CCustomTours = (query, token) =>
  get(`/tours/custom-requests${toQueryString(query)}`, authHeaders(token))

/** POST /api/tours/custom-requests (Create custom tour request) */
export const apiCreateB2CCustomTour = (payload, token) =>
  post('/tours/custom-requests', payload, authHeaders(token))

/** GET /api/b2c/saved */
export const apiGetB2CSavedItems = (token) =>
  get('/b2c/saved', authHeaders(token))

/** POST /api/b2c/saved */
export const apiAddB2CSavedItem = (payload, token) =>
  post('/b2c/saved', payload, authHeaders(token))

/** DELETE /api/b2c/saved/:id */
export const apiRemoveB2CSavedItem = (id, token) =>
  del(`/b2c/saved/${id}`, authHeaders(token))

// ============================================================
// PUBLIC STOREFRONT ENDPOINTS
// ============================================================

/** GET /api/visa/public/countries */
export const apiGetPublicVisaCountries = () =>
  get('/visa/public/countries')

/** GET /api/visa/public/types */
export const apiGetPublicVisaTypes = () =>
  get('/visa/public/types')

/** GET /api/tours */
export const apiGetPublicTours = (query) =>
  get(`/tours${toQueryString(query)}`)

/** GET /api/tours/:id */
export const apiGetPublicTourDetail = (id) =>
  get(`/tours/${id}`)

/** GET /api/tour-categories */
export const apiGetTourCategories = () =>
  get('/tour-categories')

/** POST /api/contact */
export const apiSubmitContact = (payload) =>
  post('/contact', payload)

/** POST /api/marketing/subscribers */
export const apiSubscribeNewsletter = (email) =>
  post('/marketing/subscribers', { email })

export { ApiError }
