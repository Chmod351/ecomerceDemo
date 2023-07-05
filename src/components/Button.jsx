import { Search, ShoppingCart, Payment } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const ButtonElement = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px;
  font-size: 1.2rem;
  color: black;
  background-color: gold;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: yellow;
  }
  &:focus {
    background-color: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
  ${mobile({fontSize: '0.8rem'})}
`;

const Button = ({ text, onClick, onKeyUp, tabIndex }) => {
  const getStatusIcon = (status) => {
    if (status == 'CHECKOUT NOW') {
      return <Payment />;
    } else if (status == 'CONTINUE SHOPPING') {
      return <ShoppingCart />;
    } else if (status == 'SHOP NOW') {
      return <Search />;
    } else if (status == 'LOGIN NOW') {
      return null;
    } else {
      return null;
    }
  };

  return (
    <ButtonElement
      status={text}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyUp={onKeyUp}
      role="button"
      title={text}
      aria-label={text}
    >
      {getStatusIcon(`${text}`)} {text}
    </ButtonElement>
  );
};

export default Button;
