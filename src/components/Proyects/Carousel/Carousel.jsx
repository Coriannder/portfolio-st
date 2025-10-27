// Carousel.jsx
import './Carousel.scss'
import { useState, useEffect, useCallback } from 'react'
import { Card } from './Card/Card'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from '../../../json/newProject.json'
import { CarouselButton } from './CarouselButton/CarouselButton'

export const Carousel = () => {
	const items = projectsData

	const [activeIndex, setActiveIndex] = useState(items.findIndex(p => p.featured) !== -1 ? items.findIndex(p => p.featured): 0)
	const [direction, setDirection] = useState(0)

	// prevent rapid interactions while animation runs
	//const [isAnimating, setIsAnimating] = useState(false)

	// detect mobile (match CSS breakpoint) so we can adjust center scale on small screens
	const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false)

	useEffect(() => {
		if (typeof window === 'undefined') return
		const mq = window.matchMedia('(max-width: 767px)')
		const handler = (e) => setIsMobile(e.matches)
		if (mq.addEventListener) mq.addEventListener('change', handler)
		else mq.addListener(handler)

		return () => {
			if (mq.removeEventListener) mq.removeEventListener('change', handler)
			else mq.removeListener(handler)
		}
	}, [])

	// 3) Helpers para wrap-around
	const mod = (n, m) => ((n % m) + m) % m
	const leftIndex   = mod(activeIndex - 1, items.length)
	const rightIndex  = mod(activeIndex + 1, items.length)


	// 4) Handlers de navegación
	const goRight = () => {
  setDirection(-1)
  console.debug('[carousel] before goRight scrollY', window.scrollY, 'activeElement', document.activeElement)
  setActiveIndex(i => mod(i + 1, items.length))
  // medir después del cambio / posible scroll programático
  requestAnimationFrame(() => {
    setTimeout(() => {
      console.debug('[carousel] after goRight scrollY', window.scrollY)
    }, 50) // ajustar tiempo si hay animaciones/timeout
  })
}

const goLeft = () => {
  setDirection(1)
  console.debug('[carousel] before goLeft scrollY', window.scrollY, 'activeElement', document.activeElement)
  setActiveIndex(i => mod(i - 1, items.length))
  requestAnimationFrame(() => {
    setTimeout(() => {
      console.debug('[carousel] after goLeft scrollY', window.scrollY)
    }, 50)
  })
}

		// jump to a specific index from the dots; pick direction based on shortest path
		const goToIndex = (newIndex) => {
			if (newIndex === activeIndex) return
			//if (isAnimating) return
			//setIsAnimating(true)
			const len = items.length
			const forwardDistance = (newIndex - activeIndex + len) % len
			const backwardDistance = (activeIndex - newIndex + len) % len
			// choose the shorter path; note: "advance" (visual right) uses direction -1
			if (forwardDistance <= backwardDistance) {
				setDirection(-1)
			} else {
				setDirection(1)
			}
			setActiveIndex(newIndex)
		}
			//setTimeout(() => setIsAnimating(false), 420)
		//}, [activeIndex, isAnimating, items.length])





		// animations: AnimatePresence for center card (step 1)
		// Conservative animation: only translate X + fade (no scale) to preserve original layout
		const OFFSET = 380

		const cardVariants = {
			enter: (dir) => ({
				x: -dir * OFFSET,
				opacity: 0,
				transition: {
					x: {
						type: 'tween',
						duration: 0.28,
						ease: 'easeInOut'
					},
					opacity: {
						duration: 0.4
					}
				}
			}),
			center: {
				x: 0,
				opacity: 1,
				scale: isMobile ? 1 : 1.6,
				// use a tween for center to avoid any spring-like bounce when settling
				transition: {
					x: {
						type: 'tween',
						duration: 0.32,
						ease: 'easeOut'
					},
					opacity: {
						duration: 0.1
					}
				}
			},
			exit: (dir) => ({
				x: dir * OFFSET,
				opacity: 0,
				scale: 1,
				transition: {
					x:{
						type: 'tween',
						duration: 0.18
					},
					opacity: {
						duration: .2
					}
				}
			}),
		}

		// preview parallax variants (subtle movement opposite to center)
		// softened: much smaller offset and subtler scale/opacity so previews don't distract
		const PREVIEW_OFFSET = Math.round(OFFSET * 0.01)
		const previewVariants = {
			enter: (dir) => ({
				x: dir > 0 ? -PREVIEW_OFFSET : PREVIEW_OFFSET,
				opacity: 0.6,
				scale: 0.985,
				transition: { x: { type: 'tween', duration: 0.28 }, opacity: { duration: 0.9 } }
			}),
			center: {
				x: 0,
				opacity: 0.72,
				scale: 0.995,
				transition: { duration: 0.28 }
			},
			exit: (dir) => ({
				x: dir > 0 ? PREVIEW_OFFSET : -PREVIEW_OFFSET,
				opacity: 0.6,
				scale: 0.985,
				transition: { x: { type: 'tween', duration: 0.24 }, opacity: { duration: 0.18 } }
			}),
		}

    return (

        <div className='carousel'>


            <div className='carousel__viewport'>

				<motion.div className='carousel__card carousel__card--preview'
					key={leftIndex}
					custom={direction}
					variants={previewVariants}
					initial="enter"
					animate="center"
					exit="exit"
					aria-hidden="true"
				>
					<Card data={{...items[leftIndex], isActive: false}} />
				</motion.div>

					<AnimatePresence initial={false} custom={direction} mode="sync">
						<motion.div
							key={activeIndex}
							custom={direction}
							variants={cardVariants}
							initial="enter"
							animate="center"
							exit="exit"

							className='carousel__card carousel__card--center'
							aria-live="polite"

							onClick={goRight}
						>
							<Card data={{...items[activeIndex]}} isActive={true} />
						</motion.div>
					</AnimatePresence>

				<motion.div className='carousel__card carousel__card--preview'
					key={rightIndex}
					custom={direction}
					variants={previewVariants}
					initial="enter"
					animate="center"
					exit="exit"
					aria-hidden="true"
				>
					<Card data={{...items[rightIndex], isActive: false}} />
				</motion.div>

			</div>

		<div className='carousel__nav'>
					<CarouselButton direction="left" onClick={goLeft} ariaLabel="previous" />
					<CarouselButton direction="right" onClick={goRight} ariaLabel="next" />
				</div>

				{/* dots / pagination */}
				<div className="carousel__dots" role="tablist" aria-label="Carousel pagination">
					{items.map((_, idx) => (
							<button
								key={idx}
								type="button"
								data-idx={idx}
								className={`carousel__dot ${idx === activeIndex ? 'carousel__dot--active' : ''}`}
								// stop propagation early in capture phase for pointer/touch to avoid ancestor handlers
								//onPointerDownCapture={(e) => { try { e.stopPropagation(); } catch (err) {} }}
								//onTouchStartCapture={(e) => { try { e.stopPropagation(); } catch (err) {} }}
								aria-label={`Go to slide ${idx + 1}`}
								aria-current={idx === activeIndex}
								//onMouseDown={(e) => e.preventDefault()} // prevent focus jump on some browsers
								//onPointerDown={(e) => e.preventDefault()} // prevent focus/activation via pointer (covers touch)
								// prevent propagation and default behavior on click to avoid ancestor handlers / anchors
								onClick={(e) => {
									//e.preventDefault()
									//e.stopPropagation()
									//if (isAnimating) return
									goToIndex(idx)
									/* remove focus to avoid mobile scroll/jump */
									e.currentTarget.blur()
								}}
							/>
					))}
				</div>

		</div>

	)
}
