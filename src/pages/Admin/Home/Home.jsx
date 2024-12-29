import WidgetLg from '../../../components/admin/WidgetLg/WidgetLg';
import Chart from '../../../components/admin/chart/Chart';
import FeaturedInfo from '../../../components/admin/featuredInfo/FeaturedInfo';
import { publicRequest } from '../../../requestMethods';
import './home.css';
import { useEffect, useMemo, useState } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

export default function HomePage() {
	const [chartData, setChartData] = useState('');
	const [monthlySales, setMonthlySales] = useState([]);
	let pendingOrders = 0;
	let deliveredOrders = 0;

	const getMonthlySales = async () => {
		try {
			const res = await publicRequest.get('/orders/monthly-sales');
			setMonthlySales(res.data);
		} catch (e) {
			/* handleerror */
			console.log(e);
		}
	};

	useEffect(() => {
		const fetchStockData = async () => {
			try {
				const res = await publicRequest.get('/products/stock'); // Llama al endpoint de tu API
				const transformedData = res.data.map((product) => {
					const totalStock = product.stock.reduce(
						(sum, stockItem) => sum + stockItem.quantity,
						0
					);
					return { name: product.name, totalStock }; // Transforma el formato
				});
				setChartData(transformedData); // Actualiza el estado con los datos transformados
			} catch (err) {
				console.error('Error fetching stock data:', err);
			}
		};

		fetchStockData();
		getMonthlySales();
	}, []);

	// Función genérica para calcular cantidad de órdenes y income según estado
	const calculateOrdersAndIncome = (orders, status) => {
		let totalOrders = 0;
		let totalIncome = 0;
		console.log(orders);
		orders.forEach((order) => {
			order.orderItems.forEach((item) => {
				if (item.status === status) {
					totalOrders += 1;
					totalIncome += item.productPrice * item.quantity;
				}
			});
		});

		return { totalOrders, totalIncome };
	};
	console;
	return (
		<div className="home">
			<FeaturedInfo
				pendingOrders={
					monthlySales.length > 0
						? calculateOrdersAndIncome(monthlySales, 'Pending')
						: 0
				}
				deliveredOrders={
					monthlySales.length > 0
						? calculateOrdersAndIncome(monthlySales, 'Delivered')
						: 0
				}
			/>

			<div className="chart">
				<h3 className="chartTitle">Stock</h3>
				<ResponsiveContainer width="100%" aspect={4 / 1}>
					<LineChart data={chartData}>
						<XAxis dataKey="name" stroke="#5550bd" />
						<Line type="monotone" dataKey="totalStock" stroke="#5550bd" />
						<Tooltip />
						<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="homeWidgets">
				{/*  <WidgetSm /> */}
				<WidgetLg />
			</div>
		</div>
	);
}
