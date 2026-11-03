import { createContext, useContext, useState } from 'react'
import { splitPhone } from '@/constants/dialCodes'
import { PREFERENCE_DEFAULTS, PROFILE_DEFAULTS } from '@/customer/data/customerData'

const CustomerProfileContext = createContext(null)

const storageKey = (userId) => `abl_customer_profile:${userId}`

function buildInitialState(user) {
  const seed = {
    profile: {
      fullName: user.name,
      email: user.email,
      ...splitPhone(user.phone),
      ...PROFILE_DEFAULTS,
      avatarUrl: '',
    },
    preferences: PREFERENCE_DEFAULTS,
  }

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(user.id)) || 'null')
    if (!saved) return seed
    return {
      profile: { ...seed.profile, ...saved.profile, email: user.email },
      preferences: { ...seed.preferences, ...saved.preferences },
    }
  } catch {
    return seed
  }
}

export function CustomerProfileProvider({ user, children }) {
  const [state, setState] = useState(() => (user ? buildInitialState(user) : null))

  const commit = (next) => {
    setState(next)
    try {
      localStorage.setItem(storageKey(user.id), JSON.stringify(next))
    } catch {
      // Storage can be full or blocked, the session keeps working without it
    }
  }

  const value = {
    profile: state?.profile ?? null,
    preferences: state?.preferences ?? PREFERENCE_DEFAULTS,
    updateProfile: (patch) => commit({ ...state, profile: { ...state.profile, ...patch } }),
    updatePreferences: (patch) =>
      commit({ ...state, preferences: { ...state.preferences, ...patch } }),
    clearStoredProfile: () => {
      try {
        localStorage.removeItem(storageKey(user.id))
      } catch {
        // Nothing to clear when storage is blocked
      }
    },
  }

  return <CustomerProfileContext.Provider value={value}>{children}</CustomerProfileContext.Provider>
}

export function useCustomerProfile() {
  const context = useContext(CustomerProfileContext)
  if (!context) throw new Error('useCustomerProfile must be used inside CustomerProfileProvider')
  return context
}
