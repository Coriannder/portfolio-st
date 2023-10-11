//import { useState } from 'react'
import './VisorProject.scss'
import { motion } from 'framer-motion'

export const VisorProject = ({ src , isVisible }) => {

    //const [ isVisible, setIsVisible ] = useState( isVisible )

    // [position, setPosition] = useState()


    return (

        <motion.div
            className='visorProject__container'
            style={{ zIndex : !isVisible && '-50'}}
            //onMouseEnter={() => setIsShown(true)}
            //onMouseLeave={() => setIsShown(false)}

            //style={{display: visible ?  "block" : "none"}}

            initial={{ opacity: 0 }}
            animate={{opacity: isVisible ? 1 : 0 }}
            //exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: .8}}
        >
            <iframe
                src={src}
                className='visorProject__iframe'
                width='100%'
                height='100%'
                //onClick={console.log('hola')}
            />


            {/*  {isShown && (
                <div className='visorProject__hover'>
                    <div className='visorProject__buttonsContainer'>
                        <button className='visorProject__viewSite'>Ir al Sitio</button>
                        <button className='visorProject__viewCode'>Ver el Codigo</button>
                    </div>
                </div>
                )} */}
        </motion.div>
    )
}



