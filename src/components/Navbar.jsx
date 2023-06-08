import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { username } from '../requestMethods';

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 60px;
  ${mobile({ height: '3.125rem' })}
`;

const Wrapper = styled.div`
  padding: 0rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '0.625rem 0rem' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 0.875rem;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border-bottom: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: none;
  ${mobile({ width: '140px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  ${mobile({ display: 'none' })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 0.875rem;
  cursor: pointer;
  margin-left: 25px;
  color: ${({ theme }) => theme.text};
  ${mobile({ fontSize: '12px', marginLeft: '0.625rem' })}
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link
            to='/'
            style={{ textDecoration: 'none' }}
          >
            <Logo>Cierva Design.</Logo>
          </Link>
        </Center>
        <Right>
          {username ? (
            <Link
              to='/cart'
              style={{ textDecoration: 'none' }}
            >
              {username}
            </Link>
          ) : (
            <Right>
              <Link
                to='/register'
                style={{ textDecoration: 'none' }}
              >
                <MenuItem>Sign Up</MenuItem>
              </Link>
              <Link
                to='/login'
                style={{ textDecoration: 'none' }}
              >
                <MenuItem>Sign In</MenuItem>
              </Link>
            </Right>
          )}
          <Link
            to='/cart'
            style={{ textDecoration: 'none' }}
          >
            <MenuItem>
              <Badge
                badgeContent={quantity}
                color='primary'
                overlap='rectangular'
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          <Item onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light' : 'Dark'}
          </Item>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
