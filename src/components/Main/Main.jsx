import './Main.scss'
import { useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import useSwipePage from '../../hooks/main/useSwipePage'
import useSectionObserver from '../../hooks/main/useSectionObserver'
import useScrollNavigation from '../../hooks/main/useScrollNavigation'

// Mapa de secciones (reutilizamos el mismo que usa el observer)
const sectionMap = {
    'home__section': '/',
    'about__section': '/about',
    'projects__section': '/projects',
    'contact__section': '/contact'
}
const sectionOrder = ['home__section', 'about__section', 'projects__section', 'contact__section']

export const Main = ({ children }) => {
    const location = useLocation()
    const hasScrolledRef = useRef(false)

    // Handler para swipes táctiles - scroll más lento que el nav
    const handleSwipe = useCallback((direction) => {
        // Solo ejecutar en mobile (< 1024px)
        if (window.innerWidth >= 1024) return

        // Determinar sección actual basada en cuál está visible en viewport
        const sections = sectionOrder.map(className => ({
            className,
            element: document.querySelector(`.${className}`)
        })).filter(s => s.element)

        if (!sections.length) return

        // Encontrar sección actualmente más visible
        const viewportTop = window.scrollY
        const viewportHeight = window.innerHeight

        let currentIndex = 0
        let maxVisibility = 0

        sections.forEach((section, i) => {
            const rect = section.element.getBoundingClientRect()
            const elementTop = rect.top + viewportTop
            const elementBottom = elementTop + rect.height

            // Calcular cuánto de la sección está visible
            const visibleTop = Math.max(viewportTop, elementTop)
            const visibleBottom = Math.min(viewportTop + viewportHeight, elementBottom)
            const visibleHeight = Math.max(0, visibleBottom - visibleTop)

            if (visibleHeight > maxVisibility) {
                maxVisibility = visibleHeight
                currentIndex = i
            }
        })

        // Calcular sección objetivo
        let targetIndex = currentIndex
        if (direction === 'up') targetIndex = Math.min(currentIndex + 1, sections.length - 1)
        if (direction === 'down') targetIndex = Math.max(currentIndex - 1, 0)

        if (targetIndex === currentIndex) return

        const targetEl = sections[targetIndex].element
        if (!targetEl) return

        // Para swipes, hacer scroll directo más lento (sin navigate)
        hasScrolledRef.current = true
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY

        // Scroll suave más lento para swipes
        const startY = window.scrollY
        const distance = targetTop - startY
        const duration = 800 // más lento que el nav (que usa defaults del navegador)
        const startTime = performance.now()

        const easeOutQuad = (t) => {
            return t * (2 - t) // Comienza rápido, desacelera al final
        }

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutQuad(progress)

            window.scrollTo(0, startY + distance * eased)

            if (progress < 1) {
                requestAnimationFrame(animateScroll)
            } else {
                // Liberar el flag después del scroll
                setTimeout(() => {
                    hasScrolledRef.current = false
                }, 500)
            }
        }

        requestAnimationFrame(animateScroll)

    }, [])

    // Activar detector de swipes táctiles (más sensible para mejor fluidez)
    const isSwipeEnabled = Object.values(sectionMap).includes(location.pathname)

    // Aumentar threshold en projects para evitar conflictos con el carrusel horizontal
    const swipeThreshold = location.pathname === '/projects' ? 100 : 30

    useSwipePage({ onSwipeDetected: handleSwipe, threshold: swipeThreshold, cooldown: 400, isEnabled: isSwipeEnabled })

    // Hooks para navegación y observer
    useScrollNavigation(location, hasScrolledRef)
    useSectionObserver(sectionMap, hasScrolledRef)

    return (
        <main className={`main__container ${isSwipeEnabled ? 'main__container--locked' : ''}`}>
            {children}
        </main>

    )
}