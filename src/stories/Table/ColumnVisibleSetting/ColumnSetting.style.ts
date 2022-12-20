import { css } from '@emotion/react';

export const styles = {
  'column-visible-setting': css`
    & .MuiDialogActions-root {
      border-top: 1px;
      background-color: #fff;
    }
  `,
  'detail-setting': css`
    position: absolute;
    right: 8px;
    top: 10px;
    z-index: 100;
  `,
  'detail-setting-btn': css`
    padding: 8px;
  `,
  popper: css`
    z-index: 100;
    position: absolute !important;
    right: 0;
    top: 50px !important;
    left: unset !important;
  `,
  dialog: css`
    width: 300px;
  `,
  title: css`
    display: flex;
    position: relative;
    align-items: center;
    padding: 10px 20px 8px;
    box-shadow: 0 1px 0 0 #d8d8d8;

    h2 {
      font-size: 18px;
      font-weight: 500;
      color: #1b2635;
      margin-top: 0;
      margin-bottom: 10px;
    }
  `,
  'icon-close': css`
    position: absolute;
    right: 0;
    top: 0;
  `,
  content: css`
    height: auto;
    padding: 10px 0;
    box-shadow: 0 1px 0 0 #d8d8d8;
  `,
  restore: css`
    width: 100%;
    height: 36px;
    padding: 7px 20px 11px;
    box-sizing: border-box;
  `,
  'restore-btn': css`
    display: block;
    height: 18px;
    font-size: 13px;
    cursor: pointer;
    float: right;
    clear: both;
    text-decoration: none;
    :hover {
      text-decoration: underline;
      text-decoration-color: #1976d2;
    }
  `,
  body: css`
    height: auto;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    list-style: none;
    padding: 10px 20px;
    margin: 0;
  `,
  item: css`
    height: 30px;
  `,
  buttons: css`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    height: 66px;
    padding: 0 20px;
  `,
  'cancel-btn': css`
    margin: 0 8px;
  `,
};
