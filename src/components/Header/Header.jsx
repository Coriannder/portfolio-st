import './Header.scss';

import { Link as ScrollLink } from 'react-scroll'


export const Header = () => {
    return (
        <header className='header'>

            <nav className='header__navbar'>

                <div className='header__brandName'>
                    <ScrollLink to="home__section" spy={true} smooth={'easeOutQuint'} offset={50} duration={40} >ST</ScrollLink>
                </div>

                <ul className='header__sections'>
                    <li>
                        <ScrollLink to="about__section" spy={true} smooth={'easeOutQuint'} offset={50} duration={30}>about</ScrollLink>
                    </li>
                    <li style={{margin: '0 20px'}}>
                        <ScrollLink to="projects__section" spy={true} smooth={'easeOutQuint'} offset={50} duration={35}>project</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="contact__section" spy={true} smooth={'easeInQuint'} offset={50} duration={40}>contact</ScrollLink>
                    </li>
                </ul>

            </nav>
        </header>
        )

}