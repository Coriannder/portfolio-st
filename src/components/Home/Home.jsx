import './Home.scss'
import logo2 from '../../assets/logo2.svg'


export const Home = () => {


    return (
        <section className='home__section'>

            <div className='home__container'>
                <p className='home__paragraph'>
                    <div>Hola soy Sebas</div>
                    <div>Un desarrollador web & Ingniero Biomedico</div>
                    <div> viviendo en Argentina</div>
                </p>

                <h1 className='home__h1'>
                    <span className='home__name'>SEBAS</span>
                    <span><img className='home__name-logo' src={logo2}></img></span>
                    <span className='home__lastName'>TABOADA</span>
                </h1>
                <h3 className='home__h3'>
                    <span>FULLSTACK Web Developer</span>
                </h3>

            </div>

        </section>
    )
}