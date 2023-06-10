import { css } from 'styled-components';

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 450px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 820px) {
      ${props}
    }
  `;
};
export const pc=(props)=>{
  return css`
  @media only screen and (min-width: 1020px) {
    ${props}
  }
`;
}