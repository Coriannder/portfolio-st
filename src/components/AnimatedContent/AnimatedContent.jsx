import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { easeElasticOut } from "d3-ease";

export const AnimatedContent = ({initial, animate, position, children}) => {
  const controls = useAnimation();
  const elementRef = useRef();

  //const myEase = d3.easeCubic(t);
  

  const checkInView = () => {
    const element = elementRef.current;

    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Calcula si el elemento está en el medio del viewport
      //position es un valor entre 0 y 1....
      //    0 para cuando el elemento esta en la parte mas baja del viewport y 1 para la parte mas alta

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
   /*    transition={
        {
            ease: "backInOut",
            damping: 100,
            bounce: 50,
            duration: .5,
            //delay: .8
        }
    } */

/*     transition= {{ duration: 0.5, type: "spring", delay: .5}}
 */
    transition={{ duration: 1, ease: easeElasticOut.period(.7) }}


    >
      {children}
    </motion.div>
  );
};