import { Link, useLocation } from 'react-router-dom';
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
import ProductInfo from './ProductInfo';
import AddProductStock from './AddProductStock';
import ShowProductStock from './ShowProductStock';

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

const deleteEmptyFieldsFromData = (data) => {
	const newData = {};
	for (const key in data) {
		if (data[key] !== '') {
			newData[key] = data[key];
		}
	}
	return newData;
};

const compareStockArrays = (originalStock, newStock) => {
	return newStock.map((newItem, index) => {
		const originalItem = originalStock[index];

		// Si no existe un elemento original, se agrega el nuevo tal cual
		if (!originalItem) return newItem;

		// Validar si el campo "size" del nuevo elemento está vacío
		const validatedSize = newItem.size?.length
			? newItem.size
			: originalItem.size;

		// Fusionar los objetos, priorizando los valores del nuevo stock
		return {
			...originalItem,
			...newItem,
			size: validatedSize, // Sobrescribir con el tamaño validado
		};
	});
};

export default function EditProduct() {
	const location = useLocation();
	const productId = location.pathname.split('/')[4];
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
		console.log(data.image0, data.image1, data.image2, data.image3);
		const newData = deleteEmptyFieldsFromData(data);

		if (
			data.image0 !== '' &&
			data.image1 !== '' &&
			data.image2 !== '' &&
			data.image3 !== ''
		) {
			newData.image_url = [data.image0, data.image1, data.image2, data.image3];
		} else {
			newData.image_url = product.image_url;
		}
		const newStock = compareStockArrays(product.stock, newData.stock);
		console.log(newStock);
		try {
			const response = await publicRequest.put(
				`/products/update/${productId}`,
				{
					...newData,
					stock: newStock,
					image_url: newData.image_url,
				}
			);
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
				<ProductInfo product={product} />
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
											value={
												item.name === 'image0'
													? copiedProduct?.image_url[0]
													: item.name === 'image1'
														? copiedProduct?.image_url[1]
														: item.name === 'image2'
															? copiedProduct?.image_url[2]
															: item.name === 'image3' &&
																copiedProduct?.image_url[3]
											}
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
							<ShowProductStock
								product={copiedProduct}
								errors={errors}
								register={register}
								addMoreClothes={addMoreClothes}
								setAddMoreClothes={setAddMoreClothes}
								setValue={setValue}
							/>

							<AddProductStock
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
