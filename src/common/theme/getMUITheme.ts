import { createTheme } from '@mui/material/styles';
import { Theme as MUITheme } from '@mui/material';
import { Theme as EmotionTheme } from '@emotion/react';

export const getMUITheme = (theme: EmotionTheme): MUITheme =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            // backgroundColor: theme.palette.main.primary,
            // ...theme.typo.h1,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            color: '#808591',
            // backgroundColor: '#FFFFFF',
            border: 'unset',
            maxWidth: '640px',
            minWidth: '300px',
            '& .MuiInputBase-multiline': {
              padding: 0,
              '& .MuiOutlinedInput-input': {
                height: '90px !important',
              },
            },
            '& .MuiOutlinedInput-root': {
              paddingRight: 'unset',
              backgroundColor: 'transparent',
              ...theme.typo.p4,
            },
            '& .Mui-disabled': {
              backgroundColor: '#E8EAED',
              color: '#B5B8BF',
            },
            '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: '#D6D9DE !important',
            },
          },
        },
      },
    },
  });
