import ProjectCardAuribbon from './ProjectCardAuribbon/ProjectCardAuribbon';
import projectsData from '../../json/newProject.json';
import './ProjectsAuribbon.scss';

const ProjectsAuribbon = () => {
  return (
    <section className="projects-auribbon">
      <div className="projects-auribbon__container">
        <h2 className="projects-auribbon__title">Proyectos Destacados</h2>
        <div className="projects-auribbon__list">
          {projectsData.map(project => (
            <ProjectCardAuribbon key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsAuribbon;
