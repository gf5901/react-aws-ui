import React from 'react';
import './Section.scss';

interface Props {
	id?: string;
	title: string;
	action?: any;
}

const Section: React.FC<Props> = ({ id, title, action, children }) => {
	return (
		<section id={id} className="dh-section">
			<header>
				<h3>{title}</h3>
				<div>{action}</div>
			</header>
			<main>
				{children}
			</main>
		</section>
	)
};

export default Section;
