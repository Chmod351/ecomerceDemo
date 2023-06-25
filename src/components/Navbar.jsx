import { Badge } from '@material-ui/core';
import {
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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { e } from '../data/navbarData';
import SearchBar from './searchBar';

const Container = styled.header`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  height: 6rem;
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  ${mobile({
    top: '0',
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
  display: flex;
  align-items: center;
  ${pc({ flex: '1' })}
  ${mobile({ justifyContent: 'center', maxWidth: '100vw', width: '100%' })}
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
  display: none;
  ${mobile({ display: 'flex' })}
`;
const Navbar = ({ darkMode, setDarkMode }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const username = useSelector((state) => state.user.username);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {/* SEARCH BAR */}
          <SearchBar />
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
                      >
                        <MenuItem onClick={() => setIsMenuOpen(!isMenuOpen)}>
                          {name}
                        </MenuItem>
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
