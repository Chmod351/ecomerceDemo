import React, { useState } from 'react';
import InputField from './Input';
import styled from 'styled-components';
import { mobile, pc } from '../../responsive';
import Summary from '../ui/Summary';
import { useForm } from 'react-hook-form';
import checkoutFormSchema from '../../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button';

const Container = styled.form`
	min-height: 100vh;
	color: ${({ theme }) => theme.text};
	${mobile({
		maxWidth: '100vw',
		padding: '0',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	})}
	${pc({ maxWidth: '100vw', padding: '0' })}
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: 'column', overflow: 'hidden' })}
`;

const Aside = styled.aside`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: 'column', justifyContent: 'center' })}
	${pc({ padding: '0.2rem 0rem', width: '73%' })}
`;

const Section = styled.section`
	flex: 1;
	gap: 2rem;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.bg};
	padding: 1rem;
	border-radius: 1rem;
	${mobile({ flexDirection: 'column' })}
`;

const precios = {
	Express_CABA: 5500,
	Standard: 6000,
	Express_GBA: 7500,
	PickUp: 4500,
};
function FormCheckout({ cart }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm({
		resolver: zodResolver(checkoutFormSchema),
	});
	const [flag, setFlag] = useState(false);

	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<Container form onSubmit={handleSubmit(onSubmit)}>
			<h1>Fill out the form</h1>
			<Wrapper>
				<Aside>
					<Section className="bg-primary p-8 rounded-xl">
						<InputField
							label="Nombre *"
							name="firstName"
							register={register}
							errors={errors}
							placeholder="Juan *"
							required
						/>

						<InputField
							label="Apellido *"
							name="lastName"
							register={register}
							errors={errors}
							placeholder="Perez *"
							required
						/>
						<InputField
							label="Email *"
							name="email"
							errors={errors}
							register={register}
							placeholder="juanperez@gmail.com *"
							type="email"
							required
						/>

						<InputField
							label="Número de teléfono *"
							name="phoneNumber"
							errors={errors}
							placeholder="112345678 *"
							register={register}
							required
						/>
						<InputField
							label="Comentarios (Opcional)"
							name="commentaries"
							errors={errors}
							placeholder="Comentarios (Opcional)"
							register={register}
						/>
						<InputField
							label="Ingrese el número de su DNI (para la factura)*"
							required
							name="userIdCard"
							errors={errors}
							placeholder="Ingrese el número de su DNI (para la factura)*"
							register={register}
						/>
					</Section>
					<Section>
						<InputField
							label="Pais *"
							name="country"
							errors={errors}
							placeholder="Argentina *"
							register={register}
							required
						/>
						<InputField
							label="Provincia *"
							name="state"
							errors={errors}
							placeholder="Buenos Aires *"
							register={register}
							required
						/>
						<InputField
							label="Dirección *"
							name="shippingAddress1"
							errors={errors}
							placeholder="Dirección *"
							register={register}
							required
						/>

						<InputField
							label="Piso/ Dpto / Lote (Opcional)"
							name="floor"
							errors={errors}
							placeholder="Piso/ Dpto / Lote (Opcional)"
							register={register}
						/>
						<InputField
							label="Código postal *"
							name="zip"
							errors={errors}
							placeholder="Código postal *"
							register={register}
							required
						/>

						<InputField
							label="Localidad *"
							name="city"
							errors={errors}
							placeholder="Localidad *"
							register={register}
							required
						/>
					</Section>
				</Aside>

				<Summary
					cart={cart}
					flag={flag}
					handleSubmit={handleSubmit}
					precios={precios}
					register={register}
					watch={watch}
					isValid={isValid}
					errors={errors}
				/>
			</Wrapper>
			{!flag && (
				<Button
					type="submit"
					onClick={!isValid ? () => setFlag(false) : () => setFlag(true)}
					disabled={false}
					text={'CHOOSE PAYMENT METHOD'}
				></Button>
			)}
		</Container>
	);
}

export default FormCheckout;
