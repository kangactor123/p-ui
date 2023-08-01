import { css, Theme } from '@emotion/react';
import { styled as MUIStyled, MenuItem as MUIMenuItem } from '@mui/material';

export const formControlBox = css``;

export const labelStyle = (theme: Theme) => css`
  max-width: 100%;

  span: {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .MuiTypography-root {
    font-size: ${theme.typo.p4.fontSize};
    font-weight: ${theme.typo.p4.fontWeight};
    line-height: ${theme.typo.p4.lineHeight};
  }
`;

export const splitStyle = css`
  border-top: 1px solid #d8d8d8;
  width: 100%;
  margin: 6px 0;
`;

export const MenuItem: any = MUIStyled(MUIMenuItem)({
  color: '#50545B',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '20px',
  padding: '4px 6px',
  ':hover': {
    backgroundColor: '#F0F2F4',
  },
  ':disabled': {
    opacity: '0.4',
    color: '#B5B8BF',
  },
  ':active': {
    background: '#e2f3ff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'unset',
    ':hover': {
      backgroundColor: '#F0F2F4',
    },
  },
  '&.Mui-selected': {
    ':hover': {
      backgroundColor: '#F0F2F4',
    },
  },
});

export const optionWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;

  .desc {
    font-size: 10px;
    color: #919294;
  }
`;

export const loadingStyle = css`
  background-color: transparent !important;
  svg {
    min-width: 12px;
    min-height: 12px;
  }
`;

export const multiLabel = css`
  padding-left: 8px;
  & > label {
    min-width: 32px;
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  & > div > span {
    font-size: 14px;
  }
  & .MuiPaper-root {
    top: 2px !important;
  }
`;
export const multiCheckbox = css`
  margin-left: 10px;
  padding: 0;
`;
