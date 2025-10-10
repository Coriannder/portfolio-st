import { ButtonLink as Button } from '../Projects/Button/Button'; // Reutilizando el componente Button
import './ProjectCard.scss';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-card__image-container">
        <img src={project.image} alt={project.title} className="project-card__image" />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="project-card__tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-card__actions">
          {project.githubLink && (
            <Button link={project.githubLink} text="GitHub" target="_blank" />
          )}
          {project.liveDemoLink && (
            <Button link={project.liveDemoLink} text="Live Demo" target="_blank" />
          )}
          {project.postmanDocLink && (
            <Button link={project.postmanDocLink} text="Postman API" target="_blank" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;