import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const ProductAmount = styled.div`
  font-size: 1.5rem;
  margin: 0.3125rem;
  ${mobile({ margin: '0.3125rem  0.9375rem' })}
`;

const Icon = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.bg};
  &:hover {
    background-color: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
  &:focus {
    background-color: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

const QuantityButton = ({ add, remove, quantity }) => {
  return (
    <ProductAmountContainer>
      <Icon
        onClick={add}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            add;
          }
        }}
        tabIndex="0"
      >
        <Add aria-label="Add" />
      </Icon>
      <ProductAmount>{quantity}</ProductAmount>
      <Icon
        onClick={remove}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            remove;
          }
        }}
      >
        <Remove aria-label="Remove" />
      </Icon>
    </ProductAmountContainer>
  );
};

export default QuantityButton;
