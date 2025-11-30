import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import './BackFab.scss';

const BackFab = ({ onClick }) => {
    const fabVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: -40,
            transition: {
                duration: 0.2,
                type: "tween",
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.1,
            boxShadow: "0 8px 32px rgba(255, 20, 147, 0.4)",
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    return createPortal(
        <motion.button
            className="backFab"
            onPointerDown={onClick}
            variants={fabVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            aria-label="Volver a proyectos"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
        </motion.button>,
        document.body
    );
};

export default BackFab;
