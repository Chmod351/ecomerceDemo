import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AccessTime,
  Check,
  CancelOutlined,
  HowToReg,
  CalendarTodayOutlined,
  ShoppingBasket,
  Payment,
  Delete,
} from '@material-ui/icons';

import { mobile } from '../responsive';
// utils
import { formatCreatedAt, getOrders, deleteOrder } from '../utils/logic/orders';
import { statusData } from '../utils/data/colorData.js';
//ui
import Loading from '../components/ui/Loading.jsx';
import SadFaceMsg from '../components/ui/SadFaceMsg.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import Filter from '../components/ui/Filter.jsx';
import Prompt from '../components/ui/Prompt.jsx';

const Container = styled.section`
  margin: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: grid;
  margin: 1.1rem;
  grid-template-columns: auto repeat(4, 1fr);
  gap: 0.2rem;
  ${mobile({ gridTemplateColumns: '1fr', gap: '0' })}
`;

const Cell = styled.div`
  padding: 0.7rem;
  background-color: ${({ theme, status }) =>
    status == 'pendiente'
      ? theme.orange // naranja para 'pendiente'
      : status == 'recibido'
      ? theme.lightGreen // Verde para 'recibido'
      : status == 'enviado'
      ? theme.darkBlue // azul  para 'enviado'
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

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: ${({ theme }) => theme.bg};
  border: 0.1px solid ${({ theme }) => theme.hover};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 0.1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [isOrderDeleted, setIsOrderDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [ordersLoad, setOrdersLoad] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders(userId, setOrdersLoad);
      setOrders(res.data);
      setIsOrderDeleted(false);
    };
    fetchOrders();
  }, [userId, isOrderDeleted, selectedStatus]);

  useEffect(() => {
    const pageCount = Math.ceil(orders.length / 8);
    setTotalPages(pageCount);
  }, [orders]);

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

  const handleDeleteOrder = async (idOrder) => {
    const res = await deleteOrder(idOrder);
    setIsOrderDeleted(true);
    return res;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Calcular el índice de inicio y fin para los pedidos de la página actual
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;

  // Obtener los pedidos de la página actual
  const filteredOrders = selectedStatus
    ? orders.filter((o) => o.shippingStatus == selectedStatus)
    : orders;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <Container>
      {/* if ordersLoad is true  loading component will show up */}
      {ordersLoad ? (
        <>
          {/* IF Orders HAS MORE THAN 4 WILL SHOW THE FILTER COMPONENT */}
          {orders.length > 4 ? (
            <Filter
              text={'Status'}
              name={'Status'}
              onChange={handleStatusChange}
              obj={statusData}
              prop={'Status'}
            />
          ) : null}
          {currentOrders.map((order) => {
            return (
              <Wrapper key={order._id}>
                <Cell>
                  <Icon
                    title="Delete Order"
                    aria-label="Delete order"
                    onClick={() => setShowPrompt(!showPrompt)}
                    tabIndex="0"
                  >
                    <Delete />
                  </Icon>
                </Cell>
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
                {showPrompt && (
                  <Prompt
                    text={'Do you want detele this order?'}
                    onClick={() => handleDeleteOrder(order._id)}
                    setShowPrompt={() => setShowPrompt(!showPrompt)}
                  />
                )}
              </Wrapper>
            );
          })}
        </>
      ) : (
        <Loading />
      )}
      {orders.length === 0 ? (
        <SadFaceMsg text={'No Orders Found'} />
      ) : (
        <Pagination
          filteredProducts={currentOrders}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default Orders;
