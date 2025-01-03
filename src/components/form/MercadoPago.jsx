import { useEffect, useState } from 'react';
import { CardPayment, StatusScreen } from '@mercadopago/sdk-react';
import useIsMobile from '../../hooks/useIsMobile';
import { createOrderMp } from '../../utils/logic/orders';
import Prompt, { ButtonsPack } from '../ui/Prompt';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { useSelector } from 'react-redux';
import { handleError, handleSuccess } from '../../utils/toast';
import Loading from 'react-loading';

function MercadoPago({ total, setMercadopago, userData }) {
	const [mercadopagoOrdenId, setMercadopagoOrdenId] = useState(null);
	const cart = useSelector((state) => state.cart);
	const [isCardPaymentMounted, setIsCardPaymentMounted] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setEr] = useState('');
	const { setIsModalOpen } = useIsMobile();
	const handleClose = () => {
		setMercadopago(false);
		setIsCardPaymentMounted(false); // Desmontar el componente
		setTimeout(() => {
			setIsModalOpen(false); // Cerrar el modal después de desmontar
		}, 1000); // Dar un pequeño margen de tiempo para desmontar
	};

	useEffect(() => {
		try {
			initMercadoPago(process.env.REACT_APP_PUBLIC_KEY);
			console.log('SDK inicializado correctamente');
		} catch (error) {
			console.error('Error al inicializar el SDK:', error);
		}
	}, []);

	useEffect(() => {
		setIsModalOpen(true);
		setIsCardPaymentMounted(true);
	}, [setIsModalOpen, setIsCardPaymentMounted]);

	const handlePayment = async ({ data }) => {
		setEr('');
		setIsLoading(true);
		try {
			const { id } = await createOrderMp({
				mercadoPagoInfo: data,
				userData,
				cart,
				total,
			});
			console.log(id);
			setMercadopagoOrdenId(id);
			handleSuccess('thanks');
		} catch (e) {
			/* handle error */
			console.log('e: ', e);
			handleError(e ?? 'Error al crear la orden');
			handleClose();
		}
		setEr('');
		setIsLoading(false);
	};
	console.log(mercadopagoOrdenId);
	return (
		<Prompt id="errorScreenBrick_container">
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
			{mercadopagoOrdenId && (
				<div
					id="statusScreenBrick_container"
					style={{ padding: '2rem', width: '100%' }}
				>
					<div>
						<StatusScreen
							initialization={{
								paymentId: mercadopagoOrdenId,
							}}
						/>
					</div>
				</div>
			)}
			<div
				id="cardPaymentBrick_container"
				style={{ padding: '2rem', width: '40rem', minHeight: '43rem',height:" 100%" }}
			>
				{!error &&
					!isLoading &&
					isCardPaymentMounted &&
					!mercadopagoOrdenId && (
						<CardPayment
							referenceId={mercadopagoOrdenId}
							locale="es-AR"
							initialization={{
								amount: total,
							}}
							onSubmit={async (data) => {
								handlePayment({ data });
							}}
						/>
					)}
			</div>
			<span>{error}</span>
			<ButtonsPack setShowPrompt={handleClose} />
		</Prompt>
	);
}
export default MercadoPago;
