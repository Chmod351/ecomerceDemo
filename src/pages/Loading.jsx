import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100vh;
`;

export default function Loading() {
  return (
    <Container>
      <ReactLoading
        type="bars"
        color="hsl(211, 27%, 70%)"
        height={300}
        width={100}
      />
    </Container>
  );
}
