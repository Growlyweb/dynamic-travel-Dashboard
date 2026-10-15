import fallbackCountries from '@/constants/countries.fallback.json'

const CODES_URL = 'https://flagcdn.com/en/codes.json'
const CACHE_KEY = 'abl:countries:v1'
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000

const EXCLUDED_CODES = new Set(['un'])

function normalize(codes) {
  return Object.entries(codes)
    .filter(([code]) => code.length === 2 && !EXCLUDED_CODES.has(code))
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const FALLBACK_COUNTRIES = fallbackCountries

export function readCachedCountries() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { savedAt, countries } = JSON.parse(raw)
    if (!Array.isArray(countries) || countries.length === 0) return null
    return { countries, fresh: Date.now() - savedAt < CACHE_TTL_MS }
  } catch {
    return null
  }
}

export async function fetchCountries(signal) {
  const response = await fetch(CODES_URL, { signal })
  if (!response.ok) throw new Error(`Country API responded ${response.status}`)

  const countries = normalize(await response.json())
  if (countries.length === 0) throw new Error('Country API returned no countries')

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), countries }))
  } catch {
    // Storage can be full or blocked, the list works without a cache
  }
  return countries
}

const FLAG_WIDTHS = [20, 40, 80, 160, 320, 640]

export function flagImage(code, width) {
  const index = Math.max(
    0,
    FLAG_WIDTHS.findIndex((size) => size >= width),
  )
  const url = (size) => `https://flagcdn.com/w${size}/${code}.png`
  const retina = FLAG_WIDTHS[Math.min(index + 1, FLAG_WIDTHS.length - 1)]

  return { src: url(FLAG_WIDTHS[index]), srcSet: `${url(retina)} 2x` }
}
