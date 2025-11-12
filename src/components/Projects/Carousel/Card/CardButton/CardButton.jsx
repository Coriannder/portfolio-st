import './CardButton.scss'

import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext, useState } from "react"
import { CursorContext, CursorProvider } from '../../../../../Context/CursorContext'

export const CardButton = ( {to, title, blank = true, disabled = false} ) => {

    const [hover, setHover] = useState(false)
    const contextValue = useContext(CursorContext)


    const handleEnter = () => {
        if (disabled) return
        setHover(true)
        contextValue.overTag('button')
    }

    const handleLeave = () => {
        if (disabled) return
        setHover(false)
        contextValue.outTag()
    }

    const navigate = useNavigate()

    const startProjectsExit = () => {
        const section = document.querySelector('.projects__section')
        if (!section) return
        // exit to the right when navigating to a project's detail
        section.classList.add('projects--exit-right')
    }

    const handleInternalNavigate = (e) => {
        if (disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        e.preventDefault()
        e.stopPropagation()
                // request the carousel to run its staggered exit sequence
                document.dispatchEvent(new CustomEvent('carousel-exit'))
                // start exit animation on the projects section
                startProjectsExit()
                // wait briefly to allow overlap then navigate to detail (no enterFrom state)
                const DURATION = 420 // ms, should match the CSS/animation duration
                setTimeout(() => {
                    // The carousel exits to the right, so make the detail enter from the left
                    navigate(to, { state: { enterFrom: 'left' } })
                }, DURATION * 0.18)
    }

    return(
      


            <Link
                to={to}
                className={`cardButton__link ${disabled ? 'cardButton__link--disabled' : ''}`}
                {...(blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault(); e.stopPropagation(); return
                    }
                    // If internal project detail (blank=false and path starts with /projects/), intercept
                    if (!blank && typeof to === 'string' && to.startsWith('/projects/')) {
                        handleInternalNavigate(e)
                        return
                    }
                    e.stopPropagation()
                }}
                onPointerDown={(e) => { e.stopPropagation(); }}
                onPointerUp={(e) => { e.stopPropagation(); }}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
            >

                <motion.div
                    className="cardButton__link cardButton__link--background"
                    initial={{x:-100}}
                    animate={{x: hover? -1 : -200}}
                    transition={{duration: .2, easings: 'spring'}}
                />

                {title}

            </Link>

        
        
        )
}