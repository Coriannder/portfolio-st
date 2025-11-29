// Carousel.jsx
import './Carousel.scss'
import { useEffect, useRef, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from './Card/Card'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from '../../../json/newProject.json'
import { CarouselButton } from './CarouselButton/CarouselButton'
import { CursorContext } from '../../../Context/CursorContext'
import Dots from './Dots/Dots'
import { useAutoplay } from '../../../hooks/carousel/useAutoplay'
import { useSwipe } from '../../../hooks/carousel/useSwipe'
import { useCarouselState } from '../../../hooks/carousel/useCarouselState'
import { useIndicator } from '../../../hooks/carousel/useIndicator'

export const Carousel = () => {
	const items = projectsData
	const location = useLocation()

	// Determine initial index: if returning from ProjectDetail, use that project's index
	const getInitialIndex = () => {
		const returnId = location.state?.returnToProjectId
		if (returnId) {
			const idx = items.findIndex(p => String(p.id) === String(returnId))
			if (idx !== -1) return idx
		}
		// fallback: featured project or first
		const featuredIdx = items.findIndex(p => p.featured)
		return featuredIdx !== -1 ? featuredIdx : 0
	}

	// 3) Carousel state (active index, direction, wrap-around)
	const { activeIndex, direction, leftIndex, rightIndex, goLeft, goRight, goToIndex } = useCarouselState({ initialIndex: getInitialIndex(), length: items.length })

	// refs for moving dot indicator
	const dotsRef = useRef(null)
	const INDICATOR_SIZE = 16
	const indicator = useIndicator({ dotsRef, activeIndex, size: INDICATOR_SIZE })

	// cursor context so dots can trigger the same cursor animation as the section title
	const cursorContext = useContext(CursorContext)

	/* ===== Autoplay (respect prefers-reduced-motion and hybrid devices) ===== */
	const AUTOPLAY_RESUME_DELAY = 3000

	// Detect if device is mobile/tablet (disable autoplay on touch devices)
	const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
	const isTablet = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches
	const autoplayEnabled = !isMobile && !isTablet

	// useAutoplay hook controls interval and pause/resume behaviour
	const { start, stop, pauseThenResume, resume } = useAutoplay({ interval: 5000, resumeDelay: AUTOPLAY_RESUME_DELAY, enabled: autoplayEnabled })

	useEffect(() => {
		// start autoplay with the carousel state's goRight (advances to next)
		if (autoplayEnabled) {
			start(goRight)
		}
		return () => stop()
	}, [start, stop, goRight, autoplayEnabled])


	// 4) Handlers de navegación: wrap the hook actions to keep measurement and pause behavior
	const handleGoRight = () => {
		// use carousel state goRight (stable)
		goRight()
		// medir después del cambio / posible scroll programático
		requestAnimationFrame(() => {
			setTimeout(() => {
				// debug measurement placeholder
			}, 50)
		})
		// pause autoplay briefly after manual navigation
		pauseThenResume()
	}

	const handleGoLeft = () => {
		goLeft()
		requestAnimationFrame(() => {
			setTimeout(() => {
				// debug measurement placeholder
			}, 50)
		})
		pauseThenResume()
	}

	// Swipe handling for touch devices on the center card — extracted to hook
	const SWIPE_DISTANCE = 30 // px (reduced for snappier responses)
	const SWIPE_TIME = 500 // ms for velocity consideration

	const { handlers: swipeHandlers, skipClickRef } = useSwipe({ onSwipeLeft: handleGoRight, onSwipeRight: handleGoLeft, threshold: SWIPE_DISTANCE, maxTime: SWIPE_TIME })

	const handleCenterClick = (e) => {
		if (skipClickRef.current) {
			// prevent accidental click after swipe
			e.preventDefault()
			e.stopPropagation()
			return
		}
		// fallback: clicking center advances
		handleGoRight()
	}

	// jump to a specific index from the dots; use goToIndex wrapper to preserve pause
	const handleGoToIndex = (newIndex) => {
		if (newIndex === activeIndex) return
		goToIndex(newIndex)
		pauseThenResume()
	}





	// animations: AnimatePresence for center card (step 1)
	// Conservative animation: only translate X + fade (no scale) to preserve original layout
	const OFFSET = 380

	const cardVariants = {
		enter: (dir) => ({
			x: -dir * OFFSET,
			scale: 0.4,
			//opacity: 0,
			/* transition: {
				x: {
					type: 'tween',
					duration: 0.08,
					ease: 'easeInOut'
				},
				opacity: {
					duration: 0.08
				}
			} */
		}),
		center: {
			x: 0,
			opacity: 1,
			scale: 1,
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
			scale: 0.4,
			transition: {
				opacity: {
					duration: .3
				}
			}
		}),
	}		// preview parallax variants (subtle movement opposite to center)
	// softened: much smaller offset and subtler scale/opacity so previews don't distract
	const PREVIEW_OFFSET = Math.round(OFFSET * 0.01)
	const previewVariants = {
		enter: (dir) => ({
			x: dir > 0 ? -PREVIEW_OFFSET : PREVIEW_OFFSET,
			opacity: 0.1,
			scale: 0.2,
			transition: {
				x: { type: 'tween', duration: 0.28 },
				opacity: { duration: 0.5 }
			}
		}),
		center: {
			x: 0,
			opacity: 0.72,
			// no scale - dimensions handled by CSS
			scale: 0.6,
			transition: { duration: 0.28 }
		},
		exit: (dir) => ({
			x: dir > 0 ? -PREVIEW_OFFSET : PREVIEW_OFFSET,
			opacity: 0.2,
			scale: 1,
			transition: {
				x: { type: 'tween', duration: .04 },
				opacity: { duration: 0.5 }
			}
		}),
	}

	return (
		<div
			className='carousel'
			onPointerDown={() => pauseThenResume()}
			onMouseEnter={() => stop()}
			onMouseLeave={() => resume(goRight)}
			onFocus={() => stop()}
			onBlur={() => resume(goRight)}
		>


			<div className='carousel__viewport'>

				<motion.div
					initial={!isMobile ? { x: 100, opacity: 0 } : {}}
					whileInView={!isMobile ? { x: 0, opacity: 1 } : {}}
					transition={{ duration: .7, type: "spring", delay: .7 }}
					//viewport={{ once: true }}
				>
					<motion.div className='carousel__card--preview'
						key={leftIndex}
						custom={direction}
						variants={previewVariants}
						initial="enter"
						animate="center"
						exit="exit"
						aria-hidden="true"
					>
						<Card data={{ ...items[leftIndex], isActive: false }} />
					</motion.div>
				</motion.div>

				<motion.div
					initial={!isMobile ? { x: 0, opacity: 0 } : {}}
					whileInView={!isMobile ? { opacity: 1 } : {}}
					transition={{ duration: .4, type: "spring", delay: .2 }}
					//viewport={{ once: true }}
				>
					<AnimatePresence initial={false} custom={direction} mode="sync">
						<motion.div
							key={activeIndex}
							custom={direction}
							variants={cardVariants}
							initial="enter"
							animate="center"
							exit="exit"
							className='carousel__card--center'
							aria-live="polite"
							onPointerDown={(e) => { pauseThenResume(); swipeHandlers.onPointerDown && swipeHandlers.onPointerDown(e); }}
							onPointerMove={swipeHandlers.onPointerMove}
							onPointerUp={swipeHandlers.onPointerUp}
							onPointerCancel={swipeHandlers.onPointerCancel}
							onMouseEnter={() => stop()}
							onMouseLeave={() => resume(goRight)}
							onFocus={() => stop()}
							onBlur={() => resume(goRight)}
							onClick={handleCenterClick}
						>
							<Card data={{ ...items[activeIndex] }} isActive={true} />
						</motion.div>
					</AnimatePresence>

				</motion.div>

				<motion.div
					initial={!isMobile ? { x: 100, opacity: 0 } : {}}
					whileInView={!isMobile ? { x: 0, opacity: 1 } : {}}
					transition={{ duration: .7, type: "spring", delay: .77 }}
					//viewport={{ once: true }}
				>
					<motion.div className='carousel__card--preview'
						key={rightIndex}
						custom={direction}
						variants={previewVariants}
						initial="enter"
						animate="center"
						exit="exit"
						aria-hidden="true"
					>
						<Card data={{ ...items[rightIndex], isActive: false }} />
					</motion.div>

				</motion.div>

			</div>

			<div className='carousel__nav'>
				<CarouselButton direction="left" onClick={handleGoLeft} ariaLabel="previous" />
				<CarouselButton direction="right" onClick={handleGoRight} ariaLabel="next" />
			</div>

			{/* dots / pagination (moved to Dots component) */}
			<Dots
				items={items}
				activeIndex={activeIndex}
				goToIndex={handleGoToIndex}
				dotsRef={dotsRef}
				indicator={indicator}
				cursorContext={cursorContext}
			/>

		</div>

	)
}
