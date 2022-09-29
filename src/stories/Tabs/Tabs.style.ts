import { createTheme } from '@mui/material';

export const tabsTheme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          height: '36px',
          minHeight: '24px',
          textTransform: 'capitalize',
          padding: '8px 24px 9px',
          '@media (min-width: 600px)': {
            minWidth: '92px',
          },
          '&.Mui-selected': {
            borderRadius: '18px',
            backgroundColor: 'transparent',
            color: '#228be6',
          },
          '&:not(:last-of-type)': {
            marginRight: '8px',
          },
        },
        textColorPrimary: {
          color: '#191f28',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'transparent',
          borderRadius: '18px',
          border: 'solid 1px #228be6',
          height: '37px',
          top: '5px',
        },
        flexContainer: {
          display: 'flex',
          paddingTop: '5px',
        },
      },
    },
  },
});
