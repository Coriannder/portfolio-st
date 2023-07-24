import './About.scss'
import data from  '../../json/about.json'
import logo1 from '../../assets/logo1.svg'


export const About = () => {


    return (
        <section className='about__section'>
            <div className='about__img-container'><img  src={logo1}></img></div>
            <div className='about__container'>
                <div className='about__h2'>
                    /about
                </div>
                <div className='about__body'>
                    <p>{data.about}</p>
                </div>
            </div>
        </section>
    )
}