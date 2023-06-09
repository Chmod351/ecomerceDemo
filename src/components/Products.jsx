import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { mobile } from '../responsive';
import { BASE_URL } from '../requestMethods';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ alignItems: 'center', justifyContent: 'center' })}
`;

const Products = ({ tag, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
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
        console.log(error)
      }
    };
    getProducts();
  }, [tag]);

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

  return (
    <Container>
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
    </Container>
  );
};

export default Products;
