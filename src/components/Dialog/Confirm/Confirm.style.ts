import { css } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Size } from '../../../common/enum';

type SizeType = {
  [key: string]: {
    paper?: any;
    title?: any;
    content?: any;
  };
};

const SIZE: SizeType = {
  small: {
    paper: {
      minWidth: '400px',
      maxWidth: '400px !important',
      minHeight: '126px',
    },
    title: {
      paddingBottom: '0',
      marginBottom: '30px',
    },
    content: {
      marginBottom: '28px',
    },
  },
  medium: {
    paper: {
      minWidth: '550px',
      maxWidth: '550px !important',
      minHeight: '250px',
    },
  },
  large: {
    paper: {
      minWidth: '700px',
      maxWidth: '700px !important',
      minHeight: '400px',
    },
  },
};

export const confirmTheme = (size: string, backgroundColor?: string) =>
  createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0px 15px 50px rgba(0, 0, 0, 0.3)',
            ...SIZE[size]?.paper,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'space-between',
            color: '#202020',
            padding: '30px',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '24px',
            ...SIZE[size]?.title,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColor,
            color: '#666666',
            padding: '0 30px',
            overflowY: 'hidden',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '22px',
            ...SIZE[size]?.content,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            justifyContent: 'space-between',
            padding: '30px',
            ...(size === Size.S ? { paddingTop: 0 } : size === Size.L ? { paddingTop: '28px' } : null),
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
