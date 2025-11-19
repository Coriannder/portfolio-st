import './Dots.scss'

export const Dots = ({ items, activeIndex, goToIndex, dotsRef, indicator, cursorContext }) => {
    return (
        <div
            className="carousel__dots"
            role="tablist"
            aria-label="Carousel pagination"
            onPointerEnter={() => cursorContext && cursorContext.overTag && cursorContext.overTag('title')}
            onPointerLeave={() => cursorContext && cursorContext.outTag && cursorContext.outTag()}
            onFocusCapture={() => cursorContext && cursorContext.overTag && cursorContext.overTag('title')}
            onBlurCapture={() => cursorContext && cursorContext.outTag && cursorContext.outTag()}
        >
            <div ref={dotsRef} className="carousel__dots-inner">
                <div
                    className="carousel__dot-indicator"
                    style={{ left: indicator.left + 'px', top: indicator.top + 'px', width: indicator.width + 'px', height: indicator.width + 'px' }}
                    aria-hidden="true"
                />

                {items.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        data-idx={idx}
                        className={`carousel__dot ${idx === activeIndex ? 'carousel__dot--active' : ''}`}
                        aria-label={`Go to slide ${idx + 1}`}
                        aria-current={idx === activeIndex}
                        onClick={(e) => {
                            goToIndex(idx);
                            e.currentTarget.blur();
                            cursorContext && cursorContext.outTag && cursorContext.overTag('title');
                        }}
                        onMouseOver={() => cursorContext && cursorContext.overTag && cursorContext.overTag('title')}
                        //onMouseOut={() => cursorContext && cursorContext.outTag && cursorContext.outTag()}
                        onFocus={() => cursorContext && cursorContext.overTag && cursorContext.overTag('title')}
                        //onBlur={() => cursorContext && cursorContext.outTag && cursorContext.outTag()}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dots
