import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { handleSuccess } from '../utils/toast';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { makeOrder } from '../redux/apiCalls';
const Button = styled.button`
  padding: 1rem;
  margin-top: 1.2rem;
  background-color: gold;
  font-weight: bold;
  border: none;
`;
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

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      const res = await makeOrder(
        cart.total,
        data.billing_details.address,
        currentUser._id,
        cartId,
      );
      if (res.data._id) {
        setOrderId(res.data._id);
        console.log(res);
        handleSuccess('thanks');
      }
    };
    data && createOrder();
  }, [cart, cartId, data, currentUser]);

  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Something went wrong, your order was not created yet...`}

      <Link to="/">
        <Button>Keep Buying</Button>
      </Link>
    </Container>
  );
};

export default Success;
