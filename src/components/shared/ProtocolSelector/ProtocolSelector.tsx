import React from 'react';
import Select, { ValueType } from 'react-select';

interface Props {
	value: string;
	onChange(value: string): void;
}

const PROTOCOLS = [];

export const ProtocolSelector: React.FC<Props> = ({ value, onChange }) => {
	const onSelectProtocol = (selected: ValueType<{ label: string; value: string }, false>) => {
		onChange(selected.value);
	}
	return (
		<div className={`input-container select-input ${value ? 'has-data' : ''}`}>
			<Select<{ label: string; value: string; }>
				value={PROTOCOLS.find((p) => p.value === value)}
				placeholder=""
				getOptionLabel={(e) => e.label}
				getOptionValue={(e) => e.value}
				onChange={onSelectProtocol}
				options={PROTOCOLS}
				classNamePrefix="dropdown"
			/>
			<label>Protocol</label>
		</div>
	)
}