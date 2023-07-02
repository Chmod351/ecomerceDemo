import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { mobile, pc } from '../responsive';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ButtonElement from '../components/Button';
import ProductsCarts from './ProductsCart';
import Orders from './Orders';

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

const Cart = ({ darkMode, setDarkMode }) => {
  const cart = useSelector((state) => state.cart);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <Container role="contentinfo">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Wrapper role="complementary">
        <Title role="main">YOUR BAG</Title>
        <Top>
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
            role="link"
            aria-label="link to home"
          >
            <ButtonElement text={'CONTINUE SHOPPING'} />
          </Link>
          <TopTexts>
            <TopText
              tabIndex="0"
              onClick={() => setLoad(!load)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setLoad(!load);
                }
              }}
              role="status"
              aria-label={`you have ${cart.quantity} products in your cart`}
              title={`you have ${cart.quantity} products in your cart`}
            >
              Shopping Bag({cart.quantity})
            </TopText>
            {username ? (
              <TopText
                tabIndex="0"
                onClick={() => setLoad(!load)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    setLoad(!load);
                  }
                }}
                role="status"
                aria-label={`you have ${cart.quantity} active orders`}
                title={`you have ${cart.quantity} active orders`}
              >
                Orders
              </TopText>
            ) : null}
          </TopTexts>
          {/* si el usuario esta logeado muestra le permite comprar, sino tiene que logearse */}
          {username ? (
            <ButtonElement text={'CHECKOUT NOW'} />
          ) : (
            <Link to="/auth">
              <ButtonElement text={'LOGIN NOW'} />
            </Link>
          )}
        </Top>
        {/* PRODUCT CARTS COMPONENT */}

        {load ? (
          <ProductsCarts username={username} cart={cart} />
        ) : (
          <Orders userId={userId} />
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
