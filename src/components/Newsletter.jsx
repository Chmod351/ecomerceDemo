import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.section`
  height: 60vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 4.375rem;
  margin-bottom: 1.25rem;
  ${mobile({ fontSize: '2.5rem' })}
`;

const Desc = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1.25rem;
  ${mobile({ textAlign: 'center', fontSize: '1.3rem' })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 2.5rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '90%' })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 1.25rem;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" type="email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
