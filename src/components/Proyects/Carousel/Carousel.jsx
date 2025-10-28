// Carousel.jsx
import './Carousel.scss'
import { useState, useEffect, useRef, useContext } from 'react'
import { Card } from './Card/Card'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from '../../../json/newProject.json'
import { CarouselButton } from './CarouselButton/CarouselButton'
import { CursorContext } from '../../../Context/CursorContext'
import Dots from './Dots/Dots'

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

	// refs + state for moving dot indicator
	const dotsRef = useRef(null)
	const INDICATOR_SIZE = 16
	const [indicator, setIndicator] = useState({ left: 0, top: 0, width: INDICATOR_SIZE })

	// update indicator position/size based on activeIndex (center the circular indicator)
	useEffect(() => {
		if (typeof window === 'undefined') return
		const update = () => {
			if (!dotsRef.current) return
			const btn = dotsRef.current.querySelector(`button[data-idx="${activeIndex}"]`)
			if (!btn) return
			const rect = btn.getBoundingClientRect()
			const containerRect = dotsRef.current.getBoundingClientRect()
			// center the indicator on the button (horizontal + vertical)
			const left = rect.left - containerRect.left + rect.width / 2 - (INDICATOR_SIZE / 2)
			const top = rect.top - containerRect.top + rect.height / 2 - (INDICATOR_SIZE / 2)
			setIndicator({ left, top, width: INDICATOR_SIZE })
		}

		// small rAF to ensure layout settled after animations
		requestAnimationFrame(update)

		window.addEventListener('resize', update)
		return () => window.removeEventListener('resize', update)
	}, [activeIndex, items.length])

	// cursor context so dots can trigger the same cursor animation as the section title
	const cursorContext = useContext(CursorContext)


	// 4) Handlers de navegación
	const goRight = () => {
  setDirection(-1)
  setActiveIndex(i => mod(i + 1, items.length))
  // medir después del cambio / posible scroll programático
  requestAnimationFrame(() => {
    setTimeout(() => {
				// debug measurement placeholder
    }, 50) // ajustar tiempo si hay animaciones/timeout
  })
}

const goLeft = () => {
  setDirection(1)
  setActiveIndex(i => mod(i - 1, items.length))
  requestAnimationFrame(() => {
    setTimeout(() => {
			// debug measurement placeholder
    }, 50)
  })
}

// Swipe handling for touch devices on the center card
const swipe = useRef({ startX: 0, startY: 0, startTime: 0, isSwiping: false, pointerId: null, moved: 0, skipClick: false })
const SWIPE_DISTANCE = 60 // px
const SWIPE_TIME = 500 // ms for velocity consideration

const handlePointerDown = (e) => {
	// prefer touch/pen but also allow mouse for desktop testing (only primary button)
	if (e.pointerType === 'mouse' && e.button !== 0) return
	swipe.current.pointerId = e.pointerId
	swipe.current.startX = e.clientX
	swipe.current.startY = e.clientY
	swipe.current.startTime = Date.now()
	swipe.current.isSwiping = false
	swipe.current.moved = 0
	swipe.current.skipClick = false
	try { e.currentTarget.setPointerCapture(e.pointerId) } catch (err) {}
}

const handlePointerMove = (e) => {
	if (swipe.current.pointerId !== e.pointerId) return
	const dx = e.clientX - swipe.current.startX
	const dy = e.clientY - swipe.current.startY
	// if vertical movement is larger, treat as scroll — ignore
	if (!swipe.current.isSwiping && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
		// abandon swipe tracking
		swipe.current.pointerId = null
		return
	}
	if (Math.abs(dx) > 10) {
		swipe.current.isSwiping = true
		swipe.current.moved = dx
		swipe.current.skipClick = true
	}
}

const handlePointerUp = (e) => {
	if (swipe.current.pointerId !== e.pointerId) return
	const dx = e.clientX - swipe.current.startX
	const dt = Date.now() - swipe.current.startTime
	// determine swipe by distance or speed
	const velocity = Math.abs(dx) / Math.max(dt, 1)
	if (Math.abs(dx) > SWIPE_DISTANCE || velocity > (SWIPE_DISTANCE / SWIPE_TIME)) {
		if (dx < 0) {
			// swipe left -> next
			goRight()
		} else {
			// swipe right -> prev
			goLeft()
		}
	}
	swipe.current.pointerId = null
	// release capture
	try { e.currentTarget.releasePointerCapture(e.pointerId) } catch (err) {}
	// small timeout before allowing clicks again
	setTimeout(() => { swipe.current.skipClick = false }, 50)
}

const handlePointerCancel = (e) => {
	if (swipe.current.pointerId !== e.pointerId) return
	swipe.current.pointerId = null
	swipe.current.isSwiping = false
	swipe.current.skipClick = false
}

const handleCenterClick = (e) => {
	if (swipe.current.skipClick) {
		// prevent accidental click after swipe
		e.preventDefault()
		e.stopPropagation()
		return
	}
	// fallback: clicking center advances
	goRight()
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
				scale: .6,
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
				scale: isMobile ? 1 : 1.4,
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
				scale: .45,
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
				opacity: 0.1,
				scale: .9,
				transition: {
					x: { type: 'tween', duration: 0.28 },
					opacity: { duration: 0.9 }}
			}),
			center: {
				x: 0,
				opacity: 0.72,
				scale: 0.7,
				transition: { duration: 0.28 }
			},
			exit: (dir) => ({
				x: dir > 0 ? PREVIEW_OFFSET : -PREVIEW_OFFSET,
				opacity: 0.1,
				scale: .8,
				transition: {
					x: { type: 'tween', duration: .04 },
					opacity: { duration: 0.5 }
				}
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
							onPointerDown={handlePointerDown}
							onPointerMove={handlePointerMove}
							onPointerUp={handlePointerUp}
							onPointerCancel={handlePointerCancel}
							onClick={handleCenterClick}
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

				{/* dots / pagination (moved to Dots component) */}
				<Dots
					items={items}
					activeIndex={activeIndex}
					goToIndex={goToIndex}
					dotsRef={dotsRef}
					indicator={indicator}
					cursorContext={cursorContext}
				/>

		</div>

	)
}
