import './Header.scss';

import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion';
import { useEffect, useState, useContext } from 'react';
import { CursorContext } from '../../Context/CursorContext';
import { HeaderLink } from './HeaderLink/HeaderLink';


export const Header = () => {

    const contextValue = useContext(CursorContext)
    const [lastScrollPosition , setLastScrollPosition ] = useState(window.scrollY)
    const [scrollDirection , setScrollDirection ] = useState('default')

    const handleScroll = () => {
        setScrollDirection( window.scrollY > lastScrollPosition ? 'down' : 'up' )
        setLastScrollPosition(window.scrollY)
    }

    const variants = {

        default: { opacity: 0 },
        up: {
            opacity: 1,
            y: 0,
        },
        down: {
            opacity: 0,
            y:-50
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll' , handleScroll);
        return () => {
            window.removeEventListener('scroll' , handleScroll)
        }
    },[lastScrollPosition])

    return (
        <motion.header className='header__section'
            initial={ {opacity: 0 }}
            variants={ variants }
            animate={ scrollDirection }
            transition={{
                ease: "easeOut",
                duration: scrollDirection === 'default' ?  .5 : .3,
                delay: scrollDirection === 'default' ?  .8 : .2
            }}
        >

            <motion.nav className='header__navbar'>

                <div className='header__brandName' onMouseOver={ () => contextValue.overTag('brandName') } onMouseOut={ contextValue.outTag}>
                    <ScrollLink to="home__section" spy={true} smooth={'easeOutQuint'} offset={50} duration={30}>ST</ScrollLink>
                </div>

                <ul className='header__menu'>
                    <li><HeaderLink to={"home__section"} title={'Inicio'}/></li>
                    <li><HeaderLink to={"about__section"} title={'Quien soy'}/></li>
                    <li><HeaderLink to={"projects__section"} title={'Proyectos'} /></li>
                    <li><HeaderLink to={"contact__section"} title={'Contacto'}/></li>
                </ul>

            </motion.nav>
        </motion.header>
        )
    }
