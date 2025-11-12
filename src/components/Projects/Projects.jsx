import projectsData from '../../json/newProject.json'


import './Projects.scss'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CursorContext } from '../../Context/CursorContext'
import { Carousel } from './Carousel/Carousel'
import { Card } from './Carousel/Card/Card'

export const Projects = () => {
        const contextValue = useContext(CursorContext)

        const items = projectsData


    return (
        <div id="projects__section" className="projects__section">
            <div className='projects__container'>
                <motion.h2
                    className='projects__h2'
                    initial={{x: 200, opacity:0}}
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
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring', delay: 0.55 }}
                    //viewport={{ once: true, amount: 0.35 }}
                >
                    <Carousel />
                    {/* <Card data={items[0]} /> */}
                </motion.div>
            </div>
        </div>
    )
}