import { useEffect, useState } from 'react';
import './widgetLg.css';
import { publicRequest } from '../../../requestMethods';
import { formatCreatedAt } from '../../../utils/logic/orders';
import { handleSuccess } from '../../../utils/toast';

export default function WidgetLg() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getOrders = async () => {
			try {
				const res = await publicRequest.get('/orders');
				setOrders(res.data.data);
			} catch {}
		};
		getOrders();
	}, []);
	const Button = ({ type }) => {
		return <button className={'widgetLgButton ' + type}>{type}</button>;
	};

	const clipboardFunction = (id) => {
		navigator.clipboard.writeText(id);
		handleSuccess('succesfull');
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
					<tr className="widgetLgTr" key={order._id}>
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
			</table>
		</div>
	);
}
