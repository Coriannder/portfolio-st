import './VisorProject.scss'
import { motion } from 'framer-motion'

export const VisorProject = ({ src , isVisible }) => {
    return (
        <motion.div
            className='visorProject__container'
            style={{ zIndex : !isVisible && '-50'}}
            initial={{ opacity: 0 }}
            animate={{opacity: isVisible ? 1 : 0 }}
            transition={{ duration: .8}}
        >
            <iframe
                src={src}
                className='visorProject__iframe'
                width='100%'
                height='100%'
            />
        </motion.div>
    )
}



