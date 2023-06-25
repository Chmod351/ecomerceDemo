import styled from 'styled-components';
import { categories } from '../data/categoriesData';
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';

const Container = styled.section`
  background-color: ${({ theme }) => theme.bg};
  height: auto;
`;
const Title = styled.h1`
  font-size: 3rem;
  margin:auto auto 1rem auto;
  display: flex;
  text-align: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  align-items: center;
  margin: auto;
  background-color: ${({ theme }) => theme.bgLighter};
  ${mobile({ padding: '0rem', flexDirection: 'column' })}
`;

const Categories = () => {
  return (
    <Container id="Categories">
      <Title id="Products">Our Collections</Title>
      <Wrapper>
        {categories.map((item) => (
          <CategoryItem item={item} key={item._id} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Categories;
