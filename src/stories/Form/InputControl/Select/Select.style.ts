import { css } from '@emotion/react';
import { Select as MUISelect, styled as MUIStyled } from '@mui/material';

export const SelectComponent = MUIStyled(MUISelect)({
  '& .MuiSelect-select': {
    fontSize: 14,
    padding: '11px 32px 10px 12px',
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
});

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
