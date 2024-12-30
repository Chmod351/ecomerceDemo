import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Shop } from '@material-ui/icons';

import { mobile, pc } from '../responsive';
//components
import ButtonElement from '../components/ui/Button';
// pages
import ProductsCarts from './ProductsCart';
import FormCheckout from '../components/form/FormCheckout';

const Container = styled.section`
	min-height: 100vh;
	max-height: auto;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	${mobile({ maxWidth: '100vw', padding: '0' })}
	${pc({ maxWidth: '100vw', padding: '0' })}
`;

const Wrapper = styled.div`
	max-width: 1200px;
	align-items: center;
	margin: auto;
	${mobile({ padding: '1rem 0rem', marginTop: '5rem' })}
	${pc({ padding: '1rem 0rem' })}
`;

const Top = styled.aside`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.25rem 0;
`;

const TopTexts = styled.div`
	display: flex;
	flex-direction: row;
	${mobile({ display: 'none' })}
`;

const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0rem 0.625rem;
	display: flex;
	align-items: center;
	text-align: center;
	${mobile({ margin: '0' })}
`;

const HiddenOnPc = styled.div`
	${pc({ display: 'none' })}
`;
const Cart = ({ darkMode, setDarkMode }) => {
	const cart = useSelector((state) => state.cart);
	const [paymentForm, setPaymentForm] = useState(false);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<Container role="contentinfo">
			<Wrapper role="complementary">
				<Top>
					<Link
						to="/"
						style={{ textDecoration: 'none' }}
						role="link"
						aria-label="link to home"
					>
						<ButtonElement text="CONTINUE SHOPPING" />
					</Link>
					<TopTexts>
						<TopText
							tabIndex="0"
							onClick={() => setPaymentForm(false)}
							role="status"
							aria-label={`you have ${cart.quantity} products in your cart`}
							title={`you have ${cart.quantity} products in your cart`}
							style={{ color: paymentForm ? 'gray' : 'black' }}
						>
							<Shop /> Shopping Bag({cart.quantity})
						</TopText>
						<TopText
							tabIndex="0"
							onClick={() => setPaymentForm(true)}
							role="status"
							aria-label={`payment form`}
							title={`payment form`}
							style={{ color: !paymentForm ? 'gray' : 'black' }}
						>
							<Shop /> Delivery Form
						</TopText>
					</TopTexts>
					<HiddenOnPc>
						<ButtonElement
							text={paymentForm ? 'BACK TO CART' : 'PAYMENT FORM'}
							onClick={
								paymentForm
									? () => setPaymentForm(false)
									: () => setPaymentForm(true)
							}
						/>
					</HiddenOnPc>
				</Top>
				{paymentForm ? (
					<FormCheckout cart={cart} />
				) : (
					<ProductsCarts cart={cart} />
				)}
			</Wrapper>
		</Container>
	);
};

export default Cart;
