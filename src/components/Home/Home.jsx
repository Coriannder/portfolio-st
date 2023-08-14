import './Home.scss'
import logo2 from '../../assets/logo2.svg'


export const Home = () => {


    return (
        <section className='home__section'>

            <div className='home__container'>
                <div className='home__intro'>
                    Hola como estas? Soy
                    {/* <div>Soy un desarrollador web e Ingeniero Biomedico</div>
                    <div> viviendo en Argentina</div> */}
                </div>

                <h1 className='home__h1'>
                    <span className='home__name'>SEBAS</span>
                    <span style={{height: '100%'}}><img className='home__name-logo' src={logo2}></img></span>
                    <span className='home__lastName'>TABOADA</span>
                </h1>
                <h3 className='home__h3'>
                    <span>desarrolladro web fullstack</span>
                </h3>

            </div>

        </section>
    )
}