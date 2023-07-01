import { SentimentDissatisfiedOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { mobile, pc } from '../responsive';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuantityButton from '../components/quantityButtons';
import Footer from '../components/Footer';
import ButtonElement from '../components/Button';
import { addProduct, removeProduct } from '../redux/cartRedux';
import { handleSuccess } from '../utils/toast';
import Summary from '../components/Summary';

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
  border: 1px solid ${({ theme }) => theme.textSoft};

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

  const dispatch = useDispatch();

  const handleRemove = (index) => {
    dispatch(removeProduct(cart.products[index]));
    handleSuccess('removed');
  };

  const handleAdd = (index) => {
    dispatch(addProduct({ ...cart.products[index], quantity: 1 }));
    handleSuccess('added');
  };

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
              role="status"
              aria-label={`you have ${cart.quantity} products in your cart`}
              title={`you have ${cart.quantity} products in your cart`}
            >
              Shopping Bag({cart.quantity})
            </TopText>
            <TopText
              tabIndex="0"
              role="status"
              aria-label={`you have ${cart.quantity} active orders`}
              title={`you have ${cart.quantity} active orders`}
            >
              Orders Status({cart.quantity})
            </TopText>
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
        {cart.products.length > 0 ? (
          <Bottom role="list">
            <Info role="complementary">
              {cart.products.map((product, index) => (
                <Product tabIndex="0">
                  <ProductDetail>
                    <Link
                      to={`/product/${product._id}`}
                      role="link"
                      aria-label={`${product.name} in ${
                        product.color
                      } total units ${product.quantity} cost = ${
                        product.price * product.quantity
                      }`}
                      title={`${product.name} in ${product.color} total units ${
                        product.quantity
                      } cost = ${product.price * product.quantity}`}
                    >
                      <Image src={product.imgUrl} alt={product.name} />
                    </Link>
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <ProductColor
                        color={product.color}
                        title={product.color}
                        aria-label={product.color}
                      />
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
                    <ProductPrice
                      aria-label="total"
                      title={product.price * product.quantity}
                    >
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            {/* SUMARY COMPONENT */}
            <Summary cart={cart} username={username} />
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
