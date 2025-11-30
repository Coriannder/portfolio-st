import { /* useEffect, */ useEffect, useRef, useState } from 'react'
import './Dots.scss'

export const Dots = ({ items, activeIndex, goToIndex, /* dotsRef,  indicator,*/ cursorContext }) => {

    //const [left, setLeft] = useState(0)
    const dotsRef = useRef(null)
    const [position, setPosition] = useState({left: 0, top: 0, width: 0, height: 0})
    //const [activePosition, setActivePosition] = useState(0)


    const handlePosition = (indexDot) => {

        const parentBounds = dotsRef.current?.getBoundingClientRect()

        const activeElement = dotsRef.current?.querySelector(`[data-idx='${indexDot}']`)
        const activeBounds = activeElement?.getBoundingClientRect()

        //if (!parentBounds || !activeBounds) return
        setPosition({
            left: activeBounds.left - parentBounds.left,
            top: activeBounds.top - parentBounds.top,
            width: activeBounds.width,
            height: activeBounds.height
        })

        console.log('position', {
            left: activeBounds.left - parentBounds.left,
            top: activeBounds.top - parentBounds.top,
            width: activeBounds.width,
            height: activeBounds.height
        })
    }

    useEffect(() => {
        handlePosition(activeIndex)
    }, [activeIndex])




    
   /*  const pos = (e) => {

        const parentLeft = e.currentTarget.parentElement.getBoundingClientRect().left
        const childLeft = e.currentTarget.getBoundingClientRect().left

        const activeElement = e.currentTarget.parentElement.querySelector(`[data-idx='${activeIndex}']`)
        const leftActive = activeElement.getBoundingClientRect().left


        //setLeft(childLeft - parentLeft)

        
    
    } */

   /*  useEffect(() => {
        const parentLeft = dotsRef.current.getBoundingClientRect().left
        const activeElement = dotsRef.current.querySelector(`[data-idx='${activeIndex}']`)
        const leftActive = activeElement.getBoundingClientRect().left
        setLeft(leftActive - parentLeft)
    }, [activeIndex]) */
    
    return (
        <div
            className="dots"
            role="tablist"
            aria-label="Carousel pagination"
            onPointerEnter={() => cursorContext && cursorContext.overTag && cursorContext.overTag('title')}
            onPointerLeave={() => cursorContext && cursorContext.outTag && cursorContext.outTag()}
            onFocusCapture={() => cursorContext && cursorContext.overTag && cursorContext.overTag('title')}
            onBlurCapture={() => cursorContext && cursorContext.outTag && cursorContext.outTag()}
        >
            <div ref={dotsRef} className="dots-inner">
                <div
                    className="dot-indicator"
                    style={{ left: (/* indicator.left */position.left ) + 'px', top: position.top + 'px', width: position.width + 'px', height: position.height + 'px' }}
                    aria-hidden="true"
                />

                {items.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        data-idx={idx}
                        className={`dot ${idx === activeIndex ? 'dooot--active' : ''}`}
                        aria-label={`Go to slide ${idx + 1}`}
                        aria-current={idx === activeIndex}
                        onClick={(e) => {
                           // pos(e)
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
