import styled from 'styled-components';
import { pc } from '../responsive';
const Container = styled.header`
  height: 1.875rem;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  ${pc({ maxWidth: '100vw' })}
`;

const Title = styled.h1`
  color: white;
  font-size: 1rem;
`;
const Announcement = () => {
  return (
    <Container role="banner">
      <a href="/" style={{ textDecoration: 'none' }} tabIndex="0">
        <Title>¡Envío gratuito en pedidos superiores a $50!</Title>
      </a>
    </Container>
  );
};

export default Announcement;
