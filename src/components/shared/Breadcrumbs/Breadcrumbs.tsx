import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocalLink } from '../LocalLink/LocalLink';
import './Breadcrumbs.scss';

interface Props {
	crumbs: Crumb[]
}

export interface Crumb {
	label: string;
	path: string;
}

export const Breadcrumbs: React.FC<Props> = ({ crumbs }) => {
	return (
		<nav className="breadcrumbs">
			<ul>
				{crumbs.map((crumb, i) => (
					<React.Fragment key={i}>{ i > 0 ? <FontAwesomeIcon icon={faChevronRight} /> : ''}<li><LocalLink path={crumb.path}>{crumb.label}</LocalLink></li></React.Fragment>
				))}
			</ul>
		</nav>
	)
};
