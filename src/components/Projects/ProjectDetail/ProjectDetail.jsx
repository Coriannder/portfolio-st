import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { scroller } from 'react-scroll';
import './ProjectDetail.scss';
import ReactMarkdown from 'react-markdown';
import { motion, useAnimation } from 'framer-motion';

const ProjectDetail = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();
  const [readmeMd, setReadmeMd] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const mountedRef = useRef(true);
  const controls = useAnimation();

  const fetchReadme = async (id) => {
    if (!id) return;
    // Only check public/readmes — simplifies behavior and matches production assets.
    const candidates = [
      `/readmes/readme_project_${id}.md`,
      `/readmes/${id}.md`,
      `/readmes/readme_${id}.md`,
    ];

    setIsLoading(true);
    setError(null);
    for (const p of candidates) {
      try {
        const res = await fetch(p);
        if (!mountedRef.current) return;
            if (res.ok) {
              const text = await res.text();
              if (!mountedRef.current) return;
              setReadmeMd(text);
              setIsLoading(false);
              setError(null);
              return;
            }
      } catch (e) {
        // ignore and try next
      }
    }
    if (mountedRef.current) {
      setReadmeMd(null);
      setIsLoading(false);
      setError('No hay documentación adicional disponible.');
    }
  };

  useEffect(() => {
    if (!identifier) {
      // no identifier -> clear state
      setReadmeMd(null);
      return;
    }

    mountedRef.current = true;
    fetchReadme(identifier);
    return () => {
      mountedRef.current = false;
    };
  }, [identifier]);

  // Utility: simple slugify for heading ids
  const slugify = (str) =>
    String(str)
      .toLowerCase()
      .trim()
      .replace(/[`~!@#$%^&*()_=+\[\]{}\\|;:'",.<>/?]+/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');

  // Parse headings from raw markdown to build a TOC (fast and avoids extra deps)
  const parseHeadings = (md) => {
    if (!md) return [];
    const lines = md.split('\n');
    const headings = [];
    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = slugify(text);
        headings.push({ level, text, id });
      }
    }
    return headings;
  };

  // When the markdown changes, extract TOC
  useEffect(() => {
    if (!readmeMd) {
      setToc([]);
      return;
    }
    const headings = parseHeadings(readmeMd);
    setToc(headings);
  }, [readmeMd]);

  if (!identifier) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        // use a tween for a smoother, non-bouncy entrance
        type: 'tween',
        duration: 0.42,
        ease: 'easeOut'
      }
    }
  };

  const tocVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.42,
        delay: 0.16,
        ease: 'easeOut'
      }
    }
  };

  const markdownVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.45,
        delay: 0.24,
        ease: 'easeOut'
      }
    }
  };

  const loadingVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        type: "spring"
      }
    },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const fabVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: -40,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 8px 32px rgba(255, 20, 147, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  useEffect(() => {
    // start entry animation
    controls.start('visible').catch(() => {})
  }, [controls])

  const location = useLocation()
  const enterFrom = location.state?.enterFrom
  // Default to entering from the left for coherence with carousel exit
  const initialAnim = enterFrom === 'right'
    ? { x: window?.innerWidth || 1000, opacity: 0 }
    : { x: -(window?.innerWidth || 1000), opacity: 0 }

  const handleFabClick = async () => {
    // Scroll to top FIRST to prevent observer from seeing Contact section when Main mounts
    window.scrollTo({ top: 0, behavior: 'auto' })
    
    // Start the exit animation immediately but don't wait for it to finish.
    // This allows the Projects entry animation (on the main page) to begin earlier
    // and overlap, improving perceived fluidity. We still navigate after a short
    // delay so the Projects component can mount and animate normally.
    try {
      controls.start({ x: -window.innerWidth, opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } })
    } catch (e) {
      // ignore animation start errors
    }

    // navigate shortly after starting the animation so Projects can begin its own
    // animation without changing the Projects animation implementation.
    const NAV_DELAY = 130 // ms — tuned small so overlap feels natural
    setTimeout(() => {
      // Disconnect the observer BEFORE navigation to prevent it from detecting
      // intermediate sections (e.g., contact) while the page is navigating/mounting.
      // Main will reconnect it after the programmatic jump completes.
      try {
        if (window.__mainObserver) {
          window.__mainObserver.disconnect()
        }
      } catch (e) {}

      navigate('/projects')
    }, NAV_DELAY)
  }

  

  return (
    <div className="projectDetail__section">
      <div className="projectDetail__container">

        <motion.main 
          className="projectDetail__body"
          variants={containerVariants}
          initial={initialAnim}
          animate={controls}
        >
          {isLoading ? (
            <motion.section 
              className="projectDetail__loading"
              variants={loadingVariants}
              initial="initial"
              animate={["animate", "pulse"]}
            >
              <motion.div 
                className="projectDetail__spinner"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              Cargando documentación…
            </motion.section>
          ) : error ? (
            <motion.section 
              className="projectDetail__error"
              variants={errorVariants}
              initial="hidden"
              animate={["visible", "shake"]}
            >
              <p>{error}</p>
              <div className="projectDetail__actions">
                <motion.button 
                  className="projectDetail__btn" 
                  onClick={() => fetchReadme(identifier)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Reintentar
                </motion.button>
                <motion.button 
                  className="projectDetail__btn" 
                  onClick={() => navigate('/projects')}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Volver
                </motion.button>
              </div>
            </motion.section>
          ) : readmeMd ? (
            <div className="projectDetail__layout">
              {toc.length > 0 && (
                <motion.aside 
                  className="projectDetail__toc"
                  variants={tocVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <strong>Contenido</strong>
                  <ul>
                    {toc.map((h) => (
                      <li key={h.id} className={`toc-level-${h.level}`}>
                        <a href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </motion.aside>
              )}

              <motion.article 
                className="projectDetail__markdown"
                variants={markdownVariants}
                initial="hidden"
                animate="visible"
              >
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => {
                      const text = String(props.children)?.replace(/<[^>]+>/g, '') || '';
                      const id = slugify(text);
                      return <h1 id={id} {...props} />;
                    },
                    h2: ({ node, ...props }) => {
                      const text = String(props.children)?.replace(/<[^>]+>/g, '') || '';
                      const id = slugify(text);
                      return <h2 id={id} {...props} />;
                    },
                    h3: ({ node, ...props }) => {
                      const text = String(props.children)?.replace(/<[^>]+>/g, '') || '';
                      const id = slugify(text);
                      return <h3 id={id} {...props} />;
                    },
                    h4: ({ node, ...props }) => {
                      const text = String(props.children)?.replace(/<[^>]+>/g, '') || '';
                      const id = slugify(text);
                      return <h4 id={id} {...props} />;
                    },
                  }}
                >
                  {readmeMd}
                </ReactMarkdown>
              </motion.article>
            </div>
          ) : (
            <section>No hay documentación adicional disponible.</section>
          )}

        </motion.main>

        {createPortal(
          <motion.button
            className="projectDetail__fab"
            // Animate then navigate
            onClick={handleFabClick}
            variants={fabVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            aria-label="Volver a proyectos"
          >
            ←
          </motion.button>,
          document.body
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;
