// Carousel.jsx
import './Carousel.scss'
import { useState } from 'react'
import { Card } from './Card/Card'
import projectsData from '../../../json/newProject.json'
import { CarouselButton } from './CarouselButton/CarouselButton'

export const Carousel = () => {

	const items = projectsData

	const [activeIndex, setActiveIndex] = useState(items.findIndex(p => p.featured) !== -1 ? items.findIndex(p => p.featured): 0)
	const [direction, setDirection] = useState(0)

	// 3) Helpers para wrap-around
	const mod = (n, m) => ((n % m) + m) % m
	const leftIndex   = mod(activeIndex - 1, items.length)
	const rightIndex  = mod(activeIndex + 1, items.length)


  // 4) Handlers de navegación
  const goRight = () => {
    setDirection(1)
    setActiveIndex(i => mod(i - 1, items.length))
  }

  const goLeft = () => {
    setDirection(-1)
    setActiveIndex(i => mod(i + 1, items.length))
  }

  // animations removed per request — static rendering only

    return (

        <div className='carousel'>


            <div className='carousel__viewport'>

				<div className='carousel__card carousel__card--preview'>
					<Card data={{...items[leftIndex], isActive: false}} />
				</div>

				<div className='carousel__card carousel__card--center'>
					<Card data={{...items[activeIndex]}} isActive={true} />
				</div>

				<div className='carousel__card carousel__card--preview'>
					<Card data={{...items[rightIndex], isActive: false}} />
				</div>

			</div>

			<div className='carousel__nav'>
					<CarouselButton direction="left" onClick={goLeft} ariaLabel="previous" />
					<CarouselButton direction="right" onClick={goRight} ariaLabel="next" />
			</div>

		</div>

	)
}
