import './Projects.scss'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CursorContext } from '../../Context/CursorContext'
import { Carousel } from './Carousel/Carousel'

export const Projects = () => {
        const contextValue = useContext(CursorContext)

    return (
        <div id="projects__section" className="projects__section">
            <div className='projects__container'>
                <motion.h2
                    className='projects__h2'
                    initial={{x: 100, opacity:0}}
                    whileInView={{x: 0, opacity:1 }}
                    transition= {{ duration: .5, type: "spring", delay: 0.2}}
                    //viewport={{ once: true }}
                    onMouseOver={ () => contextValue.overTag('title') }
                    onMouseOut={contextValue.outTag}
                >
                    proyectos
                </motion.h2>
                <motion.div
                    className='projects__carouselContainer'
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: .8, type: 'spring', delay: 0.6 }}
                >
                    <Carousel />
                </motion.div>
            </div>
        </div>
    )
}