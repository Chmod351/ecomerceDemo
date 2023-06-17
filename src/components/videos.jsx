import React from 'react';
import styled from 'styled-components';
import { mobile, pc } from '../responsive';

const Container = styled.section`
  margin-top: 3rem;
  height: 100vh;
  ${mobile({ margin: '0rem 0rem', height: '100%' })}
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100vw;
  margin: auto;
  ${mobile({ height: 'auto' })}
  ${pc({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100vh',
    zIndex: '-1',
  })}
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  ${pc({ maxWidth: '1200px' })};
  ${mobile({ height: '200px', width: '100vw' })}
`;
const Videos = () => {
  return (
    <Container>
      <Wrapper>
        <Iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/108614529?h=b747604bbf&autoplay=1&muted=1&loop=1"
          allowFullScreen
          controls={false}
        ></Iframe>
      </Wrapper>
    </Container>
  );
};

export default Videos;
