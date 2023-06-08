import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { mobile } from '../responsive';

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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          tag
            ? `http://localhost:5000/api/product/tag?tag=${tag}`
            : 'http://localhost:5000/api/product'
        );
        setProducts(res.data);
      } catch (err) {}
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
        : products.slice(0, 8).map((item) => (
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
