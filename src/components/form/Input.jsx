import React from 'react';
import styled from 'styled-components';
const Column = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 4px;
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
}) {
	let error;
	if (errors?.isArray) {
		error = errors?.[0]?.[name.split('.').join('?.')];
		console.log('errrrrrrrrrrrr', error);
	} else {
		error = errors?.[name.split('.').join('?.')];
	}

	return (
		<Column className="flex flex-col w-full ">
			<label className="font-helvetica text-sm font-bold">{label}</label>
			<Input
				className={`rounded p-4 mt-1 placeholder:text-gray-400  outline-none ${
					error ? 'border-red-500' : 'border-gray-300'
				}`}
				{...register(name, { required })}
				placeholder={placeholder}
				type={type ? type : 'text'}
			/>
			{error && (
				<Error className="text-red-500 text-sm mt-1">{error.message}</Error>
			)}
			{errors?.stock?.length > 0 && name.startsWith('stock') && (
				<Error className="text-red-500 text-sm mt-1">
					la informacion del stock debe estar completa
				</Error>
			)}
		</Column>
	);
}

export default InputField;
