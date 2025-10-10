import { ButtonLink as Button } from '../Projects/Button/Button'; // Reutilizando el componente Button
import './FeaturedProjectCard.scss';

const FeaturedProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <div className="featured-project-card">
      <div className="featured-project-card__image-container">
        <img src={project.image} alt={project.title} className="featured-project-card__image" />
      </div>
      <div className="featured-project-card__content">
        <h3 className="featured-project-card__title">{project.title}</h3>
        <p className="featured-project-card__description">{project.description}</p>
        <div className="featured-project-card__technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="featured-project-card__tech-tag">{tech}</span>
          ))}
        </div>
        <div className="featured-project-card__actions">
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

export default FeaturedProjectCard;