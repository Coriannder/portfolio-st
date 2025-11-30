import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useScrollNavigation = (location, hasScrolledRef) => {
    const navigate = useNavigate()

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
    }, [location, navigate, hasScrolledRef])

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
    }, [location.pathname, location.state, hasScrolledRef])
}

export default useScrollNavigation
