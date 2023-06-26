import styled from 'styled-components';
import { pc } from '../responsive';

const Container = styled.section`
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
      <Title
        role="complementary"
        title="Free shipping on orders over $50!"
        aria-label="Free shipping on orders over $50!"
      >
        Free shipping on orders over $50!
      </Title>
    </Container>
  );
};

export default Announcement;
