import { createOrder } from '../../utils/logic/orders';
import { useState } from 'react';
import styled from 'styled-components';
import { Toast } from '../../utils/toast';
import Prompt, { ButtonsPack } from '../ui/Prompt';
import Button from '../ui/Button';
import { handleError, handleSuccess } from '../../utils/toast';
import { useSelector } from 'react-redux';
import Loading from 'react-loading';

const Container = styled.section`
	padding: 2rem;
`;
const HiddenDescription = styled.p`
	color: gray;
`;

const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ColumnContainerJustifyBetween = styled.div`
	display: flex;
	flex-direction: column;
	height: 200px;
	justify-content: space-between;
	align-items: center;
`;

function TransferPayment({ total, setTransferencia, userData, cart }) {
	const [isLoading, setIsLoading] = useState(false);
	const [isErr, setIsErr] = useState(null);
	const [orderId, setOrderId] = useState(null);
	const clearCart = useSelector((state) => state.cart.clearCart);

	const handlePayment = async () => {
		setIsLoading(true);
		try {
			setIsErr(null);
			const id = await createOrder(total, userData, cart);
			console.log({ id });
			setOrderId(id._id);
			handleSuccess('thanks');
			clearCart();
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
			handleError(error);
			setIsErr('Error al procesar el pago');
		}
	};
	return (
		<Prompt>
			{isLoading && (
				<div>
					<Loading type="spin" color="black" height={100} width={100} />
				</div>
			)}
			{orderId && (
				<Container>
					<h1>¡GRACIAS POR TU COMPRA!</h1>
					<p>este es tu NUMERO DE ORDEN:</p>
					<strong>{orderId}</strong>
					<p>Te enviamos un email con el detalle de tu compra</p>
					<p>Y te mantendremos informado sobre el estado de tu orden</p>
				</Container>
			)}
			<Container id="transfer_container">
				{!isLoading && !isErr && (
					<ColumnContainer>
						<p>
							Luego de generar el numero de orden,
							<strong> tendrás dos horas </strong>para enviar por email el
							comprobante de pago.
						</p>
						<ColumnContainerJustifyBetween>
							<h1>
								<b>ALIAS</b>: LAZY.TRENDY
							</h1>
							<br />
							<a
								href="mailto:lazytrendy@tienda.com.ar"
								target="_blank"
								className="md:text-xl font-bold"
							>
								email:lazytrendy@tienda.com.ar
							</a>

							<br />
							<strong>
								{!orderId ? (
									<>TOTAL A PAGAR : $ {total}</>
								) : (
									<>
										ESTE ES TU NUMERO DE ORDEN : {orderId}
										<br />
										TOTAL A PAGAR : $ {total}
									</>
								)}
							</strong>

							<Button
								text={`CHECKOUT:  $ ${total}`}
								// @ts-ignore
								onClick={() => handlePayment()}
								type="submit"
								disabled={isLoading || orderId ? true : false}
							/>
						</ColumnContainerJustifyBetween>
						<br />
						<HiddenDescription>
							las transferencias no son reembolsables Tenes que enviar el
							comprobante en un plazo de 2hs o el pedido se cancela
							automaticamente Gracias por tu compra!
						</HiddenDescription>
					</ColumnContainer>
				)}
			</Container>
			<ButtonsPack setShowPrompt={() => setTransferencia(false)} />
		</Prompt>
	);
}

export default TransferPayment;
