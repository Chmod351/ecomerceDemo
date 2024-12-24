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
import MercadoPago from './form/MercadoPago';

const KEY = process.env.REACT_APP_STRIPE;

const SummaryContainer = styled.aside`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 1.25rem;
  height: auto;
  ${mobile({ height: 'auto', padding: '1rem', margin: '0 1rem' })}
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

const precios = {
  Express_CABA: 5500,
  Standard: 6000,
  Express_GBA: 7500,
  PickUp: 4500,
};

const Summary = ({ cart}) => {

  const [userData, setUserData] = useState({deliveryMode: "PickUp"})
  const [mercadopago, setMercadopago] = useState(false)

console.log(cart.total)
  return (
    <SummaryContainer role="table">
      <>

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
        <SummaryItemText>

 <div style={{flexDirection:'column', display:'flex'}}>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="PickUp"
                checked={userData.deliveryMode === "PickUp"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "PickUp" })
                }
              />
              Retirar por sucursal de correo
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Standard"
                checked={userData.deliveryMode === "Standard"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "Standard" })
                }
              />
              Envío estándar a domicilio
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_CABA"
                checked={userData.deliveryMode === "Express_CABA"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "Express_CABA" })
                }
              />
              Moto mensajería 24 hs - CABA
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_GBA"
                checked={userData.deliveryMode === "Express_GBA"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "Express_GBA" })
                }
              />
              Moto mensajería 24 hs - GBA
            </label>
          </div>

        </SummaryItemText>
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
          ${precios[userData.deliveryMode]}
                 </SummaryItemPrice>
      </SummaryItem>
{/*       <SummaryItem> */}
        {/* <SummaryItemText role="complementary"> */}
        {/*   Shipping Discount */}
        {/* </SummaryItemText> */}
        {/* <SummaryItemPrice */}
        {/*   role="contentinfo" */}
        {/*   title="Shipping Discount $35.90" */}
        {/*   aria-label={`you bill will be $ ${cart.total}`} */}
        {/* > */}
        {/*   $ -35.90 */}
        {/* </SummaryItemPrice> */}
      {/* </SummaryItem> */}
      <SummaryItem type="total">
        <SummaryItemText role="complementary">Total</SummaryItemText>
        <SummaryItemPrice
          role="contentinfo"
          title={cart.total}
          aria-label={`you bill will be $ ${cart.total}`}
        >
          $ {cart.total + precios[userData.deliveryMode]}
        </SummaryItemPrice>
      </SummaryItem>
 
          <Button
            text={'MERCADO PAGO'}
            onClick={() => setMercadopago(!mercadopago)}
          />
        </>   { mercadopago &&  <MercadoPago  total={cart.total + precios[userData.deliveryMode]} setMercadopago={setMercadopago} />
      }
     
     {/*  {username ? ( */}
      {/*   <StripeCheckout */}
      {/*     name="Cierva Design" */}
      {/*     image={logo} */}
      {/*     billingAddress */}
      {/*     shippingAddress */}
      {/*     description={`Your total is $${cart.total}`} */}
      {/*     amount={cart.total * 100} */}
      {/*     token={onToken} */}
      {/*     stripeKey={KEY} */}
      {/*   > */}
      {/*     <Button */}
      {/*       text={'CHECKOUT NOW'} */}
      {/*       onClick={handleClick} */}
      {/*       onKeyUp={handleClick} */}
      {/*     /> */}
      {/*   </StripeCheckout> */}
      {/* ) : ( */}
      {/*   <Link */}
      {/*     to="/auth" */}
      {/*     role="link" */}
      {/*     aria-label="this is a link to auth" */}
      {/*     style={{ textDecoration: 'none' }} */}
      {/*   > */}
      {/*     <Button text={'CHECKOUT NOW'} /> */}
      {/*   </Link> */}
      {/* )} */}
    </SummaryContainer>
  );
};

export default Summary;
