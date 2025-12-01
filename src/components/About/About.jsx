import './About.scss'
import { about } from '../../json/about.json'
import photo from '../../assets/profile-st-PhotoRoom.png'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CursorContext } from '../../Context/CursorContext'
import { ViewCVButton } from './ViewCVButton/ViewCVButton'

export const About = () => {

    //console.log(about)

    const contextValue = useContext(CursorContext)

    return (
        <section className='about__section'>

            <div className='about__container'>

                <motion.h2
                    className='about__h2'
                    initial={{ x: 180, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    //viewport={{ once: true }}
                    transition={{ duration: .5, type: "spring", delay: .3 }}

                    onPointerEnter={(e) => {
                        if (e.pointerType === 'mouse') contextValue.overTag('title')
                    }}
                    onPointerLeave={(e) => {
                        if (e.pointerType === 'mouse') contextValue.outTag()
                    }}
                >
                    quien soy
                </motion.h2>

                <motion.div
                    className='about__body'
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    //viewport={{ once: true }}
                    transition={{ duration: 1, type: "spring", delay: .5 }}
                >
                    <p dangerouslySetInnerHTML={{ __html: about }} />
                </motion.div>

                <ViewCVButton />

                <motion.div
                    className='about__img-container'
                    initial={{ y: 350, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    viewport={{ once: true }}
                >
                    <img src={photo} />
                </motion.div>


            </div>

        </section>
    )
}