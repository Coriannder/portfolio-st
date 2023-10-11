import './Contact.scss'

import { AnimatedContent } from '../AnimatedContent/AnimatedContent'

export const Contact = () => {


    return(
        <section className='contact__section' /* data-scroll data-scroll-sticky data-scroll-target="#scroll-container" */>

            <div className='contact__container'>

                <div className='contact__subtitle'>
                    Te gustaria que trabajemos juntos ?
                </div>

                <AnimatedContent initial={{opacity: 0 , x:-80}} animate={{opacity: 1, x:0}} position={.5}>
                    <h2 className='contact__h2'>
                        CONTACTAME
                    </h2>
                </AnimatedContent>

                

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