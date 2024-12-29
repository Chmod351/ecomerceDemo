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

const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	margin: auto;
	padding: 0rem 1.25rem;
	${mobile({ margin: 'auto' })}
`;

export default function Product() {
	const location = useLocation();
	const productId = location.pathname.split('/')[3];
	const [product, setProduct] = useState(null);
	const { handleSubmit, register, formState, reset, setValue } = useForm({
		resolver: zodResolver(productEditionSchema),
	});

	const [formError, setFormError] = useState('');
	const [formSuccess, setFormSuccess] = useState('');
	const [addMoreClothes, setAddMoreClothes] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const { errors } = formState;

	const handleSubmitFormI = async (data) => {
		setFormError('');
		setIsLoading(true);
		const collectionFormatted = data?.collection?.toLowerCase();

		const formatedData = {
			...data,
			collection: collectionFormatted,
		};
		try {
			console.log(data);
			const res = await publicRequest.put(`/products/update/${productId}`, {
				...formatedData,
				image_url: [data.image0, data.image1, data.image2, data.image3],
			});
			if (res.ok) {
				console.log('enviado');
				setFormError('');
				setFormSuccess('Prenda  cargada exitosamente');
				reset();
			} else {
				// i want to scroll up
				console.log('error');
				setFormError(
					'Error al crear el producto, revisa los campos atentamente'
				);
			}
			setIsLoading(false);
		} catch (e) {
			console.log(e);
			setIsLoading(false);
			// i want to scroll up

			setFormError(e.message);
		}
	};

	useEffect(() => {
		// screen goes up when this components loads
		const getProduct = async (productId) => {
			const res = await productById(productId, setProduct); // get the specific product info
			return res;
		};
		getProduct(productId);
	}, [productId]);

	console.log(product);

	return (
		<section className="product">
			<Container>
				<div className="productTop">
					<div className="productTopRight">
						<div className="productInfoTop">
							<img
								src={product?.image_url[0]}
								alt=""
								className="productInfoImg"
							/>
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
				<div className="productBottom">
					<section className="container">
						<h1 className="text-3xl font-bold font-helvetica mx-auto text-center p-8">
							{formError ? formError : 'Formulario de EDICION de productos'}
						</h1>
						<form
							className="p-4 gap-4 bg-primary rounded-lg font-helvetica"
							onSubmit={handleSubmit((data) => {
								handleSubmitFormI(data);
							})}
						>
							<div className="md:grid md:grid-cols-2 gap-4 p-4">
								{dataLeft.map((item) => {
									if (item.name === 'category') {
										return (
											<select
												name="category"
												onChange={(e) => setValue('category', e.target.value)}
											>
												{item.options.map((option) => (
													<option key={option.value} value={option.value}>
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
												register={register}
												errors={errors}
												required={false}
												placeholder={item.placeholder ?? ''}
											/>
										);
									}
								})}
							</div>
							{formError && <p className="text-red-500">{formError}</p>}
							<h1 className="text-3xl font-bold font-helvetica">
								Manejo de Stock
							</h1>
							<div className="md:grid md:grid-cols-4 gap-4 p-4">
								{product?.stock.map((p, index) => (
									<div key={index} className="flex flex-col gap-4">
										<InputField
											label="Proveedor"
											name={`stock.${index}.provider`}
											register={register}
											errors={errors}
											required={false}
											placeholder="Nombre del Proveedor"
										/>

										<InputField
											label="Coste del Proveedor"
											name={`stock.${index}.provider_cost`}
											register={register}
											type="number"
											errors={errors}
											required={false}
											placeholder="Coste del Proveedor sin $ *"
										/>
										<label>
											Talla
											<select
												onChange={(e) =>
													setValue(`stock.${index}.size`, e.target.value)
												}
												{...register(`stock.${index}.size`)}
											>
												<option value={p.size[0]}>{p.size[0]}</option>
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
										<label className="font-helvetica text-sm font-bold flex flex-col gap-4 my-4">
											Color
											<input
												type="color"
												className="w-full"
												{...register(`stock.${index}.color`, {
													required: true,
												})}
												required={false}
											/>
										</label>
										<div className="flex flex-row gap-4">
											<Button
												disabled={false}
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
										</div>
									</div>
								))}
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

											<InputField
												label="Coste del Proveedor"
												name={`stock.${index}.provider_cost`}
												register={register}
												type="number"
												errors={errors}
												required={false}
												placeholder="Coste del Proveedor sin $ *"
											/>

											<label>
												Talla
												<select
													name={`stock.${index}.size`}
													onChange={(e) =>
														setValue(`stock.${index}.size`, e.target.value)
													}
													{...register(`stock.${index}.size`)}
												>
													<option value={product?.stock[0].size[0]}>
														{product?.stock[0].size[0]}
													</option>
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
											<label className="font-helvetica text-sm font-bold flex flex-col gap-4 my-4">
												Color
												<input
													type="color"
													className="w-full"
													{...register(`stock.${index}.color`, {
														required: true,
													})}
													required={false}
												/>
											</label>
											<div className="flex flex-row gap-4">
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
											</div>
										</div>
									))}
							</div>
							<Button
								text={
									!formState.isValid
										? 'COMPLETA TODOS LOS CAMPOS'
										: 'EDITAR PRODUCTO'
								}
								type="submit"
								disabled={isLoading}
							/>
						</form>
						{formSuccess && (
							<p className="text-green-500 text-center p-4">{formSuccess}</p>
						)}
					</section>
				</div>
			</Container>
		</section>
	);
}
