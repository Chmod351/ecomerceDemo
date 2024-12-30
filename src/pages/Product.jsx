import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//responsive
import { mobile } from '../responsive';
//Components
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
// ui
import Loading from '../components/common/Loading';
import Button from '../components/ui/Button';
import QuantityButton from '../components/ui/quantityButtons';
// functions
import { productById } from '../utils/logic/products';
import { addToReduxCart } from '../utils/logic/cart.js';

const Container = styled.section`
	display-items: center;
	background-color: ${({ theme }) => theme.bgLighter};
`;

const Wrapper = styled.article`
	max-width: 1200px;
	width: 100%;
	margin: auto;
	padding: 50px;
	display: flex;
	${mobile({ padding: '10px', flexDirection: 'column', marginTop: '5rem' })}
`;

const ImgContainer = styled.div`
	flex: 1;
`;

const Image = styled.img`
	width: 100%;
	min-width: 500px;
	min-height: 500px;
	max-width: 40rem;
	max-height: 30rem;
	object-fit: contain;
	${mobile({ height: '100%' })}
`;

const InfoContainer = styled.aside`
	width: 50%;
	color: ${({ theme }) => theme.text};
	flex: 1;
	padding: 0px 50px;
	${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
	font-weight: 600;
	text-transform: uppercase;
	color: ${({ theme }) => theme.text};
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const Price = styled.span`
	font-weight: 800;
	font-size: 40px;
`;

const FilterContainer = styled.div`
	width: 100%;
	margin: 30px 0px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	${mobile({ width: '100%' })}
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
   padding: 5px;
  border: 1px solid ${({ theme }) => theme.hover};
  background-color: ${(props) => props.color};
   margin: 0px 5px 
  cursor: pointer;
`;

const FilterSize = styled.select`
	margin-left: 10px;
	height: 3rem;
	border: none;
	display: flex;
	width: 4rem;
	text-align: center;
	justify-content: center;
	cursor: pointer;
	background-color: ${({ theme }) => theme.hover};
	color: ${({ theme }) => theme.bg};
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	${mobile({ width: '100%' })}
`;

const Description = styled.p`
	font-size: 1rem;
	display: flex;
	max-width: 90%;
	flex-wrap: wrap;
	overflow: hidden;
	width: 100%;
	font-family: 'Pangolin', cursive;
`;

const Product = ({ darkMode, setDarkMode }) => {
	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState('');
	const [selectedImage, setSelectedImage] = useState(0);
	const [isProductAvaliable, setIsProductAvaliable] = useState(true);
	const [size, setSize] = useState('');
	const dispatch = useDispatch();

	const allColors = Array.from(
		new Set(product?.stock.flatMap((stockItem) => stockItem.color) || [])
	);

	const allSizes = Array.from(
		new Set(product?.stock.flatMap((stockItem) => stockItem.size) || [])
	);
	console.log(color, size);
	const isCombinationAvailable = useCallback(
		(color, size) => {
			return product?.stock.some(
				(stockItem) =>
					stockItem.color.includes(color) &&
					stockItem.size.includes(size) &&
					stockItem.quantity > 0
			);
		},
		[product?.stock]
	);

	useEffect(() => {
		if (size && color) {
			const isAvaliable = isCombinationAvailable(color, size);
			setIsProductAvaliable(isAvaliable);
		}
	}, [color, size, isCombinationAvailable]);

	useEffect(() => {
		// screen goes up when this components loads
		const getProduct = async () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			const res = await productById(id, setProduct); // get the specific product info
			return res;
		};
		getProduct();
	}, [id]);

	const handleQuantity = (type) => {
		if (type === 'dec') {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleClick = () => {
		addToReduxCart(dispatch, setQuantity, product, quantity, color, size);
	};
	return (
		<Container role="contentinfo">
			{product ? (
				<>
					<Wrapper role="article">
						<ImgContainer>
							<Image
								title={`${product.name_es} $ ${product.price_es}`}
								src={product?.image_url[selectedImage] || 'logo.png'}
								alt={product.name_es}
								role="img"
								aria-label={`this is a ${product.name_es}`}
							/>
							<aside style={{ flexDirection: 'row', display: 'flex' }}>
								{product?.image_url.map((img, index) => (
									<article
										key={index}
										className="w-[100px] h-[100px] flex-shrink-0 rounded-lg"
										style={{
											border:
												selectedImage === index
													? '3px solid black'
													: '3px solid transparent',
										}}
									>
										<img
											style={{
												cursor: 'pointer',
												width: '100%',
												height: 'auto',
											}}
											onClick={() => setSelectedImage(index)}
											key={index}
											src={img || ''}
											alt={product?.name_es}
										/>
									</article>
								))}
							</aside>
						</ImgContainer>
						<InfoContainer role="complementary" aria="complementary info">
							<Title tabIndex="0" role="complementary">
								{product.name_es}
							</Title>
							<Desc tabIndex="0"> {product.sale.status}</Desc>
							<Description
								tabIndex="0"
								role="description"
								aria-label={product.description_es}
							>
								{product.description_es}
							</Description>
							<Price tabIndex="0">$ {product.price_es}</Price>
							<FilterContainer role="menu">
								<Filter tabIndex="0" aria-label="color section">
									<FilterTitle tabIndex="0">Color:</FilterTitle>
									{allColors.map((c) => (
										<ul key={c} style={{ listStyle: 'none' }}>
											<FilterColor
												onClick={() => setColor(c)}
												className="w-9 h-9 hover:cursor-pointer border rounded-full border-solid-2  border-gray-400"
												style={{
													backgroundColor: c,
													border:
														color !== c
															? c === '#ffffff'
																? '3px solid black'
																: `3px solid ${c}`
															: '3px solid orange',
													borderRadius: '50%',
												}}
												onKeyUp={(e) => {
													if (e.key === 'Enter') {
														setColor(c);
													}
												}}
											/>
										</ul>
									))}
								</Filter>
								<Filter aria-label="size section">
									<FilterTitle tabIndex="0">Size</FilterTitle>
									{allSizes.map((s) => (
										<ul>
											<FilterColor
												tabIndex="0"
												onClick={() => setSize(s)}
												title={s}
												aria-label={`size is ${s}`}
												style={{
													backgroundColor: 'white',
													border:
														size !== s ? '2px solid black' : '2px solid orange',
													borderRadius: '50%',
												}}
											>
												{s}
											</FilterColor>
										</ul>
									))}
								</Filter>
							</FilterContainer>
							<AddContainer>
								{/* add && remove buttons */}
								<QuantityButton
									add={() => handleQuantity('inc')}
									remove={() => handleQuantity('dec')}
									quantity={quantity}
								/>
								{/* action button */}
								<Button
									disabled={!isCombinationAvailable(color, size)}
									text="ADD TO CART"
									onClick={handleClick}
									tabIndex="0"
									onKeyUp={(e) => {
										if (e.key === 'Enter') {
											handleClick();
										}
									}}
								/>
							</AddContainer>
							{!isProductAvaliable && (
								<span style={{ color: 'red' }}>
									No nos quedan unidades disponibles :(
								</span>
							)}
						</InfoContainer>
					</Wrapper>
					<Products tag={product.tags} />
				</>
			) : (
				<Loading />
			)}
		</Container>
	);
};

export default Product;
