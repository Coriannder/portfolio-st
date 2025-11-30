import './HeaderLink.scss'

// route navigation: we'll always navigate to `/` and let Main handle the scroll/jump
import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { CursorContext } from '../../../Context/CursorContext'


export const HeaderLink = ({ to, title }) => {

    const [hover, setHover] = useState(false)
    const contextValue = useContext(CursorContext)
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Always navigate with scroll state, never rely on pathname-based scroll
        try {
            navigate('/', { state: { scrollTo: to } })
        } catch (err) {
            // ignore navigation errors
        }
    }

    return (
        <Link
            to="/"
            className={'headerLink__link'}
            onClick={handleClick}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            onMouseOver={() => contextValue.overTag('link')} onMouseOut={contextValue.outTag}
            onPointerDown={(e) => e.stopPropagation()}
        >
            {title}
            <motion.div
                className="headerLink__background"
                initial={{ x: -10 }}
                animate={{ x: hover ? 0 : -80 }}
                transition={{ duration: .12, easings: 'spring' }}
            />
        </Link>

    )

}

