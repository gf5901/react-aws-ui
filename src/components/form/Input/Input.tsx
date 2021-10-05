import React from "react";
import "./Input.scss";

interface Style {
	container: object;
	input: object;
	label: object;
}

interface Props {
	type?: string;
	name?: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	min?: string;
	max?: string;
	step?: string;
	readOnly?: boolean;
	style?: Style;
	required?: boolean;
}

export const Input: React.FC<Props> = ({
	type = "text",
	name,
	value,
	onChange,
	label,
	min = "",
	max = "",
	step = "",
	readOnly = false,
	style = { container: {}, input: {}, label: {} }
}) => {
	const hasData = value || value === 0;
	const hasDataCn = hasData ? "has-data" : "";
	const readOnlyCn = readOnly ? "read-only" : "";
	return (
		<div
			className={`input-container ${hasDataCn} ${readOnlyCn}`}
			style={style.container}
		>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				min={min}
				max={max}
				step={step}
				readOnly={readOnly}
				style={style.input}
			/>
			<label style={style.label}>{label}</label>
		</div>
	);
};
