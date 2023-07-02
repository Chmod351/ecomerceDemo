import styled from 'styled-components';
import { mobile } from '../responsive';

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
  gap: 0.4rem;
  ${mobile({ gridTemplateColumns: '1fr', gap: '0' })}
`;

const Cell = styled.div`
  background-color: ${({ theme }) => theme.soft};
  padding: 0.5rem;
`;
const Info = styled.p`
  font-size: 1rem;
`;

const Orders = () => {
  return (
    <Container>
      <Wrapper>
        <Cell>
          <Info>Order: 12345678990'123456</Info>
        </Cell>
        <Cell>
          <Info>Status: Pendiente</Info>
        </Cell>
        <Cell>
          <Info>Total: $123345555</Info>
        </Cell>
        <Cell>
          <Info>Langarompa , La Quiaca , La Quiaca 2334, 1234</Info>
        </Cell>
      </Wrapper>
    </Container>
  );
};

export default Orders;
