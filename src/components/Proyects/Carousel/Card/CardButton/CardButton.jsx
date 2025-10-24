import './CardButton.scss'

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext, useState } from "react"
import { CursorContext, CursorProvider } from '../../../../../Context/CursorContext'

export const CardButton = ( {to, title} ) => {

    const [hover, setHover] = useState(false)
    const contextValue = useContext(CursorContext)


    const handleEnter = () => {
        setHover(true)
        contextValue.overTag('button')
    }

    const handleLeave = () => {
        setHover(false)
        contextValue.outTag()
    }

    return(
      


        <Link to={to} className='cardButton__link' target="_blank" rel="noopener noreferrer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
          
            <motion.div
                className="cardButton__link cardButton__link--background"
                initial={{x:-100}}
                animate={{x: hover? -1 : -200}}
                transition={{duration: .2, easings: 'spring'}}


            >
                {/* {title} */}
            </motion.div>
                {title}
        </Link>

        
        
        )
}