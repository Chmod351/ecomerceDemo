import { Badge } from '@material-ui/core';
import {
  Search,
  ShoppingCartOutlined,
  ShoppingCart,
  Brightness7,
  Brightness2,
} from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile, pc } from '../responsive';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { useState } from 'react';
import { handleError } from '../utils/toast';

const Container = styled.header`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  height: 6rem;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  ${mobile({ height: '8rem' })}
  ${pc({
    maxWidth: '100vw',
  })}
`;

const Wrapper = styled.nav`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 0rem 1.25rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  ${mobile({ margin: 'auto' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border-bottom: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  ${mobile({ display: 'none' })}
`;

const SearchContainerMobile = styled.div`
  border-bottom: 0.5px solid lightgray;
  align-items: center;
  margin: 5px;
  display: none;
  ${mobile({ display: 'flex', flexDirection: 'row' })};
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: none;
  width: 100%;
  ${mobile({ padding: '10px' })};
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 3, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 25px;
  color: ${({ theme }) => theme.text};
  ${mobile({ marginRight: '1rem', fontSize: '1rem' })}
`;
const Item = styled.div`
  font-size: 1rem;
  margin: 1rem;
  cursor: pointer;
  ${mobile({ fontSize: '1.4rem', marginLeft: '1rem' })}
`;
const Username = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 400;
`;
const Label = styled.label`
  padding: 0.1rem 0.3rem;
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
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const username = useSelector((state) => state.user.username);
  const [query, setQuery] = useState('');

  const history = useHistory();

  const SearchProduct = async (e) => {
    e.preventDefault();
    try {
      const product = await publicRequest.get(`/product/search?q=${query}`);
      if (product.data.length === 1) {
        const firstProduct = product.data[0];
        history.push(`/product/${firstProduct._id}`);
      } else {
        history.push(`/products/search/${query}`);
      }
    } catch (error) {
      handleError(error);
    }
    setQuery('');
  };

  return (
    <Container>
      <Wrapper>
        <Left role='navigation'>
          <label
            onClick={() => setDarkMode(!darkMode)}
            tabIndex='0'
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setDarkMode(!darkMode);
              }
            }}
          >
            {darkMode ? 'Dark' : 'Light'}
          </label>
          <Item
            name='theme'
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            tabIndex='0'
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setDarkMode(!darkMode);
              }
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness2 />}
          </Item>
          <SearchContainer>
            <Input
              placeholder='Buscar'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              tabIndex='0'
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  SearchProduct(e);
                }
              }}
            />
            <Label
              onClick={SearchProduct}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  SearchProduct(e);
                }
              }}
              tabIndex='0'
            >
              Submit
            </Label>
          </SearchContainer>
        </Left>
        <Right>
          {username ? (
            <>
              <Link
                to='/auth'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Inicio</MenuItem>
              </Link>
              <Link
                to='/auth'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Deseados</MenuItem>
              </Link>
              <Link
                to='/cart'
                style={{ textDecoration: 'none' }}
                tabIndex='5'
              >
                <Link
                  to='/auth'
                  style={{ textDecoration: 'none' }}
                  tabIndex='0'
                >
                  <MenuItem>Categorias</MenuItem>
                </Link>
                <Link
                  to='/auth'
                  style={{ textDecoration: 'none' }}
                  tabIndex='0'
                >
                  <MenuItem>Productos</MenuItem>
                </Link>
                <Link
                  to='/auth'
                  style={{ textDecoration: 'none' }}
                  tabIndex='0'
                >
                  <MenuItem>Accesorios</MenuItem>
                </Link>
                <Username>{username}</Username>
              </Link>
            </>
          ) : (
            <Right role='navigation'>
              <Link
                to='/auth'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Categorias</MenuItem>
              </Link>
              <Link
                to='/auth'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Productos</MenuItem>
              </Link>
              <Link
                to='/auth'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Accesorios</MenuItem>
              </Link>

              <Link
                to='/'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Inicio</MenuItem>
              </Link>
              <Link
                to='/auth'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Deseados</MenuItem>
              </Link>
              <Link
                to='/auth'
                style={{ textDecoration: 'none' }}
                tabIndex='0'
              >
                <MenuItem>Login</MenuItem>
              </Link>
            </Right>
          )}

          <Link
            to='/cart'
            style={{ textDecoration: 'none' }}
            tabIndex='0'
          >
            <MenuItem>
              {quantity > 0 ? (
                <Badge
                  badgeContent={quantity}
                  color='primary'
                  overlap='rectangular'
                >
                  <ShoppingCart />
                </Badge>
              ) : (
                <Badge
                  badgeContent={quantity}
                  color='primary'
                  overlap='rectangular'
                >
                  <ShoppingCartOutlined />
                </Badge>
              )}
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>

      <SearchContainerMobile>
        <Input
          placeholder='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search
          style={{ color: 'gray', fontSize: 35 }}
          onClick={SearchProduct}
        />
      </SearchContainerMobile>
    </Container>
  );
};

export default Navbar;
