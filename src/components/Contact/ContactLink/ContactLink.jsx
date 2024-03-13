import './ContactLink.scss'
import { motion } from 'framer-motion';
import { useState } from 'react'
import { Link } from 'react-scroll';


export const ContactLink = ({title , children }) => {

    const [isMouseOver, setIsMouseOver] = useState(false)

    return (
        <motion.div
            style={{overflow:'hidden'}}
            onMouseOver={()=>setIsMouseOver(true)}
            onMouseLeave={()=>setIsMouseOver(false)}

            initial={{x: 0}}
            animate={{x: isMouseOver? 10 : 0}}
            transition={{duration: .1, easings: 'spring'}}
        >
            <Link className='contactLink__container' to='projects'>
                <span
                    className='contactLink__iconContainer'
                >
                    {children}
                </span>

                <div
                    className='contactLink__title'
                >
                    {title}
                </div>
            </Link>

        </motion.div>
    )
}