import React from 'react';
import { Button, ButtonType } from '@local/form/Button/Button';
import './ErrorView.scss';

const ErrorView: React.FC = () => {
	return (
		<section id="error-view">
			<div>
				<h1>Oops...</h1>
				<span>Looks like our code blew up on this page. Please check back later (and hopefully we will get it fixed).</span>
				<Button
					type={ButtonType.Primary}
					onClick={() => window.location.pathname = '/'}
				>
					Go home
				</Button>
			</div>
			<img src="/img/explosion.svg" alt="man running away from explosion" />
		</section>
	)
}
export default ErrorView;
