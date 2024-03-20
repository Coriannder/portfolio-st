import './Cursor.scss'

import { useState, useEffect, useContext  } from 'react'
import {  motion } from 'framer-motion'
import { CursorContext } from '../../Context/CursorContext'


export const Cursor = () => {

    const contextValue = useContext( CursorContext )
    const [ mousePosition, setMousePosition ] = useState({ x: 0, y: 0 })

    const variants = {
        default: {
            x: mousePosition.x,
            y: mousePosition.y,
        },
        name: {
            x: mousePosition.x,
            y: mousePosition.y,
            scale: 2.2,
            mixBlendMode: 'difference'
        },
        item: {
            x: mousePosition.x,
            y: mousePosition.y,
            mixBlendMode: 'difference'
        }
    }

    useEffect( () => {
        const handleMouseMove = e => {
            setMousePosition( {
                x: e.clientX,
                y: e.clientY
            } )
        }
        window.addEventListener('mousemove', handleMouseMove)
        return ( ) =>  window.removeEventListener('mousemove', handleMouseMove)
    }, [] )


    return (
    <motion.div
        className='cursor'
        variants={variants}
        animate={ contextValue.isInsideText || 'default'}
        transition={{
            ease: "easeInOut",
            duration: .001,
        }}/>
    )
}