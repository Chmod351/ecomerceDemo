import { Add, Remove, SentimentDissatisfiedOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { mobile, pc } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../assests/logo.png';
import { handleError, handleSuccess } from '../utils/toast';
import { addProduct, removeProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer';
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  min-height: 100vh;
  max-height: auto;
  height: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  ${mobile({ maxWidth: '100vw', padding: '0' })}
  ${pc({ maxWidth: '100vw', padding: '0'})}
`;
// const Container = styled.div``;

const Wrapper = styled.div`
  max-width: 1200px;
  align-items: center;
  margin: auto;
  ${mobile({ padding: '0' })}
`;



const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
`;

const TopButton = styled.button`
  padding: 0.625rem;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0rem 0.625rem;
  ${mobile({ margin: '0' })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column', overflow: 'hidden' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column', justifyContent: 'center' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width: '100vw', padding: '0rem' })}
`;

const Details = styled.div`
  color: ${({ theme }) => theme.textSoft};
  padding: 1.25rem;
  ${mobile({ flexWrap: 'wrap', width: '100vw' })}
`;

const ProductName = styled.span``;

const ProductColor = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const ProductAmount = styled.div`
  font-size: 1.5rem;
  margin: 0.3125rem;
  ${mobile({ margin: '0.3125rem  0.9375rem' })}
`;

const ProductPrice = styled.div`
  font-size: 1.875rem;
  font-weight: 200;
  ${mobile({ marginBottom: '1.25rem' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 0.625rem;
  padding: 1.25rem;
  height: 20rem;
  ${mobile({ height: '10rem', padding: '1rem', margin: '0 1rem' })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 1.875rem 0rem;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '1.5rem'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 0.625rem;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Icon = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.bg};
`;
const Message = styled.p`
  display: flex;
  height: 50vh;
  flex: 4;
  background-color: ${({ theme }) => theme.bgLighter};
  font-weight: bold;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.soft};
  justify-content: center;
  align-items: center;
  text-align: center;
  ${mobile({ height: '60vh', flexDirection: 'column' })}
`;

const IconFace = styled.svg`
  color: ${({ theme }) => theme.soft};
  margin: 0 1rem;
  ${mobile({ margin: '1rem auto' })}
`;

const Cart = ({ darkMode, setDarkMode }) => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRemove = (index) => {
    dispatch(removeProduct(cart.products[index]));
    handleSuccess('removed');
  };
  const handleAdd = (index) => {
    dispatch(addProduct({ ...cart.products[index], quantity: 1 }));
    handleSuccess('added');
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/purchase/payment', {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push('/success', {
          stripeData: res.data,
          products: cart,
        });
      } catch (error) {
        handleError(error);
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <Container>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link
            to='/'
            style={{ textDecoration: 'none' }}
          >
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type='filled'>CHECKOUT NOW</TopButton>
        </Top>
        {cart.products.length > 0 ? (
          <Bottom>
            <Info>
              {cart.products.map((product, index) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.imgUrl} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Icon onClick={() => handleAdd(index)}>
                        <Add />
                      </Icon>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Icon onClick={() => handleRemove(index)}>
                        <Remove />
                      </Icon>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>${cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type='total'>
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name='Cierva Design'
                image={logo}
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        ) : (
          <Message>
            Your Cart Is Empty
            <IconFace>
              <SentimentDissatisfiedOutlined />
            </IconFace>
          </Message>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
