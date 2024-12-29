import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

export default function FeaturedInfo({ pendingOrders, deliveredOrders }) {
	console.log(deliveredOrders);
	return (
		<div className="featured">
			<div className="featuredItem">
				<span className="featuredTitle">Revanue</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">
						${deliveredOrders.totalOrders * deliveredOrders.totalIncome}
					</span>
					<span className="featuredMoneyRate"></span>
				</div>
				<span className="featuredSub">This month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Pending Orders</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{pendingOrders.totalOrders}</span>
					<span className="featuredMoneyRate">
						<ArrowUpward className="featuredIcon" />
					</span>
				</div>
				<span className="featuredSub">This month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Delivered</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{deliveredOrders.totalOrders}</span>
					<span className="featuredMoneyRate">
						<ArrowUpward className="featuredIcon" />
					</span>
				</div>
				<span className="featuredSub">This month</span>{' '}
			</div>
		</div>
	);
}
