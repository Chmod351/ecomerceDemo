import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile} from '../responsive';

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

const Title = styled.h1`
  color: white;
  margin-bottom: 1.25rem;
  
`;

const Button = styled.button`
  border: none;
  padding: 0.625rem;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  
`;
//seasson sales
const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link
        to={`/products/${item.tags}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
