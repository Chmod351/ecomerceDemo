import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined,Brightness7, Brightness2} from '@material-ui/icons';
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

const SearchContainer = styled.div`
  border-bottom: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 5px;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: none;
  ${mobile({ width: '130px' })}
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
  ${mobile({ flex: 3, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 0.875rem;
  cursor: pointer;
  margin-left: 25px;
  color: ${({ theme }) => theme.text};
  ${mobile({ fontSize: '12px', marginRight: '1rem' })}
`;
const Item = styled.div`
  font-size:1rem;
  cursor: pointer;
  ${mobile({ fontSize: '12px', marginLeft: '1rem' })}
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
        <Item onClick={() => setDarkMode(!darkMode)}>
            {darkMode ?   <Brightness7/>: <Brightness2/>}
          </Item>
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
              {/* <Link
                to='/register'
                style={{ textDecoration: 'none' }}
              >
                <MenuItem>Sign Up</MenuItem>
              </Link> */}
              <Link
                to='/login'
                style={{ textDecoration: 'none' }}
              >
                <MenuItem>Login</MenuItem>
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
                <ShoppingCartOutlined  />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
