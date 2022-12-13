import { css } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Size } from '../../../common/enum';

const SMALL_SIZE = {
  paper: {
    minWidth: '400px',
    minHeight: '126px',
  },
  title: {
    padding: '15px',
    paddingBottom: '0',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '22px',
    marginBottom: '10px',
  },
  content: {
    padding: '0 15px',
    marginBottom: '10px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
  },
  actions: {
    padding: '15px',
    paddingTop: 0,
  },
};

const MEDIUM_SIZE = {
  paper: {
    minWidth: '550px',
    minHeight: '250px',
  },
  title: {
    padding: '30px',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '5px',
  },
  content: {
    padding: '0 30px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
  },
  actions: {
    padding: '30px',
  },
};

const LARGE_SIZE = {
  paper: {
    minWidth: '700px',
    minHeight: '400px',
  },
  title: {
    padding: '30px',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '5px',
  },
  content: {
    padding: '0 30px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
  },
  actions: {
    padding: '30px',
  },
};

export const confirmTheme = (size: string, customWSize?: string, customHSize?: string, backgroundColor?: string) =>
  createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0px 15px 50px rgba(0, 0, 0, 0.3)',
            ...(size === Size.S
              ? { ...{ ...SMALL_SIZE.paper } }
              : size === Size.M
              ? { ...{ ...MEDIUM_SIZE.paper } }
              : size === Size.L
              ? { ...{ ...LARGE_SIZE.paper } }
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
            ...(size === Size.S
              ? { ...{ ...SMALL_SIZE.title } }
              : size === Size.M
              ? { ...{ ...MEDIUM_SIZE.title } }
              : size === Size.L
              ? { ...{ ...LARGE_SIZE.title } }
              : null),
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColor,
            color: '#323338',
            ...(size === Size.S
              ? { ...{ ...SMALL_SIZE.content } }
              : size === Size.M
              ? { ...{ ...MEDIUM_SIZE.content } }
              : size === Size.L
              ? { ...{ ...LARGE_SIZE.content } }
              : null),
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            justifyContent: 'space-between',
            ...(size === Size.S
              ? { ...{ ...SMALL_SIZE.actions } }
              : size === Size.M
              ? { ...{ ...MEDIUM_SIZE.actions } }
              : size === Size.L
              ? { ...{ ...LARGE_SIZE.actions } }
              : null),
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
