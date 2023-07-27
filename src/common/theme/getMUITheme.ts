import { createTheme } from '@mui/material/styles';
import { Theme as MUITheme } from '@mui/material';
import { Theme as EmotionTheme } from '@emotion/react';

export const getMUITheme = (theme: EmotionTheme): MUITheme =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: 'fit-content',
            textTransform: 'none',
            transition: 'none',
            boxShadow: 'none',

            ':hover, :active': {
              boxShadow: 'none',
            },

            '&.MuiButton-containedGrey': {
              backgroundColor: theme.palette.greyScale.grey20,
              color: theme.palette.greyScale.grey100,
              ':hover, :active': {
                backgroundColor: theme.palette.greyScale.grey30,
              },
              ':disabled': {
                backgroundColor: theme.palette.content.disabled.disabled,
                color: theme.palette.text.disabled,
              },
            },
          },
          sizeSmall: {
            padding: '2px 6px',
            ...theme.typo.p6,
            '&.onlyIcon': {
              padding: '4px',
            },
          },
          sizeMedium: {
            padding: '6px 10px',
            ...theme.typo.p4,
            '&.onlyIcon': {
              padding: '6px',
            },
          },
          iconSizeSmall: {
            margin: '0px 4px',
            width: '16px',
            height: '16px',
            maxWidth: '16px',
            maxHeight: '16px',
          },
          iconSizeMedium: {
            margin: '0px 6px',
            width: '20px',
            height: '20px',
            maxWidth: '20px',
            maxHeight: '20px',
          },
          startIcon: {
            marginLeft: '0 !important',
          },
          endIcon: {
            marginRight: '0 !important',
          },
          containedPrimary: {
            backgroundColor: theme.palette.main.primary,
            color: theme.palette.text.white,

            ':hover, :active': {
              backgroundColor: theme.palette.main.primaryHover,
            },
            ':disabled': {
              backgroundColor: theme.palette.content.disabled.disabled,
              color: theme.palette.text.disabled,
            },
          },
          containedSecondary: {
            backgroundColor: theme.palette.main.secondary,
            color: theme.palette.text.primary,

            ':hover, :active': {
              backgroundColor: theme.palette.main.secondaryHover,
            },
            ':disabled': {
              backgroundColor: theme.palette.content.disabled.disabled,
              color: theme.palette.text.disabled,
            },
          },
          containedWarning: {
            backgroundColor: theme.palette.content.negative.negative,
            color: theme.palette.text.white,

            ':hover, :active': {
              backgroundColor: theme.palette.content.negative.negative50,
            },
            ':disabled': {
              backgroundColor: theme.palette.content.disabled.disabled,
              color: theme.palette.text.disabled,
            },
          },
          outlinedPrimary: {
            backgroundColor: 'transparent',
            color: theme.palette.text.grey100,
            border: `1px solid ${theme.palette.line.grey30}`,

            ':hover, :active': {
              backgroundColor: theme.palette.greyScale.grey10,
              border: `1px solid ${theme.palette.line.grey20}`,
            },
            ':disabled': {
              backgroundColor: 'transparent',
              color: theme.palette.text.disabled,
              border: `1px solid ${theme.palette.line.grey30}`,
            },
          },
          textPrimary: {
            backgroundColor: 'transparent',
            color: theme.palette.text.grey100,

            ':hover, :active': {
              backgroundColor: theme.palette.greyScale.grey10,
            },
            ':disabled': {
              backgroundColor: 'transparent',
              color: theme.palette.text.disabled,
            },
          },
          textSecondary: {
            backgroundColor: 'transparent',
            color: theme.palette.text.grey100,

            ':hover, :active': {
              backgroundColor: theme.palette.greyScale.grey30,
            },
            ':disabled': {
              backgroundColor: 'transparent',
              color: theme.palette.text.disabled,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '3px',
            backgroundColor: '#FFFFFF',
            '& .MuiOutlinedInput-root': {
              paddingRight: 'unset',
              ...theme.typo.p4,
              color: theme.palette.greyScale.grey100,
            },
            '& .Mui-disabled': {
              backgroundColor: theme.palette.content.disabled.disabled,
              color: theme.palette.text.disabled,
            },
            '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: `${theme.palette.line.grey30} !important`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            top: '62px !important',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            ...theme.typo.p4,
            color: theme.palette.text.grey100,
            borderRadius: '3px',
            backgroundColor: '#FFFFFF',
            '&:hover': {
              color: theme.palette.text.grey100,
              border: `1px solid ${theme.palette.text.grey100}`,
            },
            '&:focus': { border: `1px solid ${theme.palette.line.primary} !important` },
            '&.Mui-disabled': {
              backgroundColor: theme.palette.content.disabled.disabled,
              color: theme.palette.text.disabled,
              border: `1px solid ${theme.palette.greyScale.grey30}`,
            },
          },
          icon: {
            top: 'auto',
            border: 'unset',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            paddingTop: 'unset',
            paddingBottom: 'unset',
            padding: '6px',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: 'unset',
            padding: '2px 6px',
          },
        },
      },
    },
  });
