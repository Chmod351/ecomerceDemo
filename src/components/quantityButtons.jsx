import {Add, Remove} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {addProduct, removeProduct} from '../redux/cartRedux';
import {mobile} from '../responsive';
import {handleSuccess} from '../utils/toast';

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

const QuantityButton = ({ cart, product,index }) => {
  const dispatch = useDispatch();
  const handleRemove = (index) => {
    dispatch(removeProduct(cart.products[index]));
    handleSuccess('removed');
  };

  const handleAdd = (index) => {
    dispatch(addProduct({ ...cart.products[index], quantity: 1 }));
    handleSuccess('added');
  };

  return (
    <ProductAmountContainer>
      <Icon onClick={() => handleAdd(index)} tabIndex="0">
        <Add aria-label="Add" />
      </Icon>
      <ProductAmount>{product.quantity}</ProductAmount>
      <Icon onClick={() => handleRemove(index)} tabIndex="0">
        <Remove aria-label="Remove" />
      </Icon>
    </ProductAmountContainer>
  );
};

export default QuantityButton;
