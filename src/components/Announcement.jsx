import styled from 'styled-components';
import { pc } from '../responsive';
const Container = styled.header`
  height: 1.875rem;
  background-color: ;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: bold;
  ${pc({ maxWidth: '100vw' })}
  background-color: ${({ theme }) => theme.bg};
`;

const Announcement = () => {
  return <Container role="banner">Cierva Design</Container>;
};

export default Announcement;
