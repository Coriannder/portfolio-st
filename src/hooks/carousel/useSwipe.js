/**
 * useSwipe - encapsula handlers de pointer para detectar swipes
 *
 * @param {Object} options
 * @param {function} options.onSwipeLeft - llamada cuando se detecta swipe left (mostrar siguiente)
 * @param {function} options.onSwipeRight - llamada cuando se detecta swipe right (mostrar previo)
 * @param {number} options.threshold - distancia en px para considerar swipe
 * @param {number} options.maxTime - ms para considerar swipe por velocidad
 */
import { useRef, useCallback } from 'react'

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 30, maxTime = 500 } = {}) {
  const state = useRef({ startX: 0, startY: 0, startTime: 0, isSwiping: false, pointerId: null, moved: 0, fired: false })
  const skipClickRef = useRef(false)

  const clearSkip = (delay = 20) => setTimeout(() => { skipClickRef.current = false }, delay)

  const onPointerDown = useCallback((e) => {
    // ignore non-primary mouse buttons
    if (e.pointerType === 'mouse' && e.button !== 0) return
    state.current.pointerId = e.pointerId
    state.current.startX = e.clientX
    state.current.startY = e.clientY
    state.current.startTime = Date.now()
    state.current.isSwiping = false
    state.current.moved = 0
    skipClickRef.current = false
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch (err) { /* noop */ }
  }, [])

  const onPointerMove = useCallback((e) => {
    if (state.current.pointerId !== e.pointerId) return
    const dx = e.clientX - state.current.startX
    const dy = e.clientY - state.current.startY
    // if vertical movement is larger, treat as scroll — abandon
    if (!state.current.isSwiping && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
      state.current.pointerId = null
      return
    }
    if (Math.abs(dx) > 10) {
      state.current.isSwiping = true
      state.current.moved = dx
      skipClickRef.current = true
      // If movement exceeds the swipe threshold, trigger swipe immediately
      if (Math.abs(dx) > threshold && !state.current.fired) {
        state.current.fired = true
        if (dx < 0) {
          if (typeof onSwipeLeft === 'function') onSwipeLeft()
        } else {
          if (typeof onSwipeRight === 'function') onSwipeRight()
        }
        // mark as fired; keep pointer capture until pointerup to avoid fragmenting the gesture
        // prevent default to reduce accidental page scroll on touch
        try { e.preventDefault && e.preventDefault() } catch (err) { /* noop */ }
        clearSkip()
      }
    }
  }, [threshold, onSwipeLeft, onSwipeRight])

  const onPointerUp = useCallback((e) => {
    if (state.current.pointerId !== e.pointerId) return
    // If we already fired on move, skip double-trigger
    if (state.current.fired) {
      state.current.fired = false
      state.current.pointerId = null
      try { e.currentTarget.releasePointerCapture(e.pointerId) } catch (err) { /* noop */ }
      clearSkip()
      return
    }
    const dx = e.clientX - state.current.startX
    const dt = Date.now() - state.current.startTime
    const velocity = Math.abs(dx) / Math.max(dt, 1)
    if (Math.abs(dx) > threshold || velocity > (threshold / maxTime)) {
      if (dx < 0) {
        if (typeof onSwipeLeft === 'function') onSwipeLeft()
      } else {
        if (typeof onSwipeRight === 'function') onSwipeRight()
      }
    }
    state.current.pointerId = null
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch (err) { /* noop */ }
    clearSkip()
  }, [threshold, maxTime, onSwipeLeft, onSwipeRight])

  const onPointerCancel = useCallback((e) => {
    if (state.current.pointerId !== e.pointerId) return
    state.current.pointerId = null
    state.current.isSwiping = false
    skipClickRef.current = false
  }, [])

  return {
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    skipClickRef,
  }
}

export default useSwipe
