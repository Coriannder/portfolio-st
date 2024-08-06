import './Contact.scss'
import { cubicBezier, motion } from 'framer-motion'
import { ContactLink } from './ContactLink/ContactLink'
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { ImMail } from "react-icons/im";

export const Contact = () => {

    const easing = cubicBezier(.35,.17,.3,.86)

    return(
        <section className='contact__section'>

            <div className='contact__container'>


                <motion.div
                    className='contact__subtitle'
                    initial={{y:-30 , opacity: 0}}
                    whileInView={{y:0 , opacity:1}}
                    transition= {{ duration: .4, type: "spring", delay: .3}}
                    //viewport={{ once: true }}
                >
                    Te gustaria que trabajemos juntos ?
                </motion.div>

                <motion.div
                    initial={{x:-200 , opacity: 0}}
                    whileInView={{x:0 , opacity:1}}
                    transition= {{ duration: .6, type: 'spring', delay: .5}}
                    //viewport={{ once: true }}
                    className='contact__titleContainer'
                >
                    <h2
                        className='contact__h2'
                    >
                    CONTACTAME
                    </h2>

                </motion.div>

                <motion.div
                    className='contact__linkContainer'
                    initial={{x:-100, opacity:0}}
                    whileInView={{x: 0, opacity:1 }}
                    transition= {{ duration: .8, type: "spring", delay: .7}}
                    //viewport={{ once: true }}
                >
                    <ContactLink title={'email'} to={'mailto:contacto@sebasdev.com'} children={<ImMail/>}></ContactLink>
                    <ContactLink title={'linkedin'} to={'https://www.linkedin.com/in/sebastian-taboada-1b96a956/'} children={<FaLinkedin/>}/>
                    <ContactLink title={'github'} to={'https://github.com/Coriannder'} children={<FaGithubSquare/>}/>
                </motion.div>
            </div>
        </section>
    )
}