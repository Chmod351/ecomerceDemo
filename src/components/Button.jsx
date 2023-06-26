import styled from 'styled-components';

const ButtonElement = styled.button`
  padding: 10px;
  font-size: 1.2rem;
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

const Button = ({ text, onClick, onKeyUp, tabIndex }) => {
  return (
    <ButtonElement
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyUp={onKeyUp}
      role="button"
      title={text}
      aria-label={text}
    >
      {text}
    </ButtonElement>
  );
};

export default Button;
