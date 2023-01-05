import React, { useState, useEffect, ReactNode } from "react";
import Select from "react-select";
import "./Dropdown.scss";

export interface DropdownProps {
	name: string;
	label?: string;
	value: any;
	options: { label: string; value: any }[];
	onSelect?(value: any): void;
	disabled?: boolean;
	multiple?: boolean;
	isClearable?: boolean;
	formatOptionLabel?: (data: any, formatOptionLabelMeta: any) => ReactNode;
	placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
	name,
	label,
	value,
	options,
	onSelect,
	disabled,
	multiple,
	isClearable,
	formatOptionLabel,
	placeholder,
}) => {
	const [target, setTarget] = useState<HTMLElement | null>(null);
	useEffect(() => {
		setTarget(document.body);
	}, []);
	const onChange = (value: any) => {
		onSelect?.(value);
	};
	return (
		<div className={`drop-down ${disabled ? "disabled" : ""}`}>
			{label && (
				<div style={{ position: "absolute", top: 12, left: 16 }}>{label}</div>
			)}
			<Select
				menuPortalTarget={target}
				name={name}
				id={name}
				onChange={onChange}
				isDisabled={disabled}
				isMulti={multiple}
				options={options}
				isClearable={isClearable}
				formatOptionLabel={formatOptionLabel}
				value={value}
				placeholder={""}
				styles={{
					menuPortal: (base) => ({ ...base, zIndex: 9999 }),
					control: (provided) => ({
						...provided,
						backgroundColor: "rgba(0,0,0,0.075)",
						border: 0,
						borderRadius: 12,
						transition: "0.3s",
						":hover": {
							borderColor: "none",
							backgroundColor: "rgba(0,0,0,0.1)",
						},
						":focus-within": {
							borderColor: "none",
							boxShadow: `inset 0 0 0 2px #5656c8`,
							backgroundColor: "#027ffa33",
						},
					}),
					input: (provided) => ({
						...provided,
						paddingTop: "2rem",
						paddingBottom: 6,
						paddingLeft: 6,
						paddingRight: 6,
						color: "black",
						boxShadow: "none",
					}),
					indicatorSeparator: (provided) => ({
						...provided,
						backgroundColor: "rgba(0,0,0,0.1)",
					}),
					singleValue: (provided, state) => ({
						...provided,
						color: "black",
						paddingTop: "2rem",
						paddingBottom: 6,
						paddingLeft: 6,
						paddingRight: 6,
					}),
					placeholder: (provided) => ({
						...provided,
						paddingTop: "2rem",
						paddingBottom: 6,
						paddingLeft: 6,
						paddingRight: 6,
					}),
					menu: (provided) => ({
						...provided,
						backgroundColor: "#2A2A2A",
						boxShadow: `0 0 0 1px #333`,
						overflow: "hidden",
					}),
					option: (provided, state) => ({
						...provided,
						backgroundColor: state.isFocused ? "#5656c8" : "#2A2A2A",
						color: state.isFocused ? "#000" : "#000A",
					}),
				}}
			/>
		</div>
	);
};
