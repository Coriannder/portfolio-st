import { useEffect, useState } from 'react'

import './PointerFollower.scss'

export const PointerFollower = () => {

    const [mousePos, setMousePos] = useState({});


    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      //console.log({ x: e.clientX, y: e.clientY })
      //console.log(e.type)
    };

    const handleScroll = () => {
      const { clientX, clientY } = mousePos;
      setMousePos({ x: clientX, y: clientY });
    };

    

    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('onScroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.addEventListener('scroll', handleScroll);

        };
    });

    return (
      <div
          className='pointerFollower'
          style={{top:`${mousePos.y - 25}px`, left: `${mousePos.x - 25}px` }}>
      </div>
    )

}
