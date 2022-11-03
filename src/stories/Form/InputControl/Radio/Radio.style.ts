import { css } from '@emotion/react';

export const icon = css`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px #8995ae, inset 0 -1px 0 #8995ae;
  background-color: rgba(255, 255, 255, 0.5);
  & .Mui-focusVisible {
    outline: 2px auto rgba(19, 124, 189, 0.6);
    outline-offset: 2;
  }
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background-image: radial-gradient(#fff, #fff 28%, transparent 32%);
    content: '';
  }
`;

export const disabledIcon = css`
  opacity: 0.4;
`;

export const checkedIcon = css`
  background-color: #4285f4;
  box-shadow: inset 0 0 0 1px #4285f4, inset 0 -1px 0 #4285f4;
`;

export const disabledCheckedIcon = css`
  background-color: rgba(56, 58, 63, 0.6);
  box-shadow: inset 0 0 0 1px #6d738166, inset 0 -1px 0 #6d738166;
`;
