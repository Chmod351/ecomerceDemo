import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useDispatch } from 'react-redux';
import React from 'react';
import Products from '../components/Products';
import { handleError, handleSuccess } from '../utils/toast';
import Footer from '../components/Footer';
import Loading from './Loading';
import { addProduct } from '../redux/cartRedux';
import QuantityButton from '../components/quantityButtons';
import Button from '../components/Button';
import { addToReduxCart, productById } from '../utils/endpointsLogic';

const Container = styled.section`
  display-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Wrapper = styled.article`
  max-width: 1200px;
  margin: auto;
  padding: 50px;
  display: flex;
  ${mobile({ padding: '10px', flexDirection: 'column', marginTop: '5rem' })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '100%' })}
`;

const InfoContainer = styled.aside`
  color: ${({ theme }) => theme.text};
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 200;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.hover};
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  height: 3rem;
  border: none;
  border-radius: 1rem;
  display: flex;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.hover};
  color: ${({ theme }) => theme.bg};
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`;

const Description = styled.p`
  font-size: 1rem;
`;

const Product = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const res = await productById(id, setProduct, setColor, setSize);
      return res;
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    addToReduxCart(dispatch, setQuantity, product, quantity, color, size);
  };
  return (
    <Container role='contentinfo'>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Announcement />
      {product ? (
        <>
          <Wrapper role='article'>
            <ImgContainer>
              <Image
                title={`${product.name} $ ${product.price}`}
                src={product.imgUrl}
                alt={product.name}
                role='img'
                aria-label={`this is a ${product.name}`}
              />
            </ImgContainer>
            <InfoContainer
              role='complementary'
              aria='complementary info'
            >
              <Title
                tabIndex='0'
                role='complementary'
              >
                {product.name}
              </Title>
              <Desc tabIndex='0'> {product.hot}</Desc>
              <Description
                tabIndex='0'
                role='description'
                aria-label={product.description}
              >
                {product.description}
              </Description>
              <Price tabIndex='0'>$ {product.price}</Price>
              <FilterContainer role='menu'>
                <Filter
                  tabIndex='0'
                  aria-label='color section'
                >
                  <FilterTitle tabIndex='0'></FilterTitle>
                  {product.color.map((c) => (
                    <FilterColor
                      role='list'
                      title={c}
                      aria-label={`color selected = ${c}`}
                      tabIndex='0'
                      color={c}
                      key={c}
                      onClick={() => setColor(c)}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          setColor(c);
                        }
                      }}
                    />
                  ))}
                </Filter>
                <Filter aria-label='size section'>
                  <FilterTitle tabIndex='0'>Size</FilterTitle>
                  <FilterSize
                    title={size}
                    onChange={(e) => setSize(e.target.value)}
                    tabIndex='0'
                  >
                    {product.size.map((s) => (
                      <FilterSizeOption
                        key={s}
                        tabIndex='0'
                        title={s}
                        aria-label={`size is ${s}`}
                      >
                        {s}
                      </FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                {/* add && remove buttons */}
                <QuantityButton
                  add={() => handleQuantity('inc')}
                  remove={() => handleQuantity('dec')}
                  quantity={quantity}
                />
                {/* action button */}
                <Button
                  text='ADD TO CART'
                  onClick={handleClick}
                  tabIndex='0'
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleClick();
                    }
                  }}
                />
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Products tag={product.tags} />
        </>
      ) : (
        <Loading />
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
