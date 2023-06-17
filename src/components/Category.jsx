import styled from 'styled-components';
import { categories } from '../data/categoriesData';
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';

const Container = styled.section`
  background-color: ${({ theme }) => theme.bg};
  height: auto;
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
      <Wrapper>
        {categories.map((item) => (
          <CategoryItem item={item} key={item._id} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Categories;
