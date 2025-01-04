import './featuredInfo.css';
import { ArrowUpward } from '@material-ui/icons';

export default function FeaturedInfo({ pendingOrders, deliveredOrders }) {
	console.log(deliveredOrders);
	const total =
		deliveredOrders &&
		deliveredOrders?.totalOrders * deliveredOrders?.totalIncome;
	return (
		<div className="featured">
			<div className="featuredItem">
				<span className="featuredTitle">Revanue</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">${total ?? 0}</span>
					<span className="featuredMoneyRate"></span>
				</div>
				<span className="featuredSub">This month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Pending Orders</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">
						{pendingOrders.totalOrders ?? 0}
					</span>
					<span className="featuredMoneyRate">
						<ArrowUpward className="featuredIcon" />
					</span>
				</div>
				<span className="featuredSub">This month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Delivered</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">
						{deliveredOrders.totalOrders ?? 0}
					</span>
					<span className="featuredMoneyRate">
						<ArrowUpward className="featuredIcon" />
					</span>
				</div>
				<span className="featuredSub">This month</span>{' '}
			</div>
		</div>
	);
}
