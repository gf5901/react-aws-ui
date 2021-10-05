import React from "react";
import './Button.scss';

export enum ButtonType {
	Primary,
	Secondary,
	Tertiary
}

export interface ButtonProps {
	onClick(): void;
	disabled?: boolean;
	type?: ButtonType;
	fullWidth?: boolean;
	loading?: boolean;
	loadingMessage?: string;
	style?: object;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, type = ButtonType.Primary, fullWidth, loading, loadingMessage }) => {
	const classes = ['button'];
	if (disabled) {
		classes.push('disabled');
	}
	if (loading) {
		classes.push('loading');
	}
	if (ButtonType[type]) {
		classes.push(`type-${ButtonType[type].toLowerCase()}`);
	}
	if (fullWidth) {
		classes.push('full-width');
	}
	return (
		<button
			className={classes.join(' ')}
			onClick={loading || disabled ? () => { } : onClick}
		>
			{loading ? loadingMessage || children : children}
		</button>
	);
};