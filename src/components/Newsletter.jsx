import React from 'react';
import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.section`
  height: 50vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;
const Box = styled.div`
height: 80%;
  display: flex;
  ${mobile({ flexDirection: 'column' })}
flex-direction: column;
  align-items: center;
  justify-content: center;
margin:auto;
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
  max-width: 1200px;
  width: 50%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  justify-content: space-between;
  ${mobile({ width: '90%' })};
`;

const Input = styled.input`
  border: none;
  flex: 8;
  border-bottom: 1px solid lightgrey;
  outline: none;
  padding-left: 1.25rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const Newsletter =React.memo( () => {
  return (
    <Container role="form" aria-label="Newsletter section">
<Box>

      <Title>Newsletter</Title>
      <Desc
        role="complementary"
        aria-label="Get timely updates from your favorite products."
      >
        Get timely updates from your favorite products.
      </Desc>
      <InputContainer role="contentinfo">
        <Input
          placeholder="Your email"
          type="email"
          role="form"
          title="email"
          aria-label="email to subscribe to Newsletter"
        />

        <Button
          role="button"
          title="Subscribe to Newsletter"
          aria-label="Subscribe to Newsletter"
        >
          <Send />
        </Button>
      </InputContainer>

      </Box>
    </Container>
  );
});

export default Newsletter;
