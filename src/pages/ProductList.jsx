import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { color, size, price } from '../data/colorData';
import Footer from '../components/Footer';
import Filter from '../components/Filter';

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
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
