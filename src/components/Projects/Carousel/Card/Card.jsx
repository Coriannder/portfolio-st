import { useState } from 'react';
import './Card.scss';
import { CardButton } from './CardButton/CardButton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

export const Card = ({ data, isActive, revealActive, revealIndex }) => {
	if (!data) return null;

  //const [isFeatured, setIsFeatured] = useState(isActive || false);


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

		const slugify = (s) =>
			s
				? s
						.toString()
						.toLowerCase()
						.replace(/[^\u0000-\u007F]/g, '')
						.replace(/[^a-z0-9\s-]/g, '')
						.trim()
						.replace(/\s+/g, '-')
				: '';

		const idOrSlug = data.id || slugify(title);

	return (
		<div className={`card ${isActive ? 'card--featured' : 'card--preview'}`}>

			<div
				className="card__media"
				style={image ? { backgroundImage: `url(${image})` } : undefined}
				title={alt || title}
				aria-hidden="true"
			/>

			<motion.div
				className="card__body"
				variants={{
					hidden: { opacity: 0, y: 12 },
					visible: (custom) => ({ opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut', delay: custom } })
				}}
				initial={(typeof revealActive !== 'undefined' && revealActive) ? 'hidden' : 'visible'}
				animate={'visible'}
				custom={typeof revealIndex !== 'undefined' ? revealIndex * 0.12 : 0}
			>

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
					{visibility === 'private' ? (
						<CardButton to={`/projects/${idOrSlug}`} title="Documentación" blank={false} disabled={!isActive} />
					) : (
						<>
							{demoUrl && <CardButton to={demoUrl} title="Demo" disabled={!isActive} />}
							{codeUrl && <CardButton to={codeUrl} title="Code" disabled={!isActive} />}
						</>
					)}
				</div>
			</motion.div>
		</div>
);
};
