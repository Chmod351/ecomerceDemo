import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
// utils
import { color, size, price } from '../utils/data/colorData';
// components
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
// ui
import Filter from '../components/ui/Filter';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const Container = styled.section`
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  ${mobile({ marginTop: '1.25rem', marginTop: '5rem' })}
`;

const FilterContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Filters = styled.div`
  margin: 1.25rem;
  ${mobile({ width: '0rem 1.25rem', display: 'flex', flexDirection: 'column' })}
`;

const ProductList = ({ darkMode, setDarkMode }) => {
  const [tags, setTags] = useState(null);
  const [query, setQuery] = useState(null);
  const location = useLocation();
  const route = location.pathname.split('/');
  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route[2] === 'search') {
      // if the url[2] has search
      setQuery(route[3]);
    } else {
      setTags(route[2]); // if the url[2] does not have search
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
      <FilterContainer>
        <Filters>
          <Filter
            text={'Filter Products'}
            name={'color'}
            prop={'Color'}
            onChange={handleFilters}
            obj={color}
            value={color.value}
          />
          <Filter
            text={''}
            name={'size'}
            prop={'size'}
            onChange={handleFilters}
            obj={size}
            value={size.value}
          />
        </Filters>
        <Filters>
          <Filter
            text={'Sort Products'}
            name={'sort'}
            onChange={(e) => setSort(e.target.value)}
            prop={'Order'}
            obj={price}
            value={price.value}
          />
        </Filters>
      </FilterContainer>
      <Products tag={tags} filters={filters} sort={sort} query={query} />
     {/*  <Newsletter /> */}
      <Footer />
    </Container>
  );
};

export default ProductList;
