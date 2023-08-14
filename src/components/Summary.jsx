import logo from '../assests/logo.png';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory,Link } from 'react-router-dom';

import { mobile } from '../responsive';
// ui
import Button from './ui/Button';
//functions
import { addToCart, payment } from '../utils/logic/cart';

const KEY = process.env.REACT_APP_STRIPE;

const SummaryContainer = styled.aside`
  flex: 1;
  border: 0.5px solid lightgray;
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
    <SummaryContainer role="table">
      <SummaryTitle role="contentinfo" aria-label="your order Summary">
        ORDER SUMMARY
      </SummaryTitle>
      <SummaryItem>
        <SummaryItemText role="contentinfo">Subtotal</SummaryItemText>
        <SummaryItemPrice
          role="contentinfo"
          title={cart.total}
          aria-label={cart.total}
        >
          ${cart.total}
        </SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText role="complementary">
          Estimated Shipping
        </SummaryItemText>
        <SummaryItemPrice
          role="contentinfo"
          title="Estimated Shipping $35.90"
          aria-label={`you bill will be $ ${cart.total}`}
        >
          $ 35.90
        </SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText role="complementary">
          Shipping Discount
        </SummaryItemText>
        <SummaryItemPrice
          role="contentinfo"
          title="Shipping Discount $35.90"
          aria-label={`you bill will be $ ${cart.total}`}
        >
          $ -35.90
        </SummaryItemPrice>
      </SummaryItem>
      <SummaryItem type="total">
        <SummaryItemText role="complementary">Total</SummaryItemText>
        <SummaryItemPrice
          role="contentinfo"
          title={cart.total}
          aria-label={`you bill will be $ ${cart.total}`}
        >
          $ {cart.total}
        </SummaryItemPrice>
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
        <Link
          to="/auth"
          role="link"
          aria-label="this is a link to auth"
          style={{ textDecoration: 'none' }}
        >
          <Button text={'CHECKOUT NOW'} />
        </Link>
      )}
    </SummaryContainer>
  );
};

export default Summary;
