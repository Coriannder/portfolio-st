import './Main.scss'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'

export const Main = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const observerRef = useRef(null)
    const lastSectionRef = useRef('')
    const hasScrolledRef = useRef(false)

    useEffect(() => {
        // Soporta requests programáticas: location.state.scrollTo may indicar la sección a scrollear
        const scrollToId = location.state?.scrollTo || (location.state?.scrollToProjects ? 'projects__section' : null)
        const instantRequested = location.state?.scrollToProjects === 'instant'
        
        console.log('[Main useEffect 1] scrollToId:', scrollToId, 'state:', location.state)
        
        if (scrollToId) {
            hasScrolledRef.current = true // Marcar que hicimos scroll programático
            console.log('[Main useEffect 1] Set hasScrolledRef = true')
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
            
            const doScroll = () => {
                const el = document.getElementById(scrollToId) || document.querySelector(`.${scrollToId}`)
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY
                    console.log('[Main useEffect 1] Scrolling to:', scrollToId, 'top:', top)
                    
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
                console.log('[Main useEffect 1] Element not found:', scrollToId)
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
                        } catch (e) {}
                        // Reset hasScrolledRef después de que termine el scroll
                        setTimeout(() => {
                            console.log('[Main useEffect 1] Resetting hasScrolledRef after scroll complete')
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
                    } catch (e) {}
                    // Reset hasScrolledRef después de que termine el scroll suave
                    setTimeout(() => {
                        console.log('[Main useEffect 1] Resetting hasScrolledRef after scroll complete')
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
        console.log('[Main useEffect 2] pathname:', location.pathname, 'state:', location.state, 'hasScrolledRef:', hasScrolledRef.current)
        
        if (location.state && (location.state.scrollTo || location.state.scrollToProjects || location.state.__scrolled)) {
            console.log('[Main useEffect 2] SKIP - has state scroll')
            return
        }
        if (hasScrolledRef.current) {
            console.log('[Main useEffect 2] SKIP - hasScrolledRef is true')
            return
        }

        const pathToSection = {
            '/': 'home__section',
            '/about': 'about__section',
            '/projects': 'projects__section',
            '/contact': 'contact__section'
        }
        const target = pathToSection[location.pathname]
        if (!target) {
            console.log('[Main useEffect 2] SKIP - no target for pathname')
            return
        }

        console.log('[Main useEffect 2] Will scroll to:', target, 'in 200ms')
        // Longer delay to ensure programmatic scroll (first useEffect) always wins the race
        const t = setTimeout(() => {
            console.log('[Main useEffect 2] Executing scroll to:', target, 'hasScrolledRef now:', hasScrolledRef.current)
            // Double-check that no programmatic scroll is in progress
            if (hasScrolledRef.current) {
                console.log('[Main useEffect 2] ABORT - hasScrolledRef is now true')
                return
            }
            
            const el = document.getElementById(target) || document.querySelector(`.${target}`)
            if (el) {
                // instant jump (no smooth)
                const top = el.getBoundingClientRect().top + window.scrollY
                console.log('[Main useEffect 2] Scrolling to:', target, 'top:', top)
                window.scrollTo({ top, behavior: 'auto' })
            }
        }, 200)

        return () => clearTimeout(t)
    }, [location.pathname, location.state])

    useEffect(() => {
        // Observe sections and update the URL as the user scrolls
        const sectionMap = {
            'home__section': '/',
            'about__section': '/about',
            'projects__section': '/projects',
            'contact__section': '/contact'
        }

        const selector = Object.keys(sectionMap).map(s => `.${s}`).join(', ')
        const sections = Array.from(document.querySelectorAll(selector))
        if (!sections.length) return

        const options = {
            root: null,
            rootMargin: '0px 0px -40% 0px',
            threshold: 0.5
        }

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // CRITICAL: Ignore section changes during programmatic scroll
                    if (hasScrolledRef.current) {
                        console.log('[Main IntersectionObserver] SKIP - programmatic scroll in progress')
                        return
                    }
                    
                    const cls = Array.from(entry.target.classList).find(c => c.endsWith('__section'))
                    if (!cls) return
                    if (lastSectionRef.current === cls) return
                    lastSectionRef.current = cls
                    const path = sectionMap[cls]
                    if (!path) return
                    console.log('[Main IntersectionObserver] Navigating to:', path)
                    // update URL without adding an extra history entry
                    navigate(path, { replace: true })
                }
            })
        }, options)

        sections.forEach(s => observerRef.current.observe(s))

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }
        }
    }, [navigate])

    return (
        <main className='main__container'>
                {children}
        </main>

    )
}