/**
 * Visa status lookup. The UI talks to these three functions:
 *
 *   checkLink(ref)                                  -> { valid, demoHint? }
 *   sendOtp({ ref, passportNo, phone })             -> { resendInSeconds }
 *   verifyOtp({ ref, passportNo, phone, otp })      -> VisaStatusResult
 *
 * VisaStatusResult:
 *   status        key of VISA_STATUS_CONFIG ('submitted', 'processing', 'approved', etc.)
 *   applicant     { fullName, passportNo, phone }
 *   country       { code, name }
 *   visaType, entryType, applicationNo, submittedAt, processingTime
 *   events        ISO date of each stage reached, keyed by stage key
 */

export class VisaStatusError extends Error {
  constructor(code, { retryAfter } = {}) {
    super(code)
    this.name = 'VisaStatusError'
    this.code = code
    this.retryAfter = retryAfter
  }
}

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

const BASE = '/api/visa/public/status'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
  } catch {
    throw new VisaStatusError('SERVICE_UNAVAILABLE')
  }

  let body = {}
  try {
    body = await res.json()
  } catch {
    body = {}
  }

  if (!res.ok) {
    const code = body?.data?.code || body?.code || (res.status === 404 ? 'NOT_FOUND' : res.status === 429 ? 'TOO_MANY_ATTEMPTS' : 'SERVICE_UNAVAILABLE')
    const retryAfter = body?.data?.retryAfter || (res.headers.get('retry-after') ? parseInt(res.headers.get('retry-after'), 10) : undefined)
    throw new VisaStatusError(code, { retryAfter })
  }

  return body.data
}

export const checkLink = async (ref) => {
  if (isDemoMode) {
    const mock = (await import('./visaStatus.mock')).mockVisaStatusApi
    return mock.checkLink(ref)
  }
  return request(`/link/${encodeURIComponent(ref)}`, { method: 'GET' })
}

export const sendOtp = async (params) => {
  if (isDemoMode) {
    const mock = (await import('./visaStatus.mock')).mockVisaStatusApi
    return mock.sendOtp(params)
  }
  return request('/otp', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const verifyOtp = async (params) => {
  if (isDemoMode) {
    const mock = (await import('./visaStatus.mock')).mockVisaStatusApi
    return mock.verifyOtp(params)
  }
  return request('/verify', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
