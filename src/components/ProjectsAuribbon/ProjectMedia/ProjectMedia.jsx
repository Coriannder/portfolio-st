import React from 'react';
import './ProjectMedia.scss';

/**
 * ProjectMedia component shows a project screenshot with a subtle tilt and
 * gradient overlay to blend nicely with dark backgrounds. The skew effect
 * gives the impression of a floating card reminiscent of the AURIBBON style.
 *
 * Props:
 * - image: Source URL of the project image.
 * - alt: Alternative text for the image.
 */
const ProjectMedia = ({ image, alt }) => (
  <div className="project-media">
    <div className="project-media__frame">
      <span className="project-media__gradient" aria-hidden />
      <div className="project-media__tilt">
        <img
          src={image}
          alt={alt}
          className="project-media__image"
        />
        <span className="project-media__overlay" aria-hidden />
      </div>
    </div>
  </div>
);

export default ProjectMedia;
