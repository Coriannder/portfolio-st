import './Contact.scss'
import { motion } from 'framer-motion'

//import { AnimatedContent } from '../AnimatedContent/AnimatedContent'

export const Contact = () => {


    return(
        <section className='contact__section' /* data-scroll data-scroll-sticky data-scroll-target="#scroll-container" */>

            <div className='contact__container'>


                <motion.div
                    className='contact__subtitle'
                    initial={{x:-100, opacity:0}}
                        whileInView={{x: 0, opacity:1 }}
                        transition= {{ duration: 1, type: "spring", delay: .5}}
                        viewport={{ once: true }}>
                    Te gustaria que trabajemos juntos ?
                </motion.div>

                <h2 className='contact__h2'>
                    <div >
                        CONTACTAME
                    </div>
                    <motion.div
                        className='contact__h2--animation'
                        initial={/* {x:-100, opacity:0} */ {y:0}}
                        whileInView={/* {x: 0, opacity:1 } */ {y:200}}
                        transition= {{ duration: 2, type: "spring", delay: .6}}
                        viewport={{ once: true }}>
                    </motion.div>

                </h2>

                <motion.div
                        className='contact__media-container'
                        initial={{x:-100, opacity:0}}
                            whileInView={{x: 0, opacity:1 }}
                            transition= {{ duration: 1, type: "spring", delay: 1}}
                            viewport={{ once: true }}>

                        <div className='contact__mail-container'>

                            <div className='contact__mail-title'>EMAIL</div>

                            <a className='contact__mail-link' href='mailto:hola@sebastaboada.com'>hola@sebastaboada.com</a>

                        </div>

                        <div className='contact__social-container'>

                            <div className='contact__social-title'>SOCIAL</div>
                            <div className='contact__link-container'>
                                <a className='contact__link' href='https://www.linkedin.com/in/sebastian-taboada-1b96a956/' >LinkedIn</a>
                                <a className='contact__link' href='https://github.com/Coriannder'>Github</a>
                            </div>

                        </div>

                </motion.div>

                {/* position (num entre 0 y 1 ): indica la posiciion del elemento en el viewport, 0 abajo, 1 arriba */}

                {/* <AnimatedContent initial={{opacity: 0 , x:-400}} animate={{opacity: 1, x:0}} position={.5}> 
                    <h2 className='contact__h2'>
                        CONTACTAME
                    </h2>

                    <div className='contact__media-container'>

                        <div className='contact__mail-container'>

                            <div className='contact__mail-title'>EMAIL</div>

                            <a className='contact__mail-link' href='mailto:hola@sebastaboada.com'>hola@sebastaboada.com</a>

                        </div>

                        <div className='contact__social-container'>

                            <div className='contact__social-title'>SOCIAL</div>
                            <div className='contact__link-container'>
                                <a className='contact__link' href='https://www.linkedin.com/in/sebastian-taboada-1b96a956/' >LinkedIn</a>
                                <a className='contact__link' href='https://github.com/Coriannder'>Github</a>
                            </div>

                        </div>

                    </div>
                </AnimatedContent> */}


            </div>

            {/* <div className='contact__form-container' >

                <form className='contact__form'>

                    <label>Nombre
                        <input className='contact__input' type='text' placeholder='Nombre' required/>
                    </label>

                    <label htmlFor='email'>Email</label>
                    <input className='contact__input' type='email' id='email' placeholder='email' required/>

                    <label htmlFor='message'>Mensaje</label>
                    <textarea className='contact__input contact__input--mensaje' id='message' placeholder='mensaje' required/>

                    <button>Enviar</button>

                </form>

            </div>
 */}
        </section>
    )
}