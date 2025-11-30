import { useEffect, useRef } from 'react'

/**
 * useSwipePage - detecta swipes verticales táctiles y notifica dirección
 * 
 * @param {Object} options
 * @param {Function} options.onSwipeDetected - callback(direction: 'up' | 'down')
 * @param {number} options.threshold - px mínimos para considerar swipe (default 80)
 * @param {number} options.cooldown - ms entre swipes permitidos (default 600)
 */
export function useSwipePage({ onSwipeDetected, threshold = 80, cooldown = 600, isEnabled = true } = {}) {
  const state = useRef({ startY: 0, startX: 0, startTime: 0, isTracking: false })
  const lastSwipe = useRef(0)

  useEffect(() => {
    if (!isEnabled) return

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return

      state.current.startY = e.touches[0].clientY
      state.current.startX = e.touches[0].clientX
      state.current.startTime = Date.now()
      state.current.isTracking = true
    }

    const onTouchMove = (e) => {
      if (!state.current.isTracking) return
      if (e.touches.length !== 1) return

      const dy = e.touches[0].clientY - state.current.startY
      const dx = e.touches[0].clientX - state.current.startX

      // Solo prevenir scroll en mobile (menos de 1024px)
      if (Math.abs(dy) > Math.abs(dx) && window.innerWidth < 1024) {
        if (e.cancelable) {
          e.preventDefault()
        }
      }
    }

    const onTouchEnd = (e) => {
      if (!state.current.isTracking) return

      const now = Date.now()
      const dy = e.changedTouches[0].clientY - state.current.startY
      const dt = now - state.current.startTime

      state.current.isTracking = false

      // Cooldown para evitar múltiples triggers
      if (now - lastSwipe.current < cooldown) {
        return
      }

      // Calcular si cumple umbral (distancia o velocidad)
      const velocity = Math.abs(dy) / Math.max(dt, 1)
      if (Math.abs(dy) > threshold || velocity > 0.3) {
        const direction = dy < 0 ? 'up' : 'down'
        if (typeof onSwipeDetected === 'function') {
          onSwipeDetected(direction)
        }
        lastSwipe.current = now
      }
    }

    const onTouchCancel = () => {
      state.current.isTracking = false
    }

    // Usar touch events en vez de pointer para mejor control
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    document.addEventListener('touchcancel', onTouchCancel, { passive: true })

    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [onSwipeDetected, threshold, cooldown, isEnabled])
}

export default useSwipePage
