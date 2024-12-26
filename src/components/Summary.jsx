import styled from 'styled-components';
import {  useState } from 'react';

import { mobile } from '../responsive';
// ui
import Button from './ui/Button';
//functions
import MercadoPago from './form/MercadoPago';
import {useSelector,useDispatch} from 'react-redux';
import { setUserData } from './redux/orderRedux';


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



const Summary = ({ cart,precios}) => {
  const dispatch = useDispatch();
const userData = useSelector((state) => state.order);
  const [mercadopago, setMercadopago] = useState(false)
console.log(userData)


 const handleDeliveryModeChange = (mode) => {
    dispatch(setUserData({ deliveryMode: mode }));
  };
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
                onChange={() =>handleDeliveryModeChange("PickUp")}
              />
              Retirar por sucursal de correo
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Standard"
                checked={userData.deliveryMode === "Standard"}
                onChange={() =>handleDeliveryModeChange("Standard")}
              />
              Envío estándar a domicilio
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_CABA"
                checked={userData.deliveryMode === "Express_CABA"}
                onChange={() =>handleDeliveryModeChange("Express_CABA")}
              />
              Moto mensajería 24 hs - CABA
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_GBA"
                checked={userData.deliveryMode === "Express_GBA"}
                onChange={() =>handleDeliveryModeChange("Express_GBA")}
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
