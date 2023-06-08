import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.625rem;
  transition: all 0.5s ease;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Price = styled.div`
  font-size: 1.3rem;
  color: black;
  font-weight: 400;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Article = styled.article`
  margin: 5px;
  border-radius:10px;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
`;

const Product = ({ item }) => {
  return (
    <Article>
      <Link
        to={`/product/${item._id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <Container>
          <Circle />
          <Image src={item.imgUrl} />
        </Container>
      </Link>
      <IconContainer>
        <Price>${item.price}</Price>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link
            to={`/product/${item._id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </IconContainer>
    </Article>
  );
};

export default Product;
