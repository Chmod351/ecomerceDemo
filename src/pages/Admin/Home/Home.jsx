import WidgetLg from '../../../components/admin/WidgetLg/WidgetLg';
import Chart from '../../../components/admin/chart/Chart';
import FeaturedInfo from '../../../components/admin/featuredInfo/FeaturedInfo';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import WidgetSm from '../../../components/admin/widgetSm/WidgetSm';
import { publicRequest } from '../../../requestMethods';
import './home.css';
import { useEffect, useMemo, useState } from 'react';

export default function HomePage() {
	const [userStats, setUserStats] = useState([]);

	const MONTHS = useMemo(
		() => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		[]
	);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await publicRequest.get('/users/stats');
				res.data.map((item) =>
					setUserStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], 'Active User': item.total },
					])
				);
			} catch {}
		};
		getStats();
	}, [MONTHS]);

	return (
		<div className="home">
			<FeaturedInfo />
			<Chart
				data={userStats}
				title="User Analytics"
				grid
				dataKey="Active User"
			/>
			<div className="homeWidgets">
				{/*  <WidgetSm /> */}
				<WidgetLg />
			</div>
		</div>
	);
}
