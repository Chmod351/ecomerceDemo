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
import dataLeft from '../../../utils/data/formData';
import SelectField from '../../../components/form/SelectField';
import sizeOptions from '../../../utils/data/sizes';

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
	setValue,
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

						<SelectField
							required={false}
							label="Talla"
							name={`stock.${index}.size`}
							register={register}
							errors={errors}
							defaultValue={p.size}
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
	setValue,
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
						<SelectField
							required={false}
							label="Talla"
							name={`stock.${index}.size`}
							register={register}
							errors={errors}
							defaultValue={'XL'}
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

const deleteEmptyFieldsFromData = (data) => {
	const newData = {};
	for (const key in data) {
		if (data[key] !== '') {
			newData[key] = data[key];
		}
	}
	return newData;
};

export default function Product() {
	const location = useLocation();
	const productId = location.pathname.split('/')[3];
	const [product, setProduct] = useState(null);
	const { handleSubmit, register, formState, reset, setValue } = useForm({
		resolver: zodResolver(productEditionSchema),
	});
	const [copiedProduct, setCopiedProduct] = useState(null);
	const [addMoreClothes, setAddMoreClothes] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const { errors } = formState;

	async function handleSubmitFormI(data) {
		setIsLoading(true);
		const newData = deleteEmptyFieldsFromData(data);
		try {
			const response = await publicRequest.put(
				`/products/update/${productId}`,
				{
					...newData,
					image_url: [
						data.image0,
						data.image1,
						data.image2,
						data.image3,
					].filter(Boolean),
				}
			);
			console.log(response.data);
			handleSuccess('succesfull');
			reset();
		} catch (error) {
			console.error(error);
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (product) {
			setCopiedProduct(product);
		}
	}, [product]);

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
					<h1>'Formulario de EDICION de productos'</h1>
					<Form
						onSubmit={handleSubmit((data) => {
							handleSubmitFormI(data);
						})}
					>
						<InputContainer>
							{dataLeft.map((item, index) => {
								if (item.name === 'category') {
									return (
										<SelectField
											errors={errors}
											required={false}
											key={item.name}
											onChange={(e) => setValue('category', e.target.value)}
											label={item.label}
											name={item.name}
											defaultValue={copiedProduct?.category}
											register={register}
											options={[
												{
													value: copiedProduct?.category,
													label: copiedProduct?.category,
												},
											]}
										/>
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
											defaultValue={
												item.name === 'image0'
													? copiedProduct?.image_url[0]
													: item.name === 'image1'
														? copiedProduct?.image_url[1]
														: item.name === 'image2'
															? copiedProduct?.image_url[2]
															: item.name === 'image3' &&
																copiedProduct?.image_url[3]
											}
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
											defaultValue={copiedProduct?.[item.name]}
											register={register}
											errors={errors}
											required={false}
											placeholder={item.placeholder ?? ''}
										/>
									);
								}
							})}
						</InputContainer>

						<h1>Manejo de Stock</h1>
						<Row>
							<ProductStock
								product={copiedProduct}
								errors={errors}
								register={register}
								addMoreClothes={addMoreClothes}
								setAddMoreClothes={setAddMoreClothes}
								setValue={setValue}
							/>

							<ProductStockManager
								product={copiedProduct}
								errors={errors}
								register={register}
								addMoreClothes={addMoreClothes}
								setAddMoreClothes={setAddMoreClothes}
								setValue={setValue}
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
