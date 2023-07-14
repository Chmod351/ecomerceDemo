import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { sliderItems } from '../utils/data/sliderData';
import { mobile } from '../responsive';
import ButtonElement from '../components/ui/Button';

const Container = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: '90vh'})}
`;

const Arrow = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  &:focus {
    background-color: ${({ theme }) => theme.bgLighter};
    border: 5px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  ${mobile({ flexDirection: 'column' })}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  ${mobile({ width: '100vw' })}
`;

const Image = styled.img`
  height: 80%;
  width: 50vw;
  object-fit: contain;
  ${mobile({ width: '100vw', height: '20rem' })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 3rem;
`;

const Title = styled.h2`
  font-size: 4rem;
  ${mobile({ fontSize: '2.3rem', margin: '-2rem auto auto auto' })}
`;

const Desc = styled.p`
  margin: 2rem 0rem;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'Pangolin', cursive;
  letter-spacing: 3px;
  ${mobile({ fontSize: '0.8rem', margin: '0.5rem 0rem' })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container id="Home" role="slider">
      {/* left */}
      <Arrow
        role="figure"
        title="Previous"
        aria-label="move the slider to left"
        tabIndex="0"
        direction="left"
        onClick={() => handleClick('left')}
        aria-hidden="true"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleClick('left');
          }
        }}
      >
        <ArrowLeftOutlined aria-label="left" />
      </Arrow>
      <Wrapper slideIndex={slideIndex} tabIndex="-1" role="main">
        {sliderItems.map((item) => (
          <Slide key={item.id} tabIndex="-1" role="sliderItems">
            <ImgContainer
              tabIndex="-1"
              role="img"
              title={item.alt}
              aria-label={item.alt}
            >
              <Link to={item.url} tabIndex="-1" role="link">
                <Image src={item.img} alt={item.alt} tabIndex="-1" role="img" />
              </Link>
            </ImgContainer>
            <InfoContainer aria-label={item.desc} tabIndex="-1">
              <Title
                tabIndex="-1"
                aria-label={item.title}
                title={item.title}
                role="feed"
              >
                {item.title}
              </Title>
              <Desc
                tabIndex="-1"
                aria-label={item.desc}
                title={item.desc}
                role="contentinfo"
              >
                {item.desc}
              </Desc>
              <Link
                style={{ textDecoration: 'none' }}
                role="link"
                to={item.url}
                tabIndex="-1"
                title="Shop NOW"
                aria-label="SHOP NOW"
              >
                <ButtonElement tabIndex="-1" text={'SHOP NOW'} />
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      {/* rigth */}
      <Arrow
        role="figure"
        title="Next"
        aria-label="move the slider to right"
        tabIndex="0"
        direction="right"
        onClick={() => handleClick('right')}
        aria-hidden="true"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleClick('right');
          }
        }}
      >
        <ArrowRightOutlined aria-label="right" />
      </Arrow>
    </Container>
  );
};

export default Slider;
