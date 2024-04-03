import './ProjectItemList.scss'
import { ProjectItem } from '../ProjectItem/ProjectItem'
import { motion }  from 'framer-motion'
import { cubicBezier } from "framer-motion"
import { projects } from '../../../json/project.json'

export const ProjectItemList = ({ getId }) => {

    const easing = cubicBezier(.35,.17,.3,.86)

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                ease: easing,
                damping: 30,
                //delay: .2,
                delayChildren: .6,
                staggerChildren: .1,
                duration: .0001
            }
        }
    }

    return (

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}>

            {projects && projects.map( project => (

                <ProjectItem
                    item={project}
                    getId={getId}
                    key={project.id}
                />
                ))
            }

        </motion.div>
        
    )
}