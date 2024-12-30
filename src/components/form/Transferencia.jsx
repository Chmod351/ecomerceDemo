import { createOrder } from '../../utils/logic/orders';
import { useState } from 'react';
import styled from 'styled-components';
import { Toast } from '../../utils/toast';
import Prompt, { ButtonsPack } from '../ui/Prompt';
import Button from '../ui/Button';
import { handleError, handleSuccess } from '../../utils/toast';
import { useSelector } from 'react-redux';
import Loading from 'react-loading';
import SadFaceMsg from '../ui/SadFaceMsg';

const Container = styled.section`
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 2rem;
`;
const HiddenDescription = styled.p`
	color: gray;
`;
const RowContainer = styled.div`
	padding: 1rem;
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

	const handlePayment = async () => {
		setIsLoading(true);
		try {
			setIsErr(null);
			const id = await createOrder(total, userData, cart);
			setOrderId(id.data._id);
			handleSuccess('thanks');
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
				<div
					style={{
						width: '20rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '2rem',
					}}
				>
					<Loading type="spin" color="black" height={100} width={100} />
				</div>
			)}
			{isErr && <SadFaceMsg text={isErr} />}
			{orderId && (
				<Container>
					<h1>¡GRACIAS POR TU COMPRA!</h1>
					<RowContainer>
						este es tu NUMERO DE ORDEN:
						<strong>{orderId}</strong>
					</RowContainer>
					<br />
					<RowContainer>
						ALIAS: LAZY.TRENDY (una vez transferido descarga el comprobante de
						pago)
					</RowContainer>
					<br />
					<RowContainer>
						<strong>
							Recorda enviar tu numero de orden en el email de confirmacion de
							transferencia junto con el comprobante de pago
						</strong>
						{''}
						<a
							href="mailto:lazytrendy@tienda.com.ar"
							target="_blank"
							className="md:text-xl font-bold"
						>
							{''} email: lazytrendy@tienda.com.ar
						</a>
					</RowContainer>
					<br />

					<p>
						Luego de generar el numero de orden,
						<strong> tendrás dos horas </strong>para enviar por email el
						comprobante de pago.
					</p>
				</Container>
			)}
			<Container id="transfer_container">
				{!isLoading && !isErr && !orderId && (
					<ColumnContainer>
						<p>
							Luego de generar el numero de orden,
							<strong> tendrás dos horas </strong>para enviar por email el
							comprobante de pago.
						</p>
						<ColumnContainerJustifyBetween>
							<h1>
								GENERA LA ORDEN DE PAGO, Y CUANDO TENGAS EL NUMERO DE ORDEN,
								ENVIANOS UN EMAIL CON
							</h1>

							<Button
								text={`GENERAR ORDEN POR:  $ ${total}`}
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
