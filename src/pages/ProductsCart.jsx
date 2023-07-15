import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { mobile, pc } from '../responsive';
// functions 
import { addProduct, removeProduct } from '../components/redux/cartRedux';
import { handleSuccess } from '../utils/toast';
// ui 
import Pagination from '../components/ui/Pagination';
import SadFaceMsg from '../components/ui/SadFaceMsg';
import QuantityButton from '../components/ui/quantityButtons';
// components 
import Summary from '../components/Summary';




const Container = styled.section``;

const Wrapper = styled.div`
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
  ${mobile({ flexWrap: 'wrap', width: '100vw', padding: '0rem' })}
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
const ProductDescription = styled.span`
  overflow: wrap;
`;
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

const ProductsCarts = ({ cart, username }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cart.products.length / 10);

  const handleRemove = (index) => {
    dispatch(removeProduct(cart.products[startIndex + index]));
    handleSuccess('removed');
  };

  const handleAdd = (index) => {
    dispatch(addProduct({ ...cart.products[startIndex + index], quantity: 1 }));
    handleSuccess('added');
  };

  // get start and end index to calculate current products on page
  let startIndex = (currentPage - 1) * 10;
  let endIndex = startIndex + 10;
  let currentProds =
    cart.products.length < 10
      ? cart.products
      : cart.products.slice(startIndex, endIndex);

  useEffect(() => {
    startIndex = (currentPage - 1) * 10;
    endIndex = startIndex + 10;
    currentProds =
      cart.products.length < 10
        ? cart.products
        : cart.products.slice(startIndex, endIndex);
  }, [cart.products.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      {/* if cart.products has no more than 0 items, message and icon will show up */}
      {cart.products.length > 0 ? (
        <>
          <Wrapper role="list">
            <Info role="complementary">
              {currentProds.map((product, index) => (
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
                      <br></br>
                      <ProductDescription
                        title={product.description}
                        aria-label={product.description}
                      >
                        <b>Description:</b> {product.description}
                      </ProductDescription>
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
          </Wrapper>
          {/* pagination component */}
          {cart.products.length > 8 ? (
            <Pagination
              filteredProducts={currentProds}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </>
      ) : (
        <SadFaceMsg text={'Your Cart Is Empty'} />
      )}
    </Container>
  );
};
export default ProductsCarts;
