import './Contact.scss'


export const Contact = () => {


    return(
        <section className='contact__section'>

            <div className='contact__container'>

                <div className='contact__title'>
                    <div style={{fontSize:'2vw'}}>
                        Te gustaria que trabajemos juntos ?
                    </div>
                    <h2 className='contact__h2'>
                        CONTACTAME
                    </h2>
                </div>

                <div className='contact__media'>

                    <div className='contact__mailto'>
                        <div style={{marginRight: '2rem'}}>EMAIL</div>
                        <a href='mailto:hola@sebastaboada.com'>hola@sebastaboada.com</a>
                    </div>

                    <div className='contact__social-media'>
                        <div style={{marginLeft: '2rem', textAlign: 'start'}}>
                            <div>LinkedIn</div>
                            <div>Github</div>
                        </div>
                        <div>SOCIAL</div>
                        

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

            </div */}

        </section>
    )
}