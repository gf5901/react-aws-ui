import React from 'react';
import { useDispatch } from "react-redux";
import { push } from 'connected-react-router';

interface Props {
	path: string;
	className?: string;
}

export const LocalLink: React.FC<Props> = ({ path, className = '', children }) => {
	const dispatch = useDispatch();
	return (
		<a className={className} href={path} onClick={(e) => { e.preventDefault(); dispatch(push(path)) }}>{children}</a>
	);
};