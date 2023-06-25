import logo from '../assests/logo.png';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';
import { Link } from 'react-router-dom/';
import { useHistory } from 'react-router-dom';
import { addToCart, payment } from '../redux/apiCalls';
import { useEffect, useState } from 'react';
import { mobile } from '../responsive';
import Button from './Button';
const KEY = process.env.REACT_APP_STRIPE;

const SummaryContainer = styled.aside`
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

const Summary = ({ cart, username }) => {
  const [userCart, setUserCart] = useState(null);
  const [stripeToken, setStripeToken] = useState(null);

  const history = useHistory();

  const handleClick = async () => {
    await addToCart(cart, setUserCart);
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      await payment(stripeToken.id, cart.total, history, userCart);
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, history, userCart]);

  return (
    <SummaryContainer>
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
        <StripeCheckout
          name="Cierva Design"
          image={logo}
          billingAddress
          shippingAddress
          description={`Your total is $${cart.total}`}
          amount={cart.total * 100}
          token={onToken}
          stripeKey={KEY}
        >
          <Button
            text={'CHECKOUT NOW'}
            onClick={handleClick}
            onKeyUp={handleClick}
          />
        </StripeCheckout>
      ) : (
        <Link to="/auth">
          <Button text={'LOGIN NOW'} />
        </Link>
      )}
    </SummaryContainer>
  );
};

export default Summary;
