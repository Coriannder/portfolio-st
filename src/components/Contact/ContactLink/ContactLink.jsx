import './ContactLink.scss'
import { motion } from 'framer-motion';
import { useState } from 'react'
import { Link } from 'react-router-dom';


export const ContactLink = ({ title, children, to }) => {

    const [isMouseOver, setIsMouseOver] = useState(false)

    return (
        <motion.div

            style={{ overflow: 'hidden' }}
            onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setIsMouseOver(true)
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') setIsMouseOver(false)
            }}

            initial={{ x: 0 }}
            animate={{ x: isMouseOver ? 10 : 0 }}
            transition={{ duration: .1, easings: 'spring' }}
        >
            <Link className='contactLink__container' to={to} target="_blank" rel="noopener noreferrer">
                <span className='contactLink__iconContainer'>
                    {children}
                </span>

                <div className='contactLink__title'>
                    {title}
                </div>
            </Link>

        </motion.div>
    )
}