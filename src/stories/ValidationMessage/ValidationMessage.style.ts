import { css } from '@emotion/react';

export const helperStyle = css`
  width: 100%;
  font-size: 14px;
  min-width: 250px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 8px;

  & .msg {
    line-height: 1.67;
  }

  & .err {
    color: #d83a52;
  }

  & .success {
    color: #007e2b;
  }
`;
