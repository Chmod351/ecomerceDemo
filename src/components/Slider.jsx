import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { sliderItems } from '../data/sliderData';
import { mobile } from '../responsive';

const Container = styled.section`
  width: 100%;
  height: 100vh;
  margin-top: 3rem;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: 'none' })}
`;

const Arrow = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  background-color: ${({ theme }) => theme.hover};
  color: ${({ theme }) => theme.bgLighter};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '0.625rem'};
  right: ${(props) => props.direction === 'right' && '0.625rem'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const ImgContainer = styled.div`
  height: 500px;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  color: ${({ theme }) => theme.text};
  flex: 1;
  padding: 3.125rem;
`;

const Title = styled.h2`
  font-size: 3rem;
`;

const Desc = styled.p`
  margin: auto;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.text};
  padding: 0.625rem;
  font-size: 1.25rem;
  background-color: teal;
  border: none;
  margin: 0.3rem auto;
  font-weight: bold;
  cursor: pointer;
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
    <Container
      tabIndex='8'
      id='Home'
    >
      <Arrow
        direction='left'
        onClick={() => handleClick('left')}
        tabIndex='9'
      >
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide
            bg={item.bg}
            key={item.id}
          >
            <ImgContainer>
              <Image
                src={item.img}
                alt={item.alt}
              />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow
        direction='right'
        onClick={() => handleClick('right')}
        tabIndex='15'
      >
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
