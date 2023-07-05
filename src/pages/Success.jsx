import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { handleSuccess } from '../utils/toast';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { makeOrder } from '../utils/endpointsLogic';
import { clearCart } from '../redux/cartRedux';
import Button from '../components/Button';

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  font-size: 1.3rem;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = useSelector((state) => state.cart);
  const cartId = location.state.cartId;
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const msgSuccess = `Order has been created successfully. Your order number is ${orderId}`;
  const msgFail = `Something went wrong, your order was not created yet...`;

  useEffect(() => {
    const createOrder = async () => {
      const res = await makeOrder(
        cartId,
        cart.total,
        data.billing_details.address,
      );
      if (res) {
        setOrderId(res);
        dispatch(clearCart());
        handleSuccess('thanks');
      } else {
        setOrderId(null);
      }
    };

    // Se verifica si el ID del pedido es null antes de crear la orden
    if (orderId === null) {
      data && createOrder();
    }
  }, [cart, cartId, data, currentUser, orderId]);

  return (
    <Container
      title={orderId ? msgSuccess : msgFail}
      role="contentinfo"
      aria-label={orderId ? msgSuccess : msgFail}
    >
      {/* Se muestra el mensaje de éxito o error dependiendo del estado del ID del pedido */}
      {orderId ? msgSuccess : msgFail}
      {/* componente Button  */}
      <Link to="/" role="link" style={{ textDecoration: 'none' }}>
        <Button text={'Keep Buying'} />
      </Link>
    </Container>
  );
};

export default Success;
