import React from 'react';
import styled from 'styled-components';
const Column = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 8px;
	font-size: 16px;
	width: 90%;
`;

const Error = styled.span`
	color: red;
	font-size: 12px;
`;

function InputField({
	label,
	name,
	errors,
	placeholder,
	type = 'text',
	register,
	required,
	defaultValue,
}) {
	let error;
	if (errors?.isArray) {
		error = errors?.[0]?.[name.split('.').join('?.')];
		console.log('errrrrrrrrrrrr', error);
	} else {
		error = errors?.[name.split('.').join('?.')];
	}

	return (
		<Column>
			<label>{label}</label>
			<Input
				defaultValue={defaultValue}
				{...register(name, { required })}
				placeholder={placeholder}
				type={type ? type : 'text'}
			/>
			{error && <Error>{error.message}</Error>}
			{errors?.stock?.length > 0 && name.startsWith('stock') && (
				<Error>la informacion del stock debe estar completa</Error>
			)}
		</Column>
	);
}

export default InputField;
