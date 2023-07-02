import { useEffect, useState } from 'react';
import Loading from './Loading.jsx';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { formatCreatedAt, getOrders } from '../utils/endpointsLogic';
import {
  AccessTime,
  Check,
  CancelOutlined,
  HowToReg,
  CalendarTodayOutlined,
  ShoppingBasket,
  Payment,
} from '@material-ui/icons';
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
  padding: 0.7rem;
  background-color: ${({ theme, status }) =>
    status == 'pendiente'
      ? theme.orange // naranja para 'pendiente'
      : status == 'recibido'
      ? theme.lightGreen // Verde clarito para 'recibido'
      : status == 'enviado'
      ? theme.darkBlue // azul fuerte para 'enviado'
      : status == 'rechazado'
      ? theme.red // Rojo para 'rechazado'
      : theme.soft};

`;
const Info = styled.p`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem auto;
  align-items: center;
  text-align: center;
`;
const Label = styled.label`
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  text-align: center;
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

  const getStatusIcon = (status) => {
    if (status == 'pendiente') {
      return <AccessTime />;
    } else if (status == 'rechazado') {
      return <CancelOutlined />;
    } else if (status == 'recibido') {
      return <HowToReg />;
    } else {
      return <Check />;
    }
  };

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
                  <Label>
                    Order: <ShoppingBasket />
                  </Label>
                  <Info>{order._id} </Info>
                </Cell>
                <Cell
                  status={order.shippingStatus}
                  aria-label={`Status: ${order.shippingStatus}`}
                  title={`Status: ${order.shippingStatus}`}
                >
                  <Label>Status:</Label>
                  <Info>
                    {order.shippingStatus} {getStatusIcon(order.shippingStatus)}
                  </Info>
                </Cell>
                <Cell
                  aria-label={`Total: ${order.amount}`}
                  title={`Total: ${order.amount}`}
                >
                  <Label>
                    Total: <Payment />
                  </Label>
                  <Info>$ {order.amount}</Info>
                </Cell>
                <Cell
                  aria-label={`Created : ${formatCreatedAt(order.createdAt)}`}
                  title={`Created: ${formatCreatedAt(order.createdAt)}`}
                >
                  <Label>Created :</Label>
                  <Info>
                    {formatCreatedAt(order.createdAt)} <CalendarTodayOutlined />
                  </Info>
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
