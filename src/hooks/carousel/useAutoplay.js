import { useRef, useEffect, useCallback } from 'react'

/**
 * useAutoplay
 * Lightweight hook to control an autoplay timer for the carousel.
 * - Respects prefers-reduced-motion
 * - Exposes start/stop/pauseThenResume/resume helpers
 * - Does not assume the action to run; caller provides the callback
 *
 * @param {Object} options
 * @param {number} options.interval - autoplay interval in ms
 * @param {number} options.resumeDelay - resume delay after user interaction
 * @param {boolean} options.enabled - allow autoplay (can be toggled)
 * @returns {{ start: Function, stop: Function, pauseThenResume: Function, resume: Function, isRunning: Function }}
 */
export default function useAutoplay({ interval = 5000, resumeDelay = 3000, enabled = true } = {}) {
  const autoplayRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const isPausedRef = useRef(false)

  const canAutoplay = useCallback(() => {
    if (typeof window === 'undefined') return false
    if (!enabled) return false
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    const hasHoverFine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const hasMouseClass = typeof document !== 'undefined' && document.body.classList.contains('has-mouse')
    return hasHoverFine || hasMouseClass
  }, [enabled])

  const start = useCallback((cb) => {
    if (!canAutoplay()) return
    if (autoplayRef.current) return
    autoplayRef.current = setInterval(() => {
      if (typeof cb === 'function') cb()
    }, interval)
  }, [canAutoplay, interval])

  const stop = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  const pauseThenResume = useCallback(() => {
    isPausedRef.current = true
    stop()
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false
      // do not auto-restart the interval here because caller may want to control when start is called
    }, resumeDelay)
  }, [stop, resumeDelay])

  const resume = useCallback((cb) => {
    // Explicit resume: start playback again using provided callback
    if (autoplayRef.current) return
    isPausedRef.current = false
    if (!canAutoplay()) return
    autoplayRef.current = setInterval(() => {
      if (typeof cb === 'function') cb()
    }, interval)
  }, [canAutoplay, interval])

  const isRunning = useCallback(() => !!autoplayRef.current, [])

  useEffect(() => {
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  return { start, stop, pauseThenResume, resume, isRunning, isPausedRef }
}
