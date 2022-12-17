import { css } from '@emotion/react';
import { Select as MUISelect, styled as MUIStyled, MenuItem as MUIMenuItem } from '@mui/material';
import { TSize } from '../../../../common/type';

export const SelectComponent: any = MUIStyled(MUISelect)<{ size: TSize; selected: boolean }>(({ size, selected }) => ({
  borderRadius: '4px',
  color: selected ? '#323338' : '#9195A1',
  backgroundColor: selected ? '#fff' : 'transparent',
  height: size === 'small' ? '32px' : size === 'medium' ? '40px' : size === 'large' ? '48px' : '40px',
  border: '1px solid #C5C7D0',
  maxWidth: '640px',

  '&:hover': {
    color: '#323338',
    border: '1px solid #323338',
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(230, 233, 239, 0.4)',
    color: 'rgba(103, 104, 121, 0.4)',
    border: 'none',
  },
  '&.Mui-focused': {
    border: '1px solid #0073EA',
  },
  '& .MuiSelect-select': {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
    padding:
      size === 'small'
        ? '5px 38px 5px 16px !important'
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
}));

export const splitStyle = css`
  border-top: 1px solid #d8d8d8;
  width: 100%;
  margin: 6px 0;
`;

export const labelStyle = css`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MenuItem: any = MUIStyled(MUIMenuItem)({
  color: '#323338',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  padding: '5px 8px',
  ':hover': {
    backgroundColor: '#F5F6F8',
  },
  ':disabled': {
    opacity: '0.4',
    color: '#323338',
  },
  ':active': {
    background: 'rgba(204, 229, 255, 0.35)',
  },
});
