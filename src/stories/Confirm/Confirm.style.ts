import { css } from '@emotion/react';
import { createTheme } from '@mui/material';

const SMALL_SIZE = '410px';
const MEDIUM_SIZE = '600px';
const LARGE_SIZE = '700px';
const FONT_SMALL_SIZE = '20px';
const FONT_MEDIUM_SIZE = '20px';
const FONT_LARGE_SIZE = '24px';

export const confirmTheme = (size: string, customWSize?: string, customHSize?: string, backgroundColor?: string) =>
  createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            minWidth: '400px',
            minHeight: '121px',
            boxShadow: '0px 15px 50px rgba(0, 0, 0, 0.3)',
            // minWidth: customWSize
            //   ? customWSize
            //   : size === 'small'
            //   ? SMALL_SIZE
            //   : size === 'medium'
            //   ? MEDIUM_SIZE
            //   : size === 'large'
            //   ? LARGE_SIZE
            //   : SMALL_SIZE,
            // minHeight: customHSize ? customHSize : undefined,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: '15px',
            paddingBottom: '0',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '17px',
            color: '#323338',
            marginBottom: '10px',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: '0 15px',
            marginBottom: '10px',
            backgroundColor: backgroundColor,
            fontWeight: 400,
            fontSize: '14px',
            color: '#323338',
            lineHeight: '22px',
            // paddingTop:
            //   size === 'small'
            //     ? '11px !important'
            //     : size === 'medium'
            //     ? '20px !important'
            //     : size === 'large'
            //     ? '20px !important'
            //     : '11px !important',
            // paddingBottom: size === 'small' ? '11px' : size === 'medium' ? '20px' : size === 'large' ? '20px' : '11px',
            // paddingLeft: size === 'small' ? '17px' : size === 'medium' ? '20px' : size === 'large' ? '20px' : '11px',
            // paddingRight: size === 'small' ? '17px' : size === 'medium' ? '20px' : size === 'large' ? '20px' : '11px',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: '15px',
            paddingTop: 0,
            justifyContent: 'space-between',
          },
        },
      },
    },
  });

export const iconCloseButton = css`
  padding: 4px;
  width: 24px;
  height: 24px;
`;

export const iconClose = css`
  width: 24px;
  height: 24px;
`;

export const rightButtons = css`
  display: flex;
  gap: 8px;
`;
