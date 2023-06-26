import styled from 'styled-components';
import { mobile } from '../responsive';

const TitleE = styled.h1`
  font-size: 3rem;
  margin: auto;
  display: flex;
  text-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  justify-content: center;
  ${mobile({ fontSize: '2rem', paddingTop: '4rem' })}
`;
const Title = ({ text }) => {
  return <TitleE aria-label={text} title={text}>{text}</TitleE>;
};
export default Title;
