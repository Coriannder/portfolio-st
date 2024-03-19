import './HeaderLink.scss'

import { Link } from 'react-scroll'
import { motion } from 'framer-motion';
import { useState , useContext } from 'react';
import { CursorContext } from '../../../Context/CursorContext'


export const HeaderLink = ( {to , title , offset} ) => {

    const [hover, setHover] = useState(false)
    const contextValue = useContext(CursorContext)

    return(
        <Link
            className={'headerLink__link'} to={to} spy={true} smooth={'easeOutQuint'} offset={offset || 50} duration={30}
            onMouseEnter={() => setHover(true)} onMouseLeave={()=> setHover(false)}
            onMouseOver={contextValue.overLink} onMouseOut={contextValue.outTag}
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

