import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Info = styled.div`
	opacity: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: ${({ theme }) => theme.transparent};
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
`;
const Container = styled.article`
	flex: 1;
	margin: 5px;
	gap: 2rem;
	border-radius: 1rem;

	padding: 1rem;
	min-width: 16rem;
	max-width: 18rem;
	height: 22rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.bgLighter};

	position: relative;
	&:hover ${Info} {
		opacity: 1;
	}
`;
const LinkDecoration = styled(Link)`
	text-decoration: none;
	color: ${({ theme }) => theme.hover};
`;

const Image = styled.img`
	margin-top: 0.2rem;
	height: 20rem;
	width: 18rem;
	maxheight: 20rem;
	maxwidth: 18rem;
	z-index: 2;
	backgroundcolor: black;
	object-fit: contain;
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;
const PriceContainer = styled.div`
	width: 100%;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.hover};
`;
const Price = styled.b`
	font-size: 1.5rem;
`;
const Hot = styled.span`
	position: absolute;
	top: 0;
	right: 0;
	background-color: red;
	color: white;
	padding: 1rem 0.5rem;
	border-radius: 0.5rem;
	font-weight: bold;
	font-size: 1.5rem;
	z-index: 3;
`;

const Product = ({ product }) => {
	return (
		<Container aria-label={product.name_es}>
			{product.sale && <Hot>50%</Hot>}
			<LinkDecoration
				to={`/product/${product._id}`}
				aria-label={`see more details about ${product.name_es} $ ${product.price_es}`}
				role="link"
				title={`${product.name_es} $ ${product.price_es}`}
			>
				<ImageContainer>
					<Image
						src={
							product?.image_url ??
							'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
						}
						alt={product?.name}
						role="img"
						title={product?.description_es}
						aria-label={`product-image:${product?.description_es}`}
					/>
				</ImageContainer>
				<PriceContainer>
					<Price>${product.price_es}</Price>
				</PriceContainer>
			</LinkDecoration>
		</Container>
	);
};

export default Product;
