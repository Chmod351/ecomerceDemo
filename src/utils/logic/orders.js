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
		console.log('cart:', cart);
		console.log('entrando a orders:  ', mercadoPagoInfo, userData, cart, total);
		const orderItems = cart.products.map((product) => ({
			...product,
			productPrice: product.price_es,
		}));
		console.log(orderItems);
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
		const response = await fetch(`${process.env.REACT_APP_URL}/orders/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});
		console.log(response);
		if (!response.ok) {
			const { id, error } = await response.json();
			console.log(id, error);
			return { id };
		}
		const order = await response.json();

		localStorage.clear();
		handleSuccess('createdOrder');
		return order;
	} catch (e) {
		/* handle error */
		// clearCart();
		localStorage.clear();
		handleError(error);
		console.log(e);
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
		const response = await fetch(`${process.env.REACT_APP_URL}/orders/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			const { id, error } = await response.json();
			console.log(id, error);
			return { id };
		}
		const order = await response.json();
		console.log({ order });
		return order;
	} catch (e) {
		/* handle error */
		handleError(error);

		clearCart();
		console.log(e);
	}
};

// FUNCION DE FORMATEO DE FECHAS

export const formatCreatedAt = (createdAt) => {
	const date = new Date(createdAt);
	const formattedDate = date.toLocaleString('es-ES', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
	return formattedDate;
};
