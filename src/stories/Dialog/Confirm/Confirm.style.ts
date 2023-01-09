import { css } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Size } from '../../../common/enum';

const SMALL_SIZE = {
  paper: {
    minWidth: '400px',
    maxWidth: '400px !important',
    minHeight: '126px',
  },
  title: {
    paddingBottom: '0',
    fontWeight: 500,
    marginBottom: '30px',
  },
  content: {
    marginBottom: '28px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
  },
};

const MEDIUM_SIZE = {
  paper: {
    minWidth: '550px',
    maxWidth: '550px !important',
    minHeight: '250px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    // marginBottom: '30px',
  },
  content: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    // paddingTop: '28px',
  },
};

const LARGE_SIZE = {
  paper: {
    minWidth: '700px',
    maxWidth: '700px !important',
    minHeight: '400px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '30px',
  },
  content: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    marginBottom: '28px',
  },
};

export const confirmTheme = (size: string, backgroundColor?: string) =>
  createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0px 15px 50px rgba(0, 0, 0, 0.3)',
            ...(size === Size.S
              ? { ...SMALL_SIZE.paper }
              : size === Size.M
              ? { ...MEDIUM_SIZE.paper }
              : size === Size.L
              ? { ...LARGE_SIZE.paper }
              : null),
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'space-between',
            color: '#202020',
            fontSize: 20,
            lineHeight: '24px',
            padding: '30px',
            ...(size === Size.S
              ? { ...SMALL_SIZE.title }
              : size === Size.M
              ? { ...MEDIUM_SIZE.title }
              : size === Size.L
              ? { ...LARGE_SIZE.title }
              : null),
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColor,
            color: '#666666',
            padding: '0 30px',
            ...(size === Size.S
              ? { ...SMALL_SIZE.content }
              : size === Size.M
              ? { ...MEDIUM_SIZE.content }
              : size === Size.L
              ? { ...LARGE_SIZE.content }
              : null),
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            justifyContent: 'space-between',
            padding: '30px',
            ...(size === Size.S ? { paddingTop: 0 } : null),
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
  gap: 12px;
`;
