import './Projects.scss'
import { ProjectItemList } from './ProjectItemList/ProjectItemList'
import { useState, useContext} from 'react'
import { VisorProjectsList } from './VisorProjectsList/VisorProjectsList'
import { CursorContext } from '../../Context/CursorContext'
import { motion } from 'framer-motion'

export const Projects = () => {

    const contextValue = useContext(CursorContext)

    const [id, setId] = useState('')

    return (
        <section className='projects__section'>

            <div className='projects__container' onMouseLeave={()=>{setId('')}}>
                <div className='projects__list'>
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
                    <div className='projects__body'>

                        <ProjectItemList
                            getId={setId}
                            />
                    </div>

                </div>

                <div className='projects__visorProjects'>
                    <VisorProjectsList id={id} />
                </div>
            </div>
        </section>
    )
}