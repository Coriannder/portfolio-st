import { useState, useEffect } from 'react'

/**
 * useIndicator
 * Calculates the position of a circular indicator inside a dots container.
 * @param {Object} options
 * @param {React.RefObject<HTMLElement>} options.dotsRef
 * @param {number} options.activeIndex
 * @param {number} options.size
 */
export const useIndicator = ({ dotsRef, activeIndex, size = 16 } = {}) => {
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: size })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let mounted = true

    const update = () => {
      if (!mounted) return
      if (!dotsRef || !dotsRef.current) return
      const btn = dotsRef.current.querySelector(`button[data-idx="${activeIndex}"]`)
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const containerRect = dotsRef.current.getBoundingClientRect()
      const left = rect.left - containerRect.left + rect.width / 2 - (size / 2)
      const top = rect.top - containerRect.top + rect.height / 2 - (size / 2)
      setIndicator({ left, top, width: size })
    }

    // run once on mount/activeIndex change and after layout settles
    requestAnimationFrame(update)

    const onResize = () => requestAnimationFrame(update)
    window.addEventListener('resize', onResize)

    return () => {
      mounted = false
      window.removeEventListener('resize', onResize)
    }
  }, [dotsRef, activeIndex, size])

  return indicator
}
