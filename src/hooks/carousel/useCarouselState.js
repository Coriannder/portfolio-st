/**
 * useCarouselState
 * Encapsula el estado del carrusel: índice activo, dirección y helpers wrap-around
 *
 * @param {Object} options
 * @param {number} options.initialIndex - índice inicial
 * @param {number} options.length - número de items del carrusel
 */
import { useState, useCallback, useMemo } from 'react'

export function useCarouselState({ initialIndex = 0, length = 0 } = {}) {
  const [activeIndex, setActiveIndex] = useState(() => {
    // clamp initial index into range
    if (!length) return initialIndex
    const mod = ((n, m) => ((n % m) + m) % m)
    return mod(initialIndex, length)
  })
  const [direction, setDirection] = useState(0)

  const mod = useCallback((n) => ((n % length) + length) % length, [length])

  const leftIndex = useMemo(() => (length ? mod(activeIndex - 1) : 0), [activeIndex, length, mod])
  const rightIndex = useMemo(() => (length ? mod(activeIndex + 1) : 0), [activeIndex, length, mod])

  const goRight = useCallback(() => {
    if (!length) return
    setDirection(-1)
    setActiveIndex(i => mod(i + 1))
  }, [length, mod])

  const goLeft = useCallback(() => {
    if (!length) return
    setDirection(1)
    setActiveIndex(i => mod(i - 1))
  }, [length, mod])

  const goToIndex = useCallback((newIndex) => {
    if (!length) return
    const idx = mod(newIndex)
    if (idx === activeIndex) return
    const len = length
    const forwardDistance = (idx - activeIndex + len) % len
    const backwardDistance = (activeIndex - idx + len) % len
    setDirection(forwardDistance <= backwardDistance ? -1 : 1)
    setActiveIndex(idx)
  }, [length, activeIndex, mod])

  return {
    activeIndex,
    direction,
    leftIndex,
    rightIndex,
    goLeft,
    goRight,
    goToIndex,
    setActiveIndex,
    mod,
  }
}

export default useCarouselState
