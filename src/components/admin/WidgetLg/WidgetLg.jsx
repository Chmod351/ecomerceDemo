import { useEffect, useState } from 'react';
import './widgetLg.css';
import { publicRequest } from '../../../requestMethods';
import { formatCreatedAt } from '../../../utils/logic/orders';

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
	return (
		<div className="widgetLg">
			<h3 className="widgetLgTitle">Latest transactions</h3>
			<table className="widgetLgTable">
				<tr className="widgetLgTr">
					<th className="widgetLgTh">Customer</th>
					<th className="widgetLgTh">Date</th>
					<th className="widgetLgTh">Amount</th>
					<th className="widgetLgTh">Status</th>
				</tr>
				{orders.map((order) => (
					<tr className="widgetLgTr" key={order._id}>
						<td className="widgetLgUser">
							<span className="widgetLgName">{order.userData.email}</span>
						</td>
						<td className="widgetLgDate">{formatCreatedAt(order.createdAt)}</td>
						<td className="widgetLgAmount">${order.totalPrice}</td>
						<td className="widgetLgStatus">
							<Button type={order.status} />
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
