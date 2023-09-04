//import { useState } from 'react'
import './VisorProject.scss'

export const VisorProject = ({src, visible}) => {

    //const [isShown, setIsShown] = useState( false )

    // [position, setPosition] = useState()


    return (

        <div
            className='visorProject__container'
            //onMouseEnter={() => setIsShown(true)}
            //onMouseLeave={() => setIsShown(false)}

            style={{display: visible ?  "block" : "none"}}
        >
            <iframe
                src={src}
                className='visorProject__iframe pp'
                width='100%'
                height='100%'
                //onClick={console.log('hola')}
            />


            {/*  {isShown && (
                <div className='visorProject__hover'>
                    <div className='visorProject__buttonsContainer'>
                        <button className='visorProject__viewSite'>Ir al Sitio</button>
                        <button className='visorProject__viewCode'>Ver el Codigo</button>
                    </div>
                </div>
                )} */}
        </div>
    )
}



