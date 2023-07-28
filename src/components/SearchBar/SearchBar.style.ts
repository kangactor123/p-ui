import { Theme, css } from '@emotion/react';

export const searchBarStyle = (theme: Theme) => css`
  background-color: ${theme.palette.greyScale.grey5};
  input {
    padding: unset;
  }
  input::placeholder {
    color: ${theme.palette.text.grey70};
  }
`;

export const iconStyle = css`
  margin-right: 12px;
`;
