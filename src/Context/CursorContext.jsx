import './CursorContext.scss'

import { createContext, useState, useEffect } from "react";
import { motion } from 'framer-motion'

export const CursorContext = createContext()

export const CursorProvider = ({children}) => {

    const [ isInside, setIsInside] = useState('')

    const overName = () => {
        setIsInside('name')
        //console.log('name')
    }
    const outTag = () => {
        setIsInside('')
    }

    const overTitle = () => {
        setIsInside('title')
    }

    const overLink = () => {
        setIsInside('link')
    }
    const outTitle = () => {
        setIsInside('')
    }

    const handleHover = (value) => {
        setIsInside(value)
        console.log(value)
    }

    const overButton = () => {
        setIsInside('button')
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
            //backgroundColor: '#2B2B2B',
            mixBlendMode: 'difference'
        },

        title: {
            x: mousePosition.x,
            y: mousePosition.y,

            scale: 2,
            mixBlendMode: 'difference',
            //backgroundColor: 'red'
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
                //transition={{ type: "spring", stiffness: 1000, duration: .0001, delay: 0 }}
                transition={{
                    ease: "easeIn",
                    duration: .001,}}
            />


            <CursorContext.Provider value={{ overName, overTitle, outTag, handleHover, overButton, overLink}}>
                {/* <Cursor/> */}
                {children}
            </CursorContext.Provider>

        </>

    )


}