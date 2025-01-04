import { useState } from 'react';
import './newProduct.css';
import styled from 'styled-components';
import { productCreationSchema } from '../../../utils/schema';
import SelectField from '../../../components/form/SelectField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { publicRequest } from '../../../requestMethods';
import { handleError, handleSuccess } from '../../../utils/toast';
import InputField from '../../../components/form/Input';
import Button from '../../../components/ui/Button';
import { mobile } from '../../../responsive';
import dataLeft from '../../../utils/data/formData';
import sizeOptions from '../../../utils/data/sizes';

const Container = styled.section`
	margin: auto;
	padding: 0rem 1.25rem;
	${mobile({ margin: 'auto' })}
`;

const Wrapper = styled.div`
	max-width: 1200px;
	width: 100%;
	margin: auto;
	${mobile({ margin: 'auto' })}
`;
const Row = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: auto;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
export default function NewProduct() {
	const { handleSubmit, register, formState, reset, setValue, watch } = useForm(
		{
			resolver: zodResolver(productCreationSchema),
		}
	);
	const [addMoreClothes, setAddMoreClothes] = useState(1);

	const { errors } = formState;

	const handleSubmitFormI = async (data) => {
		console.log('Datos enviados:', data);
		console.log(data);
		try {
			const res = await publicRequest.post('/products/create', {
				...data,
				image_url: [data.image0, data.image1, data.image2, data.image3],
			});
			console.log(res);
			handleSuccess('succesfull');
			reset();
		} catch (e) {
			console.log(e);
			handleError(e);
		}
	};
	console.log(watch());
	console.log(formState.isValid);
	return (
		<Container>
			<Wrapper>
				<Form
					onSubmit={handleSubmit((data) => {
						console.log(data);
						handleSubmitFormI(data);
					})}
				>
					<div style={{ gap: '2rem', margin: '1rem 0' }}>
						{dataLeft.map((item) => {
							if (item.name === 'category') {
								return (
									<SelectField
										errors={errors}
										key={item.name}
										onChange={(e) => setValue('category', e.target.value)}
										label={item.label}
										name={item.name}
										defaultValue={'none'}
										register={register}
										options={item.options}
									/>
								);
							} else {
								return (
									<div style={{ gap: '2rem', margin: '1rem 0' }}>
										<InputField
											key={item.name}
											label={item.label}
											name={item.name}
											type={item.type}
											register={register}
											errors={errors}
											required
											placeholder={item.placeholder ?? ''}
										/>
									</div>
								);
							}
						})}
					</div>
					<h1>Manejo de Stock</h1>
					<Row>
						{[...Array(addMoreClothes)].map((_, index) => (
							<div style={{ gap: '1rem', margin: '1rem 0' }}>
								<InputField
									label="Proveedor"
									name={`stock.${index}.provider`}
									register={register}
									errors={errors}
									required
									placeholder="Nombre del Proveedor"
								/>

								<InputField
									label="Coste del Proveedor"
									name={`stock.${index}.provider_cost`}
									register={register}
									type="number"
									errors={errors}
									required
									placeholder="Coste del Proveedor sin $ *"
								/>

								<SelectField
									label="Talla"
									name={`stock.${index}.size`}
									register={register}
									errors={errors}
									defaultValue="none"
									options={sizeOptions}
									onChange={(e) => {
										setValue(`stock.${index}.size`, e.target.value);
									}}
								/>
								<InputField
									label="Stock"
									name={`stock.${index}.quantity`}
									type="number"
									register={register}
									errors={errors}
									required
									placeholder="stock *"
								/>
								<InputContainer>
									Color
									<input
										type="color"
										className="w-full"
										{...register(`stock.${index}.color`, { required: true })}
										required
									/>
								</InputContainer>
								<Row>
									<Button
										disabled={addMoreClothes !== index + 1}
										type="button"
										text="Anadir items"
										onClick={() => setAddMoreClothes(addMoreClothes + 1)}
									/>
									<Button
										type="button"
										onClick={() =>
											setAddMoreClothes(
												addMoreClothes > 1 ? addMoreClothes - 1 : 1
											)
										}
										text="Eliminar "
										disabled={
											addMoreClothes !== index + 1 || addMoreClothes === 1
										}
									/>
								</Row>
							</div>
						))}
					</Row>
					<br />
					<Button
						text={
							!formState.isValid
								? 'COMPLETA TODOS LOS CAMPOS'
								: 'CREAR PRODUCTO'
						}
						type="submit"
						disabled={false}
					/>
				</Form>
			</Wrapper>
		</Container>
	);
}
