import { useRef, useCallback } from 'react'

/**
 * useThrottle — limits how often a function fires.
 * Applied to search input to prevent API spam.
 */
export function useThrottle(fn, delay = 300) {
  const timer = useRef(null)
  return useCallback((...args) => {
    if (timer.current) return
    timer.current = setTimeout(() => {
      timer.current = null
    }, delay)
    fn(...args)
  }, [fn, delay])
}
