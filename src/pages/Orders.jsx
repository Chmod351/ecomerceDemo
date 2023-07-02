import { useEffect, useState } from 'react';
import Loading from './Loading.jsx';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { formatCreatedAt, getOrders } from '../utils/endpointsLogic';

const Container = styled.section`
  margin: 0.5rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: grid;
  margin: 1.1rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.2rem;
  ${mobile({ gridTemplateColumns: '1fr', gap: '0' })}
`;

const Cell = styled.div`
  background-color: ${({ theme }) => theme.soft};
  padding: 0.5rem;
`;
const Info = styled.p`
  font-size: 1rem;
`;
const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;
const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orders = async () => {
      const res = await getOrders(userId);
      setOrders(res.data);
    };
    orders();
  }, [userId]);
  return (
    <Container>
      {orders ? (
        <>
          {orders.map((order) => {
            return (
              <Wrapper key={order._id}>
                <Cell
                  aria-label={`Order: ${order._id}`}
                  title={`Order: ${order._id}`}
                >
                  <Label>Order:</Label>
                  <Info>{order._id} </Info>
                </Cell>
                <Cell
                  aria-label={`Status: ${order.shippingStatus}`}
                  title={`Status: ${order.shippingStatus}`}
                >
                  <Label>Status:</Label>
                  <Info>{order.shippingStatus}</Info>
                </Cell>
                <Cell
                  aria-label={`Total: ${order.amount}`}
                  title={`Total: ${order.amount}`}
                >
                  <Label>Total:</Label>
                  <Info>$ {order.amount}</Info>
                </Cell>
                <Cell
                  aria-label={`Created : ${formatCreatedAt(order.createdAt)}`}
                  title={`Created: ${formatCreatedAt(order.createdAt)}`}
                >
                  <Label>Created :</Label>
                  <Info>{formatCreatedAt(order.createdAt)}</Info>
                </Cell>
              </Wrapper>
            );
          })}
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default Orders;
