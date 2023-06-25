import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {publicRequest} from '../requestMethods';
import { mobile, pc } from '../responsive';
import { handleError, handleSuccess } from '../utils/toast';

const Container = styled.nav`
  display: flex;
  align-items: center;

  justify-content: center;
  background-color: ${({ theme }) => theme.bg};
  ${pc({ padding: '1rem 0' })};
  ${mobile({ display: 'flex', width: '100%' })};
`;
const SearchContainer = styled.div`
  display: flex;
  padding: 0.6rem 0;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  ${pc({ maxWidth: '800px' })};
`;
const SearchLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text};
  transform: scaleX(0);
  transition: 0.5s ease;
`;
const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.8rem;
  outline: none;
  width: 100%;
  &:focus + ${SearchLine} {
    transform: scaleX(1);
  }
`;
const Label = styled.label`
  padding: 0.7rem;
  border: 0.1px solid transparent;
  cursor: pointer;
  font-weight: bold;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  color: ${({ theme }) => theme.bg};
  background-color: ${({ theme }) => theme.hover};
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
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const SearchProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await publicRequest.get(`/product/search?q=${query}`);
      const products = response.data;
      if (products.length === 1) {
        const firstProduct = products[0];
        history.push(`/product/${firstProduct._id}`);
      } else if (products.length > 1) {
        history.push(`/products/search/${query}`);
      } else {
        handleSuccess('Empty');
      }
    } catch (error) {
      handleError(error);
    }
    setQuery('');
  };

  return (
    <Container>
      <SearchContainer>
        <Input
          placeholder="What are you looking for"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          tabIndex="0"
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              SearchProduct(e);
            }
          }}
        />
        <SearchLine />
        <Label
          onClick={SearchProduct}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              SearchProduct(e);
            }
          }}
          tabIndex="0"
        >
          Search
        </Label>
      </SearchContainer>
    </Container>
  );
};

export default SearchBar;
