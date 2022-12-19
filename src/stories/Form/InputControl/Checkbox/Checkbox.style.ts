import checkedIcon from '../../../icons/svg/icon-checkbox-checked.svg';
import disabledCheckedIcon from '../../../icons/svg/icon-checkbox-disabled-checked.svg';
import {
  styled as MUIStyled,
  FormControlLabel as MUIFormControlLabel,
  Theme,
  FormControlLabelProps,
} from '@mui/material';
import { StyledComponent } from '@emotion/styled';
import { MUIStyledCommonProps } from '@mui/system';

export const FormControlLabel: StyledComponent<FormControlLabelProps & MUIStyledCommonProps<Theme>> = MUIStyled(
  MUIFormControlLabel,
)({
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

    '.regular-box': {
      border: '1px solid #c5c7d0',
      backgroundColor: 'transparent',
    },

    '.disabled-box': {
      backgroundColor: 'rgba(230, 233, 239, 0.4)',
    },

    '.checked-box': {
      backgroundColor: '#0073ea',
      '&::before': {
        display: 'block',
        width: '16px',
        height: '16px',
        backgroundImage: `url(${checkedIcon})`,
        content: '""',
      },
    },

    '.disabled-checked-box': {
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
      '& .regular-box': {
        border: '1px solid #323338',
      },
      '& .checked-box': {
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
