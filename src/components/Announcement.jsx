import styled from 'styled-components';
import { pc } from '../responsive';
const Container = styled.div`
  height: 1.875rem;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  ${pc({ maxWidth: '100vw' })}
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Announcement;

