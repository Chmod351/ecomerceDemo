import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';
import ButtonElement from '../components/Button';

const Container = styled.article`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ width: '90vw' })}
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
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 1;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Container}:hover & {
    opacity: 0;
  }
  ${Container}:focus & {
    opacity: 0;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Link
      to={`/products/${item.tags}`}
      style={{ textDecoration: 'none', color: 'black' }}
      role="link"
    >
      <Container id={item.tags} tabIndex="0" role="article">
        <Image
          role="img"
          src={item.img}
          alt={item.alt}
          title={item.alt}
          aria-label={item.alt}
        />
        <Overlay>
          <Info role="contentinfo">
            <Title title={item.title} aria-label={item.title}  >
              {item.title}
            </Title>
            <ButtonElement 

              text={'SHOP NOW'}
              title="SHOP NOW"
              aria-label="SHOP NOW"
            />
          </Info>
        </Overlay>
      </Container>
    </Link>
  );
};

export default CategoryItem;
