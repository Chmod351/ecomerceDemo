import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import React from 'react';
import Products from '../components/Products';
import { handleError, handleSuccess } from '../utils/toast';
import Footer from '../components/Footer';

const Container = styled.section`
  display-items: center;

  background-color: ${({ theme }) => theme.bgLighter};
`;

const Wrapper = styled.article`
  max-width: 1200px;
  margin: auto;
  padding: 50px;
  display: flex;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`;

const InfoContainer = styled.div`
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
  width: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 0.5rem;
  margin: 0 1rem;
  border: 2px solid teal;
  background-color: ${({ theme }) => theme.bgLighter};
  cursor: pointer;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.bgLighter};
  }
`;
const Description = styled.p`
  font-size: 1rem;
`;

const Icon = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.bg};
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
      try {
        const res = await publicRequest.get(`/product/${id}`);
        setProduct(res.data);
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      } catch (error) {
        handleError(error);
      }
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
    try {
      dispatch(addProduct({ ...product, quantity, color, size }));
      setQuantity(1);
      handleSuccess('added');
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Container>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Announcement />
      {product ? (
        <>
          <Wrapper>
            <ImgContainer>
              <Image src={product.imgUrl} alt={product.description} />
            </ImgContainer>
            <InfoContainer>
              <Title tabIndex="0">{product.name}</Title>
              <Desc tabIndex="0">{product.hot}</Desc>
              <Description tabIndex="0">{product.description}</Description>
              <Price tabIndex="0">$ {product.price}</Price>
              <FilterContainer>
                <Filter tabIndex="0">
                  <FilterTitle tabIndex="0">{color}</FilterTitle>
                  {product.color.map((c) => (
                    <FilterColor
                      tabIndex="0"
                      color={c}
                      key={c}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </Filter>
                <Filter>
                  <FilterTitle tabIndex="0">Size</FilterTitle>
                  <FilterSize
                    onChange={(e) => setSize(e.target.value)}
                    tabIndex="0"
                  >
                    {product.size.map((s) => (
                      <FilterSizeOption key={s} tabIndex="0">
                        {s}
                      </FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Icon
                    onClick={() => handleQuantity('dec')}
                    tabIndex="0"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleSuccess('desc');
                      }
                    }}
                  >
                    <Remove />
                  </Icon>

                  <Amount>{quantity}</Amount>
                  <Icon
                    onClick={() => handleQuantity('inc')}
                    tabIndex="0"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleQuantity('inc');
                      }
                    }}
                  >
                    <Add />
                  </Icon>
                </AmountContainer>
                <Button
                  onClick={handleClick}
                  tabIndex="0"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleClick();
                    }
                  }}
                >
                  ADD TO CART
                </Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Products tags={product.tags} />
        </>
      ) : (
        ''
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
