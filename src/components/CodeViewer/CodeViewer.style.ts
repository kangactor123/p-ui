import { css } from '@emotion/react';

export const wrapperStyle = css`
  width: 100%;
  position: relative;
  max-height: 404px;
  overflow-y: auto;

  pre {
    background-color: #fff !important;
    padding: 0 0 0 0 !important;
    margin: 0;
    border: 1px solid #e6e9ef;
  }

  span {
    line-height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: #323338;
  }

  code {
    span:first-child {
      span {
        padding-top: 10px;
      }
    }
    span:last-child {
      span {
        padding-bottom: 10px;
      }
    }
  }

  .linenumber {
    background-color: #e6e9ef;
    min-height: 16px;
    min-width: 40px !important;
    padding-right: 0px !important;
    margin-right: 10px;
    border-right: 1px solid #c5c7d0;
    text-align: center !important;
  }
`;
