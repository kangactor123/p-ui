import checkedIcon from '../../../icons/svg/icon-checkbox-checked.svg';
import disabledCheckedIcon from '../../../icons/svg/icon-checkbox-disabled-checked.svg';
import { styled as MUIStyled, FormControl as MUIFormControl, Theme, FormControlProps } from '@mui/material';
import { StyledComponent } from '@emotion/styled';
import { MUIStyledCommonProps } from '@mui/system';

export const FormControl: StyledComponent<FormControlProps & MUIStyledCommonProps<Theme>> = MUIStyled(MUIFormControl)({
  width: '100%',

  '& .MuiFormControlLabel-root': {
    position: 'absolute',
    left: '11px',
    width: '100%',
  },

  '& .MuiFormControlLabel-label': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 'calc(100% - 23px)',
    textOverflow: 'ellipsis',
  },
});

export const migratorCheckboxStyle = {
  '& .MuiCheckbox-root': {
    padding: 0,
    maxWidth: '16px',
    maxHeight: '16px',
    marginRight: '7px',

    '.checkbox': {
      minWidth: '16px',
      minHeight: '16px',
      borderRadius: '2px',
    },

    '.regularBox': {
      border: '1px solid #c5c7d0',
      backgroundColor: 'transparent',
    },

    '.disabledBox': {
      backgroundColor: 'rgba(230, 233, 239, 0.4)',
    },

    '.checkedBox': {
      backgroundColor: '#0073ea',
      '&::before': {
        display: 'block',
        width: '16px',
        height: '16px',
        backgroundImage: `url(${checkedIcon})`,
        content: '""',
      },
    },

    '.disabledCheckedBox': {
      backgroundColor: 'rgba(230, 233, 239, 0.4)',
      '&::before': {
        display: 'block',
        width: '16px',
        height: '16px',
        backgroundImage: `url(${disabledCheckedIcon})`,
        content: '""',
      },
    },

    '&:hover': {
      '& .regularBox': {
        border: '1px solid #323338',
      },
      '& .checkedBox': {
        backgroundColor: '#0060B9',
      },
    },
  },

  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '22px',
    color: '#323338',

    '&.Mui-disabled': {
      color: 'rgba(103, 104, 121, 0.4)',
    },
  },
};
