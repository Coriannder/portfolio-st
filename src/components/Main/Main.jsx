import locomotiveScroll from 'locomotive-scroll';
import { useEffect } from 'react';

import './Main.scss'





export const Main = (props) => {

    useEffect(()=>{

        const scroll = new locomotiveScroll({
            el: document.querySelector('#main__container'), // Reemplaza con el selector de tu contenedor de desplazamiento
            smooth: true, // Habilitar el desplazamiento suave
        });

        return () => {
            scroll.destroy()
        };
    },[])


    return (
        <main className='main__container'  data-scroll-container id='main__container'>
                {props.children}
        </main>

    )
}