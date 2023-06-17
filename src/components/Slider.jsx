import {useEffect} from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import { sliderItems } from '../data/sliderData';
import { mobile } from '../responsive';
import SetNewItem from '../utils/sliderLogic';
const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: 'none' })}
`;

const Wrapper = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: auto;
  transition: all 1.5s ease;
`;

const Slide = styled.div`
  width: 100%;
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
  width: 100%;
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
  const [currentItem, setCurrentItem] = useState([]);

  useEffect(() => {
    SetNewItem(setCurrentItem);
  }, []);
  return (
    <Container tabIndex="8" id="Home">
      <Wrapper>
        <Slide bg={currentItem.bg} key={currentItem.id}>
          <ImgContainer>
            <Image src={currentItem.img} alt={currentItem.alt} />
          </ImgContainer>
          <InfoContainer>
            <Title>{currentItem.title}</Title>
            <Desc>{currentItem.desc}</Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
    </Container>
  );
};

export default Slider;
