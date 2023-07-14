import styled from 'styled-components';
import { mobile } from '../../responsive';

const FilterText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 1.25rem;
  color: ${({ theme }) => theme.text};
  ${mobile({ marginRight: '0rem' })}
`;

const Select = styled.select`
  text-align: center;
  border: none;
  background-color: ${({ theme }) => theme.hover};
  color: ${({ theme }) => theme.bg};
  padding: 0.625rem;
  margin-right: 1.25rem;
  ${mobile({ margin: '0.625rem 0rem' })}
`;

const Option = styled.option`

`;

const Filter = ({ text, name, onChange, obj, prop }) => {
  return (
    <>
      <FilterText aria-label={text} title={text}>
        {text}
      </FilterText>
      <Select name={name} onChange={onChange} title={prop} aria-label={prop}>
        <Option disabled>{prop}</Option>
        {obj.map((c) => {
          return (
            <Option
              key={c.id}
              tabIndex="0"
              value={c.value}
              aria-label={c.value}
              title={c.value}
            >
              {c.prop}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default Filter;
