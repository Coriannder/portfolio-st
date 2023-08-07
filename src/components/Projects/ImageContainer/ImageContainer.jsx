import { useState } from 'react'
import './ImageContainer.scss'

export const ImageContainer = ({image}) => {

    const [isShown, setIsShown] = useState( false )


    return (
        <div
            className='imageContainer__container'
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <img src={image} />
            {isShown && (
                <div className='imageContainer__hover'>
                    <div className='imageContainer__buttonsContainer'>
                        <button className='imageContainer__viewSite'>Ir al Sitio</button>
                        <button className='imageContainer__viewCode'>Ver el Codigo</button>
                    </div>
                </div>
                )}
        </div>
        )
}



