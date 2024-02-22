import './Header.scss';

import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


export const Header = () => {

    const [lastScrollPosition , setLastScrollPosition ] = useState(window.scrollY)
    const [scrollDirection , setScrollDirection ] = useState('default')

    const handleScroll = () => {
        setScrollDirection( window.scrollY > lastScrollPosition ? 'down' : 'up' )
        setLastScrollPosition(window.scrollY)
    }

    const variants = {

        default: { opacity: 1 },
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
        <motion.header className='header'
            initial={ {opacity: 0 }}
            variants={ variants }
            animate={ scrollDirection }
            transition={{
                ease: "easeOut",
                duration: scrollDirection === 'default' ?  .5 : .3,
                delay: scrollDirection === 'default' ?  .8 : 0
            }}
        >

            <motion.nav className='header__navbar'
                
            
            >

                <div className='header__brandName'>
                    <ScrollLink to="home__section" spy={true} smooth={'easeOutQuint'} offset={50} duration={40} >ST{scrollDirection}</ScrollLink>
                </div>

                <ul className='header__sections'>
                    <li>
                        <ScrollLink to="home__section" spy={true} smooth={'easeOutQuint'} offset={50} duration={30}>home</ScrollLink>
                    </li>
                    <li >
                        <ScrollLink to="about__section" spy={true} smooth={'easeOutQuint'} offset={50} duration={30}>about</ScrollLink>
                    </li>
                    <li >
                        <ScrollLink to="projects__section" spy={true} smooth={'easeInQuint'} offset={50} duration={35}>project</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="contact__section" spy={true} smooth={'easeInQuint'} offset={50} duration={40}>contact</ScrollLink>
                    </li>
                </ul>

            </motion.nav>
        </motion.header>
        )
    }
