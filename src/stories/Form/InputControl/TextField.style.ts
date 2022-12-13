import { css } from '@emotion/react';

export const textFieldStyle = css`
  & input {
    height: 22px;
    font-size: 14px;
    color: #323338;
  }

  & input::placeholder {
    color: #676879;
  }
`;

export const iconButtonCss = css`
  width: 20px;
  height: 20px;
  padding: 0;

  &.MuiButtonBase-root.MuiIconButton-root {
    width: 20px;
    height: 20px;
    padding: 0;
  }
`;
