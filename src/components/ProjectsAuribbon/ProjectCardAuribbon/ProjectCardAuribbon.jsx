import ProjectMedia from '../ProjectMedia/ProjectMedia';
import ProjectMeta from '../ProjectMeta/ProjectMeta';
import './ProjectCardAuribbon.scss';

/**
 * ProjectCardAuribbon composes the media and meta information into a single
 * responsive card. On wider screens the image and text sit side by side; on
 * smaller screens they stack. The gradient background and rounded corners
 * reinforce the AURIBBON aesthetic.
 *
 * Props:
 * - project: Object containing all the properties required by ProjectMedia
 *   and ProjectMeta (image, alt, title, description, stack, problem, approach,
 *   result, demoUrl, codeUrl).
 */
const ProjectCardAuribbon = ({ project }) => {
  const {
    image,
    alt,
    title,
    description,
    stack,
    problem,
    approach,
    result,
    demoUrl,
    codeUrl,
  } = project;
  return (
    <article className="project-card-auribbon">
      <span className="project-card-auribbon__glow project-card-auribbon__glow--left" aria-hidden />
      <span className="project-card-auribbon__glow project-card-auribbon__glow--right" aria-hidden />
      <span className="project-card-auribbon__ribbon project-card-auribbon__ribbon--top" aria-hidden />
      <span className="project-card-auribbon__ribbon project-card-auribbon__ribbon--bottom" aria-hidden />

      <div className="project-card-auribbon__body">
        <div className="project-card-auribbon__media">
          <ProjectMedia image={image} alt={alt} />
        </div>

        <div className="project-card-auribbon__content">
          <ProjectMeta
            title={title}
            description={description}
            stack={stack}
            problem={problem}
            approach={approach}
            result={result}
            demoUrl={demoUrl}
            codeUrl={codeUrl}
          />
        </div>
      </div>
    </article>
  );
};

export default ProjectCardAuribbon;
