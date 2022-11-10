import { css } from '@emotion/react';

export const helperStyle = css`
  width: 100%;
  font-size: 12px;
  padding-right: 50px;
  position: relative;
  padding-right: 40px;
  min-width: 250px;
  margin-top: 10px;

  & .msg {
    line-height: 1.67;
    position: relative;
    left: 17px;
  }
  & .icon {
    margin-right: 5px;
    position: absolute;
    top: 2px;
  }

  & .err {
    color: #ee5a4b;
  }

  & .success {
    color: green;
  }
`;
