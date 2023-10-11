import './RevealMotion.scss'
//import { useState, useEffect} from 'react'
import { motion } from 'framer-motion';

export const RevealMotion = ({ children }) => {
    //const [scrollY, setScrollY] = useState(0);
    //const [ scrollDown, setScrollDown ] = useState(false)

    /* const handleScroll = () => {

        const diference = window.scrollY - scrollY
        setScrollDown(diference? true : false )
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
 */
    return(
        <motion.div
  /*           initial={initial}
            whileInView={whileInView}
            transition={transition}
            viewport={{ once: true }} */
            initial={{x:-50, opacity:0}}
            whileInView={{x:0, opacity:1}}
            transition= {{ duration: .5, ease: "easeIn" }}
        >
            {children}
        </motion.div>)
}