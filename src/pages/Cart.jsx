import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { LocalMall, ShoppingBasket, Shop } from '@material-ui/icons';

import { mobile, pc } from '../responsive';
//components
import ButtonElement from '../components/ui/Button';
// pages
import Orders from './Orders';
import ProductsCarts from './ProductsCart';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Summary from '../components/Summary';
import TransferPayment from '../components/form/Transferencia';

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
  cursor: pointer;
  ${pc({ marginLeft: '2.5rem' })}
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

const Cart = ({ darkMode, setDarkMode }) => {
  const cart = useSelector((state) => state.cart);
  // const username = useSelector((state) => state.user.username);
  {/* const userId = useSelector((state) => state.user.currentUser?._id); */}
const [transferencia, setTransferencia] = useState(false)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <Container role="contentinfo">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Wrapper role="complementary">
       {/*  <Title role="main" onClick={username ? () => setLoad(!load) : null}> */}
          {/* {load ? ( */}
          {/*   <> */}
          {/*     <ShoppingBasket /> Go to Orders */}
          {/*   </> */}
          {/* ) : ( */}
          {/*   <> */}
          {/*     <LocalMall /> Go to Bag */}
          {/*   </> */}
          {/* )} */}
        {/* </Title> */}
        <Top>
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
            role="link"
            aria-label="link to home"
          >
            <ButtonElement text='CONTINUE SHOPPING' />
          </Link>
          <TopTexts>
            <TopText
              tabIndex="0"
              // onClick={username ? () => setLoad(!load) : null}
              role="status"
              aria-label={`you have ${cart.quantity} products in your cart`}
              title={`you have ${cart.quantity} products in your cart`}
            >
              <Shop /> Shopping Bag({cart.quantity})
            </TopText>
       {/*      {username ?? ( */}
              {/* <TopText */}
              {/*   tabIndex="0" */}
              {/*   onClick={username ? () => setLoad(!load) : null} */}
              {/*   role="status" */}
              {/*   aria-label={`you have ${cart.quantity} active orders`} */}
              {/*   title={`yours active orders`} */}
              {/* > */}
              {/*   <ShoppingBasket /> */}
              {/*   Orders */}
              {/* </TopText> */}
            {/* ) } */}
          </TopTexts>
          {/* si el usuario esta logeado muestra le permite comprar, sino tiene que logearse */}
  {/*         {username ? ( */}
          {/*   <ButtonElement text={'CHECKOUT NOW'} /> */}
          {/* ) : ( */}
          {/*   <Link to="/auth" style={{ textDecoration: 'none' }}> */}
          {/*     <ButtonElement text={'CHECKOUT NOW'} /> */}
          {/*    onRequestClose={() => setIsModalOpen(false)} */}
          {/*   </Link> */}
          {/* )} */}
            <ButtonElement text={'TRANSFERENCIA'} onClick={() => setTransferencia(true)}/>
           {transferencia &&
          <TransferPayment  total={cart.total} setTransferencia={setTransferencia} /> }
        </Top>
        {/* PRODUCT CARTS COMPONENT */}

        {/* {load ? ( */}
        {/*   <ProductsCarts username={username} cart={cart} /> */}
        {/* ) : ( */}
        {/*   <Orders userId={userId} /> */}
        {/* )} */}

          <ProductsCarts cart={cart} >
            <Summary cart={cart} />
          </ProductsCarts>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
