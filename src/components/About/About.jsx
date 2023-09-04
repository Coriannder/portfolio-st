import './About.scss'
import { about } from  '../../json/about.json'
import photo from '../../assets/profile-st-PhotoRoom.png'


export const About = () => {


    return (
        <section className='about__section'>

            <div className='about__container'>

                <div className='about__h2' >
                    /about
                </div>

                <div className='about__body'>
                    <p>{about}</p>
                </div>

                <div className='about__img-container'>
                    <img src={photo} />
                </div>

            </div>

        </section>
    )
}