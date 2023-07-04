import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.section`
  width: 20rem;
  height: 10rem;
  background-color: white;
  color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ height: '50vh', width: '80%' })}
`;
const Description = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
  font-weight: bold;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Button = styled.button`
  width: 100%;
  margin: 0.5px auto;
  border: 0.5px solid white;
  padding: 0.938rem 1.25rem;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: white;
    cursor: not-allowed;
  }
`;

const Prompt = ({ text, onClick, setShowPrompt }) => {
  return (
    <Container>
      <Description aria-label={text}>{text}</Description>
      <Buttons>
        <Button onClick={onClick} aria-label="yes">
          Yes
        </Button>
        <Button onClick={setShowPrompt} aria-label="no">
          No
        </Button>
      </Buttons>
    </Container>
  );
};

export default Prompt;
