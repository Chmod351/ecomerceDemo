import styled from 'styled-components';
import { useState } from 'react';

import { mobile } from '../../responsive';
// ui
import Button from './Button';
//functions
import MercadoPago from '../form/MercadoPago';
import TransferPayment from '../form/Transferencia';

const SummaryContainer = styled.aside`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 0.625rem;
	padding: 1.25rem;
	height: auto;
	${mobile({ height: 'auto', padding: '1rem', margin: '0 1rem' })}
`;

const SummaryTitle = styled.h2`
	font-weight: 200;
`;

const SummaryItem = styled.div`
	margin: 1.875rem 0rem;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === 'total' && '500'};
	font-size: ${(props) => props.type === 'total' && '1.5rem'};
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Summary = ({ cart, precios, register, errors, watch, isValid }) => {
	const [transferencia, setTransferencia] = useState(false);
	const [mercadopago, setMercadopago] = useState(false);
	const userData = watch();
	const total = cart.total + precios[userData.deliveryMode];
	return (
		<SummaryContainer role="table">
			<>
				<SummaryTitle role="contentinfo" aria-label="your order Summary">
					ORDER SUMMARY
				</SummaryTitle>
				<SummaryItem>
					<SummaryItemText role="contentinfo">Subtotal</SummaryItemText>
					<SummaryItemPrice role="contentinfo" aria-label={cart.total}>
						${cart.total}
					</SummaryItemPrice>
				</SummaryItem>
				<SummaryItem>
					<SummaryItemText>
						<div style={{ flexDirection: 'column', display: 'flex' }}>
							<label className="font-helvetica">
								<input
									type="radio"
									className="mr-2"
									value="PickUp"
									checked={userData.deliveryMode === 'PickUp'}
									{...register('deliveryMode')}
								/>
								Retirar por sucursal de correo
							</label>
							<label className="font-helvetica">
								<input
									type="radio"
									className="mr-2"
									value="Standard"
									{...register('deliveryMode')}
									checked={userData.deliveryMode === 'Standard'}
								/>
								Envío estándar a domicilio
							</label>
							<label className="font-helvetica">
								<input
									type="radio"
									className="mr-2"
									{...register('deliveryMode')}
									value="Express_CABA"
									checked={userData.deliveryMode === 'Express_CABA'}
								/>
								Moto mensajería 24 hs - CABA
							</label>
							<label className="font-helvetica">
								<input
									type="radio"
									className="mr-2"
									value="Express_GBA"
									{...register('deliveryMode')}
									checked={userData.deliveryMode === 'Express_GBA'}
								/>
								Moto mensajería 24 hs - GBA
							</label>
						</div>
					</SummaryItemText>
				</SummaryItem>
				<SummaryItem>
					<SummaryItemText role="complementary">
						Estimated Shipping
					</SummaryItemText>
					<SummaryItemPrice role="contentinfo">
						${precios[userData.deliveryMode]}
					</SummaryItemPrice>
				</SummaryItem>

				<SummaryItem type="total">
					<SummaryItemText role="complementary">Total</SummaryItemText>
					<SummaryItemPrice
						role="contentinfo"
						aria-label={`you bill will be $ ${total}`}
					>
						$ {isNaN(total) ? cart.total : total}
					</SummaryItemPrice>
				</SummaryItem>
				<span style={{ color: 'red' }}>
					{errors.deliveryMode?.message && 'Modo de entrega es requerido'}
				</span>
				<ButtonContainer>
					<Button
						disabled={!isValid}
						text={'TRANSFERENCIA'}
						onClick={() => setTransferencia(true)}
					/>
					<Button
						disabled={!isValid}
						text={'MERCADO '}
						onClick={() => setMercadopago(!mercadopago)}
					/>
				</ButtonContainer>
			</>

			{transferencia && (
				<TransferPayment
					total={total}
					setTransferencia={setTransferencia}
					cart={cart}
					userData={userData}
				/>
			)}
			{mercadopago && (
				<MercadoPago
					total={total}
					setMercadopago={setMercadopago}
					userData={userData}
				/>
			)}
			{/*  {username ? ( */}
			{/*   <StripeCheckout */}
			{/*     name="Cierva Design" */}
			{/*     image={logo} */}
			{/*     billingAddress */}
			{/*     shippingAddress */}
			{/*     description={`Your total is $${cart.total}`} */}
			{/*     amount={cart.total * 100} */}
			{/*     token={onToken} */}
			{/*     stripeKey={KEY} */}
			{/*   > */}
			{/*     <Button */}
			{/*       text={'CHECKOUT NOW'} */}
			{/*       onClick={handleClick} */}
			{/*       onKeyUp={handleClick} */}
			{/*     /> */}
			{/*   </StripeCheckout> */}
			{/* ) : ( */}
			{/*   <Link */}
			{/*     to="/auth" */}
			{/*     role="link" */}
			{/*     aria-label="this is a link to auth" */}
			{/*     style={{ textDecoration: 'none' }} */}
			{/*   > */}
			{/*     <Button text={'CHECKOUT NOW'} /> */}
			{/*   </Link> */}
			{/* )} */}
		</SummaryContainer>
	);
};

export default Summary;
