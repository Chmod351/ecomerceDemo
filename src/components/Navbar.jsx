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
import { publicRequest, username } from '../requestMethods';
import Announcement from './Announcement';
import { useState } from 'react';
import { handleError } from '../utils/toast';

const Container = styled.header`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  height: 5rem;
  shadow-box: ${({ theme }) => theme.bg};
  ${mobile({ height: '8rem' })}
  ${pc({
    maxWidth: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '999',
  })}
`;

const Wrapper = styled.nav`
  max-width: 1200px;
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

const Center = styled.div`
  flex: 1;
  text-align: center;
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 3, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 25px;
  color: ${({ theme }) => theme.text};
  ${mobile({ marginRight: '1rem', fontSize: '1rem' })}
`;
const Item = styled.div`
  font-size: 1rem;
  cursor: pointer;
  ${mobile({ fontSize: '1.4rem', marginLeft: '1rem' })}
`;
const Username = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 400;
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const quantity = useSelector((state) => state.cart.quantity);
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
      <Announcement />
      <Wrapper>
        <Left role="navigation">
          <Item
            name="theme"
            value={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            tabIndex="0"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setDarkMode(!darkMode);
              }
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness2 />}
          </Item>
        </Left>
        <Center role="banner">
          <SearchContainer>
            <label>Search</label>
            <Input
              placeholder=""
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              tabIndex="0"
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  SearchProduct(e);
                }
              }}
            />
            <label
              onClick={SearchProduct}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  SearchProduct(e);
                }
              }}
              tabIndex="0"
            >
              Submit
            </label>
          </SearchContainer>
        </Center>
        <Right>
          {username ? (
            <Link to="/cart" style={{ textDecoration: 'none' }} tabIndex="5">
              <Username>{username}</Username>
            </Link>
          ) : (
            <Right role="navigation">
              <Link
                to="/register"
                style={{ textDecoration: 'none' }}
                tabIndex="0"
              >
                <MenuItem>SignUp</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }} tabIndex="6">
                <MenuItem>Login</MenuItem>
              </Link>
            </Right>
          )}

          <Link to="/cart" style={{ textDecoration: 'none' }} tabIndex="7">
            <MenuItem>
              {quantity > 0 ? (
                <Badge
                  badgeContent={quantity}
                  color="primary"
                  overlap="rectangular"
                >
                  <ShoppingCart />
                </Badge>
              ) : (
                <Badge
                  badgeContent={quantity}
                  color="primary"
                  overlap="rectangular"
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
          placeholder="Search"
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
