import { useCallback, useEffect, useState } from 'react'

/**
 * Custom hook to manage carousel / slider state
 * @param {Object} options
 * @param {number} options.total - Total number of slides
 * @param {number} [options.initialIndex=0] - Initial active index
 * @param {boolean} [options.autoPlay=false] - Whether to automatically advance slides
 * @param {number} [options.interval=5000] - Autoplay interval in milliseconds
 */
export function useCarousel({ total = 0, initialIndex = 0, autoPlay = false, interval = 5000 } = {}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  const next = useCallback(() => {
    if (total <= 0) return
    setActiveIndex((current) => (current + 1) % total)
  }, [total])

  const previous = useCallback(() => {
    if (total <= 0) return
    setActiveIndex((current) => (current - 1 + total) % total)
  }, [total])

  const goTo = useCallback(
    (index) => {
      if (index >= 0 && index < total) {
        setActiveIndex(index)
      }
    },
    [total]
  )

  useEffect(() => {
    if (!autoPlay || total <= 1) return

    const timer = setInterval(() => {
      next()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, total, interval, next])

  return {
    activeIndex,
    setActiveIndex,
    next,
    previous,
    goTo,
  }
}

export default useCarousel
