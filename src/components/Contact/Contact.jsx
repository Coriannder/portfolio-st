import './Contact.scss'
import { motion } from 'framer-motion'
import { ContactLink } from './ContactLink/ContactLink'
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { ImMail } from "react-icons/im";

export const Contact = () => {

    return(
        <section className='contact__section'>

            <div className='contact__container'>


                <motion.div
                    className='contact__subtitle'
                    initial={{y:-50 , opacity: 0}}
                    whileInView={{y:0 , opacity:1}}
                    transition= {{ duration: .3, type: "spring", delay: .3}}
                    viewport={{ once: true }}
                >
                    Te gustaria que trabajemos juntos ?
                </motion.div>

                <div className='contact__titleContainer'>
                    <motion.h2
                        className='contact__h2'
                        initial={{y:-100 , opacity: 0}}
                        whileInView={{y:0 , opacity:1}}
                        transition= {{ duration: .3, type: "spring", delay: .5}}
                        viewport={{ once: true }}
                    >
                    CONTACTAME
                    </motion.h2>

                </div>

                <motion.div
                    className='contact__linkContainer'
                    initial={{x:-100, opacity:0}}
                    whileInView={{x: 0, opacity:1 }}
                    transition= {{ duration: .5, type: "spring", delay: .6}}
                    viewport={{ once: true }}
                >
                    <ContactLink title={'email'} to={'mailto:contacto@sebastaboada.com'} children={<ImMail/>}></ContactLink>
                    <ContactLink title={'linkedin'} to={'https://www.linkedin.com/in/sebastian-taboada-1b96a956/'} children={<FaLinkedin/>}/>
                    <ContactLink title={'github'} to={'https://github.com/Coriannder'} children={<FaGithubSquare/>}/>
                </motion.div>
            </div>
        </section>
    )
}