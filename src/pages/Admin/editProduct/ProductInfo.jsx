import './product.css';
const ProductInfo = ({ product }) => {
	return (
		<div className="productTop">
			<div className="productTopRight">
				<div className="productInfoTop">
					<img src={product?.image_url[0]} alt="" className="productInfoImg" />
					<span className="productName">{product?.name_es}</span>
				</div>
				<div className="productInfoBottom">
					<div className="productInfoItem">
						<span className="productInfoKey">id:</span>
						<span className="productInfoValue">{product?._id}</span>
					</div>
					<div className="productInfoItem">
						<span className="productInfoKey">Seasson:</span>
						<span className="productInfoValue">{product?.seasson}</span>
					</div>
					<div className="productInfoItem">
						<span className="productInfoKey">Category:</span>
						<span className="productInfoValue">{product?.category}</span>
					</div>
					<div className="productInfoItem">
						<span className="productInfoKey">in stock:</span>
						<span className="productInfoValue">
							{product?.stock.reduce(
								(acc, stockItem) => acc + stockItem.quantity,
								0
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductInfo;
