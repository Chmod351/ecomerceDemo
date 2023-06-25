import styled from 'styled-components';

const ButtonElement = styled.button`
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
  &:focus {
    background-color: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
  }
`;

const Button = ({ text }) => {
  return <ButtonElement tabIndex="0">{text}</ButtonElement>;
};

export default Button;
