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
    {/* Image */}
    <img
      src={image}
      alt={alt}
      className="project-media__image"
    />
    {/* Dark gradient overlay from bottom to top to enhance contrast */}
    <div className="project-media__overlay"></div>
  </div>
);

export default ProjectMedia;
