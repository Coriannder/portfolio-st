import './About.scss'
import { about } from  '../../json/about.json'
import photo from '../../assets/profile-st-PhotoRoom.png'
//import { RevealMotion } from '../RevealMotion/RevealMotion'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CursorContext } from '../../Context/CursorContext'
//import { AnimatedContent } from '../AnimatedContent/AnimatedContent'

export const About = () => {

    const contextValue = useContext(CursorContext)

    return (
        <section className='about__section'>

            <div className='about__container'>

                    <motion.h2
                        className='about__h2'
                        initial={{x: 200, opacity:0}}
                        whileInView={{x: 0, opacity:1 }}
                        transition= {{ duration: .5, type: "spring", delay: .4}}
                        viewport={{ once: true }}
                        
                        onMouseOver={contextValue.overTitle}
                        onMouseOut={contextValue.outTag}>
                        /about
                    </motion.h2>

              {/*       <AnimatedContent initial={{x: 200, opacity:0}} animate={{opacity: 1, x:0}} position={.3}>
                        <h2 className='about__h2'>/about</h2>
                    </AnimatedContent> */}

                <motion.div
                    className='about__body'
                    initial={{x:-100, opacity:0}}
                        whileInView={{x: 0, opacity:1 }}
                        transition= {{ duration: 1, type: "spring", delay: .5}}
                        viewport={{ once: true }}>
                    <p>{about}</p>
                </motion.div>


             {/*    <AnimatedContent initial={{opacity: 0 , x:-40}} animate={{opacity: 1, x:0}} position={.5}>
                    <div className='about__body'>
                        <p>{about}</p>
                    </div>
                </AnimatedContent> */}




                <motion.div
                className='about__img-container'
                initial={{y:450}}
                whileInView={{y:0 , duration: .5}}
                transition= {{ duration: .5, type: "spring"}}
                viewport={{ once: true }}>
                    <img src={photo} />
                </motion.div>

            </div>







        </section>
    )
}