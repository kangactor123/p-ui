import { createTheme } from '@mui/material/styles';
import { Theme as MUITheme } from '@mui/material';
import { Theme as EmotionTheme } from '@emotion/react';
import checkedIcon from '../../components/icons/svg/icon-checkbox-checked.svg';
import checkedDisabledIcon from '../../components/icons/svg/icon-checkbox-checked-disabled.svg';

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
            ...theme.typo.p6,
            padding: '2px 6px',
            '&.onlyIcon': {
              padding: '4px',
            },
          },
          sizeMedium: {
            ...theme.typo.p4,
            padding: '6px 10px',
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
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            maxWidth: '100%',
            margin: 0,
            gap: '8px',
            alignItems: 'flex-start',

            '&.playce-checkbox': {
              padding: '4px 0',
            },
          },
          label: {
            ...theme.typo.p4,
            color: theme.palette.text.grey100,
          },
        },
      },
      MuiFormGroup: {
        styleOverrides: {
          root: {
            width: '100%',
            flexDirection: 'row',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            width: '14px',
            height: '14px',
            minWidth: '14px',
            minHeight: '14px',
            marginTop: '3px',
            padding: 0,

            '.playce-checkbox-icon': {
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.line.grey30}`,
              borderRadius: '2px',
            },

            '.playce-checkbox-checked': {
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.main.primary,
              borderRadius: '2px',

              '&::before': {
                display: 'block',
                width: '14px',
                height: '14px',
                content: '""',
                backgroundImage: `url(${checkedIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              },
            },

            ':hover': {
              '.playce-checkbox-icon': {
                border: `1px solid ${theme.palette.line.grey100}`,
              },
              '.playce-checkbox-checked': {
                backgroundColor: theme.palette.main.primaryHover,
              },
            },

            '&.Mui-disabled': {
              '.playce-checkbox-icon': {
                backgroundColor: theme.palette.content.disabled.disabled,
              },
              '.playce-checkbox-checked': {
                backgroundColor: theme.palette.content.disabled.disabled,
                '&::before': {
                  backgroundImage: `url(${checkedDisabledIcon})`,
                },
              },
            },

            '.playce-checkbox-label': {
              ...theme.typo.p4,
              color: theme.palette.text.grey100,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            width: '16px',
            height: '16px',
            minWidth: '16px',
            minHeight: '16px',
            marginTop: '2px',
            padding: 0,
            border: `1px solid ${theme.palette.line.grey30}`,

            '.playce-radio-icon-checked': {
              width: '8px',
              height: '8px',
              backgroundColor: '#fff',
              borderRadius: '50%',
            },

            ':hover': {
              borderColor: theme.palette.line.grey100,
            },

            '&.Mui-checked': {
              backgroundColor: theme.palette.main.primary,
              border: 'none',
            },

            '&.Mui-disabled': {
              backgroundColor: theme.palette.content.disabled.disabled,
              border: 'none',

              '.playce-radio-icon-checked': {
                backgroundColor: theme.palette.greyScale.grey40,
              },
            },
          },
        },
      },
    },
  });