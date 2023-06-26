import './Header.scss';


export const Header = () => {
    return (
        <header className='header__container'>

            <nav className='header__navbar'>

                <div className='header__brand-name'>
                    Sebas Taboada
                </div>

                <ul className='header__sections'>
                    <li>about</li>
                    <li>works</li>
                    <li>contact</li>
                </ul>
            </nav>
        </header>
        )

}