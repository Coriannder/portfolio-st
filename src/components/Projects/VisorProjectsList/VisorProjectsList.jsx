//import { motion, AnimatePresence } from 'framer-motion'
import { VisorProject } from '../VisorProject/VisorProject'
import './VisorProjectsList.scss'
import { projects } from '../../../json/project.json'


export const VisorProjectsList = ({ id }) => {


    return (
            projects && projects.map( project => (

                            <VisorProject
                                src={project.src}
                                isVisible={id==project.id ? true : false}
                                key={project.id}
                            />
            ))
    )
}
