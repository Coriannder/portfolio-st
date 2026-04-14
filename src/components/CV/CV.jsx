import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useAnimation } from 'framer-motion';
import { CursorContext } from '../../Context/CursorContext';
import BackFab from '../Projects/ProjectDetail/BackFab/BackFab';
// Reuse ProjectDetail styles directly for visual consistency
import '../Projects/ProjectDetail/ProjectDetail.scss';
import './CV.scss';

function CV() {
  const [lang, setLang] = useState('es');
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const contextValue = useContext(CursorContext);
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    // Reset scroll to top when mounting the component
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/files/sebasdev-cv-${lang}.md`)
      .then(res => res.text())
      .then(text => {
        const cleanMd = text.replace(/<style>[\s\S]*?<\/style>/, '');
        setMarkdown(cleanMd);
        setIsLoading(false);
      });
  }, [lang]);

  useEffect(() => {
    controls.start('visible').catch(() => {});
  }, [controls]);

  const slugify = (str) =>
    String(str)
      .toLowerCase()
      .trim()
      .replace(/[`~!@#$%^&*()_=+[\]{}\\|;:'",.<>/?]+/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { type: 'tween', duration: 0.42, ease: 'easeOut' }
    }
  };

  const markdownVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween', duration: 0.45, delay: 0.24, ease: 'easeOut' }
    }
  };

  const handleFabClick = async () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    try {
      controls.start({ x: -window.innerWidth, opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } });
    } catch (e) { /* ignore */ }
    setTimeout(() => {
      // Usamos 'scrollTo' con el ID/clase de la sección y 'scrollToProjects' para indicar que sea instantáneo
      navigate('/', { state: { scrollTo: 'about__section', scrollToProjects: 'instant' } });
    }, 130);
  };

  return (
    <div className="projectDetail__section">
      <div className="projectDetail__container">

        <motion.main
          className="projectDetail__body"
          variants={containerVariants}
          initial={{ x: -(window?.innerWidth || 1000), opacity: 0 }}
          animate={controls}
        >
          {/* Language selector bar — only extra piece vs ProjectDetail */}
          <div className="cv__lang-bar">
            <div className="cv__lang-selector">
              <button
                className={lang === 'es' ? 'active' : ''}
                onClick={() => setLang('es')}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') contextValue.overTag('button') }}
                onPointerLeave={(e) => { if (e.pointerType === 'mouse') contextValue.outTag() }}
              >
                ES
              </button>
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') contextValue.overTag('button') }}
                onPointerLeave={(e) => { if (e.pointerType === 'mouse') contextValue.outTag() }}
              >
                EN
              </button>
            </div>

            <a
              href={`/files/sebasdev-cv-${lang}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="projectDetail__btn"
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') contextValue.overTag('button') }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') contextValue.outTag() }}
            >
              Versión PDF
            </a>
          </div>

          {isLoading ? (
            <section className="projectDetail__loading">
              <motion.div
                className="projectDetail__spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Cargando CV…
            </section>
          ) : (
            <div className="projectDetail__layout">
              <motion.article
                className="projectDetail__markdown"
                variants={markdownVariants}
                initial="hidden"
                animate="visible"
                key={lang}
              >
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => {
                      const text = String(props.children)?.replace(/<[^>]+>/g, '') || '';
                      return <h1 id={slugify(text)} {...props} />;
                    },
                    h2: ({ ...props }) => {
                      const text = String(props.children)?.replace(/<[^>]+>/g, '') || '';
                      return <h2 id={slugify(text)} {...props} />;
                    },
                    h3: ({ ...props }) => {
                      const text = String(props.children)?.replace(/<[^>]+>/g, '') || '';
                      return <h3 id={slugify(text)} {...props} />;
                    },
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </motion.article>
            </div>
          )}

        </motion.main>

        <BackFab onClick={handleFabClick} />

      </div>
    </div>
  );
}

export default CV;
