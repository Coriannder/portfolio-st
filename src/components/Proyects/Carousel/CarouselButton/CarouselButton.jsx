import './CarouselButton.scss';
export const CarouselButton = ( {direction, onClick, ariaLabel} ) => {
	return (
		<button
			className={`carouselButton__nav carouselButton__nav--${direction}`}
			onClick={onClick}
			aria-label={ariaLabel}
		>
			{direction === 'left' ? '<' : '>'}
		</button>
	)
}