import { useState } from 'react';
import './newProduct.css';
import styled from 'styled-components';
import { productCreationSchema } from '../../../utils/schema';
import SelectField from '../../../components/form/SelectField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { publicRequest } from '../../../requestMethods';
import { handleSuccess } from '../../../utils/toast';
import InputField from '../../../components/form/Input';
import Button from '../../../components/ui/Button';
import { mobile } from '../../../responsive';
const dataLeft = [
	{
		label: 'Categorias',
		name: 'category',
		required: true,
		defaultValue: 'none',
		options: [
			{
				value: 'none',
				label: 'Seleccione un campo',
			},
			{
				value: 'Tops',
				label: 'Tops',
			},
			{
				value: 'Bottoms',
				label: 'Bottoms',
			},
			{
				value: 'Shoes',
				label: 'Shoes',
			},
			{
				value: 'Accesories',
				label: 'Accesories',
			},
		],
	},
	{
		label: 'Collecion/Season',
		name: 'seasson',
		type: 'text',
		required: true,
		placeholder: 'Temporada: Invierno, Verano, Otono, Primavera etc',
	},
	{
		label: 'Descripcion en ingles (minimo 100 caracteres,maximo 500)',
		name: 'description_en',
		required: true,
		type: 'text',
		placeholder: 'Descripcion en ingles',
	},
	{
		label: 'Descripcion en español (minimo 100 caracteres,maximo 500)',
		name: 'description_es',
		required: true,
		type: 'text',
		placeholder: 'Description en español',
	},
	{
		label: 'Nombre en ingles,(minimo 10 caracteres,maximo 50)',
		name: 'name_en',
		required: true,
		type: 'text',
		placeholder: 'Nombre en  INGLES',
	},
	{
		label: 'Nombre en Español,(minimo 10 caracteres,maximo 50)',
		name: 'name_es',
		required: true,
		type: 'text',
		placeholder: 'Nombre',
	},
	{
		label: 'Precio en DOLARES',
		name: 'price_en',
		required: true,
		type: 'number',
		placeholder: 'Precio sin $',
	},
	{
		label: 'Precio en pesos',
		name: 'price_es',
		required: true,
		type: 'number',
		placeholder: 'Precio sin $',
	},
	{
		label: 'url imagen principal',
		name: 'image0',
		required: true,
		type: 'text',
		placeholder: 'www.IMAGEN_PRINCIPAL.com',
	},
	{
		label: 'url imagen secundaria',
		name: 'image1',
		required: true,
		type: 'text',
		placeholder: 'www.IMAGEN_SECUNDARIA.com',
	},
	{
		label: 'url imagen tercearia',
		name: 'image2',
		required: true,
		type: 'text',
		placeholder: 'www.IMAGEN_TERCEARIA.com',
	},
	{
		label: 'url imagen ultima',
		name: 'image3',
		required: true,
		type: 'text',
		placeholder: 'www.IMAGEN_ULTIMA.com',
	},
	{
		label: 'Peso en gramos',
		name: 'weight',
		required: true,
		type: 'text',
		placeholder: '2000',
	},
];

const sizeOptions = [
	{
		value: 'none',
		label: 'Seleccione un campo',
	},
	{ value: 'XS', label: 'XS' },
	{ value: 'S', label: 'S' },
	{ value: 'M', label: 'M' },
	{ value: 'L', label: 'L' },
	{ value: 'XL', label: 'XL' },
	{ value: 'XXL', label: 'XXL' },
	{ value: 'XXXL', label: 'XXXL' },
	{ value: 'XXXXL', label: 'XXXXL' },
	{ value: '25', label: '25' },
	{ value: '26', label: '26' },
	{ value: '27', label: '27' },
	{ value: '28', label: '28' },
	{ value: '29', label: '29' },
	{ value: '30', label: '30' },
	{ value: '31', label: '31' },
	{ value: '32', label: '32' },
	{ value: '33', label: '33' },
	{ value: '34', label: '34' },
	{ value: '35', label: '35' },
	{ value: '36', label: '36' },
	{ value: '37', label: '37' },
	{ value: '38', label: '38' },
	{ value: '39', label: '39' },
	{ value: '40', label: '40' },
	{ value: '41', label: '41' },
	{ value: '42', label: '42' },
	{ value: '43', label: '43' },
	{ value: '44', label: '44' },
	{ value: '45', label: '45' },
	{ value: '46', label: '46' },
	{ value: '47', label: '47' },
	{ value: '48', label: '48' },
];
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
				<h1 className="text-3xl font-bold font-helvetica mx-auto text-center p-8"></h1>
				<Form
					className="p-4 gap-4 bg-primary rounded-lg font-helvetica"
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
					<h1 className="text-3xl font-bold font-helvetica">Manejo de Stock</h1>
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
