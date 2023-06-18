
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.article`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: '25rem' })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 1.25rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Container}:hover & {
    opacity: 0;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  color: black;
  background-color: gold;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: yellow;
  }
}`;

const CategoryItem = ({ item }) => {
  return (
    <Container id={item.tags}>
      <Image src={item.img} />
      <Overlay>
        <Link
          to={`/products/${item.tags}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
          </Info>
        </Link>
      </Overlay>
    </Container>
  );
};

export default CategoryItem;

