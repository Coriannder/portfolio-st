import './CarouselButton.scss';
import { motion } from 'framer-motion'

export const CarouselButton = ( {direction, onClick, ariaLabel} ) => {
	const slideIn = {
		hidden: (dir) => ({ x: dir === 'left' ? -18 : 18, opacity: 0 }),
		visible: { x: 0, opacity: 1, transition: { type: 'tween', duration: 0.36, ease: 'easeOut' } }
	}

	return (
		<motion.button
			className={`carouselButton__nav carouselButton__nav--${direction}`}
			onClick={onClick}
			aria-label={ariaLabel}
			initial="hidden"
			animate="visible"
			custom={direction}
			variants={slideIn}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.92 }}
		>
			<span aria-hidden>{direction === 'left' ? '‹' : '›'}</span>
		</motion.button>
	)
}