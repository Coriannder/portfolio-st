import ProjectCardAuribbon from './ProjectCardAuribbon/ProjectCardAuribbon';
import projectsData from '../../json/newProject.json';
import './ProjectsAuribbon.scss';

const ProjectsAuribbon = () => {
  return (
    <section className="projects-auribbon">
      <div className="projects-auribbon__wrapper">
        <header className="projects-auribbon__header">
          <h2 className="projects-auribbon__title">Proyectos</h2>
          <p className="projects-auribbon__subtitle">
            Selección de trabajos con foco en claridad, rendimiento y buenas prácticas.
          </p>
        </header>

        <div className="projects-auribbon__list">
          {projectsData.map(project => (
            <ProjectCardAuribbon key={project.id} project={project} />
          ))}
        </div>

        <div className="projects-auribbon__divider" />
      </div>
    </section>
  );
};

export default ProjectsAuribbon;
