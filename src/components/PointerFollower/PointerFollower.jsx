import { useEffect, useState } from 'react'

import './PointerFollower.scss'

export const PointerFollower = () => {

    const [mousePos, setMousePos] = useState({});


    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      console.log({ x: e.clientX, y: e.clientY })
    };

    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);

        };
    });

    return (
      <div
          className='pointerFollower'
          style={{top:`${mousePos.y - 25}px`, left: `${mousePos.x - 25}px` }}>
      </div>
    )

}
