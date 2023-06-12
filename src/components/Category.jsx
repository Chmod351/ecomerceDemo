import styled from 'styled-components';
import { categories } from '../data';
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';

const Container = styled.section`
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Wrapper = styled.div`
  display: flex;
  padding: 1.25rem;
  justify-content: space-between;
  max-width: 1200px;
  display-items: center;
  margin: auto;
  ${mobile({ padding: '0rem', flexDirection: 'column' })}
`;

const Categories = () => {
  return (
    <Container id='Specials'>
      <Wrapper>
        {categories.map((item) => (
          <CategoryItem item={item} key={item._id} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Categories;
