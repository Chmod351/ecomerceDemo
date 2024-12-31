import Button from '../../../components/ui/Button';
import styled from 'styled-components';
import SelectField from '../../../components/form/SelectField';
import sizeOptions from '../../../utils/data/sizes';

import InputField from '../../../components/form/Input';
const Row = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;
`;

const ShowProductStock = ({
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
							defaultValue={p.size[0]}
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

export default ShowProductStock;
