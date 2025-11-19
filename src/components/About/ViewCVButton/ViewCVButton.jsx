import { useCallback, useContext, useState } from 'react'
import { CursorContext } from '../../../Context/CursorContext'
import './ViewCVButton.scss'
import { AiFillEye } from "react-icons/ai";

import { motion } from 'framer-motion'

export const ViewCVButton = () => {
	const contextValue = useContext(CursorContext)
	const [hover, setHover] = useState(false)


	const handleOpen = useCallback(() => {
		const url = '/files/sebasdev-cv-2025.pdf'
		try {
			window.open(url, '_blank', 'noopener')
		} catch (err) {
			console.error('Failed to open CV', err)
			window.location.href = url
		}
	}, [])

	return (
		<div
			className="view-cv-button__container"
			onMouseOver={() => contextValue.overTag && contextValue.overTag('button')}
			onMouseOut={() => contextValue.outTag && contextValue.outTag()}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={handleOpen}
			aria-label="Ver CV de Sebastián Taboada"
		>
			<motion.div
                className="view-cv-button__btn view-cv-button__background"
                //initial={{x: 0}}
                animate={{scale: hover? 1.02 : 0}}
                transition={{duration: .12, easings: 'spring'}}
            >``
				Ver CV
			</motion.div>

        	<div className="view-cv-button__btn view-cv-button__content"> Ver CV</div>

    	</div>
  )
}




