import { useEffect, useState } from 'react';
import './widgetLg.css';
import { publicRequest } from '../../../requestMethods';
import { formatCreatedAt } from '../../../utils/logic/orders';
import { handleError, handleSuccess } from '../../../utils/toast';
import Prompt from '../../ui/Prompt';
import Loading from 'react-loading';

function EditOrder({ order, handleClosePrompt }) {
	const [newStatus, setNewStatus] = useState(order.status);
	const [transactionStatus, setTransactionStatus] = useState(
		order.paymentStatus
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const res = await publicRequest.put(`/orders/update`, {
				status: newStatus,
				id: order._id,
				paymentMethod: order.paymentMethod,
			});
			if (order.paymentMethod === 'Transferencia') {
				const res = await publicRequest.put(`/orders/update-payment`, {
					id: order._id,
					paymentStatus: transactionStatus,
					paymentMethod: order.paymentMethod,
				});
				console.log(res);
			}
			console.log(res);
			handleSuccess('succesfull');
			handleClosePrompt();
		} catch (e) {
			/* handle error */
			console.log(e);
			handleError(e ?? 'Error al crear la orden');
		} finally {
			setIsLoading(false);
		}
	};
	if (!order) {
		return (
			<div
				style={{
					height: '10rem',
					width: '30rem',
					display: 'flex',
					marginTop: '15rem',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Loading type="bars" color="black" height={300} width={100} />
			</div>
		);
	}

	return (
		<div
			style={{
				height: 'auto',
				width: '30rem',
				padding: '2rem',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<p>
					<b>Orden:</b>
					{order._id}
				</p>
				<p>
					<b>DNI:</b>
					{order.userData.userIdCard}
				</p>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<p>
					<b>Name:</b> {order.userData.name} {order.userData.surname}
				</p>

				<p>
					<b>State:</b>
					{order.userData.state}
				</p>
				<p>
					<b>Total:</b>
					{order.totalPrice}
				</p>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<p>
					<b>City:</b>
					{order.userData.city}
				</p>
				<p>
					<b>Zip:</b>
					{order.userData.zip}
				</p>

				<p>
					<b>Floor:</b>
					{order.userData.floor}
				</p>
			</div>
			<b>Order Items:</b>
			<p style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
				{order.orderItems.map((item) => (
					<div
						key={item._id._id}
						style={{
							width: '8rem',
							flexDirection: 'column',
							flexWrap: 'wrap',
							backgroundColor: 'lightgray',
							padding: '1rem',
							borderRadius: '0.625rem',
						}}
					>
						<p>{item._id.name_es}</p>
						<p>Units: {item.quantity}</p>
						<p>Value: ${item.productPrice}</p>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignContent: 'center',
								margin: 'auto',
							}}
						>
							<p>Color:</p>
							<span
								style={{
									backgroundColor: item.color || 'white', // Usa blanco si item.color es falsy
									borderRadius: '10%',
									width: '2rem',
									marginTop: '0.7rem',
									height: '2rem',
								}}
							></span>
						</div>
						<p>Size: {item.size}</p>
					</div>
				))}
			</p>

			<label
				style={{
					display: 'flex',
					flexDirection: 'column',
					fontSize: '1.3rem',
					fontWeight: 'bold',
				}}
			>
				Status Update:
				<select
					style={{
						padding: '0.5rem',
						marginTop: '0.5rem',
					}}
					onChange={(e) => setNewStatus(e.target.value)}
					defaultValue={order.status}
				>
					<option value="Pending">Pending</option>
					<option value="Delivered">Delivered</option>
					<option value="Shipped">Shipped</option>
					<option value="Processing">Processing</option>
					<option value="Cancelled">Cancelled</option>
				</select>
			</label>
			{order.paymentMethod === 'Transferencia' && (
				<label
					style={{
						display: 'flex',
						flexDirection: 'column',
						fontSize: '1.3rem',
						fontWeight: 'bold',
					}}
				>
					Payment Status Update:
					<select
						style={{
							padding: '0.5rem',
							marginTop: '0.5rem',
						}}
						onChange={(e) => setTransactionStatus(e.target.value)}
						defaultValue={order.status}
					>
						<option value="Pending">Pending</option>
						<option value="Failed">Failed</option>
						<option value="Success">Success</option>
					</select>
				</label>
			)}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '1rem',
				}}
			>
				<button
					disabled={isLoading}
					style={{
						padding: '1rem 2rem',
						width: '100%',
						border: 'none',
						background: isLoading ? 'gray' : 'green',
						color: 'white',
						cursor: 'pointer',
						hover: { background: '#4CAF50' },
					}}
					onClick={handleSubmit}
				>
					Editar
				</button>
				<button
					disabled={isLoading}
					style={{
						padding: '1rem 2rem',
						width: '100%',
						border: 'none',
						background: isLoading ? 'gray' : 'red',
						color: 'white',
						cursor: 'pointer',
						hover: { background: '#f44336' },
					}}
					onClick={handleClosePrompt}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default function WidgetLg() {
	const [orders, setOrders] = useState([]);
	const [showPrompt, setShowPrompt] = useState(false);
	const [order, setOrder] = useState('');
	const getOrderById = async (id) => {
		try {
			const res = await publicRequest.get(`/orders/order/${id}`);
			setOrder(res.data);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	const getOrders = async () => {
		try {
			const res = await publicRequest.get('/orders');
			setOrders(res.data.data);
		} catch {}
	};
	useEffect(() => {
		getOrders();
	}, []);
	const Button = ({ type }) => {
		return <button className={'widgetLgButton ' + type}>{type}</button>;
	};

	const clipboardFunction = (id) => {
		navigator.clipboard.writeText(id);
		handleSuccess('succesfull');
	};

	const handleOpenPrompt = async (order) => {
		setShowPrompt(true);
		await getOrderById(order._id);
	};
	const handleClosePrompt = () => {
		setShowPrompt(false);
		setOrder('');
		getOrders();
	};

	return (
		<div className="widgetLg">
			<h3 className="widgetLgTitle">Latest transactions</h3>
			<table className="widgetLgTable">
				<tr className="widgetLgTr">
					<th className="widgetLgTh">Orden</th>
					<th className="widgetLgTh">Customer</th>
					<th className="widgetLgTh">Cel</th>
					<th className="widgetLgTh">Mode</th>
					<th className="widgetLgTh">Date</th>
					<th className="widgetLgTh">Amount</th>
					<th className="widgetLgTh">Payment</th>
					<th className="widgetLgTh">Order Status:</th>
				</tr>
				{orders.map((order) => (
					<tr
						className="widgetLgTr"
						key={order._id}
						onClick={() => handleOpenPrompt(order)}
					>
						<td
							className="widgetLgOrder"
							style={{ cursor: 'pointer' }}
							title="click para copiar el id"
							onClick={() => clipboardFunction(order._id)}
						>
							id
						</td>
						<td className="widgetLgUser">
							<a
								href={`mailto:${order.userData.email}`}
								target="_blank"
								className="widgetLgName"
							>
								{order.userData.email}
							</a>
						</td>
						<td className="widgetLgPhone">
							<a
								href={`https://wa.me/${order.userData.phone}`}
								target="_blank"
								className="widgetLgName"
							>
								{order.userData.phone}
							</a>
						</td>

						<td className="widgetLgPhone">{order.deliveryMode}</td>
						<td className="widgetLgDate">
							{formatCreatedAt(order.userData.dateOrdered)}
						</td>
						<td className="widgetLgAmount">${order.totalPrice}</td>
						<td className="widgetLgStatus">
							<Button type={order.paymentStatus} />
						</td>
						<td className="widgetLgStatus">
							<Button type={order.status} />
						</td>
					</tr>
				))}
				{showPrompt && (
					<Prompt>
						<EditOrder order={order} handleClosePrompt={handleClosePrompt} />
					</Prompt>
				)}
			</table>
		</div>
	);
}
