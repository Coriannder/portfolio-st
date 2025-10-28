import './CursorContext.scss'

import { createContext, useState, useEffect } from "react";
import { motion } from 'framer-motion'

export const CursorContext = createContext()

export const CursorProvider = ({children}) => {

    const [ isInside, setIsInside] = useState('')

    const overTag = (value) => {
        setIsInside(value)
        
    }

    const outTag = () => {
        setIsInside('')
    }

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    })

    const variants = {

        default: {
            x: mousePosition.x,
            y: mousePosition.y,
        },

        name: {
            x: mousePosition.x,
            y: mousePosition.y,

            scale: 3,
            mixBlendMode: 'difference',
        },

        title: {
            x: mousePosition.x,
            y: mousePosition.y,

            scale: 2,
            mixBlendMode: 'difference',
        },

        brandName : {
            x: mousePosition.x,
            y: mousePosition.y,

            scale: 1.5,
            cursor: 'none',
            backgroundColor: 'transparent',
            border: 'solid 1px',
        },

        link: {
            x: mousePosition.x,
            y: mousePosition.y,

            mixBlendMode: 'difference',
            opacity: 0
        },

        button: {
            x: mousePosition.x,
            y: mousePosition.y,

            mixBlendMode: 'difference',
            backgroundColor: 'transparent',
            border: "2px solid #F5B6CD",
            cursor: 'none',
            scale: 1.3
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

    return(
        <>
            <motion.div
                className='cursor'
                variants={variants}
                animate={ isInside || 'default'}
                transition={{
                    ease: "easeIn",
                    duration: .001,}}
            />

            <CursorContext.Provider style={{cursor: 'none'}} value={{overTag, outTag}}>
                {children}
            </CursorContext.Provider>
        </>
    )
}