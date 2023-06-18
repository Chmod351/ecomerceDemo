import { Badge } from '@material-ui/core';
import {
  Search,
  ShoppingCartOutlined,
  ShoppingCart,
  Brightness7,
  Brightness2,
  MenuRounded,
} from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile, pc } from '../responsive';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { useState } from 'react';
import { handleError } from '../utils/toast';
import { e } from '../data/navbarData';

const Container = styled.header`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  height: 6rem;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  ${mobile({
    height: '4rem',
    position: 'fixed',
    zIndex: '999',
    width: '100vw',
  })}
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
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  position: relative;
  ${mobile({ display: 'none' })}
`;
const SearchLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text};
  transform: scaleX(0);
`;

const SearchContainerMobile = styled.div`
  border-bottom: 0.5px solid lightgray;
  align-items: center;
  max-width: 100%;
  margin: 5px;
  display: none;
  padding-bottom: 4px;
  ${mobile({ display: 'flex', flexDirection: 'row' })};
  ${pc({ display: 'none' })}
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: none;
  outline: none;
  width: 100%;
  &:focus + ${SearchLine} {
    transform: scaleX(1);
  }
  ${mobile({ padding: '10px' })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ display: 'none' })}
`;

const MenuItem = styled.div`
  ${mobile({ marginRight: '1rem', fontSize: '1rem' })}
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 25px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.hover};
    transition: width 0.3s ease-in-out;
  }

  &:hover:after {
    width: 100%;
  }
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
const MenuDropdownContainer = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  top: 100%;
  background-color: ${({ theme }) => theme.bg};
  z-index: 999;
  transition: 1s ease-in-out;
  ${pc({ display: 'none' })}
`;
const MenuDropdown = styled.div`
  display: flex;
  margin: auto;
  font-weight: bold;
  text-transform: uppercase;
  justify-content: space-evenly;
  align-item: center;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  ${pc({ display: 'none' })}
`;

const DarkLabel = styled.label`
  ${mobile({ display: 'none' })}
`;
const MenuIconMobile = styled.div`
  ${pc({ display: 'none' })}
`;
const Navbar = ({ darkMode, setDarkMode }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const username = useSelector((state) => state.user.username);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <Left role="navigation">
          <MenuIconMobile>
            <MenuRounded
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ cursor: 'pointer' }}
            />
          </MenuIconMobile>

          <DarkLabel
            onClick={() => setDarkMode(!darkMode)}
            tabIndex="0"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setDarkMode(!darkMode);
              }
            }}
          >
            {darkMode ? 'Dark' : 'Light'}
          </DarkLabel>
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
          <SearchContainer>
            <Input
              placeholder="Search Products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              tabIndex="0"
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
              tabIndex="0"
            >
              Submit
            </Label>
          </SearchContainer>
          <SearchContainerMobile>
            <Input
              autoComplete="true"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search
              style={{ color: 'gray', fontSize: 35 }}
              onClick={SearchProduct}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  SearchProduct(e);
                }
              }}
            />
            <SearchLine />
            <Link to="/cart" style={{ textDecoration: 'none' }} tabIndex="0">
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
          </SearchContainerMobile>
        </Left>
        <Right>
          {/* USER EXISTS? */}
          {username ? (
            <>
              {e.map((i) => {
                const { id, route, name } = i;
                return (
                  <Link
                    key={id}
                    to={route}
                    style={{ textDecoration: 'none' }}
                    tabIndex="0"
                  >
                    <MenuItem>{name}</MenuItem>
                  </Link>
                );
              })}
              <Username>{username}</Username>
            </>
          ) : (
            <>
              {e.map((i) => {
                const { id, route, name } = i;
                return (
                  <Link
                    key={id}
                    to={route}
                    style={{ textDecoration: 'none' }}
                    tabIndex="0"
                  >
                    <MenuItem>{name}</MenuItem>
                  </Link>
                );
              })}
              <Link to="/auth" style={{ textDecoration: 'none' }}>
                <MenuItem>Login</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart" style={{ textDecoration: 'none' }} tabIndex="0">
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
        {/* MOBILE NAVBAR */}
        {isMenuOpen && (
          <MenuDropdownContainer>
            <MenuDropdown>
              {username ? (
                <>
                  {e.map((i) => {
                    const { id, route, name } = i;
                    return (
                      <Link
                        key={id}
                        to={route}
                        style={{ textDecoration: 'none' }}
                        tabIndex="0"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                      >
                        <MenuItem>{name}</MenuItem>
                      </Link>
                    );
                  })}
                  <Username>{username}</Username>
                </>
              ) : (
                <>
                  {e.map((i) => {
                    const { id, route, name } = i;
                    return (
                      <Link
                        key={id}
                        to={route}
                        style={{ textDecoration: 'none' }}
                        tabIndex="0"
                      >
                        <MenuItem>{name}</MenuItem>
                      </Link>
                    );
                  })}
                  <Link to="/auth" style={{ textDecoration: 'none' }}>
                    <MenuItem>Login</MenuItem>
                  </Link>
                </>
              )}
            </MenuDropdown>
          </MenuDropdownContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
