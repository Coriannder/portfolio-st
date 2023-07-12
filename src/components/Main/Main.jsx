import { BackgroundFigure } from '../BackgroundFigure/BackgroundFigure'
import './Main.scss'

export const Main = (props) => {

    return (
        <main className='main'>
            <BackgroundFigure/>
            <div className='main__container'>
                {props.children}
            </div>
        </main>


    )
}