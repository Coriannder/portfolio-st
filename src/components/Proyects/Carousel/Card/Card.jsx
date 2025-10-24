import { useState } from 'react';
import './Card.scss';
import { CardButton } from './CardButton/CardButton';

export const Card = ({ data, isActive }) => {
  if (!data) return null;

  const [isFeatured, setIsFeatured] = useState(isActive || false);


  const {
    title,
    alt,
    description,
    image,
    stack,
    type,
    demoUrl,
    codeUrl,
    //featured,
    visibility,
  } = data;

  return (
    <div className={`card ${isFeatured ? 'card--featured' : 'card--preview'}`}>

		<div
			className="card__media"
			style={image ? { backgroundImage: `url(${image})` } : undefined}
			title={alt || title}
			aria-hidden="true"
		/>

		<div className="card__body">

			<div className="card__meta">
			{type && <span className="card__type">{type}</span>}
			{visibility && (
				<span className={`card__visibility ${visibility}`}>
				{visibility}
				</span>
			)}
			</div>

			<h4 className="card__title">{title}</h4>
			<p className="card__desc">{description}</p>

			{stack && stack.length > 0 && (
				<div className="card__tags">
					{stack.map((tech, i) => (
						<span className="card__tag" key={i}>
							{tech}
						</span>
					))}
				</div>
			)}


			<div className="card__actions">
				{demoUrl && (
					<CardButton to={demoUrl} title="Demo" />
				)}
				{codeUrl && (
					<CardButton to={codeUrl} title="Code" />
			)}
			</div>
      </div>
    </div>
  );
};
