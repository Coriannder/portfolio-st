import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export const AnimatedContent = ({initial, animate, position, children}) => {
  const controls = useAnimation();
  const elementRef = useRef();
  

  const checkInView = () => {
    const element = elementRef.current;

    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Calcula si el elemento está en el medio del viewport
      const isInView = rect.top < windowHeight * ( 1 - position ) && rect.bottom > windowHeight * ( 1 - position );

      if (isInView) {
        // Inicia la animación cuando el elemento está en el medio del viewport
        controls.start(animate);
      }
    }
  };

  useEffect(() => {
    // Verifica la posición al cargar la página
    checkInView();

    // Verifica la posición al hacer scroll
    const handleScroll = () => {
      checkInView();
    };

    window.addEventListener("scroll", handleScroll);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.div
      ref={elementRef}
      initial={initial}
      animate={controls}
      //transition={{ duration: 2 }}
      //transition= {{ duration: .3, type: "spring" }}
      transition={
        {
            ease: "backInOut",
            damping: 100,
            bounce: 50,
            duration: .5,
            //delay: .8
        }
    }
    >
      {children}
    </motion.div>
  );
};
