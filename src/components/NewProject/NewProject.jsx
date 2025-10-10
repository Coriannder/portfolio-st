import projectsData from '../../json/newProject.json';
import FeaturedProjectCard from './FeaturedProjectCard';
import ProjectCard from './ProjectCard';
import './NewProject.scss';

const NewProject = () => {
  const featuredProject = projectsData.find(project => project.featured);
  const otherProjects = projectsData.filter(project => !project.featured);

  return (
    <section className="new-project-section">
      <h2>Nuevos Proyectos</h2>
      {featuredProject && <FeaturedProjectCard project={featuredProject} />}
      <div className="other-projects-grid">
        {otherProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default NewProject;