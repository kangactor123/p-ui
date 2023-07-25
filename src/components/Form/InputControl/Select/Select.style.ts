import { css, Theme } from '@emotion/react';
import { Select as MUISelect, styled as MUIStyled, MenuItem as MUIMenuItem } from '@mui/material';
import { TSize } from '../../../../common/type';

export const SelectComponent: any = MUIStyled(MUISelect)<{ size: TSize; selected: boolean }>(
  ({ size, selected }) => ({
    borderRadius: '4px',
    color: selected ? '#323338' : '#9195A1',
    backgroundColor: selected ? '#fff' : 'transparent',
    height:
      size === 'small' ? '32px' : size === 'medium' ? '40px' : size === 'large' ? '48px' : '32px',
    border: '1px solid #D6D9DE',
    maxWidth: '640px',
    minWidth: '300px',

    '&:hover': {
      color: '#323338',
      border: '1px solid #323338',
    },
    '&.Mui-disabled': {
      backgroundColor: '#E8EAED',
      color: '#B5B8BF',
      border: '1px solid #D6D9DE',
    },
    '&.Mui-focused': {
      border: '1px solid #1C74DF',
    },
    '& .MuiSelect-select': {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '20px',
      padding:
        size === 'small'
          ? '6px 32px 6px 12px !important'
          : size === 'medium'
          ? '9px 40px 9px 16px !important'
          : size === 'large'
          ? '12px 40px 12px 18px !important'
          : null,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
    },
    '& .MuiSelect-icon': {
      top: 'auto',
      border: 'unset',
    },
    '& .multi-checkbox': {
      marginLeft: '10px',
      padding: 0,
    },
    '& .multi-label': {
      paddingLeft: 8,
      '& > .label': {
        minWidth: 32,
        width: 32,
        height: 32,
        marginRight: 8,
      },
    },
  }),
);

export const wrap = css`
  max-width: 100%;
`;

export const labelStyle = (theme: Theme) => css`
  max-width: 100%;

  span: {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${theme.typo.p4.fontSize};
    font-weight: ${theme.typo.p4.fontWeight};
    line-height: ${theme.typo.p4.lineHeight};
  }

  &.Mui-selected {
    background-color: #e2f3ff;
    &:hover {
      background-color: #f0f2f4;
    }
  }

  &.Mui-focusVisible {
    background-color: unset;
    &:hover {
      background-color: #f0f2f4;
    }
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

export const menu = css`
  max-width: 640px;
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
`;
export const multiCheckbox = css`
  margin-left: 10px;
  padding: 0;
`;
