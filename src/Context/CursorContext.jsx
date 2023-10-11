import './CursorContext.scss'

import React, { useState, useEffect } from "react";
//import { Cursor } from "../components/Cursor/Cursor";
import { motion } from 'framer-motion'

export const CursorContext = React.createContext()

export const CursorProvider = ({children}) => {


    const [ isInside, setIsInside] = useState('')

    const overName = () => {
        setIsInside('name')
        console.log('name')
    }
    const outTag = () => {
        setIsInside('')
    }

    const overTitle = () => {
        setIsInside('title')
    }

    const overButton = () => {
        setIsInside('button')
    }
/*     const outTitle = () => {
        setIsInside('')
    } */

    const handleHover = (value) => {
        setIsInside(value)
        console.log(value)
    }
        

/*     const handleMouseOut = () => {
        setIsInsideText(false)
        //console.log('false')
    } */





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


            <CursorContext.Provider value={{ overName, overTitle, overButton, outTag, handleHover}}>
                {/* <Cursor/> */}
                {children}
            </CursorContext.Provider>

        </>

    )


}