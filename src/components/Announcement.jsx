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
const Announcement = ({ text , link}) => {
  return (
    <Container role="banner">
      <a href={link} style={{ textDecoration: 'none' }} tabIndex="0">
        <Title>{text}</Title>
      </a>
    </Container>
  );
};

export default Announcement;
