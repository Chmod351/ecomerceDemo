import React from 'react';

export default function SelectField({ ...props }) {
	let error;
	if (props.errors.isArray) {
		error = props.errors?.[0]?.[props.name.split('.').join('?.')];
	} else {
		error = props.errors?.[props.name.split('.').join('?.')];
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<label htmlFor={props.name} className="font-bold">
				{props.label}
			</label>
			<select
				style={{
					padding: '10px',
					border: '1px solid #ccc',
					borderRadius: '5px',
				}}
				id={props.name}
				required={props.required ?? true}
				name={props.name}
				{...props.register}
				// value={props.value}
				onChange={props.onChange}
				// defaultValue={{ value: "", label: "" }}
				defaultValue={props.defaultValue}
			>
				{props.options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						// disabled={option.value === "none"}
					>
						{option.label}
					</option>
				))}
			</select>
			<br />
			{error && <span>{error.message}</span>}
			{props.errors?.stock?.length > 0 && props.name.startsWith('stock') && (
				<span style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
					la informacion del stock debe estar completa
				</span>
			)}
		</div>
	);
}
