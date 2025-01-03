import { publicRequest } from '../../requestMethods';
import { handleError, handleSuccess } from '../toast';

// crear orden mercadopago
export const createOrderMp = async ({
	mercadoPagoInfo,
	userData,
	cart,
	total,
}) => {
	try {
		const orderItems = cart.products.map((product) => ({
			...product,
			productPrice: product.price_es,
		}));
		const requestBody = {
			mercadoPagoInfo: {
				installments: mercadoPagoInfo.installments,
				issuer_id: mercadoPagoInfo.issuer_id,
				payment_method_id: mercadoPagoInfo.payment_method_id,
				payer: {
					email: mercadoPagoInfo.payer.email,
					identification: {
						type: mercadoPagoInfo.payer.identification.type,
						number: mercadoPagoInfo.payer.identification.number,
					},
				},
				token: mercadoPagoInfo.token,
				transaction_amount: mercadoPagoInfo.transaction_amount,
			},
			orderItems,
			totalPrice: total,
			deliveryMode: userData.deliveryMode,
			paymentMethod: 'Mercado Pago',
			shippingAddress1: userData.shippingAddress1,
			userData: {
				...userData,
				surname: userData.lastName,
				name: userData.firstName,
				phone: userData.phoneNumber,
				dateOrdered: new Date(),
			},
		};

		const response = await publicRequest.post('/orders/create', requestBody);
		console.log(response);
		return response.data;
	} catch (e) {
		/* handle error */
		console.log(e);
		throw new Error(e.message);
	}
};

/* crear orden de transferencia  */

export const createOrder = async (total, userData, cart) => {
	const orderItems = cart.products.map((product) => ({
		...product,
		productPrice: product.price_es,
	}));

	try {
		const requestBody = {
			mercadoPagoInfo: null,
			orderItems,
			totalPrice: total,
			deliveryMode: userData.deliveryMode,
			paymentMethod: 'Transferencia',
			shippingAddress1: userData.shippingAddress1,
			userData: {
				...userData,
				surname: userData.lastName,
				name: userData.firstName,
				phone: userData.phoneNumber,
				dateOrdered: new Date(),
			},
		};
		const response = await publicRequest.post('/orders/create', requestBody);
		return response;
	} catch (e) {
		/* handle error */
		console.log(e);
		throw new Error(e.message);
	}
};

// FUNCION DE FORMATEO DE FECHAS

export const formatCreatedAt = (createdAt) => {
	const date = new Date(createdAt);
	const formattedDate = date.toLocaleString('es-ES', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		/*  hour: '2-digit', */
		/* minute: '2-digit', */
		/* second: '2-digit', */
	});
	return formattedDate;
};

export const joinItems = (item) => {
	const joinedItems = item.join(', ');
	console.log(joinedItems);
	return joinedItems;
};
