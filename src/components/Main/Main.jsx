import './Main.scss'
import { useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSwipePage from '../../hooks/useSwipePage'

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
    const navigate = useNavigate()
    const observerRef = useRef(null)
    const lastSectionRef = useRef('')
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
    useSwipePage({ onSwipeDetected: handleSwipe, threshold: 30, cooldown: 400, isEnabled: isSwipeEnabled })

    useEffect(() => {
        // Soporta requests programáticas: location.state.scrollTo may indicar la sección a scrollear
        const scrollToId = location.state?.scrollTo || (location.state?.scrollToProjects ? 'projects__section' : null)
        const instantRequested = location.state?.scrollToProjects === 'instant'

        if (scrollToId) {
            hasScrolledRef.current = true // Marcar que hicimos scroll programático
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

            const doScroll = () => {
                const el = document.getElementById(scrollToId) || document.querySelector(`.${scrollToId}`)
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY

                    // iOS Safari no soporta bien { behavior: 'smooth' }
                    // Usar el formato antiguo window.scrollTo(x, y)
                    if (isIOS) {
                        window.scrollTo(0, top)
                    } else {
                        window.scrollTo({
                            top,
                            behavior: instantRequested ? 'auto' : 'smooth'
                        })
                    }
                    return true
                }
                return false
            }

            if (isIOS) {
                // iOS: intentar varias veces con delays incrementales
                let attempts = 0
                const maxAttempts = 5
                const tryScroll = () => {
                    attempts++
                    if (doScroll()) {
                        // Éxito - limpiar state PERO mantener hasScrolledRef
                        try {
                            navigate(location.pathname, { replace: true, state: { __scrolled: true } })
                        } catch (e) { /* ignore */ }
                        // Reset hasScrolledRef después de que termine el scroll
                        setTimeout(() => {
                            hasScrolledRef.current = false
                        }, 1000)
                    } else if (attempts < maxAttempts) {
                        // Reintentar con más delay
                        setTimeout(tryScroll, 100 * attempts)
                    }
                }
                setTimeout(tryScroll, 100)
            } else {
                // Desktop: una sola vez
                setTimeout(() => {
                    doScroll()
                    try {
                        navigate(location.pathname, { replace: true, state: { __scrolled: true } })
                    } catch (e) { /* ignore */ }
                    // Reset hasScrolledRef después de que termine el scroll suave
                    setTimeout(() => {
                        hasScrolledRef.current = false
                    }, 1000)
                }, 100)
            }
        }
        // No resetear hasScrolledRef aquí - se resetea después del scroll completo
    }, [location, navigate])

    // If the pathname directly targets a section (e.g. /about, /projects, /contact),
    // perform an immediate jump to that section (no smooth scrolling) unless a state-driven scroll is requested.
    useEffect(() => {
        if (location.state && (location.state.scrollTo || location.state.scrollToProjects || location.state.__scrolled || location.state.__fromObserver)) return
        if (hasScrolledRef.current) return

        const pathToSection = {
            '/': 'home__section',
            '/about': 'about__section',
            '/projects': 'projects__section',
            '/contact': 'contact__section'
        }
        const target = pathToSection[location.pathname]
        if (!target) return

        // Longer delay to ensure programmatic scroll (first useEffect) always wins the race
        const t = setTimeout(() => {
            // Double-check that no programmatic scroll is in progress
            if (hasScrolledRef.current) return

            const el = document.getElementById(target) || document.querySelector(`.${target}`)
            if (el) {
                // instant jump (no smooth)
                const top = el.getBoundingClientRect().top + window.scrollY
                window.scrollTo({ top, behavior: 'auto' })
            }
        }, 200)

        return () => clearTimeout(t)
    }, [location.pathname, location.state])

    useEffect(() => {
        // Observe sections and update the URL as the user scrolls
        // sectionMap is now defined outside
        const selector = Object.keys(sectionMap).map(s => `.${s}`).join(', ')
        const sections = Array.from(document.querySelectorAll(selector))
        if (!sections.length) return

        const options = {
            root: null,
            rootMargin: '0px 0px -40% 0px',
            threshold: 0.5
        }

        let debounceTimer = null

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // CRITICAL: Ignore section changes during programmatic scroll
                    if (hasScrolledRef.current) return

                    const cls = Array.from(entry.target.classList).find(c => c.endsWith('__section'))
                    if (!cls) return
                    if (lastSectionRef.current === cls) return
                    lastSectionRef.current = cls
                    const path = sectionMap[cls]
                    if (!path) return

                    // Debounce URL updates para evitar flash durante scroll
                    if (debounceTimer) clearTimeout(debounceTimer)
                    debounceTimer = setTimeout(() => {
                        // update URL without adding an extra history entry
                        navigate(path, { replace: true, state: { __fromObserver: true } })
                    }, 500)
                }
            })
        }, options)

        sections.forEach(s => observerRef.current.observe(s))

        return () => {
            if (debounceTimer) clearTimeout(debounceTimer)
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }
        }
    }, [navigate])

    return (
        <main className={`main__container ${isSwipeEnabled ? 'main__container--locked' : ''}`}>
            {children}
        </main>

    )
}