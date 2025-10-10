import React from 'react';
import Chips from '../Chips/Chips';
import StatCard from '../StatCard/StatCard';
import './ProjectMeta.scss';

/**
 * ProjectMeta component displays textual information about a project, including
 * title, description, technology stack, and narrative cards for problem,
 * approach and result. It also renders call-to-action buttons to view a live
 * demo or the source code.
 *
 * Props:
 * - title: Title of the project.
 * - description: Brief description of what the project is about.
 * - stack: Array of strings representing the technologies used.
 * - problem: Description of the problem being solved.
 * - approach: How the problem was approached (your methodology).
 * - result: Outcome or impact of the project.
 * - demoUrl: URL to the live demo of the project.
 * - codeUrl: URL to the source code repository.
 */
const ProjectMeta = ({
  title,
  description,
  stack = [],
  problem,
  approach,
  result,
  demoUrl,
  codeUrl,
}) => (
  <div className="project-meta">
    {/* Title */}
    <h3 className="project-meta__title">{title}</h3>
    {/* Description */}
    {description && <p className="project-meta__description">{description}</p>}
    {/* Technology Chips */}
    {stack.length > 0 && <Chips items={stack} />}
    {/* Narrative cards */}
    <div className="project-meta__stats">
      {problem && <StatCard label="Problema" value={problem} />}
      {approach && <StatCard label="Enfoque" value={approach} />}
      {result && <StatCard label="Resultado" value={result} />}
    </div>
    {/* Call-to-action buttons */}
    <div className="project-meta__actions">
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-meta__button project-meta__button--primary"
        >
          Ver demo
        </a>
      )}
      {codeUrl && (
        <a
          href={codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-meta__button project-meta__button--secondary"
        >
          Ver código
        </a>
      )}
    </div>
  </div>
);

export default ProjectMeta;
