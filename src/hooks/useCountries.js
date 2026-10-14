import { useEffect, useState } from 'react'
import {
  FALLBACK_COUNTRIES,
  fetchCountries,
  readCachedCountries,
} from '@/services/countries'

export function useCountries() {
  const [cached] = useState(readCachedCountries)
  const needsRefresh = !cached?.fresh
  const [state, setState] = useState({
    countries: cached?.countries ?? FALLBACK_COUNTRIES,
    status: needsRefresh ? 'refreshing' : 'ready',
  })

  useEffect(() => {
    if (!needsRefresh) return undefined

    const controller = new AbortController()
    fetchCountries(controller.signal)
      .then((countries) => setState({ countries, status: 'ready' }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState((current) => ({ ...current, status: 'offline' }))
      })

    return () => controller.abort()
  }, [needsRefresh])

  return state
}

export default useCountries
