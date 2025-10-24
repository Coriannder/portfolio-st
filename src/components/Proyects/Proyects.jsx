import projectsData from '../../json/newProject.json'


import './Proyects.scss'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CursorContext } from '../../Context/CursorContext'
import { Carousel } from './Carousel/Carousel'
import { Card } from './Carousel/Card/Card'

export const Projects = () => {
        const contextValue = useContext(CursorContext)

        const items = projectsData


    return (
        <div className="projects__section">
            <div className='projects__container'>
                <motion.h2
                    className='projects__h2'
                    initial={{x: 200, opacity:0}}
                    whileInView={{x: 0, opacity:1 }}
                    transition= {{ duration: .5, type: "spring", delay: .4}}
                    //viewport={{ once: true }}
                    onMouseOver={ () => contextValue.overTag('title') }
                    onMouseOut={contextValue.outTag}
                >
                    proyectos
                </motion.h2>
                <div className='projects__carouselContainer'>
                    <Carousel />
                    {/* <Card data={items[0]} /> */}
                </div>
            </div>
        </div>
    )
}