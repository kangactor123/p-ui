import { css } from '@emotion/react';
import { Dialog as MuiDialog, styled as MuiStyled } from '@mui/material';

export const Dialog: any = MuiStyled(MuiDialog)({
  '& .MuiDialog-paper': {
    position: 'absolute',
    right: 0,
    bottom: 0,
    maxWidth: '400px',
    width: '400px',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
    padding: '15px',
  },
});

export const iconCancel = css`
  padding: 0;
  width: 20px;
  height: 20px;
`;
