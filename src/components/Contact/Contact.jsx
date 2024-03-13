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

                <h2 className='contact__h2'>
                    <motion.div
                        className='contact__h2--animation'
                        initial={{y:-100 , opacity: 0}}
                        whileInView={{y:0 , opacity:1}}
                        transition= {{ duration: .3, type: "spring", delay: .5}}
                        viewport={{ once: true }}
                    >
                    CONTACTAME
                    </motion.div>

                </h2>

                <motion.div
                    className='contact__link-container'
                    initial={{x:-100, opacity:0}}
                    whileInView={{x: 0, opacity:1 }}
                    transition= {{ duration: .5, type: "spring", delay: .6}}
                    viewport={{ once: true }}
                >
                    <ContactLink title={'email'}><ImMail/></ContactLink>
                    <ContactLink title={'linkedin'} children={<FaLinkedin/>}/>
                    <ContactLink title={'github'}><FaGithubSquare/></ContactLink>
                </motion.div>
            </div>
        </section>
    )
}