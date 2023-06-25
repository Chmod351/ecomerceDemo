import { SentimentDissatisfiedOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { mobile, pc } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assests/logo.png';
import QuantityButton from '../components/quantityButtons';
import Footer from '../components/Footer';
import { addToCart, payment } from '../redux/apiCalls';
import ButtonElement from '../components/Button';
import { addProduct, removeProduct } from '../redux/cartRedux';
import { handleSuccess } from '../utils/toast';
const KEY = process.env.REACT_APP_STRIPE;

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

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
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

const Info = styled.section`
  flex: 3;
  background-color: ${({ theme }) => theme.bg};
  padding: 0.5rem;
`;

const Product = styled.article`
  display: flex;

  justify-content: space-between;
  ${mobile({ flexDirection: 'column', justifyContent: 'center' })}
  ${pc({ padding: '0.2rem 0rem' })}
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

const Summary = styled.aside`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 0.625rem;
  padding: 1.25rem;
  height: 20rem;
  ${mobile({ height: '10rem', padding: '1rem', margin: '0 1rem' })}
`;

const SummaryTitle = styled.h2`
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
  const username = useSelector((state) => state.user.username);
  const [stripeToken, setStripeToken] = useState(null);
  const [userCart, setUserCart] = useState(null);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClick = async () => {
    await addToCart(cart, setUserCart);
  };

  useEffect(() => {
    const makeRequest = async () => {
      await payment(stripeToken.id, cart.total, history, userCart);
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, history, userCart]);

  return (
    <Container>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <ButtonElement text={'CONTINUE SHOPPING'} />
          </Link>
          <TopTexts>
            <TopText tabIndex="0">Shopping Bag({cart.quantity})</TopText>
          </TopTexts>
          {username ? (
            <ButtonElement text={'CHECKOUT NOW'} />
          ) : (
            <Link to="/auth">
              <ButtonElement text={'LOGIN NOW'} />
            </Link>
          )}
        </Top>
        {cart.products.length > 0 ? (
          <Bottom>
            <Info>
              {cart.products.map((product, index) => (
                <Product tabIndex="0">
                  <ProductDetail>
                    <Link to={`/product/${product._id}`}>
                      <Image src={product.imgUrl} alt={product.name} />
                    </Link>
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
                    {/* add and remove buttons */}
                    <QuantityButton
                      add={() => handleAdd(index)}
                      remove={() => handleRemove(index)}
                      quantity={product.quantity}
                    />
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
                <SummaryItemPrice>$ 35.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -35.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              {username ? (
                <ButtonElement text={'CHECKOUT NOW'} onClick={handleClick}>
                  <StripeCheckout
                    name="Cierva Design"
                    image={logo}
                    billingAddress
                    shippingAddress
                    description={`Your total is $${cart.total}`}
                    amount={cart.total * 100}
                    token={onToken}
                    stripeKey={KEY}
                  ></StripeCheckout>
                </ButtonElement>
              ) : (
                <Link to="/auth">
                  <ButtonElement text={'LOGIN NOW'} />
                </Link>
              )}
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
