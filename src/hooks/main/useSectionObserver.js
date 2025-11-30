import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const useSectionObserver = (sectionMap, hasScrolledRef) => {
    const navigate = useNavigate()
    const observerRef = useRef(null)
    const lastSectionRef = useRef('')

    useEffect(() => {
        // Observe sections and update the URL as the user scrolls
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
    }, [navigate, sectionMap, hasScrolledRef])
}

export default useSectionObserver
