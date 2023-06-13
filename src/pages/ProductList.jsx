import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const Container = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin: 1.25rem;
`;

const FilterContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 1.25rem;
  ${mobile({ width: '0rem 1.25rem', display: 'flex', flexDirection: 'column' })}
`;

const FilterText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 1.25rem;
  color: ${({ theme }) => theme.text};
  ${mobile({ marginRight: '0rem' })}
`;

const Select = styled.select`
  text-align: center;
  border: none;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.hover};
  color: ${({ theme }) => theme.bg};
  padding: 0.625rem;
  margin-right: 1.25rem;
  ${mobile({ margin: '0.625rem 0rem' })}
`;
const Option = styled.option``;

const ProductList = ({ darkMode, setDarkMode }) => {
  const [tags, setTags] = useState('');
  const [query, setQuery] = useState('');
  const location = useLocation();
  const route = location.pathname.split('/');

  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    if (route[1] === 'search') {
      setQuery(route[2]);
    } else {
      setTags(route[2]);
    }
  }, [route]);

  const handleFilters = (e) => {
    const value = e.target.value;
    value === 'All'
      ? setFilters(null)
      : setFilters({
          ...filters,
          [e.target.name]: value,
        });
  };

  return (
    <Container>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Title>{tags}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>All</Option>
            <Option>black</Option>
            <Option>white</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products tag={tags} filters={filters} sort={sort} query={query} />
      <Newsletter />
    </Container>
  );
};

export default ProductList;
