import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button, ButtonType } from '@local/form/Button/Button';
import './NotFoundView.scss';

const NotFoundView: React.FC = () => {
	const dispatch = useDispatch();
	return (
		<section id="not-found-view">
			<div>
				<h1>404 - Not Found</h1>
				<span>We couldn't find this page. Would you like to go back to the home page?</span>
				<Button
					type={ButtonType.Primary}
					onClick={() => dispatch(push('/'))}
				>
					Go home
				</Button>
			</div>
			<img src="/img/not-found.svg" alt="lost man" />
		</section>
	)
}
export default NotFoundView;
