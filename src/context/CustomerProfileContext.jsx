import { createContext, useContext, useState, useEffect } from 'react'
import { splitPhone } from '@/constants/dialCodes'
import { PREFERENCE_DEFAULTS, PROFILE_DEFAULTS } from '@/customer/data/customerData'
import { useAuth } from '@/context/AuthContext'
import { apiGetB2CProfile, apiUpdateB2CProfile } from '@/services/api'

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
  const { accessToken } = useAuth()
  const [state, setState] = useState(() => (user ? buildInitialState(user) : null))

  // Fetch current profile from backend when authenticated
  useEffect(() => {
    if (!accessToken || !user || user.role !== 'b2c') return
    let active = true

    apiGetB2CProfile(accessToken)
      .then((res) => {
        if (!active || !res?.data) return
        const u = res.data.user || res.data
        if (u) {
          setState((prev) => {
            if (!prev) return prev
            const phoneParts = splitPhone(u.phone)
            const updated = {
              ...prev,
              profile: {
                ...prev.profile,
                fullName: u.name || prev.profile.fullName,
                email: u.email || prev.profile.email,
                ...(phoneParts ? phoneParts : {}),
                address: u.address || prev.profile.address,
              },
            }
            try {
              localStorage.setItem(storageKey(user.id), JSON.stringify(updated))
            } catch {
              // ignore
            }
            return updated
          })
        }
      })
      .catch((err) => {
        console.warn('Could not sync B2C profile from server:', err?.message)
      })

    return () => {
      active = false
    }
  }, [accessToken, user])

  const commit = (next) => {
    setState(next)
    try {
      localStorage.setItem(storageKey(user.id), JSON.stringify(next))
    } catch {
      // Storage can be full or blocked, the session keeps working without it
    }
  }

  const handleUpdateProfile = async (patch) => {
    const nextState = { ...state, profile: { ...state.profile, ...patch } }
    commit(nextState)

    if (accessToken && user?.role === 'b2c') {
      try {
        const fullPhone =
          patch.phone !== undefined
            ? `${patch.dialCode || state.profile.dialCode || ''}${patch.phone}`.trim()
            : undefined

        await apiUpdateB2CProfile(
          {
            name: patch.fullName || undefined,
            phone: fullPhone || undefined,
          },
          accessToken
        )
      } catch (err) {
        console.warn('Failed to persist profile update to server:', err?.message)
      }
    }
  }

  const value = {
    profile: state?.profile ?? null,
    preferences: state?.preferences ?? PREFERENCE_DEFAULTS,
    updateProfile: handleUpdateProfile,
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
