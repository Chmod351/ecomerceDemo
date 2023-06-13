import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import { pc } from '../responsive';
const Container = styled.header`
  height: 1.875rem;
  background-color: ;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  ${pc({ maxWidth: '100vw' })}
  background-color: ${({ theme }) => theme.bg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
`;
const Announcement = () => {
  return (
    <Container role="banner">
      <Link to="/" style={{ textDecoration: 'none' }} tabIndex="0">
        <Title> Cierva Design</Title>
      </Link>
    </Container>
  );
};

export default Announcement;
