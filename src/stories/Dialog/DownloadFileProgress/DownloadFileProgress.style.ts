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

  '.download-progress': {
    pointerEvents: 'auto',

    '& .MuiDialogTitle-root': {
      padding: 0,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '22px',
      color: '#202020',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
    },

    '& .MuiDialogContent-root': {
      padding: 0,
    },

    '.file-info': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '10px',

      '.file-title-wrap': {
        display: 'flex',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '22px',
        gap: '10px',

        '.file-name-wrap': {
          display: 'flex',
          maxWidth: '300px',

          '.file-name': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          },
        },
      },
      '.file-size': {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: '16px',
        color: '#202020',
      },
    },

    '.file-progress': {
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
      gap: '10px',

      '.percentage': {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: '16px',
        color: '#0073EA',
      },
      '.percentage_failed': {
        color: '#666666',
      },

      '.progress-bar-wrap': {
        width: '270px',
      },

      '.icon-fail-wrap': {
        display: 'flex',
        gap: '12px',
      },
    },
  },
});

export const iconCancel = css`
  padding: 0;
`;
