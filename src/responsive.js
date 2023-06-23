import { css } from 'styled-components';

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 540px) {
      ${props}
    }
  `;
};

export const pc = (props) => {
  return css`
    @media only screen and (min-width: 1020px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 1000px) {
      ${props}
    }
  `;
};
