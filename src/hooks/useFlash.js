import { useCallback, useEffect, useRef, useState } from 'react'

export function useFlash(duration = 3500) {
  const [message, setMessage] = useState(null)
  const timer = useRef(null)

  const flash = useCallback(
    (next) => {
      clearTimeout(timer.current)
      setMessage(next)
      timer.current = setTimeout(() => setMessage(null), duration)
    },
    [duration],
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  return [message, flash]
}

export default useFlash
