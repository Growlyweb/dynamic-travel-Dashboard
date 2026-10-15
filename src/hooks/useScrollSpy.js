import { useEffect, useState } from 'react'

export function useScrollSpy(ids, offset = 120) {
  const idsKey = ids.join('|')
  const [activeId, setActiveId] = useState(ids[0] ?? null)

  useEffect(() => {
    const orderedIds = idsKey ? idsKey.split('|') : []
    const sections = () => orderedIds.map((id) => document.getElementById(id)).filter(Boolean)
    let frame = 0

    const update = () => {
      frame = 0
      const found = sections()
      if (found.length === 0) return

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      // The footer may never reach the offset line, so reaching the page end wins
      const current = atBottom
        ? found[found.length - 1]
        : found.reduce(
            (match, element) => (element.getBoundingClientRect().top <= offset ? element : match),
            found[0],
          )

      setActiveId(current.id)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [idsKey, offset])

  return activeId
}

export default useScrollSpy
