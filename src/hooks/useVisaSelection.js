import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_VISA_COUNTRY, getVisaContent } from '@/constants'

const SECTION_ID = 'visa'
const HASH_PREFIX = `#${SECTION_ID}/`
// The sticky header is 80px tall (scroll-mt-20)
const SECTION_START_OFFSET = 79

function firstTypeId(code) {
  return getVisaContent(code)?.visaTypes[0]?.id ?? null
}

function resolveTypeId(code, typeId) {
  const types = getVisaContent(code)?.visaTypes ?? []
  return types.some((type) => type.id === typeId) ? typeId : firstTypeId(code)
}

function selectionFromHash() {
  const { hash } = window.location
  if (!hash.startsWith(HASH_PREFIX)) return null

  const [rawCode, rawType] = hash.slice(HASH_PREFIX.length).split('/')
  if (!/^[a-z]{2}$/i.test(rawCode ?? '')) return null

  const code = rawCode.toLowerCase()
  return { code, typeId: resolveTypeId(code, rawType) }
}

function writeHash(code, typeId) {
  const hash = typeId ? `${HASH_PREFIX}${code}/${typeId}` : `${HASH_PREFIX}${code}`
  window.history.replaceState(null, '', hash)
}

function scrollToExplorer() {
  document.getElementById(SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// The new panel can be much shorter than the old one. Snapping before React re-renders stops the
// browser from clamping the old scroll position into the next section.
function keepExplorerInView() {
  const section = document.getElementById(SECTION_ID)
  if (!section || section.getBoundingClientRect().top >= SECTION_START_OFFSET) return
  section.scrollIntoView({ behavior: 'instant', block: 'start' })
}

export function goToVisa(code, typeId) {
  writeHash(code, resolveTypeId(code, typeId))
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

export function useVisaSelection() {
  const [selection, setSelection] = useState(
    () =>
      selectionFromHash() ?? {
        code: DEFAULT_VISA_COUNTRY,
        typeId: firstTypeId(DEFAULT_VISA_COUNTRY),
      },
  )

  useEffect(() => {
    if (selectionFromHash()) scrollToExplorer()

    const handleHashChange = () => {
      const next = selectionFromHash()
      if (!next) return
      setSelection(next)
      scrollToExplorer()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const selectCountry = useCallback((code) => {
    const typeId = firstTypeId(code)
    keepExplorerInView()
    setSelection({ code, typeId })
    writeHash(code, typeId)
  }, [])

  const selectType = useCallback(
    (typeId) => {
      keepExplorerInView()
      setSelection((current) => ({ ...current, typeId }))
      writeHash(selection.code, typeId)
    },
    [selection.code],
  )

  return { ...selection, selectCountry, selectType }
}

export default useVisaSelection
