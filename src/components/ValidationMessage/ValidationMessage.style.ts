import { css } from '@emotion/react';

export const helperStyle = css`
  width: 100%;
  min-width: 250px;
  margin-top: 5px;
  display: flex;

  align-items: center;
  gap: 8px;

  & .msg {
    line-height: 22px;
    font-weight: 400;
    font-size: 14px;
  }

  & .err {
    color: #d83a52;
  }

  & .success {
    color: #007e2b;
  }
`;
