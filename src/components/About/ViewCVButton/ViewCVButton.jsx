import { useContext, useState } from 'react'
import { CursorContext } from '../../../Context/CursorContext'
import './ViewCVButton.scss'
import { motion } from 'framer-motion'

export const ViewCVButton = () => {
  const contextValue = useContext(CursorContext)
  const [hover, setHover] = useState(false)

  return (
    <motion.a
      href="/files/sebasdev-cv-2025.pdf"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', delay: 0.8 }}
      className="view-cv-button__container"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') {
          setHover(true)
          contextValue.overTag && contextValue.overTag('button')
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') {
          setHover(false)
          contextValue.outTag && contextValue.outTag()
        }
      }}
      aria-label="Ver CV de Sebastián Taboada"
    >
      <motion.div
        className="view-cv-button__btn view-cv-button__background"
        animate={{ scale: hover ? 1.02 : 0 }}
        transition={{ duration: 0.12, type: 'spring' }}
      >
        Ver CV
      </motion.div>

      <div className="view-cv-button__btn view-cv-button__content">Ver CV</div>
    </motion.a>
  )
}
