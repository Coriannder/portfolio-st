import './Home.scss'
import logo2 from '../../assets/logo2.svg'
import { CursorContext } from '../../Context/CursorContext'
import { useContext } from 'react'
import {  motion } from 'framer-motion'

export const Home = () => {

    const contextValue = useContext(CursorContext)

    return (
        <section className='home__section'>
                <motion.div className='home__container'
                    onMouseOver={ () => contextValue.overTag('name') }
                    onMouseOut={contextValue.outTag}
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}

                    transition={
                        {
                            ease: "easeOut",
                            damping: 30,
                            duration: .8,
                            delay: .8
                        }
                    }

                >
                    <div className='home__intro'>
                        Hola como estas? Soy
                    </div>

                <h1

                    className='home__h1' >
                    <span className='home__name'>
                        SEBAS
                    </span>
                    <span style={{height: '100%'}}>
                            <motion.img
                                whileHover={{
                                    rotate: 90,
                                    transition: { duration: .5, type: "spring" },
                                }}
                                className='home__name-logo' src={logo2}
                            />
                    </span>
                    <span className='home__lastName'>TABOADA</span>
                </h1>
                <h3 className='home__h3 badge badge-succes' >
                    <span>desarrollador web fullstack</span>
                </h3>

                </motion.div>
        </section>
    )
}