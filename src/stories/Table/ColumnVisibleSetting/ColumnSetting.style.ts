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
    line-height: 22px;
  `,
  title: css`
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    padding: 15px;
    padding-bottom: 8px;

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.2px;
      color: #323338;
    }
  `,
  close_icon: css`
    padding: 0;
  `,
  content: css`
    width: 100%;
    height: auto;
  `,
  restore: css`
    width: 100%;
    height: 36px;
    box-sizing: border-box;
  `,
  restore_Link: css`
    display: inline-flex;
    width: calc(100% - 20px);
    height: 18px;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
  `,
  body: css`
    display: flex;
    flex-direction: column;
    gap: 7px;
    height: auto;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    list-style: none;
    padding: 10px 15px 20px 15px;
    margin: 0;
  `,
  label: css`
    margin-left: 3px;
  `,
  buttons: css`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 15px;
    padding-top: 0;
  `,
  cancel_btn: css`
    margin: 0 8px !important;
  `,
};
