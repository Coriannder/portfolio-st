import './HeaderLink.scss'

// route navigation: we'll always navigate to `/` and let Main handle the scroll/jump
import { motion } from 'framer-motion';
import { useState , useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CursorContext } from '../../../Context/CursorContext'


export const HeaderLink = ( { to, title } ) => {

    const [hover, setHover] = useState(false)
    const contextValue = useContext(CursorContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // Determine the pathname that normally corresponds to this section.
        const sectionPathMap = {
            'home__section': '/',
            'about__section': '/about',
            'projects__section': '/projects',
            'contact__section': '/contact'
        }

        const targetPath = sectionPathMap[to] || '/'

        // If we're already on the target pathname, navigate to the same pathname
        // but include the scroll state so Main handles the instant jump without
        // switching to `/` (this avoids jumping back to root when clicking the
        // currently active section link).
        try {
            if (location.pathname === targetPath) {
                navigate(location.pathname, { state: { scrollTo: to, scrollToProjects: 'instant' } })
            } else {
                navigate('/', { state: { scrollTo: to, scrollToProjects: 'instant' } })
            }
        } catch (err) {
            // ignore navigation errors
        }
    }

    return(
        <Link
            to="/"
            className={'headerLink__link'}
            onClick={handleClick}
            onMouseEnter={() => setHover(true)} onMouseLeave={()=> setHover(false)}
            onMouseOver={ () => contextValue.overTag('link') } onMouseOut={ contextValue.outTag}
            onPointerDown={(e) => e.stopPropagation()}
        >
            {title}
            <motion.div
                className="headerLink__background"
                initial={{x: -10}}
                animate={{x: hover? 0 : -80}}
                transition={{duration: .12, easings: 'spring'}}
            />
        </Link>

    )

}

