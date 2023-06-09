import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { mobile } from '../responsive';
import { BASE_URL } from '../requestMethods';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ alignItems: 'center', justifyContent: 'center' })}
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#333' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin: 0 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};

  &:hover {
    background-color:  ${({ theme }) => theme.hover};;
    color:${({ theme }) => theme.soft};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Products = ({ tag, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  const productAndPages = useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          tag
            ? `${BASE_URL}/product/tag?tag=${tag}&page=${currentPage}&size=${pageSize}`
            : `${BASE_URL}/product?page=${currentPage}&size=${pageSize}`
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [tag, currentPage, pageSize]);

  useEffect(() => {
    tag &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, tag, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    productAndPages;
  };

  return (
    <Container>
      
      <Wrapper>
        {tag
          ? filteredProducts.map((item) => (
              <Product
                item={item}
                key={item._id}
                price={item.price}
              />
            ))
          : products.map((item) => (
              <Product
                item={item}
                key={item._id}
                price={item.price}
              />
            ))}
      </Wrapper>
      {/* Renderizar paginación */}
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </PageButton>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default Products;
