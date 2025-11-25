import './Main.scss'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scroller } from 'react-scroll'

export const Main = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const observerRef = useRef(null)
    const lastSectionRef = useRef('')

    useEffect(() => {
        // Soporta requests programáticas: location.state.scrollTo may indicar la sección a scrollear
        const scrollToId = location.state?.scrollTo || (location.state?.scrollToProjects ? 'projects__section' : null)
        const instantRequested = location.state?.scrollToProjects === 'instant'
        if (scrollToId) {
            setTimeout(() => {
                if (instantRequested) {
                    // Instant jump to avoid revealing intermediate sections during smooth scroll
                    const el = document.getElementById(scrollToId) || document.querySelector(`.${scrollToId}`)
                    if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({ top, behavior: 'auto' })
                    }
                } else {
                    scroller.scrollTo(scrollToId, {
                        smooth: 'easeOutQuint',
                        offset: -300,
                        duration: 1000
                    })
                }

                // limpiar state para que no vuelva a scrollear si el usuario navega de nuevo
                try {
                    navigate(location.pathname, { replace: true, state: {} })
                } catch (e) {
                    // ignore navigation errors (defensive)
                }
            }, 100)
        }
    }, [location, navigate])

    // If the pathname directly targets a section (e.g. /about, /projects, /contact),
    // perform an immediate jump to that section (no smooth scrolling) unless a state-driven scroll is requested.
    useEffect(() => {
        if (location.state && (location.state.scrollTo || location.state.scrollToProjects)) return

        const pathToSection = {
            '/': 'home__section',
            '/about': 'about__section',
            '/projects': 'projects__section',
            '/contact': 'contact__section'
        }
        const target = pathToSection[location.pathname]
        if (!target) return

        // small delay to allow Main's children to render
        const t = setTimeout(() => {
            const el = document.getElementById(target) || document.querySelector(`.${target}`)
            if (el) {
                // instant jump (no smooth)
                const top = el.getBoundingClientRect().top + window.scrollY
                window.scrollTo({ top, behavior: 'auto' })
            }
        }, 50)

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
                    const cls = Array.from(entry.target.classList).find(c => c.endsWith('__section'))
                    if (!cls) return
                    if (lastSectionRef.current === cls) return
                    lastSectionRef.current = cls
                    const path = sectionMap[cls]
                    if (!path) return
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