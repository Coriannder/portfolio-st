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
export const useAutoplay = ({ interval = 5000, resumeDelay = 3000, enabled = true } = {}) => {
  const autoplayRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const isPausedRef = useRef(false)
  const callbackRef = useRef(null) // Store the callback to resume later

  const canAutoplay = useCallback(() => {
    if (typeof window === 'undefined') return false
    if (!enabled) return false
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    const hasHoverFine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const hasMouseClass = typeof document !== 'undefined' && document.body.classList.contains('has-mouse')
    return hasHoverFine || hasMouseClass
  }, [enabled])

  const start = useCallback((cb) => {
    if (typeof cb === 'function') callbackRef.current = cb
    if (!canAutoplay()) return
    if (autoplayRef.current) return
    autoplayRef.current = setInterval(() => {
      if (callbackRef.current) callbackRef.current()
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
    if (typeof cb === 'function') callbackRef.current = cb
    if (autoplayRef.current) return
    isPausedRef.current = false
    if (!canAutoplay()) return
    autoplayRef.current = setInterval(() => {
      if (callbackRef.current) callbackRef.current()
    }, interval)
  }, [canAutoplay, interval])

  const isRunning = useCallback(() => !!autoplayRef.current, [])

  // Handle Page Visibility (Tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden: stop autoplay immediately to prevent animation stacking
        stop()
      } else {
        // Tab visible: resume if it wasn't manually paused
        if (!isPausedRef.current && callbackRef.current) {
          // Re-trigger start with the stored callback
          // We call start() directly which checks canAutoplay() internally
          // We need to pass the stored callback to ensure it's set/used
          // However, start() expects a callback. We can pass callbackRef.current
          // But start() sets callbackRef.current = cb.
          // If we pass callbackRef.current, it sets callbackRef.current = callbackRef.current (safe)
          // But we need to be careful about closure staleness if start wasn't recreated.
          // Fortunately start depends on [canAutoplay, interval].
          // To be safe, we can just call the internal logic or just call start(callbackRef.current)
          // Let's use the exposed start function.
          // Note: start() checks autoplayRef.current, so if it's already running (edge case), it won't double up.
          // But we called stop() when hidden, so it should be null.
          start(callbackRef.current)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [stop, start])

  useEffect(() => {
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  return { start, stop, pauseThenResume, resume, isRunning, isPausedRef }
}
