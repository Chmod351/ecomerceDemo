import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sliderItems } from '../data/sliderData';
import { mobile } from '../responsive';
import ButtonElement from '../components/Button';

const Container = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: '90vh', marginTop: '3rem' })}
`;

const Arrow = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.bg};
  border-radius: 50%;
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
  ${mobile({ width: '100vw', height: '20rem' })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 3rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  ${mobile({ fontSize: '2.3rem', margin: '-2rem auto auto auto' })}
`;

const Desc = styled.p`
  margin: 2rem 0rem;
  font-size: 1.2rem;
  font-weight: 500;
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
    <Container id="Home">
      <Arrow direction="left" onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Link to={item.url}>
                <Image src={item.img} alt={item.alt} />
              </Link>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to={item.url}>
                <ButtonElement text={'SHOP NOW'} />
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
