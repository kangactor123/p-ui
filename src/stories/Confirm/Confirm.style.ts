import { css } from '@emotion/react';
import { createTheme } from '@mui/material';

const SMALL_SIZE = '410px';
const MEDIUM_SIZE = '600px';
const LARGE_SIZE = '700px';
const FONT_SMALL_SIZE = '20px';
const FONT_MEDIUM_SIZE = '20px';
const FONT_LARGE_SIZE = '24px';

export const confirmTheme = (
  size: string,
  customWSize?: string,
  customHSize?: string,
  backgroundColor?: string,
) =>
  createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            minWidth: customWSize
              ? customWSize
              : size === 'small'
              ? SMALL_SIZE
              : size === 'medium'
              ? MEDIUM_SIZE
              : size === 'large'
              ? LARGE_SIZE
              : SMALL_SIZE,
            minHeight: customHSize ? customHSize : undefined,
            color: '#1b2635',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: '16px 17px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColor,
            borderTop: `1px solid #d8d8d8`,
            borderBottom: `1px solid #d8d8d8`,
            paddingTop:
              size === 'small'
                ? '11px !important'
                : size === 'medium'
                ? '20px !important'
                : size === 'large'
                ? '20px !important'
                : '11px !important',
            paddingBottom:
              size === 'small'
                ? '11px'
                : size === 'medium'
                ? '20px'
                : size === 'large'
                ? '20px'
                : '11px',
            paddingLeft:
              size === 'small'
                ? '17px'
                : size === 'medium'
                ? '20px'
                : size === 'large'
                ? '20px'
                : '11px',
            paddingRight:
              size === 'small'
                ? '17px'
                : size === 'medium'
                ? '20px'
                : size === 'large'
                ? '20px'
                : '11px',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: '15px 20px 15px 20px',
            justifyContent: 'space-between',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h6: {
            fontSize:
              size === 'small'
                ? FONT_SMALL_SIZE
                : size === 'medium'
                ? FONT_MEDIUM_SIZE
                : size === 'large'
                ? FONT_LARGE_SIZE
                : FONT_SMALL_SIZE,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // boxShadow: '2px 3px 5px rgba(0,0,0,0.1)'
            boxShadow: 'none',
            letterSpacing: '0',
            width: '62px',
            height: '32px',
            fontSize: '13px',
            textTransform: 'none',
            fontWeight: 500,
            minWidth: '62px',
            minHeight: '32px',
            padding: '10px 14px',
            borderRadius: '3px',
          },
          textPrimary: {
            color: '#191f28',
          },
          contained: {
            boxShadow: 'none',
            backgroundColor: '#a1aabe',
            color: '#fff',
          },
          outlined: {
            border: '1px solid rgba(25, 31, 40, 0.4)',
            color: '#191f28',
            fontWeight: 500,
          },
          outlinedSizeSmall: {
            padding: '4px 8px',
            fontSize: '12px',
            lineHeight: '1.33',
          },
          containedPrimary: {
            color: '#fff',
            backgroundColor: '#228be6',
            boxShadow: 'none',
            '&:hover': {
              color: '#fff',
              boxShadow: 'none',
              backgroundColor: '#2557a0',
            },
            '&:disabled': {
              color: '#fff',
              boxShadow: 'none',
              backgroundColor: 'rgba(34, 139, 230 0.2)',
            },
          },
          containedSecondary: {
            color: '#58657f',
            backgroundColor: '#dbdee4',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: 'rgba(219, 222, 228, 0)',
            },
            '&:disabled': {
              boxShadow: 'none',
              color: 'rgba(88, 101, 127, 0.4)',
              backgroundColor: 'rgba(219, 222, 228, 0.4)',
            },
          },
          text: {
            padding: 'none',
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

export const dialogContent = css`
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: #191f28;
  min-height: 58px;
`;

export const footer = css`
  display: flex;
  justify-content: space-between;
`;

export const rightButtons = css`
  display: flex;
  gap: 8px;
`;
