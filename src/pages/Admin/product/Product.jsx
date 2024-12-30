import { Link, useLocation } from 'react-router-dom';
import './product.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { productById } from '../../../utils/logic/products';
import { mobile } from '../../../responsive';
import Button from '../../../components/ui/Button';
import InputField from '../../../components/form/Input';
import { productEditionSchema } from '../../../utils/schema';
import { publicRequest } from '../../../requestMethods';
import { handleError, handleSuccess } from '../../../utils/toast';
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
const dataLeft = [
	{
		label: 'Categorias',
		name: 'category',
		required: true,
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
		label: 'Descripcion en español (minimo 100 caracteres,maximo 500)',
		name: 'description_es',
		required: true,
		type: 'text',
		placeholder: 'Description en español',
	},

	{
		label: 'Nombre en Español,(minimo 10 caracteres,maximo 50)',
		name: 'name_es',
		required: true,
		type: 'text',
		placeholder: 'Nombre',
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

const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	margin: auto;
	padding: 0rem 1.25rem;
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

const EditProductInfo = ({ product }) => {
	return (
		<div className="productTop">
			<div className="productTopRight">
				<div className="productInfoTop">
					<img src={product?.image_url[0]} alt="" className="productInfoImg" />
					<span className="productName">{product?.name_es}</span>
				</div>
				<div className="productInfoBottom">
					<div className="productInfoItem">
						<span className="productInfoKey">id:</span>
						<span className="productInfoValue">{product?._id}</span>
					</div>
					<div className="productInfoItem">
						<span className="productInfoKey">Seasson:</span>
						<span className="productInfoValue">{product?.seasson}</span>
					</div>
					<div className="productInfoItem">
						<span className="productInfoKey">Category:</span>
						<span className="productInfoValue">{product?.category}</span>
					</div>
					<div className="productInfoItem">
						<span className="productInfoKey">in stock:</span>
						<span className="productInfoValue">
							{product?.stock.reduce(
								(acc, stockItem) => acc + stockItem.quantity,
								0
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProductStock = ({
	product,
	addMoreClothes,
	setAddMoreClothes,
	errors,
	register,
}) => {
	return (
		<>
			{addMoreClothes <= product?.stock.length &&
				product?.stock.map((p, index) => (
					<div key={index} style={{ gap: '1rem', margin: '1rem 0' }}>
						<InputField
							label="Proveedor"
							name={`stock.${index}.provider`}
							register={register}
							errors={errors}
							defaultValue={p.provider}
							required={false}
							placeholder="Nombre del Proveedor"
						/>

						<label
							style={{
								display: 'flex',
								gap: '1rem',
								flexDirection: 'column',
								margin: '1rem 0',
							}}
						>
							Talla
							<select
								onChange={(e) =>
									setValue(`stock.${index}.size`, e.target.value)
								}
								{...register(`stock.${index}.size`)}
							>
								{sizeOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{' '}
										{option.label}{' '}
									</option>
								))}
							</select>
						</label>
						<InputField
							label="Stock"
							name={`stock.${index}.quantity`}
							type="number"
							register={register}
							defaultValue={p.quantity}
							errors={errors}
							required={false}
							placeholder="stock *"
						/>
						<label
							style={{
								display: 'flex',
								gap: '1rem',
								flexDirection: 'column',
								margin: '1rem 0',
							}}
						>
							Color
							<input
								defaultValue={p.color}
								type="color"
								className="w-full"
								{...register(`stock.${index}.color`, {
									required: true,
								})}
								required={false}
							/>
						</label>
						<Row>
							<Button
								disabled={addMoreClothes > product?.stock.length}
								type="button"
								text="Anadir "
								onClick={() => setAddMoreClothes(addMoreClothes + 1)}
							/>
							<Button
								type="button"
								onClick={() =>
									setAddMoreClothes(addMoreClothes > 1 ? addMoreClothes - 1 : 1)
								}
								text="Eliminar "
								disabled={addMoreClothes !== index + 1 || addMoreClothes === 1}
							/>
						</Row>
					</div>
				))}
		</>
	);
};

const ProductStockManager = ({
	product,
	addMoreClothes,
	setAddMoreClothes,
	register,
	errors,
}) => {
	return (
		<>
			{addMoreClothes > product?.stock.length &&
				Array.from({ length: addMoreClothes }).map((_, index) => (
					<div key={Math.random()}>
						<InputField
							label="Proveedor"
							name={`stock.${index}.provider`}
							register={register}
							errors={errors}
							required={false}
							placeholder="Nombre del Proveedor"
						/>
						<label
							style={{
								display: 'flex',
								gap: '1rem',
								flexDirection: 'column',
								margin: '1rem 0',
							}}
						>
							Talla
							<select
								onChange={(e) =>
									setValue(`stock.${index}.size`, e.target.value)
								}
								{...register(`stock.${index}.size`)}
							>
								{sizeOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{' '}
										{option.label}{' '}
									</option>
								))}
							</select>
						</label>
						<InputField
							label="Stock"
							name={`stock.${index}.quantity`}
							type="number"
							register={register}
							errors={errors}
							required={false}
							placeholder="stock *"
						/>
						<label
							style={{
								display: 'flex',
								gap: '1rem',
								flexDirection: 'column',
								margin: '1rem 0',
							}}
						>
							Color
							<input
								type="color"
								className="w-full"
								{...register(`stock.${index}.color`, {
									required: true,
								})}
								required={false}
							/>
						</label>{' '}
						<Row>
							<Button
								disabled={addMoreClothes !== index + 1}
								type="button"
								text="Anadir "
								onClick={() => setAddMoreClothes(addMoreClothes + 1)}
							/>
							<Button
								type="button"
								onClick={() =>
									setAddMoreClothes(addMoreClothes > 1 ? addMoreClothes - 1 : 1)
								}
								text="Eliminar "
								disabled={addMoreClothes !== index + 1 || addMoreClothes === 1}
							/>
						</Row>
					</div>
				))}
		</>
	);
};

function mergeData(product, data) {
	const merged = { ...product };
	Object.keys(data).forEach((key) => {
		if (data[key]) {
			merged[key] = data[key];
		}
	});
	return merged;
}

function formatData(data) {
	return {
		...data,
		image_url: [data.image0, data.image1, data.image2, data.image3].filter(
			Boolean
		),
		collection: data.collection?.toLowerCase(),
		stock:
			data.stock?.map((item) => ({
				...item,
				quantity: Number(item.quantity),
				size: Array.isArray(item.size) ? item.size : [item.size],
				color: Array.isArray(item.color) ? item.color : [item.color],
			})) || [],
	};
}
function handleStockUpdate(existingStock, newStock) {
	const updatedStock = [...existingStock];

	newStock.forEach((newItem) => {
		const index = updatedStock.findIndex(
			(item) =>
				item.provider === newItem.provider &&
				JSON.stringify(item.size) === JSON.stringify(newItem.size) &&
				JSON.stringify(item.color) === JSON.stringify(newItem.color)
		);

		if (index >= 0) {
			updatedStock[index].quantity += Number(newItem.quantity);
		} else {
			updatedStock.push(newItem);
		}
	});

	return updatedStock;
}
export default function Product() {
	const location = useLocation();
	const productId = location.pathname.split('/')[3];
	const [product, setProduct] = useState(null);
	const { handleSubmit, register, formState, reset, setValue } = useForm({
		resolver: zodResolver(productEditionSchema),
	});

	const [addMoreClothes, setAddMoreClothes] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const { errors } = formState;

	async function handleSubmitFormI(data) {
		setIsLoading(true);
		try {
			const formattedData = formatData(data);
			const updatedProduct = mergeData(product, formattedData);
			updatedProduct.stock = handleStockUpdate(product.stock, data.stock);
			console.log(updatedProduct);
			const response = await publicRequest.put(
				`/products/update/${productId}`,
				updatedProduct
			);
			console.log(response.data);
			handleSuccess('Producto actualizado con éxito');
		} catch (error) {
			console.error(error);
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		// screen goes up when this components loads
		const getProduct = async (productId) => {
			const res = await productById(productId, setProduct); // get the specific product info
			return res;
		};
		getProduct(productId);
	}, [productId]);

	return (
		<section className="product">
			<Container>
				<EditProductInfo product={product} />
				<div className="productBottom">
					<h1 className="text-3xl font-bold font-helvetica mx-auto text-center p-8">
						'Formulario de EDICION de productos'
					</h1>
					<Form
						className="p-4 gap-4 bg-primary rounded-lg font-helvetica"
						onSubmit={handleSubmit((data) => {
							handleSubmitFormI(data);
						})}
					>
						<InputContainer className="md:grid md:grid-cols-2 gap-4 p-4">
							{dataLeft.map((item, index) => {
								if (item.name === 'category') {
									return (
										<select
											name="category"
											onChange={(e) => setValue('category', e.target.value)}
										>
											{item.options.map((option) => (
												<option
													key={option.value}
													value={option.value}
													defaultValue={product?.[item.name]}
												>
													{option.label}
												</option>
											))}
										</select>
									);
								} else if (
									item.name === 'image0' ||
									item.name === 'image1' ||
									item.name === 'image2' ||
									item.name === 'image3'
								) {
									return (
										<InputField
											key={item.name}
											label={item.label}
											name={item.name}
											type={item.type}
											defaultValue={product?.[item.name[index]]}
											register={register}
											errors={errors}
											required={false}
											placeholder={item.placeholder ?? ''}
										/>
									);
								} else {
									return (
										<InputField
											key={item.name}
											label={item.label}
											name={item.name}
											type={item.type}
											defaultValue={product?.[item.name]}
											register={register}
											errors={errors}
											required={false}
											placeholder={item.placeholder ?? ''}
										/>
									);
								}
							})}
						</InputContainer>

						<h1 className="text-3xl font-bold font-helvetica">
							Manejo de Stock
						</h1>
						<Row>
							<ProductStock
								product={product}
								addMoreClothes={addMoreClothes}
								errors={errors}
								setAddMoreClothes={setAddMoreClothes}
								register={register}
							/>

							<ProductStockManager
								product={product}
								addMoreClothes={addMoreClothes}
								errors={errors}
								setAddMoreClothes={setAddMoreClothes}
								register={register}
							/>
						</Row>
						<Button
							text={
								!formState.isValid
									? 'COMPLETA TODOS LOS CAMPOS'
									: 'EDITAR PRODUCTO'
							}
							type="submit"
							disabled={isLoading}
						/>
					</Form>
				</div>
			</Container>
		</section>
	);
}
