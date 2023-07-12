import './Header.scss';


export const Header = () => {
    return (
        <header className='header'>

            <nav className='header__navbar'>

                <div className='header__brand-name'>
                    ST
                </div>

                <ul className='header__sections'>
                    <li>about</li>
                    <li style={{margin: '0 20px'}}>work</li>
                    <li>contact</li>
                </ul>
            </nav>
        </header>
        )

}