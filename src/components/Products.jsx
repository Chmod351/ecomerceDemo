import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { mobile } from '../responsive';
import { BASE_URL } from '../requestMethods';
import { ArrowLeftRounded, ArrowRightRounded } from '@material-ui/icons';
import { handleError } from '../utils/toast';
import Loading from '../pages/Loading';

const Container = styled.section`
  display-items: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ alignItems: 'center', justifyContent: 'center' })}
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#333' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 1px solid #ccc;
  padding: 0rem 1rem;
  border-radius: 1rem;
  margin: 0 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 'bold';

  &:hover {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.bg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;
const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.bg};
  border: 0.1px solid ${({ theme }) => theme.hover};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

const Products = ({ tag, filters, sort, query }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showPagination, setShowPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        tag
          ? `${BASE_URL}/product/tag?tag=${tag}&page=${currentPage}&size=${pageSize}`
          : query
          ? `${BASE_URL}/product/search?q=${query}&page=${currentPage}&size=${pageSize}`
          : `${BASE_URL}/product?page=${currentPage}&size=${pageSize}`,
      );
      if (res.data.products) {
        setProducts(res.data.products);
      } else if (res.data) {
        setProducts(res.data);
      }
      setTotalPages(res.data.totalPages);
    } catch (err) {
      handleError(err);
    }
  }, [tag, currentPage, pageSize, query]);

  useEffect(async () => {
    await getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (products.length > 0) {
      if (tag || query) {
        const filtered = filters
          ? products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key] ? item[key].includes(value) : false,
              ),
            )
          : products;
        setFilteredProducts(filtered);
        setShowPagination(filtered.length > 8);
      } else {
        setFilteredProducts(products);
        setShowPagination(products.length > 8);
      }
    }
  }, [products, tag, filters, query]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt),
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
      );
    }
  }, [sort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container id="Products">
      {products.length > 0 ? (
        <Wrapper>
          {tag
            ? filteredProducts.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))
            : products.map((product) => (
                <Product
                  product={product}
                  key={product._id}
                  price={product.price}
                />
              ))}
        </Wrapper>
      ) : (
        <Loading />
      )}

      {/* Renderizar paginación */}

      {filteredProducts.length >= 8 && totalPages > 1 ? (
        <PaginationContainer tabIndex="0">
          <Icon
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage - 1);
              }
            }}
            tabIndex="0"
            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
          >
            <ArrowLeftRounded />
          </Icon>

          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
              tabIndex="0"
            >
              {index + 1}
            </PageButton>
          ))}
          <Icon
            onClick={() => handlePageChange(currentPage + 1)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage + 1);
              }
            }}
            tabIndex="0"
            disabled={currentPage === totalPages}
            style={{
              pointerEvents: currentPage === totalPages ? 'none' : 'auto',
            }}
          >
            <ArrowRightRounded />
          </Icon>
        </PaginationContainer>
      ) : (
        <PaginationContainer>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePageChange(currentPage - 1);
              }
            }}
            tabIndex="0"
          >
            Back
          </PageButton>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default Products;
