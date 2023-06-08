import styled from 'styled-components';
import { categories } from '../data';
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  display: flex;
  padding: 1.25rem;
  justify-content: space-between;
  ${mobile({ padding: '0rem', flexDirection: 'column' })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem
          item={item}
          key={item._id}
        />
      ))}
    </Container>
  );
};

export default Categories;
