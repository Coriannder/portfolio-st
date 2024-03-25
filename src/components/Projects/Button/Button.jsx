import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import './Button.scss'
import { useState } from "react"

export const ButtonLink = ( {to, title} ) => {

    const [hover, setHover] = useState(false)


    return(
        <Link to={to} className='button__link' onMouseEnter={() => setHover(true)} onMouseLeave={()=> setHover(false)}
            style={{color: hover? '#2B2B2B' : '#F5B6CD' , fontWeight: 700}}
        >
            <motion.div
                className="button__background"
                initial={{x:-80}}
                animate={{x: hover? 0 : -80}}
                transition={{duration: .2, easings: 'spring'}}
            />
                {title}
        </Link>
        )
}